import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from './index.module.scss';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
    amountFormatted: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the
            {' '}
            <span>React</span>
            {' '}
            world.
          </h1>
          <p>
            Get access to all the publications
            {' '}
            <br />
            <span>
              for
              {' '}
              {product?.amountFormatted}
              {' '}
              month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1IimP7E1gAaT1kHClsfxQkdl');

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
    amountFormatted: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
