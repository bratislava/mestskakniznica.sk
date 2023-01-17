import { client } from '@services/graphql/gql'

export type BlogPostsFilters = {
  pageSize: number
  page: number
}

export const blogPostsDefaultFilters: BlogPostsFilters = {
  pageSize: 16,
  page: 1,
}

export const getBlogPostsQueryKey = (locale: string, filters: BlogPostsFilters) => [
  'blogPosts',
  locale,
  filters,
]

export const blogPostsFetcher = async (locale: string, filters: BlogPostsFilters) =>
  client.BlogPosts({
    locale,
    limit: filters.pageSize,
    start: (filters.page - 1) * filters.pageSize,
  })
