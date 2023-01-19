import ShowMoreLink from '@modules/common/ShowMoreLink'
import { ComponentHomepageNewsSection, NoticeListingEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Carousel from '../Molecules/Carousel/Carousel'
import ListingCard from '../Molecules/ListingCard'

interface LibraryNewsProps {
  notices: NoticeListingEntityFragment[]
  newsSection: ComponentHomepageNewsSection
}

const SectionLibraryNews = ({ notices, newsSection }: LibraryNewsProps) => {
  const { t } = useTranslation('homepage')

  return (
    <div className="relative flex flex-col space-y-12 py-12">
      <h2 className="text-center text-h3 md:text-left">{newsSection.title}</h2>
      <Carousel
        listClassName="px-4 py-10 gap-4 lg:gap-8"
        itemClassName="w-10/12 max-w-[268px] md:max-w-[271px]"
        items={notices.map((notice) => ({
          element: <ListingCard card={notice} />,
          key: notice.id ?? undefined,
        }))}
        visibleItemsCount={4}
        shiftIndex={4}
      />
      <div className="flex justify-center">
        <ShowMoreLink href={newsSection?.redirectTo?.data?.attributes?.slug ?? '#'}>
          {t('libraryNewsAll')}
        </ShowMoreLink>
      </div>
    </div>
  )
}

export default SectionLibraryNews
