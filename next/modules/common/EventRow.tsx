import { EventCardAttributesFragment } from '@bratislava/strapi-sdk-city-library'
import EventDetailsDateBox from '@components/Atoms/EventDetailsDateBox'
import MLink from '@modules/common/MLink'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import { useTranslation } from 'next-i18next'
import React from 'react'

type EventRowProps = { event: EventCardAttributesFragment }

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1566%3A19420&t=HeHnRSNxyY2Meuli-0
 *
 * Only the variant in the navigation is implemented.
 * Events navigation Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1309%3A24039&t=HeHnRSNxyY2Meuli-0
 */
const EventRow = ({ event }: EventRowProps) => {
  const { t } = useTranslation('common')

  const eventBranchTitle = event?.branch?.data?.attributes?.title

  return (
    <li className="relative flex items-center gap-x-5 py-[14px]">
      <div className="flex h-16 w-16 shrink-0 bg-promo-yellow text-center">
        <EventDetailsDateBox
          dateFrom={event.dateFrom}
          dateTo={event.dateTo}
          textClassname="text-[18px]"
        />
      </div>
      <div className="flex flex-col justify-center gap-y-[5px]">
        <MLink
          className="text-h6 line-clamp-1"
          href={`${t('event_slug')}${event.slug}`}
          variant="basic"
          stretched
        >
          {event.title}
        </MLink>
        <div className="text-sm text-foreground-body">
          <FormatEventDateRange dateFrom={event.dateFrom} dateTo={event.dateTo} />
          {eventBranchTitle && (
            <div className="flex gap-x-[10px]">
              <span className="text-dark">●</span>
              <span className="line-clamp-1">{eventBranchTitle}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default EventRow
