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

  const {
    title,
    dateFrom,
    dateTo,
    slug,
    listingImage,
    coverImage,
    eventTags,
    eventCategory,
    branch,
  } = attributes ?? {}

  const eventBranch = branch?.data?.attributes

  return (
    // TODO refactor link to meet html validation standards

    <div className="relative">
      <img
        className="h-[200px] w-full flex-1 object-cover"
        alt={t('eventDetailImagePlaceholder')}
        src={
          listingImage?.data?.attributes?.url ||
          coverImage?.data?.attributes?.url ||
          Placeholder.src
        }
        height="200px"
      />

      <div className="flex pt-4 text-sm">
        <TagsDisplay
          tags={eventTags?.data}
          category={eventCategory?.data?.attributes?.title || ''}
          tagsCount={2}
        />
      </div>

      <div className="justify-end pt-2 text-h5 line-clamp-3">
        <MLink
          variant="basic"
          className="after:absolute after:inset-0"
          href={`${t('event_slug')}${slug ?? ''}`}
        >
          {title}
        </MLink>
      </div>
      <div className="pt-2 text-sm text-foreground-body">
        <FormatEventDateRange dateFrom={attributes?.dateFrom} dateTo={attributes?.dateTo} />
      </div>
      {eventBranch?.title && (
        <div className="pt-2 text-sm text-foreground-body">&#9679; {eventBranch.title}</div>
      )}
    </div>
  )
}

export default EventListingCard
