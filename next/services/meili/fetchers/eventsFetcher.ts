import { now, parseAbsolute } from '@internationalized/date'

import { getMeilisearchPageOptions } from '@/services/meili/getMeilisearchPageOptions'
import { meiliClient } from '@/services/meili/meilisearch'
import { EventInListingMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { bratislavaTimezone } from '@/utils/consts'
import { isDefined } from '@/utils/isDefined'

export enum EventListingType {
  Upcoming,
  Archived,
}

export type EventsFilters = {
  type: EventListingType
  pageSize: number
  page: number
}

export type EventsFiltersShared = {
  dateFrom?: Date | null
  dateTo?: Date | null
  eventTypeId?: string | null
  eventCategoryId?: string | null
  eventBranchId?: string | null
  locale: string
}

export const getEventsDefaultSharedFilters: (locale: string) => EventsFiltersShared = (
  locale: string
) => ({
  dateFrom: null,
  dateTo: null,
  eventTypeId: null,
  eventCategoryId: null,
  eventBranchId: null,
  locale,
})

export const getEventsQueryKey = (filters: EventsFilters, sharedFilters: EventsFiltersShared) => [
  'eventsListing',
  filters,
  sharedFilters,
]

export const eventsUpcomingDefaultFilters = {
  type: EventListingType.Upcoming,
  pageSize: 8,
  page: 1,
}

export const eventsArchivedDefaultFilters = {
  type: EventListingType.Archived,
  pageSize: 8,
  page: 1,
}

/**
 * If filtering "from" a date, we want to filter from the beginning of the day.
 */
const fixDateFrom = (dateFrom: Date) =>
  parseAbsolute(dateFrom.toISOString(), bratislavaTimezone)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toDate()
    .getTime()

/**
 * If filtering "to" a date, we want to filter until the end of the day.
 */
const fixDateTo = (dateTo: Date) =>
  parseAbsolute(dateTo.toISOString(), bratislavaTimezone)
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    .toDate()
    .getTime()

export const eventsFetcher = (filters: EventsFilters, sharedFilters: EventsFiltersShared) => {
  // The midnight between yesterday and today is the divider between upcoming/archived events.
  const midnightTimestamp = now(bratislavaTimezone)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toDate()
    .getTime()

  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'event', EventInListingMeili>>('', {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "event"',
        `event.locale = ${sharedFilters.locale}`,
        filters.type === EventListingType.Archived
          ? `event.dateToTimestamp < ${midnightTimestamp}`
          : null,
        filters.type === EventListingType.Upcoming
          ? `event.dateToTimestamp > ${midnightTimestamp}`
          : null,
        sharedFilters.dateFrom
          ? `event.dateToTimestamp > ${fixDateFrom(sharedFilters.dateFrom)}`
          : null,
        sharedFilters.dateTo
          ? `event.dateFromTimestamp < ${fixDateTo(sharedFilters.dateTo)}`
          : null,
        sharedFilters.eventBranchId ? `event.branch.id = ${sharedFilters.eventBranchId}` : null,
        sharedFilters.eventTypeId ? `event.eventTagsIds = ${sharedFilters.eventTypeId}` : null,
        sharedFilters.eventCategoryId
          ? `event.eventCategory.id = ${sharedFilters.eventCategoryId}`
          : null,
      ].filter(isDefined),
      sort: [
        filters.type === EventListingType.Archived ? `event.dateFromTimestamp:desc` : null,
        filters.type === EventListingType.Upcoming ? `event.dateFromTimestamp:asc` : null,
      ].filter(isDefined),
      // Only properties that are required to display listing are retrieved
      attributesToRetrieve: [
        'event.id',
        'event.title',
        'event.dateFrom',
        'event.dateTo',
        'event.locale',
        'event.slug',
        'event.listingImage',
        'event.coverImage',
        'event.eventTags',
        'event.eventCategory.title',
        'event.branch.title',
      ],
    })
    .then(unwrapFromSearchIndex('event'))
}
