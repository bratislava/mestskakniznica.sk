import Placeholder from '@assets/images/list-item-thumbnail.jpeg'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import FormatDate from '@modules/formatting/FormatDate'
import { BlogPostEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

type BlogPostProps = {
  blogPost: BlogPostEntityFragment
}

const BlogPostCard = ({ blogPost }: BlogPostProps) => {
  const { t } = useTranslation('common')
  const { getPathForStrapiEntity } = useNavikronos()

  const { coverMedia, publishedAt, title } = blogPost.attributes ?? {}
  const link = getPathForStrapiEntity(blogPost)

  return (
    <div className="group/showMore relative flex h-full w-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        {/* TODO: Replace with MImage */}
        <img
          className="mb-4 h-48 w-full object-cover"
          alt=""
          src={coverMedia?.data?.attributes?.url || Placeholder.src}
        />

        <div className="mb-2 text-sm text-foreground-body">
          <FormatDate value={publishedAt} valueType="ISO" />
        </div>
        <h3 className="mb-6 text-h5">
          <MLink href={link ?? ''} variant="basic" stretched className="line-clamp-2">
            {title}
          </MLink>
        </h3>
      </div>
      <ShowMoreLink href={link ?? ''} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default BlogPostCard
