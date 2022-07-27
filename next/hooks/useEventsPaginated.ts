import last from 'lodash/last'
import useSWRInfinite from 'swr/infinite'
import { EventCardEntityFragment, EventFiltersInput } from '../graphql'
import { client } from '../utils/gql'

export const PAGE_SIZE = 16

type EventsPaginatedProps = {
  locale: string
  filters: EventFiltersInput
  keepPreviousItems?: boolean
}

export const useEventsPaginated = ({
  locale,
  filters,
  keepPreviousItems = false,
}: EventsPaginatedProps) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index, previousList: EventCardEntityFragment[]) => {
      if (index !== 0 && previousList.length === 0) {
        return null
      }

      const variables = {
        locale,
        limit: PAGE_SIZE,
        start: index * PAGE_SIZE,
        filters,
      }

      return ['EventsPaginated', variables]
    },
    (_key, variables) => client.EventList(variables)
  )

  const filteredEvents = keepPreviousItems
    ? data?.map((page) => page.events?.data).flat() ?? []
    : last(data)?.events?.data

  const isLoadingInitialData = !data && !error

  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = filteredEvents?.length === 0

  const previousPagesLength = last(data)?.events?.data.length || 0

  const isReachingEnd = isEmpty || previousPagesLength < PAGE_SIZE

  const strapiMetaPagination = last(data)?.events?.meta.pagination ?? null

  return {
    data,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    filteredEvents,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    strapiMetaPagination,
  }
}
