import { useTranslation } from 'next-i18next'

import Sections from '@/components//Molecules/Sections'
import { PageTitle, SectionContainer, Video } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import StrapiImage from '@/modules/common/StrapiImage'
import FormatDate from '@/modules/formatting/FormatDate'
import { BlogPostEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface BlogPostPageProps {
  blogPost: BlogPostEntityFragment
}

const BlogPostPage = ({ blogPost }: BlogPostPageProps) => {
  const { t } = useTranslation()

  const coverMedia = blogPost?.attributes?.coverMedia?.data?.attributes
  const mediaType = coverMedia?.mime?.split('/')[0] ?? ''

  const { breadcrumbs } = useNavikronos()

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={blogPost?.attributes?.title ?? ''} hasDivider={false} />
        <div className="mt-2 text-base text-foreground-body lg:mt-4">
          {t('common.added')}{' '}
          <FormatDate valueType="ISO" value={blogPost?.attributes?.publishedAt} />
        </div>

        {/* Cover Media */}
        <div className="-mx-7.5 mt-6 flex md:mx-0 lg:mt-10">
          {coverMedia && mediaType === 'image' ? (
            <StrapiImage
              image={coverMedia}
              className="w-full object-cover md:h-74 lg:h-[400px]"
            />
          ) : null}

          {coverMedia && mediaType === 'video' ? (
            <div className="flex w-full justify-center">
              <Video mediaUrl={coverMedia.url} />
            </div>
          ) : null}
        </div>

        {/* Sections */}
        <div className="flex">
          <div className="mt-10 w-full lg:mx-auto lg:w-8/12">
            <Sections sections={blogPost?.attributes?.sections?.filter(isDefined) ?? []} />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default BlogPostPage
