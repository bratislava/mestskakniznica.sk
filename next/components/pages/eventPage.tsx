import { Link, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import { EventEntityFragment } from '@services/graphql'
import { useGeneralContext } from '@utils/generalContext'
import { useNavikronos } from '@utils/navikronos'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'

import Section from '../AppLayout/Section'
import ListingCard from '../Molecules/ListingCard'

export interface PageProps {
  event: EventEntityFragment
}

const EventPage = ({ event }: PageProps) => {
  const { t } = useTranslation(['common', 'homepage'])

  const { upcomingEvents } = useGeneralContext()
  const { getBreadcrumbs } = useNavikronos()
  const breadcrumbs = getBreadcrumbs(event.attributes?.title)
  const { general } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

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
              href={
                getPathForEntity({
                  type: 'page',
                  id: general?.data?.attributes?.eventsPage?.data?.id,
                }) ?? ''
              }
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
