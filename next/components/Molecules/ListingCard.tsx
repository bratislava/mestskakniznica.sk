import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'

import { EventCardEntityFragment, PageEntityFragment } from '../../graphql'
import { formatDateToLocal } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface IListingCardProps {
  card: PageEntityFragment | EventCardEntityFragment
}

const ListingCard = ({ card }: IListingCardProps) => {
  const { t, i18n } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <MLink
      href={card.attributes?.slug ?? ''}
      className="relative flex h-full w-full shrink-0 flex-col justify-between"
    >
      <div className="flex h-full flex-col">
        <img
          className="h-48 w-full object-cover"
          alt={t('coverImageFor', { title: card.attributes?.title })}
          src={card.attributes?.listingImage?.data?.attributes?.url}
        />

        <div className="pt-3 text-base">
          {card.__typename === 'EventEntity'
            ? formatDateToLocal(card.attributes?.dateFrom, locale || i18n.language)
            : formatDateToLocal(
                card.attributes?.date_added
                  ? card.attributes?.date_added
                  : card.attributes?.publishedAt,
                locale || i18n.language
              )}
        </div>
        <div className="justify-end text-h5 text-black hover:underline">
          {card.attributes?.title}
        </div>
      </div>
      <div className="bottom-0 justify-end pt-5 text-base uppercase text-black hover:underline">
        {t('showMore')} {'>'}
      </div>
    </MLink>
  )
}

export default ListingCard
