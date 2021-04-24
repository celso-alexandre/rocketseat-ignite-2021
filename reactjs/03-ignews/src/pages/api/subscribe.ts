import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { query as q } from 'faunadb';
import { stripe } from '../../services/stripe';
import { fauna } from '../../services/fauna';

type User = {
  ref: {
    id: string;
  },
  data: {
    stripe_customer_id?: string;
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).end('Mathod not allowed');
  }

  const session = await getSession({ req: request });

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session.user.email),
      ),
    ),
  );

  let stripeCustomerId = user.data.stripe_customer_id;

  if (!stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    });

    stripeCustomerId = stripeCustomer.id;

    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCustomerId,
          },
        },
      ),
    );
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      { price: 'price_1IimP7E1gAaT1kHClsfxQkdl', quantity: 1 },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  return response.status(200).json({ sessionId: stripeCheckoutSession.id });
};
