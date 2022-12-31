import { ArticleCard, PageTitle, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { BlogPostEntityFragment, PageEntity, PageEntityFragment } from '../../graphql'
import { client } from '../../utils/gql'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface BlogPostsPageProps {
  page: PageEntityFragment
}

const LIMIT = 16

const BlogPostsPage = ({ page }: BlogPostsPageProps) => {
  const { t } = useTranslation('common')

  const [relatedBlogPosts, setRelatedBlogPosts] = useState<BlogPostEntityFragment[]>(
    page?.attributes?.blogPosts?.data ?? []
  )

  const [noOfPages, setNoOfPages] = useState(
    Math.ceil((page?.attributes?.blogPosts?.data.length ?? 1) / LIMIT) ?? 1
  )

  const [offsetPage, setOffsetPage] = useState(1)

  if (!page) {
    return null
  }

  const fetchBlogPosts = async (start: number) => {
    const { blogPosts: blogPostResponse } = await client.BlogPosts({
      limit: LIMIT,
      start,
    })
    const { blogPosts: blogPostsMetaReposponse } = await client.BlogPostsCount()

    setRelatedBlogPosts(blogPostResponse?.data ?? [])
    setNoOfPages(Math.ceil(blogPostsMetaReposponse?.meta.pagination.total ?? 1 / LIMIT))
  }

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num)
  }

  return (
    <SectionContainer>
      <PageBreadcrumbs page={page as PageEntity} />
      <PageTitle
        title={page?.attributes?.title ?? ''}
        description={page?.attributes?.description ?? ''}
      />

      {relatedBlogPosts?.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4">
          {relatedBlogPosts.map((blogPost, index) => (
            <div key={index}>
              <ArticleCard
                title={blogPost?.attributes?.title ?? ''}
                media={blogPost?.attributes?.coverMedia?.data?.attributes?.url || ''}
                mediaType={
                  blogPost?.attributes?.coverMedia?.data?.attributes?.mime?.split('/')[0] ?? ''
                }
                publishedDate={blogPost?.attributes?.publishedAt}
                pageLink={{
                  title: t('showMore'),
                  url: `${t('blog_slug') + blogPost?.attributes?.slug}`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center lg:justify-end">
        <Pagination
          max={noOfPages}
          value={offsetPage}
          onChangeNumber={(num) => {
            handleChangeOffsetPage(num)
            fetchBlogPosts(num)
          }}
          previousButtonAriaLabel={t('previousPage')}
          nextButtonAriaLabel={t('nextPage')}
          currentInputAriaLabel={t('currentPage')}
        />
      </div>
    </SectionContainer>
  )
}

export default BlogPostsPage
