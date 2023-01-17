import { client } from '@services/graphql/gql'

export type NoticesFilters = {
  pageSize: number
  page: number
}

export const noticesDefaultFilters: NoticesFilters = {
  pageSize: 16,
  page: 1,
}

export const getNoticesQueryKey = (locale: string, filters: NoticesFilters) => [
  'notices',
  locale,
  filters,
]

export const noticesFetcher = async (locale: string, filters: NoticesFilters) =>
  client.Notices({
    locale,
    limit: filters.pageSize,
    start: (filters.page - 1) * filters.pageSize,
  })
