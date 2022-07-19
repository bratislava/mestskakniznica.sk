import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { Link, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import { IEvent } from '../../utils/types'
import { convertPageToEventDisplay } from '../../utils/utils'
import Section from "../AppLayout/Section"
import NewsListingCard from "../Molecules/NewsListingCard"
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface PageProps {
  page: PageEntity
  events: IEvent[]
  allNewsLink: string
}

function EventPage({ page, events, allNewsLink }: PageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  const event = convertPageToEventDisplay(page)

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="pt-16 pb-16">{page?.attributes?.sections && <Sections sections={page?.attributes?.sections} events={[event]} />}</div>
        <Section>
          <div className="inline-flex pt-10 w-full">
            <h2 className="text-lg">{t('otherEvents')}</h2>
            <Link href={allNewsLink} hasIcon title={t('eventsAll')} size="large" className="ml-auto">
              {t('eventsAll')}
            </Link>
          </div>
          <section>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 md:grid-cols-4">
              {events.map((event) => (
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
