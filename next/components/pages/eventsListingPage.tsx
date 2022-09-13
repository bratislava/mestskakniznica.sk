import DropdownIcon from '@assets/images/dropdown.svg'
import {
  EventCardEntityFragment,
  EventFiltersInput,
  PageEntity,
} from '@bratislava/strapi-sdk-city-library'
import { LoadingSpinner, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { client } from '@utils/gql'
import enUs from 'date-fns/locale/en-US'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useSWR from 'swr'
import { useEventsPaginated } from '../../hooks/useEventsPaginated'
import Section from '../AppLayout/Section'
import SectionPromos from '../HomePage/SectionPromos'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import EventFilters from '../Molecules/EventFilters'
import EventListingCard from '../Molecules/EventListingCard'
import { FilterModal } from '../Molecules/FilterModal'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import cx from 'classnames'

registerLocale('en', enUs)
registerLocale('sk', sk)

interface KeyTitlePair {
  key: string
  title: string
}
export interface PageProps {
  page: PageEntity
}

function Events({ page }: PageProps) {
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
  const {
    setSize,
    filteredEvents,
    strapiMetaPagination,
    isLoadingMore,
    isLoadingInitialData,
    isLoadingInitialData,
  } = useEventsPaginated({
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

  const filterEvents = async () => {
    const currentFilters: EventFiltersInput = {}
    if (startDate) {
      currentFilters['dateFrom'] = { between: [startDate.toISOString(), today.toISOString()] }
    } else {
      currentFilters['dateFrom'] = { lt: today.toISOString() }
    }
    if (endDate) {
      const tempDate = new Date(new Date().setDate(endDate.getDate() + 1)) // plus one day
      currentFilters['dateTo'] = { lte: tempDate.toISOString() }
    }
    if (selectedEventTags && selectedEventTags.title)
      currentFilters['eventTags'] = { title: { eq: selectedEventTags.title } }
    if (selectedCategory && selectedCategory.title)
      currentFilters['eventCategory'] = { title: { eq: selectedCategory.title } }
    if (selectedLocality && selectedLocality.title)
      currentFilters['eventLocality'] = { title: { eq: selectedLocality.title } }

    setActiveFilters(currentFilters)

    const upcomingFilters = { ...currentFilters }

    delete upcomingFilters['dateFrom']
    if (!startDate || startDate <= today) {
      upcomingFilters['dateFrom'] = { gte: today.toISOString() }
    } else {
      upcomingFilters['dateFrom'] = { gte: startDate.toISOString() }
    }

    setUpcomingActiveFilters(upcomingFilters)
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
          <h1 className="border-b border-gray-universal-100 pt-16 pb-4 text-md2 lg:border-none lg:pb-0 lg:text-2xl">
            {t('eventsCalendar')}
          </h1>

          <div className="mt-4 lg:mt-6 lg:block lg:border lg:border-gray-universal-100 lg:p-6">
            {/* Mobile */}
            <div className="flex w-full items-center justify-between border border-gray-universal-100 p-4 lg:hidden">
              <button
                className="z-10 flex w-full items-center justify-between gap-y-5"
                onClick={toggleFilterModal}
              >
                {t('eventsFilter')}
                <DropdownIcon />
              </button>
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
                    <button
                      className="base-button w-1/2 border border-gray-universal-100 bg-gray-universal-100 py-[9px] text-white"
                      onClick={filterEvents}
                    >
                      {t('filterButton')}
                    </button>
                    <button
                      className="base-button w-1/2 border border-gray-universal-100 bg-white py-[9px] text-gray-universal-100"
                      onClick={resetFilters}
                    >
                      {t('reset_button')}
                    </button>
                  </div>
                </FilterModal>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between">
                <h4 className="text-md">{t('eventsFilter')}</h4>
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
              <div className="mt-3 flex items-center justify-end">
                <button
                  className="base-button border border-gray-universal-100 bg-gray-900 bg-gray-universal-100 px-10 py-[9px] text-white"
                  onClick={filterEvents}
                >
                  {t('filterButton')}
                </button>
                <button
                  className="base-button ml-5 border border-gray-universal-100 bg-white px-10 py-[9px] text-gray-universal-100"
                  onClick={resetFilters}
                >
                  {t('reset_button')}
                </button>
              </div>
            </div>
          </div>
        </div>
        {!activeFilters && (
          <Section>
            <div className="text-md2">{t('eventsPromoted')}</div>
            <div className="pb-10">
              <SectionPromos promos={promotedEvents} />
            </div>
          </Section>
        )}

        <div
          className={cx('py-6 lg:py-16', {
            'border-gray-universal-100 lg:border-b': filteredEvents?.length,
            block: upcomingFilteredEvents?.length,
            hidden: !upcomingFilteredEvents?.length,
          })}
        >
          <div className="text-md2">{t('eventsUpcoming')}</div>
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
          <div className="text-md2">{t('eventsArchived')}</div>
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

        {!areThereAnyEvents() && <div className={'text-center text-md2'}>{t('eventsEmpty')}</div>}
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
