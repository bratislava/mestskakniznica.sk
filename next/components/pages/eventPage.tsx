import { EventCardFragment, PageEntity } from '@bratislava/strapi-sdk-city-library'
import { Link, SectionContainer } from '@bratislava/ui-city-library'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'
import { convertEventToPromotedType, convertPageToEventDisplay } from '../../utils/utils'
import Section from "../AppLayout/Section"
import NewsListingCard from "../Molecules/NewsListingCard"
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface PageProps {
  page: PageEntity
  eventDetail: EventCardFragment
  events: EventCardFragment[]
  allNewsLink: string
}

function EventPage({ page, events, allNewsLink, eventDetail }: PageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  const event = convertPageToEventDisplay(page)

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
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
