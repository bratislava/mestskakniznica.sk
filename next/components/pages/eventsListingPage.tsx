import DropdownIcon from '@assets/images/dropdown.svg'
import {
  EventCardEntityFragment,
  EventFiltersInput,
  PageEntity,
} from '@bratislava/strapi-sdk-city-library'
import { LoadingSpinner, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import Button from '@modules/common/Button'
import { client } from '@utils/gql'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import { useEventsPaginated } from '../../hooks/useEventsPaginated'
import Section from '../AppLayout/Section'
import SectionPromos from '../HomePage/SectionPromos'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import EventFilters from '../Molecules/EventFilters'
import EventListingCard from '../Molecules/EventListingCard'
import { FilterModal } from '../Molecules/FilterModal'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

interface KeyTitlePair {
  key: string
  title: string
}

export interface PageProps {
  page: PageEntity
}

const Events = ({ page }: PageProps) => {
  const { t } = useTranslation('common')
  const { locale = 'sk' } = usePageWrapperContext()

  const { data: promotedEventsResponse, error: promotedEventsError } = useSWR(
    ['PromotedEvents', locale, 3],
    (_key, locale, limit) => client.PromotedEvents({ locale, limit })
  )
  const promotedEvents = promotedEventsResponse?.promotedEvents?.data ?? []

  const { data: eventPropertiesResponse, error: eventPropertiesError } = useSWR(
    ['EventsProperties', locale],
    (_key, locale) => client.EventProperties({ locale })
  )

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [activeFilters, setActiveFilters] = useState<EventFiltersInput | null>(null)
  const [upcomingActiveFilters, setUpcomingActiveFilters] = useState<EventFiltersInput | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false)
  const [bodyStyle, setBodyStyle] = useState('')

  // TODO show loading and error, add LoadMore button - check the hook for more useful variables
  const { setSize, filteredEvents, strapiMetaPagination, isLoadingMore, isLoadingInitialData } =
    useEventsPaginated({
      locale,
      filters: activeFilters || {},
      sort: 'dateFrom:desc',
    })

  const {
    setSize: upcomingSetSize,
    filteredEvents: upcomingFilteredEvents,
    strapiMetaPagination: upcomingStrapiMetaPagination,
    isLoadingInitialData: upcomingIsLoadingInitialData,
  } = useEventsPaginated({
    locale,
    filters: upcomingActiveFilters || {},
    sort: 'dateFrom:asc',
  })

  const toggleFilterModal = () => {
    if (openFilterModal) {
      document.body.style.overflow = bodyStyle
    } else {
      const originalStyle = window.getComputedStyle(document.body).overflow
      setBodyStyle(originalStyle)
      document.body.style.overflow = 'hidden'
    }
    setOpenFilterModal(!openFilterModal)
  }

  const onStartChange = (dates: Date | null) => {
    setStartDate(dates)
  }

  const onEndChange = (dates: Date | null) => {
    setEndDate(dates)
  }

  const tags = useMemo(() => {
    const eventTags = eventPropertiesResponse?.eventTags?.data ?? []
    const parsedTypes = eventTags.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
    }))
    return [{ key: '', title: t('eventType') }, ...parsedTypes]
  }, [eventPropertiesResponse?.eventTags?.data, t])

  const categories = useMemo(() => {
    const eventCategories = eventPropertiesResponse?.eventCategories?.data ?? []
    const parsedCategories = eventCategories.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
    }))
    return [{ key: '', title: t('eventCategory') }, ...parsedCategories]
  }, [eventPropertiesResponse?.eventCategories?.data, t])

  const localities = useMemo(() => {
    const eventLocalities = eventPropertiesResponse?.eventLocalities?.data ?? []
    const parsedLocalities = eventLocalities.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
    }))
    return [{ key: '', title: t('eventLocality') }, ...parsedLocalities]
  }, [eventPropertiesResponse?.eventLocalities?.data, t])

  const [selectedEventTags, setSelectedEventTags] = useState<KeyTitlePair | null>()
  const [selectedCategory, setSelectedCategory] = useState<KeyTitlePair | null>()
  const [selectedLocality, setSelectedLocality] = useState<KeyTitlePair | null>()

  const resetFilters = async () => {
    setStartDate(null)
    setEndDate(null)
    setSelectedEventTags(null)
    setSelectedCategory(null)
    setSelectedLocality(null)
    setActiveFilters(null)
    setUpcomingActiveFilters(null)
    openFilterModal && toggleFilterModal()
    filterEvents()
  }

  // combined filter for both queries
  function newEventFilter(): EventFiltersInput {
    const tmp = {} as EventFiltersInput
    if (selectedEventTags && selectedEventTags.title)
      tmp.eventTags = { title: { eq: selectedEventTags.title } }
    if (selectedCategory && selectedCategory.title)
      tmp.eventCategory = { title: { eq: selectedCategory.title } }
    // TODO put back with branch
    // if (selectedLocality && selectedLocality.title)
    //   tmp.eventLocality = { title: { eq: selectedLocality.title } }
    return tmp
  }

  // inclusive date range query
  function generateOrQuery(start: Date, end: Date) {
    return [
      { dateFrom: { between: [start.toISOString(), end.toISOString()] } },
      { dateTo: { between: [start.toISOString(), end.toISOString()] } },
      {
        and: [{ dateFrom: { lte: start.toISOString() } }, { dateTo: { gte: end.toISOString() } }],
      },
    ]
  }

  // dummy query
  function generateDummyQuery() {
    return [{ dateFrom: { lt: today.toISOString() } }, { dateFrom: { gt: today.toISOString() } }]
  }

  // generate query for upcoming events
  function generateUpcomingFilters(): void {
    const upcomingQuery = newEventFilter()

    let tempEndDate = new Date()
    let tempStartDate = new Date()
    // limit endDate
    if (endDate) {
      tempEndDate = new Date(endDate)
      tempEndDate.setDate(endDate.getDate() + 1)
      tempEndDate = tempEndDate >= today ? tempEndDate : today
    }
    // limit start date
    if (startDate) {
      tempStartDate = startDate >= today ? startDate : today
    }

    // default without filters
    if (!startDate && !endDate) {
      upcomingQuery.or = [
        { dateFrom: { gte: today.toISOString() } },
        { dateTo: { gte: today.toISOString() } },
      ]
    }

    // filtered startDate
    if (startDate && !endDate) {
      upcomingQuery.or = [
        { dateFrom: { gte: tempStartDate.toISOString() } },
        { dateTo: { gte: tempStartDate.toISOString() } },
      ]
    }

    // filtered endDate
    if (endDate && !startDate) {
      if (tempEndDate <= today) {
        upcomingQuery.and = generateDummyQuery()
      } else {
        upcomingQuery.or = generateOrQuery(today, tempEndDate)
      }
    }

    // filtered both
    if (startDate && endDate) {
      if (tempEndDate <= today && startDate <= today) {
        // dummy
        upcomingQuery.and = generateDummyQuery()
      } else {
        upcomingQuery.or = generateOrQuery(tempStartDate, tempEndDate)
      }
    }

    setUpcomingActiveFilters(upcomingQuery)
  }

  // generate query for archived events
  function generateArchivedFilters(): void {
    const archivedQuery = newEventFilter()

    let tempStartDate = new Date()
    let tempEndDate = new Date()
    // limit end date
    if (endDate) {
      tempEndDate = new Date(endDate)
      tempEndDate.setDate(endDate.getDate() + 1)
      tempEndDate = tempEndDate <= today ? tempEndDate : today
    }
    // limit start date
    if (startDate) {
      tempStartDate = startDate <= today ? startDate : today
    }

    // default without filters
    if (!startDate && !endDate) {
      archivedQuery.or = [
        { dateFrom: { lte: today.toISOString() } },
        { dateTo: { lte: today.toISOString() } },
      ]
    }

    // filtered startDate
    if (startDate && !endDate) {
      if (startDate >= today) {
        archivedQuery.and = generateDummyQuery()
      } else {
        archivedQuery.or = generateOrQuery(tempStartDate, today)
      }
    }

    // filtered endDate
    if (endDate && !startDate) {
      archivedQuery.or = [
        { dateFrom: { lte: tempEndDate.toISOString() } },
        { dateTo: { lte: tempEndDate.toISOString() } },
      ]
    }

    // filtered both
    if (startDate && endDate) {
      if (tempEndDate >= today && startDate >= today) {
        archivedQuery.and = generateDummyQuery()
      } else {
        archivedQuery.or = generateOrQuery(tempStartDate, tempEndDate)
      }
    }

    setActiveFilters(archivedQuery)
  }

  const filterEvents = async () => {
    // archived events
    generateArchivedFilters()
    // upcoming events
    generateUpcomingFilters()
  }

  useEffect(() => {
    console.log('onload')
    filterEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // TODO run only once

  const areThereAnyEvents = () => {
    return (
      filteredEvents?.length ||
      upcomingFilteredEvents?.length ||
      isLoadingInitialData ||
      upcomingIsLoadingInitialData
    )
  }

  const handlePageChange = async (page: number) => {
    setSize(page)
  }

  const handleUpcomingPageChange = async (page: number) => {
    upcomingSetSize(page)
  }

  // const handleEventSubscription = async () => {
  //   const res = await fetch(`/api/calendar-auth-link`)
  //   const data = await res.json()
  //   if (typeof window !== 'undefined') {
  //     window.open(data.authorizationUrl, '_blank')
  //   }
  // }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="pb-6 lg:pb-16">
          <h1 className="border-b border-border-dark pt-16 pb-4 text-h1 lg:border-none lg:pb-0">
            {t('eventsCalendar')}
          </h1>

          <div className="mt-4 lg:mt-6 lg:block lg:border lg:border-border-dark lg:p-6">
            {/* Mobile */}
            <div className="flex w-full items-center justify-between border border-border-dark p-4 lg:hidden">
              {/* TODO accessibility 'more content' */}
              <Button
                variant="unstyled"
                className="z-10 flex w-full items-center justify-between gap-y-5"
                onPress={toggleFilterModal}
              >
                {t('eventsFilter')}
                <DropdownIcon />
              </Button>
              {openFilterModal && (
                <FilterModal onClose={toggleFilterModal} title={t('eventsFilter')}>
                  <EventFilters
                    startDate={startDate}
                    endDate={endDate}
                    onStartChange={onStartChange}
                    onEndChange={onEndChange}
                    tags={tags}
                    categories={categories}
                    localities={localities}
                    selectedEventTags={selectedEventTags}
                    selectedCategory={selectedCategory}
                    selectedLocality={selectedLocality}
                    setSelectedEventTags={setSelectedEventTags}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedLocality={setSelectedLocality}
                  />
                  <div className="absolute bottom-0 flex w-full gap-x-3 p-3">
                    <Button variant="primary" className="w-1/2" onPress={filterEvents}>
                      {t('filterButton')}
                    </Button>
                    <Button variant="secondary" className="w-1/2" onPress={resetFilters}>
                      {t('reset_button')}
                    </Button>
                  </div>
                </FilterModal>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between">
                <h4 className="text-h4">{t('eventsFilter')}</h4>
              </div>
              <div className="mt-3 flex items-center gap-x-5">
                <EventFilters
                  startDate={startDate}
                  endDate={endDate}
                  onStartChange={onStartChange}
                  onEndChange={onEndChange}
                  tags={tags}
                  categories={categories}
                  localities={localities}
                  selectedEventTags={selectedEventTags}
                  selectedCategory={selectedCategory}
                  selectedLocality={selectedLocality}
                  setSelectedEventTags={setSelectedEventTags}
                  setSelectedCategory={setSelectedCategory}
                  setSelectedLocality={setSelectedLocality}
                />
              </div>
              <div className="mt-3 flex items-center justify-end gap-4">
                <Button variant="primary" onPress={filterEvents}>
                  {t('filterButton')}
                </Button>
                <Button variant="secondary" onPress={resetFilters}>
                  {t('reset_button')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {!activeFilters && (
          <Section>
            <div className="text-h3">{t('eventsPromoted')}</div>
            <div className="pb-10">
              <SectionPromos promos={promotedEvents} />
            </div>
          </Section>
        )}

        <div
          className={cx('py-6 lg:py-16', {
            'border-border-dark lg:border-b': filteredEvents?.length,
            block: upcomingFilteredEvents?.length,
            hidden: !upcomingFilteredEvents?.length,
          })}
        >
          <div className="text-h3">{t('eventsUpcoming')}</div>
          <div className="grid grid-cols-1 gap-y-4 pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
            {upcomingFilteredEvents?.map((event) => (
              <EventListingCard
                event={event as EventCardEntityFragment}
                key={event?.attributes?.slug}
              />
            ))}
          </div>
          <div className="flex justify-center pt-6 lg:justify-end">
            <Pagination
              value={upcomingStrapiMetaPagination?.page || 0}
              onChangeNumber={handleUpcomingPageChange}
              max={upcomingStrapiMetaPagination?.pageCount || 0}
              previousButtonAriaLabel={t('previousPage')}
              nextButtonAriaLabel={t('nextPage')}
              currentInputAriaLabel={t('currentPage')}
            />
          </div>
        </div>

        <div
          className={cx('py-6 lg:py-16 ', {
            block: filteredEvents?.length,
            hidden: !filteredEvents?.length,
          })}
        >
          <div className="text-h3">{t('eventsArchived')}</div>
          <div className="grid grid-cols-1 gap-y-4 pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
            {filteredEvents?.map((event) => (
              <EventListingCard
                event={event as EventCardEntityFragment}
                key={event?.attributes?.slug}
              />
            ))}
          </div>
          <div className="flex justify-center pt-6 lg:justify-end">
            {isLoadingInitialData || isLoadingMore ? (
              <LoadingSpinner size="small" />
            ) : (
              <Pagination
                value={strapiMetaPagination?.page || 0}
                onChangeNumber={handlePageChange}
                max={strapiMetaPagination?.pageCount || 0}
                previousButtonAriaLabel={t('previousPage')}
                nextButtonAriaLabel={t('nextPage')}
                currentInputAriaLabel={t('currentPage')}
              />
            )}
          </div>
        </div>

        {!areThereAnyEvents() && <div className="text-center text-h3">{t('eventsEmpty')}</div>}
        {/* <Banner
          onBannerClick={handleEventSubscription}
          title={t('eventsDontMiss')}
          description={t('eventsDontMissText')}
          buttonContent={t('eventsSubscribe')}
        /> */}
      </SectionContainer>
    </>
  )
}

export default Events
