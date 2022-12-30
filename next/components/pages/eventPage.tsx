import { Link, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from 'components/Molecules/Breadcrumbs'
import EventDetails from 'components/Molecules/EventDetails'
import { useUpcomingEvents } from 'hooks/useUpcomingEvets'
import { useTranslation } from 'next-i18next'

import { EventEntityFragment } from '../../graphql'
import Section from '../AppLayout/Section'
import ListingCard from '../Molecules/ListingCard'

export interface PageProps {
  event: EventEntityFragment
}

const EventPage = ({ event }: PageProps) => {
  const { t, i18n } = useTranslation(['common', 'homepage'])

  const { upcomingEvents } = useUpcomingEvents({ locale: i18n.language })

  const breadCrumbs =
    i18n.language === 'sk'
      ? [
          { title: '', url: '/' },
          { title: 'Zažite', url: '/zazite' },
          { title: 'Podujatia', url: '/zazite/podujatia' },
          { title: event.attributes?.title || '', url: event.attributes?.slug || '' },
        ]
      : [
          { title: '', url: '/' },
          { title: 'Experience', url: '/experience' },
          { title: 'Events', url: '/experience/events' },
          { title: event.attributes?.title || '', url: event.attributes?.slug || '' },
        ]

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadCrumbs} />
      </SectionContainer>
      <SectionContainer>
        <div className="py-16">
          <EventDetails event={event} />
        </div>
        <Section>
          <div className="inline-flex w-full pt-10">
            <h2 className="text-h3">{t('otherEvents')}</h2>
            <Link
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
              {upcomingEvents?.map((upcomingEvent) => {
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
