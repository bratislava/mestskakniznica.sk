import Section from '@components/AppLayout/Section'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { ComponentHomepageNewsSection, NoticeListingEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Carousel from '../../modules/common/Carousel/Carousel'
import NoticeCard from '../Molecules/NoticeCard'

interface LibraryNewsProps {
  notices: NoticeListingEntityFragment[]
  newsSection: ComponentHomepageNewsSection
}

const SectionLibraryNews = ({ notices, newsSection }: LibraryNewsProps) => {
  const { t } = useTranslation('homepage')
  const { getPathForEntity } = useNavikronos()
  const showMoreId = newsSection?.redirectTo?.data?.id

  return (
    <Section>
      <section className="relative flex w-full flex-col py-10">
        <h2 className="text-center text-h3 md:text-left">{newsSection.title}</h2>
        <div className="w-full px-4 lg:px-0">
          <Carousel
            listClassName="py-10 gap-4 lg:gap-8"
            itemClassName="w-10/12 max-w-[268px] md:max-w-[271px]"
            items={notices.map((notice) => ({
              element: <NoticeCard card={notice} />,
              key: notice.id ?? undefined,
            }))}
            visibleItemsCount={4}
            shiftIndex={4}
            hideScrollbar={false}
          />
        </div>
        <div className="top-12 right-0 flex justify-center pt-1 md:absolute md:w-fit">
          {showMoreId && (
            <ShowMoreLink href={getPathForEntity({ type: 'page', id: showMoreId }) ?? ''}>
              {t('libraryNewsAll')}
            </ShowMoreLink>
          )}
        </div>
      </section>
    </Section>
  )
}

export default SectionLibraryNews
