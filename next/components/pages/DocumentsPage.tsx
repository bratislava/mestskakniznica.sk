import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import {
  LoadingSpinner,
  PageTitle,
  Pagination,
  RowFile,
  SectionContainer,
} from '@bratislava/ui-city-library'
import DocumentsCategorySelect from '@components/Atoms/Documents/DocumentsCategorySelect'
import SearchField from '@components/Atoms/SearchField'
import SortSelect, { Sort } from '@components/Atoms/SortSelect'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import {
  documentsDefaultFilters,
  documentsFetcher,
  DocumentsFilters,
  getDocumentsSwrKey,
} from '../../backend/meili/fetchers/documentsFetcher'
import { useSearch } from '../../hooks/useSearch'
import useSwrWithExtras from '../../hooks/useSwrWithExtras'
import Metadata from '../Molecules/Metadata'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface PageProps {
  page: PageEntity
}

const DocumentsPage = ({ page }: PageProps) => {
  const { t } = useTranslation('common')

  // TODO add scroll to results

  const [filters, setFilters] = useState<DocumentsFilters>(documentsDefaultFilters)

  const { input, setInput, searchValue, setSearchValue } = useSearch({ syncWithUrlQuery: false })

  const { dataToDisplay, loadingAndNoDataToDisplay } = useSwrWithExtras(
    getDocumentsSwrKey(filters),
    documentsFetcher(filters)
  )

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters({ ...filters, page: 1, categoryId })
  }

  const handleSortChange = (sort: Sort) => {
    setFilters({ ...filters, sort })
  }

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, searchValue }))
  }, [searchValue])

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle
          title={page?.attributes?.title ?? ''}
          description={page?.attributes?.description ?? ''}
          hasDivider={false}
        />
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
          {loadingAndNoDataToDisplay ? (
            <LoadingSpinner size="medium" className="mt-[30px]" />
          ) : (
            dataToDisplay?.hits.map((document) => (
              <NextLink key={document.id} href={`${t('documents_slug')}${document?.slug}`}>
                <RowFile
                  className="cursor-pointer"
                  type={document?.file_category?.name || ''}
                  title={document?.title || ''}
                  metadata={<Metadata metadata={document?.metadata} />}
                  dateAdded={document?.date_added}
                  fileType={document?.attachment?.ext?.toUpperCase().replace('.', '')}
                />
              </NextLink>
            ))
          )}
          {dataToDisplay?.estimatedTotalHits ? (
            <div className="mt-6 flex justify-center lg:justify-end">
              <Pagination
                max={Math.ceil(dataToDisplay.estimatedTotalHits / filters.pageSize)}
                onChangeNumber={handlePageChange}
                value={filters.page}
                previousButtonAriaLabel={t('previousPage')}
                nextButtonAriaLabel={t('nextPage')}
                currentInputAriaLabel={t('currentPage')}
              />
            </div>
          ) : null}
        </div>
      </SectionContainer>
    </>
  )
}

export default DocumentsPage
