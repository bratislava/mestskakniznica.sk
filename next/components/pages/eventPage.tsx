import { EventCardFragment, PageEntity } from '@bratislava/strapi-sdk-city-library'
import { Link, SectionContainer } from '@bratislava/ui-city-library'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'
import { convertEventToPromotedType, convertPageToEventDisplay } from '../../utils/utils'
import { useEffect, useState } from 'react'
import Section from "../AppLayout/Section"
import NewsListingCard from "../Molecules/NewsListingCard"
import PageBreadcrumbs, { BreadcrumbsProps } from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface PageProps {
  page: PageEntity
  eventDetail: EventCardFragment
  events: EventCardFragment[]
  allNewsLink: string
  locale?: string
}

function EventPage({ page, events, allNewsLink, locale, eventDetail }: PageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  const event = convertPageToEventDisplay(page)
  const [breadCrumbs, setBreadcrumbs] = useState<BreadcrumbsProps['crumbs']>([])

  useEffect(() => {
    if(locale === "sk") {
      setBreadcrumbs([
        {title: "", url: "/"},
        {title: "Zažite", url: "/zazite"},
        {title: "Podujatia", url: "/zazite/podujatia"},
        {title: eventDetail.attributes?.title || '', url: eventDetail.attributes?.slug || ''}
      ])
    } else {
      setBreadcrumbs([
        {title: "", url: "/"},
        {title: "Experience", url: "/experience"},
        {title: "Events", url: "/experience/events"},
        {title: eventDetail.attributes?.title || '', url: eventDetail.attributes?.slug || ''}
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} breadCrumbs={breadCrumbs} />
      </SectionContainer>
      <SectionContainer>
        <div className="pt-16 pb-16">
          <EventDetails eventDetails={eventDetail} />
        </div>
        <Section>
          <div className="inline-flex pt-10 w-full">
            <h2 className="text-lg">{t('otherEvents')}</h2>
            <Link href={allNewsLink} hasIcon title={t('eventsAll')} size="large" className="ml-auto">
              {t('eventsAll')}
            </Link>
          </div>
          <section>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 md:grid-cols-4">
              {convertEventToPromotedType(events).map((event) => (
                <NewsListingCard event={event} key={event.slug} />
              ))}
            </div>
          </section>
        </Section>
      </SectionContainer>
    </>
  )
}

export default EventPage
