import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import { EventCardEntityFragment, PageEntityFragment } from '../../graphql'

interface IListingCardProps {
  card: PageEntityFragment | EventCardEntityFragment
}

function ListingCard({ card }: IListingCardProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <Link href={card.attributes?.slug ?? ''} passHref>
      <a
        href={card.attributes?.slug ?? ''}
        className="relative flex h-full w-full flex-shrink-0 flex-col justify-between"
      >
        <div className="flex h-full flex-col">
          <img
            className="h-48 w-full object-cover"
            alt={
              card.attributes?.listingImage?.data?.attributes?.alternativeText ||
              `Cover for ${card.attributes?.title}`
            }
            src={card.attributes?.listingImage?.data?.attributes?.url}
          />

          <div className="pt-3 text-sm">
            {formatDateToLocal(
              card.attributes?.date_added
                ? card.attributes?.date_added
                : card.attributes?.publishedAt,
              locale
            )}
          </div>
          <div className="text-black justify-end text-default hover:underline">
            {card.attributes?.title}
          </div>
        </div>
        <div className="text-black bottom-0 justify-end pt-5 text-base uppercase hover:underline">
          {t('showMore')} {'>'}
        </div>
      </a>
    </Link>
  )
}

export default ListingCard
