import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

import EventRow from '@/modules/cards-and-rows/EventRow'

const NavMenuLatestEvents = () => {
  const { upcomingEvents } = useGeneralContext()

  if (!upcomingEvents?.data.length) {
    return null
  }

  return (
    <ul className="mt-2 grid grid-flow-col grid-rows-2 gap-x-5 gap-y-3">
      {upcomingEvents.data.filter(isDefined).map((event, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <NavigationMenu.Link asChild>
              <EventRow event={event} />
            </NavigationMenu.Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavMenuLatestEvents
