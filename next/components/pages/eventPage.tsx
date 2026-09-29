import { useTranslation } from 'next-i18next/pages'

import EventDetails from '@/components/Molecules/EventDetails'
import { SectionContainer } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import EventCard from '@/modules/cards-and-rows/EventCard'
import MLink from '@/modules/common/MLink'
import { EventEntityFragment } from '@/services/graphql'
import { useGeneralContext } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface PageProps {
  event: EventEntityFragment
}

const EventPage = ({ event }: PageProps) => {
  const { t } = useTranslation()

  const { upcomingEvents } = useGeneralContext()
  const { breadcrumbs, getPathForStrapiEntity } = useNavikronos()
  const { general } = useGeneralContext()

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <div className="py-16">
          <EventDetails event={event} />
        </div>
      </SectionContainer>
      <SectionContainer hasBorder>
        <div className="inline-flex w-full pt-10">
          <h2 className="text-h3">{t('eventPage.otherEvents')}</h2>
          <MLink
            href={getPathForStrapiEntity(general?.eventsPage) ?? '#'}
            title={t('eventPage.eventsAll')}
            className="ml-auto"
            hasIcon
          >
            {t('eventPage.eventsAll').toUpperCase()}
          </MLink>
        </div>
        <div>
          <div className="grid grid-cols-1 items-stretch gap-1 py-10 pt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
            {upcomingEvents.map((upcomingEvent) => {
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
              } = upcomingEvent ?? {}

              return upcomingEvent ? (
                <EventCard
                  title={title}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  slug={slug}
                  listingImage={listingImage}
                  coverImage={coverImage}
                  eventTags={eventTags?.filter(isDefined) ?? []}
                  eventCategory={eventCategory}
                  branch={branch}
                />
              ) : null
            })}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default EventPage
