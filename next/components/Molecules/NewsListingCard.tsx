import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { IEvent } from '../../utils/types'
import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface NewsProps {
  event: IEvent
}

function NewsListingCard({ event }: NewsProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <Link href={event.slug || ''} passHref>
      <a href={event.slug} className="relative w-full flex-shrink-0 h-full flex flex-col justify-between">
        <div className="h-full flex flex-col">
          <img
            className="w-full h-48 object-cover"
            alt={event.listingImage?.alternativeText || `Cover for ${event.eventTitle}`}
            src={event.listingImage?.url}
          />

          <div className="text-sm pt-3">
            {formatDateToLocal(event.date_added ? event.date_added : event.dateFrom ? event.dateFrom : '', locale)}
          </div>
          <div className="text-black justify-end text-default hover:underline">{event.eventTitle}</div>
        </div>
        <div className="text-black pt-5 justify-end uppercase text-base bottom-0 hover:underline">
          {t('showMore')} {'>'}
        </div>
      </a>
    </Link>
  )
}

export default NewsListingCard
