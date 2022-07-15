import { IEvent } from '../../utils/types'
import AnnouncementCard from './Promos/AnnouncementCard'
import EventCard from './Promos/EventCard'

interface SectionPromosProps {
  events: IEvent[]
}

function SectionPromos({ events }: SectionPromosProps) {
  return (
    <section className="-mx-4 overflow-x-auto">
      <div className="flex h-auto w-fit gap-4 px-4 py-10 lg:grid lg:grid-cols-3 lg:gap-8">
        {events?.map((event) => {
          switch (event.eventCustomType) {
            case 'event':
              return (
                <div
                  key={event.slug}
                  className="w-[80vw] flex-shrink-0 sm:w-[calc(50vw_-_24px)] lg:w-full"
                >
                  <EventCard
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
                <div
                  key={event?.slug}
                  className="w-[80vw] flex-shrink-0 sm:w-[calc(50vw_-_24px)] lg:w-full"
                >
                  <AnnouncementCard title={event?.eventTitle || ''} slug={event?.slug || ''} />
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
