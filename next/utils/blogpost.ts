import { client } from './gql';

export const getBlogPostsCount = async () => {
  const { blogPostsCount } = await client.BlogPostsCount();

  return blogPostsCount;
};

export const fetchBlogPosts = async (
  id: number,
  limit: number,
  offset: number
) => {
  const { fetchBlogPosts } = await client.FetchBlogPosts({
    id,
    limit,
    offset,
  });

  return fetchBlogPosts;
};
