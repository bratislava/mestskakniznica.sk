import { BlogPostEntity, BlogPostFragment, PageEntity } from '@bratislava/strapi-sdk-city-library'
import { ArticleCard, PageTitle, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { BlogPostResponse } from '../../pages/api/blog-posts'
import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"

export interface BlogPostsPageProps {
  page: PageEntity
}

const LIMIT = 16

function BlogPostsPage({ page }: BlogPostsPageProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  const [relatedBlogPosts, setRelatedBlogPosts] = React.useState<BlogPostEntity[]>(page?.attributes?.blogPosts?.data ?? [])

  const [noOfPages, setNoOfPages] = React.useState(Math.ceil((page?.attributes?.blogPosts?.data.length ?? 1) / LIMIT) ?? 1)

  const [offsetPage, setOffsetPage] = React.useState(1)

  if (!page) return null

  const fetchBlogPosts = async (offset: number) => {
    const res = await fetch(`/api/blog-posts?id=${page.id}&offset=${(offset - 1) * LIMIT}&limit=${LIMIT}`)
    const data: BlogPostResponse = await res.json()
    setRelatedBlogPosts(data.posts)
    setNoOfPages(Math.ceil(data.count / LIMIT))
  }

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num)
  }

  return (
    <SectionContainer>
        <PageBreadcrumbs page={page} />
        <PageTitle title={page?.attributes?.title ?? ''} description={page?.attributes?.description ?? ''} />

        {relatedBlogPosts?.length > 0 && (
          <div className="grid mt-8 grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4">
            {relatedBlogPosts.map((blogPost, index) => (
              <div key={index}>
                <ArticleCard
                  title={blogPost?.attributes?.title ?? ''}
                  media={blogPost?.attributes?.coverMedia?.data?.attributes?.url || ''}
                  mediaType={blogPost?.attributes?.coverMedia?.data?.attributes?.mime?.split('/')[0] ?? ''}
                  publishedDate={formatDateToLocal(blogPost?.attributes?.createdAt ?? '', locale)}
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
