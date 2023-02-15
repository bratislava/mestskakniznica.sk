import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import FormatDate from '@modules/formatting/FormatDate'
import { EventCardEntityFragment, NoticeListingEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { useNavikronos } from '@utils/navikronos'

interface IListingCardProps {
  card: EventCardEntityFragment | NoticeListingEntityFragment
}

const ListingCard = ({ card }: IListingCardProps) => {
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  const { image, link, date } = useMemo(() => {
    if (card.__typename === 'EventEntity') {
      return {
        image: card.attributes?.listingImage?.data,
        link: getPathForEntity({ type: 'event', slug: card?.attributes?.slug }),
        date: card.attributes?.dateFrom,
      }
    }
    if (card.__typename === 'NoticeEntity') {
      return {
        image: card.attributes?.listingImage?.data[0],
        link: getPathForEntity({ type: 'notice', slug: card.attributes?.slug }),
        date: card.attributes?.publishedAt,
      }
    }
    return { image: null, link: null, date: null }
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
        <MLink href={link ?? ''} variant="basic" stretched className="mb-6 text-h5">
          {card.attributes?.title}
        </MLink>
      </div>
      <ShowMoreLink href={link ?? ''} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default ListingCard
