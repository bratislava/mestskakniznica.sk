import { Link, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import EventCard from '@modules/cards-and-rows/EventCard'
import { EventEntityFragment } from '@services/graphql'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'
import EventDetails from 'components/Molecules/EventDetails'
import { useTranslation } from 'next-i18next'

export interface PageProps {
  event: EventEntityFragment
}

const EventPage = ({ event }: PageProps) => {
  const { t } = useTranslation(['common', 'homepage'])

  const { upcomingEvents } = useGeneralContext()
  const { getBreadcrumbs, getPathForEntity, getEntityForStrapiEntity } = useNavikronos()
  const breadcrumbs = getBreadcrumbs(event.attributes?.title)
  const { general } = useGeneralContext()
  console.log(test(general?.data?.attributes?.eventsPage?.data))

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
        <div>
          <div className="grid grid-cols-1 items-stretch gap-1 py-10 pt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
            {upcomingEvents?.data.map((upcomingEvent) => {
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
              } = upcomingEvent.attributes ?? {}
              return upcomingEvent.attributes ? (
                <EventCard
                  title={title}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  slug={slug}
                  listingImage={listingImage?.data?.attributes}
                  coverImage={coverImage?.data?.attributes}
                  eventTags={eventTags?.data
                    .map((eventTagEntity) => eventTagEntity.attributes)
                    .filter(isDefined)}
                  eventCategory={eventCategory?.data?.attributes}
                  branch={branch?.data?.attributes}
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
