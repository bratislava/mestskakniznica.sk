import FormatDate from '@modules/common/FormatDate'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { EventCardEntityFragment, PageEntityFragment } from '../../graphql'

interface IListingCardProps {
  card: PageEntityFragment | EventCardEntityFragment
}

const ListingCard = ({ card }: IListingCardProps) => {
  const { t } = useTranslation('common')

  const linkPrefix = card.__typename === 'EventEntity' ? t('event_slug') : ''

  return (
    <div className="group/showMore relative flex h-full w-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        <img
          className="h-48 w-full object-cover"
          alt={t('coverImageFor', { title: card.attributes?.title })}
          src={card.attributes?.listingImage?.data?.attributes?.url}
        />

        <div className="mt-4 mb-2 text-sm text-foreground-body">
          <FormatDate
            value={
              card.__typename === 'EventEntity'
                ? card.attributes?.dateFrom
                : card.attributes?.date_added ?? card.attributes?.publishedAt
            }
            valueType="ISO"
          />
        </div>
        <MLink
          href={`${linkPrefix}${card.attributes?.slug ?? ''}`}
          variant="basic"
          stretched
          className="mb-6 text-h5"
        >
          {card.attributes?.title}
        </MLink>
      </div>
      <ShowMoreLink href={`${linkPrefix}${card.attributes?.slug ?? ''}`} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default ListingCard
