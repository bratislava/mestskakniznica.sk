import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import FormatDate from '@modules/formatting/FormatDate'
import { EventCardEntityFragment, NoticeListingEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

interface IListingCardProps {
  card: EventCardEntityFragment | NoticeListingEntityFragment
}

const ListingCard = ({ card }: IListingCardProps) => {
  const { t } = useTranslation('common')

  const { image, linkPrefix, date } = useMemo(() => {
    if (card.__typename === 'EventEntity') {
      return {
        image: card.attributes?.listingImage?.data,
        linkPrefix: t('event_slug'),
        date: card.attributes?.dateFrom,
      }
    }
    if (card.__typename === 'NoticeEntity') {
      return {
        image: card.attributes?.listingImage?.data[0],
        linkPrefix: t('notice_slug'),
        date: card.attributes?.publishedAt,
      }
    }
    return { image: null, linkPrefix: null, date: null }
  }, [card, t])

  return (
    <div className="group/showMore relative flex h-full w-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        {/* TODO: Replace with MImage */}
        {image && (
          <img
            className="mb-4 h-48 w-full object-cover"
            alt={t('coverImageFor', { title: card.attributes?.title })}
            src={image.attributes?.url}
          />
        )}

        <div className="mb-2 text-sm text-foreground-body">
          <FormatDate value={date} valueType="ISO" />
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
