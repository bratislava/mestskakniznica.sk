import { useTranslation } from 'next-i18next'
import React from 'react'
import { useQuery, UseQueryResult } from 'react-query'

import EventFilters from '@/components/Molecules/EventFilters'
import { Pagination } from '@/components/ui'
import EventCard from '@/modules/cards-and-rows/EventCard'
import {
  eventsArchivedDefaultFilters,
  eventsFetcher,
  EventsFilters,
  EventsFiltersShared,
  eventsUpcomingDefaultFilters,
  getEventsDefaultSharedFilters,
  getEventsQueryKey,
} from '@/services/meili/fetchers/eventsFetcher'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

type EventsListingSectionXProps = {
  title: string
  queryResult: UseQueryResult<Awaited<ReturnType<typeof eventsFetcher>>>
  filters: EventsFilters
  onPageChange: (page: number) => void
}

const InnerSection = ({
  title,
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
      <div className="text-h3">{title}</div>
      <div className="grid grid-cols-1 gap-y-4 pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
        {data?.hits.map((event) => {
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
          } = event
          return (
            <EventCard
              key={slug}
              title={title}
              dateFrom={dateFrom}
              dateTo={dateTo}
              slug={slug}
              listingImage={listingImage}
              coverImage={coverImage}
              eventTags={eventTags}
              eventCategory={eventCategory}
              branch={branch}
            />
          )
        })}
      </div>
      <div className="flex justify-center pt-6 lg:justify-end">
        <Pagination
          value={filters.page}
          onChangeNumber={onPageChange}
          max={Math.ceil((data?.estimatedTotalHits ?? 0) / filters.pageSize)}
        />
      </div>
    </div>
  )
}

const EventsListingSection = () => {
  const { t, i18n } = useTranslation('common')

  const [filters, setFilters] = useRoutePreservedState({
    upcoming: eventsUpcomingDefaultFilters,
    archived: eventsArchivedDefaultFilters,
    shared: getEventsDefaultSharedFilters(i18n.language),
  })

  const handleSharedFiltersChange = (newFilters: EventsFiltersShared) => {
    setFilters((f) => ({
      shared: newFilters,
      upcoming: { ...f.upcoming, page: 1 },
      archived: { ...f.archived, page: 1 },
    }))
  }

  // TODO: Advanced loading + errors
  const queryResultUpcoming = useQuery({
    queryKey: getEventsQueryKey(filters.upcoming, filters.shared),
    queryFn: () => eventsFetcher(filters.upcoming, filters.shared),
    keepPreviousData: true,
  })

  const queryResultArchived = useQuery({
    queryKey: getEventsQueryKey(filters.archived, filters.shared),
    queryFn: () => eventsFetcher(filters.archived, filters.shared),
    keepPreviousData: true,
  })

  const handleUpcomingPageChange = (page: number) => {
    setFilters((f) => ({ ...f, upcoming: { ...f.upcoming, page } }))
  }

  const handleArchivedPageChange = (page: number) => {
    setFilters((f) => ({ ...f, archived: { ...f.archived, page } }))
  }

  return (
    <>
      <EventFilters filters={filters.shared} onFiltersChange={handleSharedFiltersChange} />
      {queryResultUpcoming.data?.hits.length === 0 &&
      queryResultArchived.data?.hits.length === 0 ? (
        <div className="text-center text-h3">{t('eventsListingSection.eventsEmpty')}</div>
      ) : null}
      <div className="flex flex-col gap-4 lg:gap-10">
        <InnerSection
          title={t('eventsListingSection.eventsUpcoming')}
          queryResult={queryResultUpcoming}
          filters={filters.upcoming}
          onPageChange={handleUpcomingPageChange}
        />
        <InnerSection
          title={t('eventsListingSection.eventsArchived')}
          queryResult={queryResultArchived}
          filters={filters.archived}
          onPageChange={handleArchivedPageChange}
        />
      </div>
    </>
  )
}

export default EventsListingSection
