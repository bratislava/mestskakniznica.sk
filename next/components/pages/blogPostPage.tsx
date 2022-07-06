import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { BlogPostEntity, BlogPostWithParentPageFragment, ComponentSeoSeo } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer, Video } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'

import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface BlogPostPageProps {
  blogPost: BlogPostEntity
  Seo?: ComponentSeoSeo
}

function BlogPostPage({ blogPost }: BlogPostPageProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()
  const mediaType = blogPost?.attributes?.coverMedia?.data?.attributes?.mime?.split('/')[0] ?? ''
  const { Image: UIImage } = useUIContext()

  return (
    <SectionContainer>
      {blogPost?.attributes?.parentPage && <PageBreadcrumbs page={blogPost?.attributes?.parentPage?.data} blogPost={blogPost} />}

      <PageTitle title={blogPost?.attributes?.title ?? ''} hasDivider={false} />
      <div className="mt-2 lg:mt-4 text-sm text-gray-universal-70">{`${t('added')} ${formatDateToLocal(
        // blogPost.date_added ? blogPost.date_added : blogPost.created_at, // TEMP fix for not localized blog posts
        blogPost?.attributes?.createdAt,
        locale
      )}`}</div>

      <div className="flex mt-6 lg:mt-10 -mx-7.5 md:mx-0">
        {blogPost?.attributes?.coverMedia && mediaType === 'image' && (
          <img
            src={blogPost?.attributes?.coverMedia?.data?.attributes?.url ?? ''}
            alt={blogPost?.attributes?.title || ''}
            className="w-full md:h-[300px] lg:h-[400px] object-cover object-center"
          />
        )}
        {blogPost?.attributes?.coverMedia && mediaType === 'video' && (
          <div className="w-full flex justify-center">
            <Video mediaUrl={blogPost?.attributes?.coverMedia?.data?.attributes?.url} />
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="flex">
        <div className="w-full lg:mx-auto lg:w-8/12 mt-10">
          {blogPost?.attributes?.sections && <Sections sections={blogPost?.attributes?.sections} />}
        </div>
      </div>
    </SectionContainer>
  )
}

export default BlogPostPage
