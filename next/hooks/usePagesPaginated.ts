import { Enum_Page_Layout } from '@bratislava/strapi-sdk-city-library'
import last from 'lodash/last'
import useSWRInfinite from 'swr/infinite'
import { EventCardEntityFragment, EventFiltersInput } from '../graphql'
import { client } from '../utils/gql'

export const PAGE_SIZE = 16

type PagesPaginatedProps = {
  locale: string
  layout: Enum_Page_Layout
  keepPreviousItems?: boolean
}

export const usePagesPaginated = ({
  locale,
  layout,
  keepPreviousItems = false,
}: PagesPaginatedProps) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index, previousList: EventCardEntityFragment[]) => {
      if (index !== 0 && previousList.length === 0) {
        return null
      }

      const variables = {
        layout,
        locale,
        limit: PAGE_SIZE,
        start: index * PAGE_SIZE,
      }

      return ['NewsPaginated', variables]
    },
    (_key, variables) => client.PagesByLayoutPaginated(variables)
  )

  const filteredPages = keepPreviousItems
    ? data?.map((listingPage) => listingPage.pages?.data).flat() ?? []
    : last(data)?.pages?.data

  const isLoadingInitialData = !data && !error

  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = filteredPages?.length === 0

  const previousPagesLength = last(data)?.pages?.data.length || 0

  const isReachingEnd = isEmpty || previousPagesLength < PAGE_SIZE

  const strapiMetaPagination = last(data)?.pages?.meta.pagination ?? null

  return {
    data,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    filteredPages,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    strapiMetaPagination,
  }
}
