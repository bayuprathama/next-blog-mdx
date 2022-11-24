import Link from 'next/link';
export default function HomePageArticles({ posts }) {
  return (
    <div className="flex flex-col gap-8">
      {posts &&
        posts.map((post) => {
          return <Article post={post} key={post.title} />;
        })}
    </div>
  );
}

function Article({ post }) {
  return (
    <div className="p-6 duration-150 ease-in-out border border-gray-300 rounded-xl hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <h1 className="mb-2 text-xl font-medium text-cyan-600">{post.title}</h1>
      </Link>
      <p className="mb-4">{post.excerpt}</p>
      <div className="flex gap-1">
        {post.tags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-2 py-1 text-xs rounded-xl bg-cyan-400"
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
