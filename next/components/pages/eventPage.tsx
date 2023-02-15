import { Link, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import { EventEntityFragment } from '@services/graphql'
import { useGeneralContext } from '@utils/generalContext'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'

import Section from '../AppLayout/Section'
import ListingCard from '../Molecules/ListingCard'
import { useNavikronos } from '@utils/navikronos'

export interface PageProps {
  event: EventEntityFragment
}

const EventPage = ({ event }: PageProps) => {
  const { t, i18n } = useTranslation(['common', 'homepage'])

  const { upcomingEvents } = useGeneralContext()
  const { getBreadcrumbs } = useNavikronos()
  const breadcrumbs = getBreadcrumbs(event.attributes?.title)

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <div className="py-16">
          <EventDetails event={event} />
        </div>
        <Section>
          <div className="inline-flex w-full pt-10">
            <h2 className="text-h3">{t('otherEvents')}</h2>
            <Link
              // TODO: Navikronos
              href={t('event_slug')}
              hasIcon
              title={t('eventsAll')}
              size="large"
              className="ml-auto"
            >
              {t('eventsAll')}
            </Link>
          </div>
          <section>
            <div className="grid grid-cols-1 items-stretch gap-1 py-10 pt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
              {upcomingEvents?.data.map((upcomingEvent) => {
                return <ListingCard card={upcomingEvent} key={upcomingEvent.attributes?.slug} />
              })}
            </div>
          </section>
        </Section>
      </SectionContainer>
    </>
  )
}

export default EventPage
