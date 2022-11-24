import Head from 'next/head';
import { getAllPosts } from '../src/api.js';
import HomePageArticles from '../components/articles.jsx';
import Layout from '../components/layout.jsx';

export default function Home({ posts }) {
  return (
    <div className="">
      <Head>
        <title>Next-blog with mdx</title>
        <meta name="description" content="next blog with mdx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomePageArticles posts={posts} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts()
    .slice(0, 9)
    .map((post) => post.meta);
  return {
    props: { posts },
  };
}
