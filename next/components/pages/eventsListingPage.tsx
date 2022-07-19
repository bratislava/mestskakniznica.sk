import DropdownIcon from '@assets/images/dropdown.svg'
import { EventCardFragment, EventCategoryEntity, EventFiltersInput, EventLocalityEntity, EventTagEntity, PageEntity, Pagination as PaginationFragment } from '@bratislava/strapi-sdk-city-library'
import { Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { client } from '@utils/gql'
import { IEvent } from '@utils/types'
import enUs from 'date-fns/locale/en-US'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Section from '../AppLayout/Section'
import SectionPromos from '../HomePage/SectionPromos'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import EventFilters from '../Molecules/EventFilters'
import EventListingCard from '../Molecules/EventListingCard'
import { FilterModal } from '../Molecules/FilterModal'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'



registerLocale('en', enUs)
registerLocale('sk', sk)

interface KeyTitlePair {
  key: string
  title: string
}
export interface PageProps {
  page: PageEntity
  promotedEvents: IEvent[]
  events: EventCardFragment[]
  eventCategories: NonNullable<EventCategoryEntity[]>
  eventTags: EventTagEntity[]
  eventLocalities: EventLocalityEntity[]
  paginationFields: PaginationFragment
}

const MAX_EVENTS_PER_PAGE = 16

function Events({ page, promotedEvents, events, eventCategories, eventTags, eventLocalities, paginationFields }: PageProps) {
  const { t } = useTranslation('common')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filteredEvents, setFilteredEvents] = useState<EventCardFragment[]>(events)
  const [paginationState, setPaginationState] = useState(paginationFields)
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
    const defaultType = { key: '', title: t('eventType') }
    const parsedTypes = eventTags.map(({ attributes, id }) => ({
      key: id || '',
      title: attributes?.title || '',
    }))
    return [defaultType, ...parsedTypes]
  }, [eventTags, t])

  const categories = useMemo(() => {
    const defaultCategory = {
      key: '',
      title: t('eventCategory'),
    }
    const parsedCategories = eventCategories.map(({ attributes, id }) => ({
      key: id || '',
      title: attributes?.title || '',
    }))
    return [defaultCategory, ...parsedCategories]
  }, [eventCategories, t])

  const localities = useMemo(() => {
    const defaultLocality = {
      key: '',
      title: t('eventLocality'),
    }
    const parsedLocalities = eventLocalities.map(({ attributes, id }) => ({
      key: id || '',
      title: attributes?.title || '',
    }))
    return [defaultLocality, ...parsedLocalities]
  }, [eventLocalities, t])

  const [selectedEventTags, setSelectedEventTags] = useState<KeyTitlePair | null>()
  const [selectedCategory, setSelectedCategory] = useState<KeyTitlePair | null>()
  const [selectedLocality, setSelectedLocality] = useState<KeyTitlePair | null>()

  const resetFilters = async () => {
    setStartDate(null)
    setEndDate(null)
    setSelectedEventTags(null)
    setSelectedCategory(null)
    setSelectedLocality(null)
    setFilteredEvents(events)
    openFilterModal && toggleFilterModal()

    const eventResponse = await client.EventList({
      locale,
      limit: 10,
      start: 0,
      filters: {},
      sort: "dateFrom:desc"
    })
    if(eventResponse.events) {
      setFilteredEvents(eventResponse.events.data || [])
      setPaginationState(eventResponse.events.meta.pagination)
    }
  }

  const filterEvents = async() => {

    const currentFilters: EventFiltersInput = {}
    if(startDate) currentFilters["dateFrom"] = { gte: startDate.toISOString() }
    if(endDate) currentFilters["dateTo"] = { lte: endDate.toISOString() }
    if(selectedEventTags && selectedEventTags.title) currentFilters["eventTags"] = { title: { eq: selectedEventTags.title } }
    if(selectedCategory && selectedCategory.title) currentFilters["eventCategory"] = { title: { eq: selectedCategory.title } }
    if(selectedLocality && selectedLocality.title) currentFilters["eventLocality"] = { title: { eq: selectedLocality.title } }

    const eventResponse = await client.EventList({
      locale,
      limit: 10,
      start: 0,
      filters: currentFilters,
      sort: "dateFrom:desc"
    })
    if(eventResponse.events) {
      setFilteredEvents(eventResponse.events.data || [])
      setPaginationState(eventResponse.events.meta.pagination)
    }
  }

  const handlePageChange = async (page: number) => {
    const currentFilters: EventFiltersInput = {}
    if(startDate) currentFilters["dateFrom"] = { gte: startDate.toISOString() }
    if(endDate) currentFilters["dateTo"] = { lte: endDate.toISOString() }
    if(selectedEventTags && selectedEventTags.title) currentFilters["eventTags"] = { title: { eq: selectedEventTags.title } }
    if(selectedCategory && selectedCategory.title) currentFilters["eventCategory"] = { title: { eq: selectedCategory.title } }
    if(selectedLocality && selectedLocality.title) currentFilters["eventLocality"] = { title: { eq: selectedLocality.title } }

    const eventResponse = await client.EventList({
      locale,
      limit: 10,
      start: (page-1) * 10,
      filters: currentFilters,
      sort: "dateFrom:desc"
    })
    if(eventResponse.events) {
      setFilteredEvents(eventResponse.events.data || [])
      setPaginationState(eventResponse.events.meta.pagination)
    }
  }

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
            {filteredEvents?.map((event) => (
              <EventListingCard event={event} key={event.attributes?.slug} />
            ))}
          </div>
          <div className="flex justify-center lg:justify-end pt-6">
            <Pagination
              value={paginationState?.page || 0}
              onChangeNumber={handlePageChange}
              max={paginationState?.pageCount || 0}
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
