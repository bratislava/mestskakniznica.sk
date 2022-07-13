import { ComponentHomepageNewsSection } from '@bratislava/strapi-sdk-city-library'
import { Link } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'

import { IEvent } from '../../utils/types'
import NewsListing from '../Molecules/NewsListingCard'

interface LibraryNewsProps {
  news: IEvent[]
  newsSection: ComponentHomepageNewsSection
}

export default function SectionLibraryNews({ news, newsSection }: LibraryNewsProps) {
  const { t } = useTranslation('homepage')
  return (
    <div className="relative flex flex-col space-y-12 py-12">
      <h2 className="text-lg text-center md:text-left">{newsSection.title}</h2>
      <div className="overflow-x-auto -mx-4">
        <div className="w-fit px-4 flex sm:grid sm:grid-cols-2 py-10 gap-4 lg:gap-8 md:grid-cols-3 xl:grid-cols-4">
          {news?.map((singleNews) => (
            <NewsListing event={singleNews} key={singleNews.slug} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={newsSection?.redirectTo?.data?.attributes?.slug ?? '#'}
          hasIcon
          title={t('libraryNewsAll')}
          size="large"
        >
          {t('libraryNewsAll')}
        </Link>
      </div>
    </div>
  )
}
