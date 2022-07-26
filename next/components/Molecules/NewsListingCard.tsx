import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { IEvent } from '../../utils/types'
import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import { PageEntity } from '../../graphql'

interface NewsProps {
  event: PageEntity
}

function NewsListingCard({ event }: NewsProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <Link href={event.attributes?.slug ?? ''} passHref>
      <a
        href={event.attributes?.slug ?? ''}
        className="relative flex h-full w-full flex-shrink-0 flex-col justify-between"
      >
        <div className="flex h-full flex-col">
          <img
            className="h-48 w-full object-cover"
            alt={
              event.attributes?.listingImage?.data?.attributes?.alternativeText ||
              `Cover for ${event.attributes?.title}`
            }
            src={event.attributes?.listingImage?.data?.attributes?.url}
          />

          <div className="pt-3 text-sm">
            {formatDateToLocal(
              event.attributes?.date_added ? event.attributes?.date_added : '',
              locale
            )}
          </div>
          <div className="text-black justify-end text-default hover:underline">
            {event.attributes?.title}
          </div>
        </div>
        <div className="text-black bottom-0 justify-end pt-5 text-base uppercase hover:underline">
          {t('showMore')} {'>'}
        </div>
      </a>
    </Link>
  )
}

export default NewsListingCard
