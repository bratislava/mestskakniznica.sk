import 'react-datepicker/dist/react-datepicker.css'

import CloseIcon from '@assets/images/close.svg'
import DropdownIcon from '@assets/images/dropdown.svg'
import { EventPropertiesQuery, PageFragment } from '@bratislava/strapi-sdk-city-library'
import { Accordion, Banner, Pagination, SectionContainer, Select } from '@bratislava/ui-city-library'
import enUs from 'date-fns/locale/en-US'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import { IEvent } from '../../utils/types'
import Section from "../AppLayout/Section"
import SectionPromos from "../HomePage/SectionPromos"
import { usePageWrapperContext } from '../layouts/PageWrapper'
import EventFilters from '../Molecules/EventFilters'
import EventListingCard from "../Molecules/EventListingCard"
import { FilterModal } from "../Molecules/FilterModal"
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"

registerLocale('en', enUs)
registerLocale('sk', sk)

interface KeyTitlePair {
  key: string
  title: string
}
export interface PageProps {
  page: PageFragment
  promotedEvents: IEvent[]
  events: IEvent[]
  eventCategories: NonNullable<EventPropertiesQuery['eventCategories']>
  eventTags: NonNullable<EventPropertiesQuery['eventTags']>
  eventLocalities: NonNullable<EventPropertiesQuery['eventLocalities']>
}

const MAX_EVENTS_PER_PAGE = 16

