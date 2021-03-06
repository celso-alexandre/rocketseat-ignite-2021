import Head from 'next/head';
import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface IPostsProps {
  posts: IPost[];
}

export default function Posts({ posts }: IPostsProps) {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>

          {posts?.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${
                session?.activeSubscription ? '' : 'preview/'
              }${post.slug}`}
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}

        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication'),
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  });

  const posts = response?.results?.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post?.data.title),
      excerpt: (post?.data.content.find((content) => content.type === 'paragraph')?.text ?? '') as string,
      updatedAt: format(new Date(post?.last_publication_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
