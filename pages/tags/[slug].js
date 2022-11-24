import HomePageArticles from '../../components/articles';
import Layout from '../../components/layout';
import { getAllPosts } from '../../src/api';

export default function TagsPage({ slug, posts }) {
  return (
    <div>
      <Layout>
        <h1 className="mb-8 text-xl">
          Tag: `<span className="font-medium">{slug}</span>`
        </h1>
        <HomePageArticles posts={posts} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = getAllPosts()
    .map((post) => post.meta)
    .filter((post) => post.tags.includes(slug));
  return {
    props: {
      slug,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts().map((post) => post.meta);
  const tags = new Set(posts.map((post) => post.tags).flat());
  const paths = Array.from(tags).map((path) => ({
    params: { slug: path },
  }));
  return {
    paths,
    fallback: false,
  };
}
