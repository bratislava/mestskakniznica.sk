import SearchIcon from '@assets/images/search.svg'
import { FileCategoryEntity } from '@bratislava/strapi-sdk-city-library'
import {
  PageTitle,
  Pagination,
  RowFile,
  SearchBar,
  SectionContainer,
  Select,
} from '@bratislava/ui-city-library'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { DocumentResponse, DOCUMENTS_LIMIT } from '../../pages/api/documents'
import { formatDateToLocal } from '../../utils/utils'
import Metadata from '../Molecules/Metadata'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface PageProps {
  documentCategory: FileCategoryEntity
  locale?: string
}

export interface SortOption {
  key: 'asc' | 'desc'
  title: string
}

const DocumentCategoryPage = ({ documentCategory, locale = 'sk' }: PageProps) => {
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

  const [offsetPage, setOffsetPage] = React.useState(1)
  const [sort, setSort] = React.useState(SORT_OPTIONS[0])
  const [query, setQuery] = React.useState('')

  const noOfPages = Math.ceil(documentData.count / DOCUMENTS_LIMIT)

  const { id } = documentCategory

  React.useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch(
        `/api/documents?offset=${(offsetPage - 1) * DOCUMENTS_LIMIT}&sort=date_added:${
          sort.key
        }&categoryId=${id}&query=${query}`
      )
      const data: DocumentResponse = await res.json()

      setDocumentData(data)
    }

    fetchDocuments()
  }, [offsetPage, sort, id, query])

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num)
  }

  return (
    <SectionContainer>
      <PageBreadcrumbs
        page={documentCategory?.attributes?.page?.data}
        documentCategory={documentCategory}
      />
      <PageTitle title={documentCategory?.attributes?.name ?? ''} hasDivider={false}/>
      <SearchBar
        placeholder={t('whatAreYouLookingFor')}
        className="mt-6"
        inputClassName="py-5 text-base w-full border-border-light"
        iconLeft={<SearchIcon/>}
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
      />
      <div className="mt-16 border-b border-border-dark pb-32">
        <div className="flex items-center justify-end">
          <Select
            className="w-44"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(s) => setSort(s)}
          />
        </div>

        {/* Documents */}
        {documentData.documents.map((document) => (
          <NextLink
            key={document.id}
            href={`${t('documents_category_slug')}${
              document?.attributes?.file_category?.data?.attributes?.slug
            }/${document?.attributes?.slug}`}
            passHref
          >
            <a href={document?.attributes?.slug || ''}>
              <RowFile
                className="cursor-pointer"
                type={document?.attributes?.file_category?.data?.attributes?.name || ''}
                title={document?.attributes?.title || ''}
                metadata={<Metadata metadata={document?.attributes?.metadata}/>}
                dateAdded={`${t('added')} ${formatDateToLocal(
                  document?.attributes?.date_added,
                  locale
                )}`}
                fileType={document?.attributes?.attachment?.data?.attributes?.ext
                  ?.toUpperCase()
                  .replace('.', '')}
              />
            </a>
          </NextLink>
        ))}
        <div className="mt-6 flex justify-end">
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
  )
}

export default DocumentCategoryPage
