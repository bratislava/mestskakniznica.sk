import { useTranslation } from 'next-i18next'
import React from 'react'

import { SectionContainer } from '@/components/ui'
import MLink from '@/modules/common/MLink'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { BookTagEntityFragment } from '@/services/graphql'
import { opacBaseUrl } from '@/utils/consts'

interface BookTagsProps {
  bookTags: BookTagEntityFragment[]
}

const BooksTags = ({ bookTags }: BookTagsProps) => {
  const { t } = useTranslation()

  return (
    <SectionContainer hasBorder>
      <h2 className="object-none pt-10 text-center text-h3">{t('booksTags.lookingForBook')}</h2>
      <div className="flex grow-0 flex-col items-center py-8 text-center">
        <div className="mx-0 my-2 flex grow-0 flex-row flex-wrap justify-center gap-4">
          {bookTags?.map((tag) =>
            tag.attributes?.slug ? (
              <MLink
                href={`${opacBaseUrl}?fn=searchform&extSrchTitle=${tag.attributes.slug}`}
                target="_blank"
                className="h-9 whitespace-nowrap rounded-full border border-border-light px-4 py-2 text-sm leading-tag hover:border-border-dark"
                rel="noreferrer"
                key={tag.attributes.slug}
              >
                {tag.attributes.displayName}
              </MLink>
            ) : null,
          )}
        </div>
      </div>
      <div className="pb-8 text-center">
        <ShowMoreLink
          target="_blank"
          href={`${opacBaseUrl}?fn=searchform&extSrchTitle`}
          rel="noreferrer"
        >
          {t('booksTags.lookingForBookSearch')}
        </ShowMoreLink>
      </div>
    </SectionContainer>
  )
}
export default BooksTags
