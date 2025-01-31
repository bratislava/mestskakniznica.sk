import { useTranslation } from 'next-i18next'
import React from 'react'

import { SectionContainer } from '@/components/ui'
import NoticeCard from '@/modules/cards-and-rows/NoticeCard'
import Carousel from '@/modules/common/Carousel/Carousel'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { HomepageNewsSectionFragment, NoticeListingEntityFragment } from '@/services/graphql'
import { useNavikronos } from '@/utils/navikronos'

interface LibraryNewsProps {
  notices: NoticeListingEntityFragment[]
  newsSection: HomepageNewsSectionFragment
}

const SectionLibraryNews = ({ notices, newsSection }: LibraryNewsProps) => {
  const { t } = useTranslation('common')
  const { getPathForStrapiEntity } = useNavikronos()

  return (
    <SectionContainer hasBorder>
      <div className="relative flex w-full flex-col py-10">
        <h2 className="text-center text-h3 md:text-left">{newsSection.title}</h2>
        <Carousel
          listClassName="py-10 gap-4 lg:gap-8"
          itemClassName="w-10/12 max-w-[268px] md:max-w-[271px]"
          items={notices.map((notice) => ({
            element: <NoticeCard notice={notice} />,
            key: notice.id ?? undefined,
          }))}
          visibleItemsCount={4}
          shiftIndex={4}
          hideScrollbar={false}
        />
        <div className="top-12 right-0 flex justify-center pt-1 md:absolute md:w-fit">
          {newsSection?.redirectTo && (
            <ShowMoreLink href={getPathForStrapiEntity(newsSection?.redirectTo?.data) ?? '#'}>
              {t('sectionLibraryNews.libraryNewsAll')}
            </ShowMoreLink>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}

export default SectionLibraryNews
