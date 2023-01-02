import { ArticleCard, PageTitle, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { client } from '@utils/gql'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import { BlogPostEntityFragment, PageEntity, PageEntityFragment } from '../../graphql'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface BlogPostsPageProps {
  page: PageEntityFragment
}

// TODO: fetching and pagination may not work properly

const LIMIT = 16

const BlogPostsPage = ({ page }: BlogPostsPageProps) => {
  const { t } = useTranslation('common')

  const [blogPosts, setBlogPosts] = useState<BlogPostEntityFragment[]>()
  const [noOfPages, setNoOfPages] = useState(1)
  const [offsetPage, setOffsetPage] = useState(1)

  useEffect(() => {
    fetchBlogPosts(0)
  }, [])

  if (!page) {
    return null
  }

  const fetchBlogPosts = async (start: number) => {
    const { blogPosts: blogPostResponse } = await client.BlogPosts({
      locale,
      limit: LIMIT,
      start,
    })
    const { blogPosts: blogPostsMetaReposponse } = await client.BlogPostsCount({ locale })

    setBlogPosts(blogPostResponse?.data ?? [])
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

      {blogPosts?.length ? (
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4">
          {blogPosts.map((blogPost) => (
            <div key={blogPost.attributes?.slug}>
              <ArticleCard
                title={blogPost?.attributes?.title}
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
      ) : null}

      <div className="mt-6 flex justify-center lg:justify-end">
        <Pagination
          max={Math.ceil(noOfPages / LIMIT)}
          value={offsetPage}
          onChangeNumber={(num) => {
            handleChangeOffsetPage(num)
            fetchBlogPosts((num - 1) * LIMIT)
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
