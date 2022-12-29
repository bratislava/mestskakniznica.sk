import { EventCardEntityFragment } from '@bratislava/strapi-sdk-city-library'
import FormatEventDateRange from '@modules/common/FormatEventDateRange'
import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'

import Placeholder from '../../assets/images/event-list-placeholder.jpg'
import TagsDisplay from '../Atoms/TagsDisplay'

interface EventListingProps {
  event: EventCardEntityFragment
}

const EventListingCard = ({ event: { attributes } }: EventListingProps) => {
  const { t } = useTranslation('common')

  return (
    // TODO refactor link to meet html validation standards
    <MLink href={attributes?.slug || ''} className="m-auto h-[360px] w-full cursor-pointer">
      <div className="w-full">
        <img
          className="h-[200px] w-full flex-1 object-cover"
          alt={t('eventDetailImagePlaceholder')}
          src={
            attributes?.listingImage?.data?.attributes?.url ||
            attributes?.coverImage?.data?.attributes?.url ||
            Placeholder.src
          }
          height="200px"
        />

        <div className="flex pt-4 text-sm">
          <TagsDisplay
            tags={attributes?.eventTags?.data}
            category={attributes?.eventCategory?.data?.attributes?.title || ''}
            tagsCount={2}
          />
        </div>

        <div className="justify-end pt-2 text-h5 hover:underline">{attributes?.title}</div>
        <div className="pt-2 text-sm text-foreground-body">
          <FormatEventDateRange dateFrom={attributes?.dateFrom} dateTo={attributes?.dateTo} />
        </div>
        {attributes?.eventLocality?.data?.attributes?.title && (
          <div className="pt-2 text-sm text-foreground-body">
            &#9679; {attributes?.eventLocality.data?.attributes.title}
          </div>
        )}
      </div>
    </MLink>
  )
}

export default EventListingCard
