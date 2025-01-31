import { Pagination } from '@components/ui'
import {
  getNewBooksQueryKey,
  newBooksDefaultFilters,
  newBooksFetcher,
} from '@services/opac/fetchers/new-books.fetcher'
import React from 'react'
import { useQuery } from 'react-query'

import BookCard from '@/modules/cards-and-rows/BookCard'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=4803%3A27424&t=VZjq8OU1CZYXVuDm-0
 */
const NewBooksSection = () => {
  const [filters, setFilters] = useRoutePreservedState(newBooksDefaultFilters)

  const { data } = useQuery({
    queryKey: getNewBooksQueryKey(filters),
    queryFn: () => newBooksFetcher(filters),
    keepPreviousData: true,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  if (data) {
    return (
      <>
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(136px,1fr))] gap-y-8 md:grid-cols-[repeat(auto-fill,minmax(196px,1fr))]">
          {data.books.map((book) => (
            <BookCard key={book.url} book={book} />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination
            max={Math.floor(data.total / filters.pageSize)}
            value={filters.page}
            onChangeNumber={handlePageChange}
          />
        </div>
      </>
    )
  }

  return null
}

export default NewBooksSection
