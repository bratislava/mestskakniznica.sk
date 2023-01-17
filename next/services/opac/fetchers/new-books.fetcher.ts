import type { NewBooksResponse } from '@services/opac/newBooksService'

export type NewBooksFilters = {
  pageSize: number
  page: number
}

export const newBooksDefaultFilters: NewBooksFilters = {
  pageSize: 24,
  page: 1,
}

export const getNewBooksQueryKey = (filters: NewBooksFilters) => ['newBooks', filters]

export const newBooksFetcher = async (filters: NewBooksFilters) => {
  const response = await fetch(`/api/new-books?page=${filters.page}&pageSize=${filters.pageSize}`)
  return (await response.json()) as NewBooksResponse
}
