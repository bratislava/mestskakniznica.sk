import { Link, SectionContainer } from '@bratislava/ui-city-library'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Section from '../AppLayout/Section'
import ListingCard from '../Molecules/ListingCard'
import PageBreadcrumbs, { BreadcrumbsProps } from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'
import {
  PageEntity,
  EventCardEntityFragment,
  EventEntity,
  EventEntityFragment,
} from '../../graphql'

export interface PageProps {
  event: EventEntityFragment
  events: EventCardEntityFragment[]
  allNewsLink: string
  locale?: string
}

function EventPage({ locale, event, events, allNewsLink }: PageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  const [breadCrumbs, setBreadcrumbs] = useState<BreadcrumbsProps['crumbs']>([])

  useEffect(() => {
    if (locale === 'sk') {
      setBreadcrumbs([
        { title: '', url: '/' },
        { title: 'Zažite', url: '/zazite' },
        { title: 'Podujatia', url: '/zazite/podujatia' },
        { title: event.attributes?.title || '', url: event.attributes?.slug || '' },
      ])
    } else {
      setBreadcrumbs([
        { title: '', url: '/' },
        { title: 'Experience', url: '/experience' },
        { title: 'Events', url: '/experience/events' },
        { title: event.attributes?.title || '', url: event.attributes?.slug || '' },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* <SectionContainer>
        <PageBreadcrumbs page={page} breadCrumbs={breadCrumbs} />
      </SectionContainer> */}
      <SectionContainer>
        <div className="pt-16 pb-16">
          <EventDetails event={event} />
        </div>
        <Section>
          <div className="inline-flex w-full pt-10">
            <h2 className="text-lg">{t('otherEvents')}</h2>
            <Link
              href={allNewsLink}
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
              {events.map((event) => (
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
