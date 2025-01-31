import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import { FolderIcon } from '@/assets/icons'
import DocumentsCategorySelect from '@/components/Atoms/Documents/DocumentsCategorySelect'
import SearchField from '@/components/Atoms/SearchField'
import SortSelect, { Sort } from '@/components/Atoms/SortSelect'
import { Pagination } from '@/components/ui'
import { useSearch } from '@/hooks/useSearch'
import DocumentRow from '@/modules/cards-and-rows/DocumentRow'
import {
  documentsDefaultFilters,
  documentsFetcher,
  DocumentsFilters,
  getDocumentsQueryKey,
} from '@/services/meili/fetchers/documentsFetcher'
import { useNavikronos } from '@/utils/navikronos'
import { Enum_Disclosure_Type_Fixed } from '@/utils/types'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

const DocumentsListingSection = () => {
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  // TODO add scroll to results

  const [filters, setFilters] = useRoutePreservedState<DocumentsFilters>(documentsDefaultFilters)

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
    if (
      categoryId &&
      Object.values(Enum_Disclosure_Type_Fixed).includes(categoryId as Enum_Disclosure_Type_Fixed)
    ) {
      setFilters({
        ...filters,
        page: 1,
        documentCategoryId: null,
        disclosureType: categoryId as Enum_Disclosure_Type_Fixed,
      })
    } else {
      setFilters({ ...filters, page: 1, documentCategoryId: categoryId, disclosureType: null })
    }
  }

  const handleSortChange = (sort: Sort) => {
    setFilters({ ...filters, page: 1, sort })
  }

  useEffect(() => {
    if (filters.searchValue === searchValue) {
      return
    }

    setFilters((prevFilters) => ({ ...prevFilters, page: 1, searchValue }))
  }, [filters.searchValue, searchValue, setFilters])

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
        {data?.hits.map((document) => {
          const { id, title, type, slug, file, category } = document
          const metadata =
            // eslint-disable-next-line unicorn/consistent-destructuring
            type === 'disclosure' && document.contractor ? `${document.contractor}` : undefined

          let badgeExt: string | JSX.Element = ''
          if (Array.isArray(file)) {
            badgeExt =
              file.length > 1 ? <FolderIcon /> : file[0]?.ext?.toUpperCase().replace('.', '') ?? ''
          } else {
            badgeExt = file?.ext?.toUpperCase().replace('.', '') ?? ''
          }

          return (
            <DocumentRow
              key={id}
              title={title}
              linkHref={getPathForEntity({ type, slug }) ?? '#'}
              fileExt={badgeExt}
              category={category}
              // eslint-disable-next-line unicorn/consistent-destructuring
              addedAt={type === 'disclosure' ? document.addedAt : document.publishedAt}
              metadata={metadata}
            />
          )
        })}
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
