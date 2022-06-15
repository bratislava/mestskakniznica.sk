import React from 'react'

import { IEvent } from '../../utils/types'
import AnnouncementCard from './Promos/AnnouncementCard'
import EventCard from './Promos/EventCard'

interface SectionPromosProps {
  events: IEvent[]
}

function SectionPromos({ events }: SectionPromosProps) {
  return (
    <section className="overflow-x-auto -mx-4">
      <div className="w-fit px-4 flex sm:grid sm:grid-cols-2 py-10 gap-4 lg:gap-8 lg:grid-cols-3 h-auto">
        {events?.map((event) => {
          switch (event.eventCustomType) {
            case 'event':
              return (
                <div className="w-[80vw] sm:w-full flex-shrink-0">
                  <EventCard
                    key={event.slug}
                    dateFrom={event.dateFrom}
                    dateTo={event.dateTo}
                    eventTitle={event.eventTitle}
                    listingImage={event.listingImage}
                    eventTags={event.eventTags}
                    slug={event.slug}
                    eventLocality={event.eventLocality}
                    eventCategory={event.eventCategory}
                    eventType={event.eventType}
                    eventCustomType={event.eventCustomType}
                  />
                </div>
              )

            case 'news':
            case 'announcement':
              return (
                <div className="w-[80vw] sm:w-full flex-shrink-0">
                  <AnnouncementCard key={event.slug} title={event.eventTitle || ''} slug={event.slug || ''} />
                </div>
              )

            default:
              return null
              break
          }
        })}
      </div>
    </section>
  )
}

export default SectionPromos
