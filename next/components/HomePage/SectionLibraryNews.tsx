import {
  ComponentHomepageNewsSection,
  PageEntityFragment,
} from '@bratislava/strapi-sdk-city-library'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

import ListingCard from '../Molecules/ListingCard'

interface LibraryNewsProps {
  news: PageEntityFragment[]
  newsSection: ComponentHomepageNewsSection
}

export default function SectionLibraryNews({ news, newsSection }: LibraryNewsProps) {
  const { t } = useTranslation('homepage')
  return (
    <div className="relative flex flex-col space-y-12 py-12">
      <h2 className="text-center text-h3 md:text-left">{newsSection.title}</h2>
      <div className="-mx-4 overflow-x-auto">
        <div className="flex w-fit gap-4 px-4 py-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {news.map((page) => (
            <ListingCard key={page.id} card={page} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <ShowMoreLink href={newsSection?.redirectTo?.data?.attributes?.slug ?? '#'}>
          {t('libraryNewsAll')}
        </ShowMoreLink>
      </div>
    </div>
  )
}
