import EventRow from '@modules/common/EventRow'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

// TODO use same component as in NavMenu
const MobileLatestEvents = () => {
  const { upcomingEvents } = useGeneralContext()

  if (!upcomingEvents?.data.length) {
    return null
  }

  return (
    <ul className="mt-2 flex flex-col gap-y-3">
      {upcomingEvents.data
        .map((event) => event.attributes)
        .filter(isDefined)
        .map((event) => {
          return <EventRow event={event} />
        })}
    </ul>
  )
}

export default MobileLatestEvents
