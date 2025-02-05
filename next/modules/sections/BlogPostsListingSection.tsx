import { useTranslation } from 'next-i18next'
import React from 'react'
import { useQuery } from 'react-query'

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
    keepPreviousData: true,
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
      {data.blogPosts?.data?.length ? (
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4">
          {data.blogPosts.data.map((blogPost) => (
            <BlogPostCard key={blogPost.attributes?.slug} blogPost={blogPost} />
          ))}
        </div>
      ) : null}

      {data.blogPosts?.meta?.pagination?.total && (
        <div className="mt-4 flex justify-end">
          <Pagination
            max={Math.ceil(data.blogPosts?.meta.pagination.total / filters.pageSize)}
            value={filters.page}
            onChangeNumber={handlePageChange}
          />
        </div>
      )}
    </>
  )
}

export default BlogPostsListingSection
