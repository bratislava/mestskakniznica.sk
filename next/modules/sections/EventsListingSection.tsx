import EventFilters from '@components/Molecules/EventFilters'
import EventListingCard from '@components/Molecules/EventListingCard'
import { Pagination } from '@components/ui'
import {
  eventsArchivedDefaultFilters,
  eventsDefaultSharedFilters,
  eventsFetcher,
  EventsFilters,
  EventsFiltersShared,
  eventsUpcomingDefaultFilters,
  getEventsQueryKey,
} from '@services/meili/fetchers/eventsFetcher'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'

type EventsListingSectionXProps = {
  titleTranslationKey: string
  queryResult: UseQueryResult<Awaited<ReturnType<typeof eventsFetcher>>>
  filters: EventsFilters
  onPageChange: (page: number) => void
}

const InnerSection = ({
  titleTranslationKey,
  queryResult,
  filters,
  onPageChange,
}: EventsListingSectionXProps) => {
  const { t } = useTranslation('common')

  const { data } = queryResult

  if (!data?.hits || data.hits.length === 0) {
    return null
  }

  return (
    <div>
      <div className="text-h3">{t(titleTranslationKey)}</div>
      <div className="grid grid-cols-1 gap-y-4 pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
        {data?.hits.map((event) => (
          <EventListingCard event={event} key={event?.id} />
        ))}
      </div>
      <div className="flex justify-center pt-6 lg:justify-end">
        <Pagination
          value={filters.page}
          onChangeNumber={onPageChange}
          max={Math.ceil((data?.estimatedTotalHits ?? 0) / filters.pageSize)}
          previousButtonAriaLabel={t('previousPage')}
          nextButtonAriaLabel={t('nextPage')}
          currentInputAriaLabel={t('currentPage')}
        />
      </div>
    </div>
  )
}

const EventsListingSection = () => {
  const { t } = useTranslation('common')

  const [sharedFilters, setSharedFilters] = useState(eventsDefaultSharedFilters)
  const [filtersUpcoming, setFiltersUpcoming] = useState(eventsUpcomingDefaultFilters)
  const [filtersArchived, setFiltersArchived] = useState(eventsArchivedDefaultFilters)

  const handleSharedFiltersChange = (newFilters: EventsFiltersShared) => {
    setSharedFilters(newFilters)
    setFiltersUpcoming((f) => ({ ...f, page: 1 }))
    setFiltersArchived((f) => ({ ...f, page: 1 }))
  }

  // TODO: Advanced loading + errors
  const queryResultUpcoming = useQuery({
    queryKey: getEventsQueryKey(filtersUpcoming, sharedFilters),
    queryFn: () => eventsFetcher(filtersUpcoming, sharedFilters),
    keepPreviousData: true,
  })

  const queryResultArchived = useQuery({
    queryKey: getEventsQueryKey(filtersArchived, sharedFilters),
    queryFn: () => eventsFetcher(filtersArchived, sharedFilters),
    keepPreviousData: true,
  })

  const handleUpcomingPageChange = (page: number) => {
    setFiltersUpcoming((f) => ({ ...f, page }))
  }

  const handleArchivedPageChange = (page: number) => {
    setFiltersArchived((f) => ({ ...f, page }))
  }

  return (
    <>
      <EventFilters filters={sharedFilters} onFiltersChange={handleSharedFiltersChange} />
      {queryResultUpcoming.data?.hits.length === 0 &&
      queryResultArchived.data?.hits.length === 0 ? (
        <div className="text-center text-h3">{t('eventsEmpty')}</div>
      ) : null}
      <div className="flex flex-col gap-4 lg:gap-10">
        <InnerSection
          titleTranslationKey="eventsUpcoming"
          queryResult={queryResultUpcoming}
          filters={filtersUpcoming}
          onPageChange={handleUpcomingPageChange}
        />
        <InnerSection
          titleTranslationKey="eventsArchived"
          queryResult={queryResultArchived}
          filters={filtersArchived}
          onPageChange={handleArchivedPageChange}
        />
      </div>
    </>
  )
}

export default EventsListingSection
