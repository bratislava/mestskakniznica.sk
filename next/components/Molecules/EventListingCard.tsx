import MLink from '@modules/common/MLink'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import { useTranslation } from 'next-i18next'

import Placeholder from '../../assets/images/event-list-placeholder.jpg'
import { EventInListingMeili } from '../../backend/meili/meiliTypes'
import TagsDisplay from '../Atoms/TagsDisplay'

interface EventListingProps {
  event: EventInListingMeili
}

const EventListingCard = ({ event }: EventListingProps) => {
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
  } = event ?? {}

  return (
    // TODO refactor link to meet html validation standards

    <div className="relative">
      <img
        className="h-[200px] w-full flex-1 object-cover"
        alt={t('eventDetailImagePlaceholder')}
        src={listingImage?.url || coverImage?.url || Placeholder.src}
        height="200px"
      />

      <div className="flex pt-4 text-sm">
        <TagsDisplay
          tags={eventTags?.map((attributes) => ({ attributes }))}
          category={eventCategory?.title || ''}
          tagsCount={2}
        />
      </div>

      <div className="justify-end pt-2 text-h5 line-clamp-3">
        <MLink variant="basic" stretched href={`${t('event_slug')}${slug ?? ''}`}>
          {title}
        </MLink>
      </div>
      <div className="pt-2 text-sm text-foreground-body">
        <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
      </div>
      {branch?.title && (
        <div className="pt-2 text-sm text-foreground-body">&#9679; {branch.title}</div>
      )}
    </div>
  )
}

export default EventListingCard
