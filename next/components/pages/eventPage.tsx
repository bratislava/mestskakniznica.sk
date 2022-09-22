import { Link, SectionContainer } from '@bratislava/ui-city-library'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'
import Section from '../AppLayout/Section'
import ListingCard from '../Molecules/ListingCard'
import { EventEntityFragment } from '../../graphql'
import Breadcrumbs from 'components/Molecules/Breadcrumbs'
import { useUpcomingEvents } from 'hooks/useUpcomingEvets'

export interface PageProps {
  event: EventEntityFragment
}

function EventPage({ event }: PageProps) {
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
        <div className="pt-16 pb-16">
          <EventDetails event={event} />
        </div>
        <Section>
          <div className="inline-flex w-full pt-10">
            <h2 className="text-lg">{t('otherEvents')}</h2>
            <Link
              href={t('eventsAllSlug')}
              hasIcon
              title={t('eventsAll')}
              size="large"
              className="ml-auto"
            >
              {t('eventsAll')}
            </Link>
          </div>
          <section>
            <div className="grid grid-cols-1 items-stretch gap-1 py-10 pt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:grid-cols-4 lg:gap-10">
              {upcomingEvents?.map((event) => (
                <ListingCard card={event} key={event.attributes?.slug} />
              ))}
            </div>
          </section>
        </Section>
      </SectionContainer>
    </>
  )
}

export default EventPage
