import EventDetailsDateBox from '@components/Atoms/EventDetailsDateBox'
import { EventCardEntityFragment } from '@services/graphql'
import React from 'react'

import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import { useNavikronos } from '@/utils/navikronos'

type EventRowProps = { event: EventCardEntityFragment }

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1566%3A19420&t=HeHnRSNxyY2Meuli-0
 *
 * Only the variant in the navigation is implemented.
 * Events navigation Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1309%3A24039&t=HeHnRSNxyY2Meuli-0
 */
const EventRow = ({ event }: EventRowProps) => {
  const { getPathForEntity } = useNavikronos()

  if (!event.attributes) {
    return null
  }

  const { branch, dateFrom, dateTo, slug, title } = event.attributes

  const eventBranchTitle = branch?.data?.attributes?.title

  return (
    <CardWrapper className="relative flex items-center gap-x-5 py-[14px]">
      <div className="flex h-16 w-16 shrink-0 bg-promo-yellow text-center">
        <EventDetailsDateBox dateFrom={dateFrom} dateTo={dateTo} textClassname="text-[18px]" />
      </div>
      <div className="flex flex-col justify-center gap-y-[5px]">
        <MLink
          className="text-h6 line-clamp-1"
          href={getPathForEntity({ type: 'event', slug }) ?? '#'}
          variant="basic"
          stretched
        >
          {title}
        </MLink>
        <div className="text-sm text-foreground-body">
          <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
          {eventBranchTitle && (
            <div className="flex gap-x-[10px]">
              <span className="text-dark">●</span>
              <span className="line-clamp-1">{eventBranchTitle}</span>
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  )
}

export default EventRow
