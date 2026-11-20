import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next/pages'

import { Pagination } from '@/components/ui'
import BlogPostCard from '@/modules/cards-and-rows/BlogPostCard'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@/services/graphql/fetchers/blog-posts.fetcher'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

const BlogPostsListingSection = () => {
  const { i18n } = useTranslation()
  const [filters, setFilters] = useRoutePreservedState(blogPostsDefaultFilters)

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(i18n.language, filters),
    queryFn: () => blogPostsFetcher(i18n.language, filters),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  if (!data) {
    return null
  }

  // TODO: Advanced data fetching
  return (
    <>
      {data.blogPosts_connection?.nodes?.length ? (
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4">
          {data.blogPosts_connection.nodes.map((blogPost) => (
            <BlogPostCard key={blogPost?.slug} blogPost={blogPost} />
          ))}
        </div>
      ) : null}

      {data.blogPosts_connection?.pageInfo?.total ? (
        <div className="mt-4 flex justify-end">
          <Pagination
            max={Math.ceil(data.blogPosts_connection.pageInfo.total / filters.pageSize)}
            value={filters.page}
            onChangeNumber={handlePageChange}
          />
        </div>
      ) : null}
    </>
  )
}

export default BlogPostsListingSection
