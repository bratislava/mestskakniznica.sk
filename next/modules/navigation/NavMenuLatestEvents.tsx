import EventRow from '@modules/common/EventRow'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

const NavMenuLatestEvents = () => {
  const { upcomingEvents } = useGeneralContext()

  if (!upcomingEvents?.data.length) {
    return null
  }

  return (
    <ul className="mt-2 grid grid-flow-col grid-rows-2 gap-x-5 gap-y-3">
      {upcomingEvents.data.filter(isDefined).map((event) => {
        return (
          <NavigationMenu.Link asChild key={event.id}>
            <EventRow event={event} />
          </NavigationMenu.Link>
        )
      })}
    </ul>
  )
}

export default NavMenuLatestEvents
