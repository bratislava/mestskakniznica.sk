import Link from 'next/link'

import { IEvent } from '../../utils/types'
import { dateTimeString } from '../../utils/utils'
import TagsDisplay from '../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface EventListingProps {
  event: IEvent
}

function EventListingCard({ event }: EventListingProps) {
  const { locale } = usePageWrapperContext()

  return (
    <Link key={event.slug} href={event.slug || ''} passHref>
      <a className="m-auto cursor-pointer h-[360px] w-full">
        <div className="w-full">
          <img
            className="flex-1 h-[200px] w-full object-cover"
            alt={event.listingImage?.alternativeText || 'Event card'}
            src={event.listingImage?.url}
            height="200px"
          />

          <div className="flex pt-4 text-xs">
            <TagsDisplay tags={event.eventTags} category={event.eventCategory?.attributes?.title || ''} tagsCount={2} />
          </div>

          <div className="text-default pt-2 justify-end hover:underline">{event.eventTitle}</div>
          <div className="text-xs text-gray-600 pt-2">
            {dateTimeString(event.dateFrom || '', event.dateTo || '', locale)}
          </div>
          {event.eventLocality?.attributes?.title && (
            <div className="text-xs text-gray-600 pt-2">&#9679; {event.eventLocality.attributes.title}</div>
          )}
        </div>
      </a>
    </Link>
  )
}

export default EventListingCard