function Events({ page, promotedEvents, events, eventCategories, eventTags, eventLocalities }: PageProps) {
  const { t } = useTranslation('common')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(events)
  const [currentPage, setCurrentPage] = useState(1)
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [bodyStyle, setBodyStyle] = useState('')
  const { locale } = usePageWrapperContext()

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
    const defaultType = { key: '', title: t('eventType'), disabled: true }
    const parsedTypes = eventTags.map((type) => ({
      key: type?.id || '',
      title: type?.title || '',
    }))
    return [defaultType, ...parsedTypes]
  }, [eventTags])

  const categories = useMemo(() => {
    const defaultCategory = {
      key: '',
      title: t('eventCategory'),
      disabled: true,
    }
    const parsedCategories = eventCategories.map((cat) => ({
      key: cat?.id || '',
      title: cat?.title || '',
    }))
    return [defaultCategory, ...parsedCategories]
  }, [eventCategories])

  const localities = useMemo(() => {
    const defaultLocality = {
      key: '',
      title: t('eventLocality'),
      disabled: true,
    }
    const parsedLocalities = eventLocalities.map((loc) => ({
      key: loc?.id || '',
      title: loc?.title || '',
    }))
    return [defaultLocality, ...parsedLocalities]
  }, [eventLocalities])

  const [selectedEventTags, setSelectedEventTags] = useState<KeyTitlePair | null>()
  const [selectedCategory, setSelectedCategory] = useState<KeyTitlePair | null>()
  const [selectedLocality, setSelectedLocality] = useState<KeyTitlePair | null>()

  const resetFilters = () => {
    setStartDate(null)
    setEndDate(null)
    setSelectedEventTags(null)
    setSelectedCategory(null)
    setSelectedLocality(null)
    setFilteredEvents(events)
    openFilterModal && toggleFilterModal()
  }

  const filterEvents = () => {
    const filterDate = (event: IEvent) => {
      const filterFrom = startDate && startDate.getTime()
      const filterTo = endDate && endDate.getTime()
      const eventFrom = new Date(event?.dateFrom || '').setHours(0)
      const eventTo = new Date(event?.dateTo || '').setHours(0)

      // Complicated if to handle all possible date usecases
      if (filterFrom) {
        if (filterTo) {
          if (eventTo >= filterFrom && eventFrom <= filterTo) return event
        }
        // If NOT filterTO
        else if (eventFrom >= filterFrom || (filterFrom >= eventFrom && filterFrom <= eventTo)) return event
      } else {
        return event
      }
    }

    const filterType = (event: IEvent) => {
      if (selectedEventTags) return event.eventTags?.find((tag) => tag.id === selectedEventTags?.key)

      return event
    }

    const filterCategory = (event: IEvent) => {
      if (selectedCategory) return event.eventCategory?.id === selectedCategory?.key

      return event
    }

    const filterLocality = (event: IEvent) => {
      if (selectedLocality) return event.eventLocality?.id === selectedLocality?.key

      return event
    }

    // move to page 1 after filter change
    setCurrentPage(1)

    const eventsFiltered = events.filter(filterDate).filter(filterType).filter(filterCategory).filter(filterLocality)
    setFilteredEvents(eventsFiltered)
  }

  const filteredEventsPaginated = useMemo(() => filteredEvents.slice((currentPage - 1) * MAX_EVENTS_PER_PAGE, MAX_EVENTS_PER_PAGE * currentPage), [filteredEvents, currentPage])

  const pagesCount = useMemo(() => Math.ceil(filteredEvents.length / MAX_EVENTS_PER_PAGE), [filteredEvents])

  const handleEventSubscription = async () => {
    const res = await fetch(`/api/calendar-auth-link`)
    const data = await res.json()
    if (typeof window !== 'undefined') {
      window.open(data.authorizationUrl, '_blank')
    }
  }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="pb-6 lg:pb-16">
          <h1 className="pt-16 text-md2 lg:text-2xl pb-4 border-b border-gray-universal-100 lg:pb-0 lg:border-none">
            {t('eventsCalendar')}
          </h1>

          <div className="lg:block mt-4 lg:mt-6 lg:p-6 lg:border lg:border-gray-universal-100">
            {/* Mobile */}
            <div className="flex lg:hidden items-center justify-between p-4 w-full border border-gray-universal-100">
              <button className="flex items-center justify-between gap-y-5 z-10 w-full" onClick={toggleFilterModal}>
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
                  <div className="absolute bottom-0 w-full p-3 flex gap-x-3">
                    <button
                      className="w-1/2 base-button py-[9px] text-white bg-gray-universal-100 border border-gray-universal-100"
                      onClick={filterEvents}
                    >
                      {t('filterButton')}
                    </button>
                    <button
                      className="w-1/2 base-button py-[9px] text-gray-universal-100 bg-white border border-gray-universal-100"
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
              <div className="flex items-center gap-x-5 mt-3">
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
              <div className="flex items-center justify-end mt-3">
                <button
                  className="px-10 base-button py-[9px] bg-gray-900 text-white bg-gray-universal-100 border border-gray-universal-100"
                  onClick={filterEvents}
                >
                  {t('filterButton')}
                </button>
                <button
                  className="ml-5 px-10 base-button py-[9px] text-gray-universal-100 bg-white border border-gray-universal-100"
                  onClick={resetFilters}
                >
                  {t('reset_button')}
                </button>
              </div>
            </div>
          </div>
        </div>
        {!startDate && !endDate && !selectedCategory && !selectedLocality && !selectedEventTags && (
          <Section>
            <div className="text-md2">{t('eventsPromoted')}</div>
            <div className="pb-10">
              <SectionPromos events={promotedEvents} />
            </div>
          </Section>
        )}

        <div className="py-6 lg:py-16">
          <div className="text-md2">{t('eventsAll')}</div>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 gap-y-4 lg:gap-y-10">
            {filteredEventsPaginated?.map((event) => (
              <EventListingCard event={event} key={event.slug} />
            ))}
          </div>
          <div className="flex justify-center lg:justify-end pt-6">
            <Pagination
              value={currentPage}
              onChangeNumber={(num) => setCurrentPage(num)}
              max={pagesCount}
              previousButtonAriaLabel={t('previousPage')}
              nextButtonAriaLabel={t('nextPage')}
              currentInputAriaLabel={t('currentPage')}
            />
          </div>
        </div>
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
