import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';

//create a post path constant
const POST_PATH = path.join(process.cwd(), 'posts');

// get all the post content in an array
export const getAllPosts = () => {
  const posts = getSlugs().map((slug) => getPostFromSlug(slug));
  // .sort((a, b) => {
  //   if (a.meta.title.split('').length > b.meta.title.split('').length)
  //     return 1;
  //   if (a.meta.title.split('').length < b.meta.title.split('').length)
  //     return -1;
  //   return 0;
  // })
  // .reverse();
  return posts;
};

// get slug. result ex: reduce, swr
export const getSlugs = () => {
  //get the paths of all the post in /posts
  const paths = sync(`${POST_PATH}/*.mdx`);

  //get the last part of the path for the slug
  return paths.map((path) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split('.');
    return slug;
  });
};

// reading and getting content + data from the post using gray-matter
// return content + data from 1 post
export const getPostFromSlug = (slug) => {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath, 'utf-8');

  //destruct variable name must be content and data *not reading the docs yet
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      title: data.title ?? slug,
      date: data.date ?? new Date().toString(),
      tags: data.tags ?? [],
    },
  };
};
