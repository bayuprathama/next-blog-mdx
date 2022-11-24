import Image from 'next/image';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { getPostFromSlug, getSlugs } from '../../src/api';
import 'highlight.js/styles/atom-one-dark.css';
import Layout from '../../components/layout';

export default function Blog({ post }) {
  return (
    <Layout>
      <div className="">
        <Head>
          <title>{post.meta.title}</title>
        </Head>
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold">{post.meta.title}</h1>
          <div className="prose prose-pre:bg-[#282c34] max-w-3xl">
            <MDXRemote {...post.source} components={{ Image }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const { content, meta } = getPostFromSlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        // rehypeSlug,
        // [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  });
  return {
    props: {
      post: {
        source: mdxSource,
        meta,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getSlugs().map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
