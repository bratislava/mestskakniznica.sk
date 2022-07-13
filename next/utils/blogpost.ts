import { client } from './gql'

export const getBlogPostsCount = async () => {
  const countResponse = await client.BlogPostsCount()

  return countResponse.blogPosts?.meta.pagination.total
}

export const fetchBlogPosts = async (id: any, limit: number, offset: number) => {
  const blogPostResponse = await client.FetchBlogPosts({
    id,
    limit,
    offset,
  })

  return blogPostResponse.blogPosts?.data
}
