import ListingCard from '@components/Molecules/ListingCard'
import { Pagination } from '@components/ui'
import {
  getNoticesQueryKey,
  noticesDefaultFilters,
  noticesFetcher,
} from '@utils/fetchers/notices.fetcher'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const NoticesListingSection = () => {
  const { t, i18n } = useTranslation('common')
  const [filters, setFilters] = useState(noticesDefaultFilters)

  const { data } = useQuery({
    queryKey: getNoticesQueryKey(i18n.language, filters),
    queryFn: () => noticesFetcher(i18n.language, filters),
    keepPreviousData: true,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  // TODO: Advanced data fetching
  if (!data) {
    return null
  }

  return (
    <>
      {data.notices?.data?.length ? (
        <div className="m-auto grid items-stretch gap-4 gap-y-10 pt-6 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {data.notices.data?.map((notice) => (
            <ListingCard card={notice} key={notice?.id} />
          ))}
        </div>
      ) : null}
      {data.notices?.meta?.pagination?.total && (
        <div className="m-auto flex w-fit md:mr-0">
          <Pagination
            max={Math.ceil(data.notices?.meta.pagination.total / filters.pageSize)}
            value={filters.page}
            onChangeNumber={handlePageChange}
            previousButtonAriaLabel={t('previousPage')}
            nextButtonAriaLabel={t('nextPage')}
            currentInputAriaLabel={t('currentPage')}
          />
        </div>
      )}
    </>
  )
}

export default NoticesListingSection