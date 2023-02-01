import DocumentsCategorySelect from '@components/Atoms/Documents/DocumentsCategorySelect'
import SearchField from '@components/Atoms/SearchField'
import SortSelect, { Sort } from '@components/Atoms/SortSelect'
import Metadata from '@components/Molecules/Metadata'
import { Pagination, RowFile } from '@components/ui'
import { MetadataFragment } from '@services/graphql'
import {
  documentsDefaultFilters,
  documentsFetcher,
  DocumentsFilters,
  getDocumentsQueryKey,
} from '@services/meili/fetchers/documentsFetcher'
import { isDefined } from '@utils/isDefined'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { useSearch } from '../../hooks/useSearch'

const DocumentsListingSection = () => {
  const { t } = useTranslation('common')

  // TODO add scroll to results

  const [filters, setFilters] = useState<DocumentsFilters>(documentsDefaultFilters)

  const { input, setInput, searchValue, setSearchValue } = useSearch({ syncWithUrlQuery: false })

  const { data } = useQuery({
    queryKey: getDocumentsQueryKey(filters),
    queryFn: () => documentsFetcher(filters),
    keepPreviousData: true,
  })

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters({ ...filters, page: 1, categoryId })
  }

  const handleSortChange = (sort: Sort) => {
    setFilters({ ...filters, page: 1, sort })
  }

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, page: 1, searchValue }))
  }, [searchValue])

  // TODO: Advanced data fetching + no results message

  return (
    <>
      <div className="mb-4 mt-6 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <SearchField
            placeholder={t('whatAreYouLookingFor')}
            className="text-base"
            isLarge
            input={input}
            setInput={setInput}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="md:col-span-2">
          <DocumentsCategorySelect onCategoryChange={handleCategoryChange} />
        </div>
        <SortSelect onChange={handleSortChange} defaultSelected={filters.sort} />
      </div>

      <div className="mt-6 border-y border-border-dark pb-10 lg:mt-16 lg:pb-32">
        {/* Documents */}
        {data
          ? data?.hits.map((document) => (
              <NextLink key={document.id} href={`${t('documents_slug')}${document?.slug}`}>
                <RowFile
                  className="cursor-pointer"
                  type={document?.file_category?.name || ''}
                  title={document?.title || ''}
                  metadata={
                    <Metadata
                      metadata={
                        (document?.metadata
                          ?.filter(isDefined)
                          .filter((metadata) => metadata.__typename) as MetadataFragment[]) || []
                      }
                    />
                  }
                  dateAdded={document?.date_added}
                  fileType={document?.attachment?.ext?.toUpperCase().replace('.', '')}
                />
              </NextLink>
            ))
          : null}
        {data?.estimatedTotalHits ? (
          <div className="mt-6 flex justify-center lg:justify-end">
            <Pagination
              max={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
              onChangeNumber={handlePageChange}
              value={filters.page}
              previousButtonAriaLabel={t('previousPage')}
              nextButtonAriaLabel={t('nextPage')}
              currentInputAriaLabel={t('currentPage')}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default DocumentsListingSection
