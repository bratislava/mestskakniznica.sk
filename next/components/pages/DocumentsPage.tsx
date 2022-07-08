import CloseIcon from '@assets/images/close.svg'
import SearchIcon from '@assets/images/search.svg'
import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import {
  Link,
 LoadingSpinner,  PageTitle,
  Pagination,
  RowFile,
  RowSubcategory,
  SearchBar,
  SectionContainer,
  Select } from '@bratislava/ui-city-library'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { DocumentResponse, DOCUMENTS_LIMIT } from '../../pages/api/documents'
import { formatDateToLocal } from '../../utils/utils'
import Metadata from '../Molecules/Metadata'
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"

export interface PageProps {
  page: PageEntity
}

export interface SortOption {
  key: 'asc' | 'desc'
  title: string
}

function DocumentsPage({ page }: PageProps) {
  const { t } = useTranslation('common')
  const [documentData, setDocumentData] = React.useState<DocumentResponse>({
    documents: [],
    fileCategories: [],
    count: 0,
  })

  const SORT_OPTIONS: SortOption[] = [
    { key: 'desc', title: t('sort_desc') },
    { key: 'asc', title: t('sort_asc') },
  ]

  const resultsRef = React.useRef<HTMLDivElement>(null)

  const [fetchingData, setFetchingData] = React.useState(true)
  const [offsetPage, setOffsetPage] = React.useState(1)
  const [sort, setSort] = React.useState(SORT_OPTIONS[0])
  const [query, setQuery] = React.useState('')
  const [visibleQuery, setVisibleQuery] = React.useState('')

  const noOfPages = Math.ceil(documentData.count / DOCUMENTS_LIMIT)

  const scrollToResults = React.useCallback(() => {
    resultsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }, [resultsRef])

  React.useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch(
        `/api/documents?offset=${(offsetPage - 1) * DOCUMENTS_LIMIT}&sort=${sort.key}&query=${query}`
      )
      const data: DocumentResponse = await res.json()

      setDocumentData(data)
      setFetchingData(false)
    }

    fetchDocuments()
  }, [offsetPage, sort, query])

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num)
  }

  const handleSearch = React.useCallback(() => {
    setQuery(visibleQuery)
    scrollToResults()
  }, [setQuery, visibleQuery, scrollToResults])

  const handleSearchReset = React.useCallback(() => {
    setQuery('')
    setVisibleQuery('')
  }, [setQuery, setVisibleQuery])

  const onSearchBarKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch()
      }
    },
    [handleSearch]
  )

  const onSearchBarRightIconKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearchReset()
      }
    },
    [handleSearchReset]
  )

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} description={page?.attributes?.description ?? ''} hasDivider={false} />
        <SearchBar
          placeholder={t('whatAreYouLookingFor')}
          className="mt-6"
          inputClassName="py-2 lg:py-5 text-sm w-full border-gray-universal-200"
          iconLeft={<SearchIcon />}
          iconRight={
            <div tabIndex={0} role="button" onKeyPress={onSearchBarRightIconKeyPress} onClick={handleSearchReset}>
              <CloseIcon />
            </div>
          }
          value={visibleQuery}
          onChange={(ev) => setVisibleQuery(ev.target.value)}
          onKeyPress={onSearchBarKeyPress}
        />
        <h4 className="pt-6 lg:pt-16">{t('category')}</h4>
        {fetchingData ? (
          <LoadingSpinner size="medium" className="mt-[30px]" />
        ) : (
          <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-4 lg:gap-5 mt-6">
            {documentData.fileCategories.map((category) => (
              <Link key={category.id} href={`${t('documents_category_slug')}${category?.attributes?.slug}`} variant="plain" uppercase={false}>
                <RowSubcategory title={category?.attributes?.name || ''} />
              </Link>
            ))}
          </div>
        )}
        <div ref={resultsRef} className="mt-6 lg:mt-16 pb-10 lg:pb-32 border-t border-b border-gray-universal-100">
          <div className="flex flex-col gap-y-4 pb-6 pt-6 lg:pt-7.5 lg:pb-7.5 lg:gap-y-0 lg:flex-row lg:items-center lg:justify-between">
            <h4>{t('allDocuments')}</h4>
            <Select className="w-full lg:w-44" options={SORT_OPTIONS} value={sort} onChange={(s) => setSort(s)} />
          </div>

          {/* Documents */}
          {fetchingData ? (
            <LoadingSpinner size="medium" className="mt-[30px]" />
          ) : (
            documentData.documents.map((document) => (
              <NextLink key={document.id} href={`${t('documents_category_slug')}${document?.attributes?.file_category?.data?.attributes?.slug}/${document?.attributes?.slug}`} passHref>
                <a href={document?.attributes?.slug || ''}>
                  <RowFile
                    className="cursor-pointer"
                    type={document?.attributes?.file_category?.data?.attributes?.name || ''}
                    title={document?.attributes?.title || ''}
                    metadata={<Metadata metadata={document?.attributes?.metadata} />}
                    dateAdded={`${t('added')} ${formatDateToLocal(document?.attributes?.date_added, page?.attributes?.locale || '')}`}
                    fileType={document?.attributes?.attachment?.data?.attributes?.ext?.toUpperCase().replace('.', '')}
                  />
                </a>
              </NextLink>
            ))
          )}
          <div className="mt-6 flex justify-center lg:justify-end">
            <Pagination
              max={noOfPages}
              value={offsetPage}
              onChangeNumber={(num) => handleChangeOffsetPage(num)}
              previousButtonAriaLabel={t('previousPage')}
              nextButtonAriaLabel={t('nextPage')}
              currentInputAriaLabel={t('currentPage')}
            />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default DocumentsPage
