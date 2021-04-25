import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../../services/prismic';
import styles from '../post.module.scss';

interface IPostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: IPostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>
          {post.title}
          {' '}
          | Ignews
        </title>
      </Head>

      <main className={styles.container}>
        <article className={`${styles.post} ${styles.previewContent}`}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug: String(slug),
    title: RichText.asText(response?.data.title),
    content: RichText.asHtml(response?.data.content.splice(0, 3)),
    updatedAt: format(new Date(response?.last_publication_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
  };

  return {
    props: {
      post,
    },
  };
};
