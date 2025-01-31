import { useTranslation } from 'next-i18next'
import React from 'react'

import { SectionContainer } from '@/components/ui'
import MLink from '@/modules/common/MLink'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { BookTagEntityFragment } from '@/services/graphql'

interface BookTagsProps {
  bookTags: BookTagEntityFragment[]
}

const BooksTags = ({ bookTags }: BookTagsProps) => {
  const { t } = useTranslation()
  return (
    <SectionContainer hasBorder>
      <h2 className="object-none pt-10 text-center text-h3">{t('booksTags.lookingForBook')}</h2>
      <div className="object-center">
        <div className="flex grow-0 flex-col items-center py-8 text-center">
          <div className="my-2 mx-0 flex grow-0 flex-row flex-wrap justify-center gap-4">
            {bookTags?.map((tag) =>
              tag.attributes?.slug ? (
                <MLink
                  href={`https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchTitle=${tag.attributes.slug}`}
                  target="_blank"
                  className="h-9 whitespace-nowrap rounded-full border border-border-light py-2 px-4 text-sm leading-tag hover:border-border-dark"
                  rel="noreferrer"
                  key={tag.attributes.slug}
                >
                  {tag.attributes.displayName}
                </MLink>
              ) : null
            )}
          </div>
        </div>
        <div className="pb-8 text-center">
          <ShowMoreLink
            target="_blank"
            href="https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchTitle"
            rel="noreferrer"
          >
            {t('booksTags.lookingForBookSearch')}
          </ShowMoreLink>
        </div>
      </div>
    </SectionContainer>
  )
}
export default BooksTags
