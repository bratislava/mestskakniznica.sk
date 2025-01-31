import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

import EventRow from '@/modules/cards-and-rows/EventRow'

// TODO use same component as in NavMenu
const MobileLatestEvents = () => {
  const { upcomingEvents } = useGeneralContext()

  if (!upcomingEvents?.data.length) {
    return null
  }

  return (
    <ul className="mt-2 flex flex-col gap-y-3">
      {upcomingEvents.data.filter(isDefined).map((event, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <EventRow event={event} />
          </li>
        )
      })}
    </ul>
  )
}

export default MobileLatestEvents
