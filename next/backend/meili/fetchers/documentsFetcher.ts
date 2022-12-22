import { Sort } from '@components/Atoms/SortSelect'
import { isDefined } from '@utils/isDefined'
import { meiliClient } from '@utils/meilisearch'
import { Key } from 'swr'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { BasicDocumentMeili } from '../meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '../searchIndexWrapped'

export type DocumentsFilters = {
  pageSize: number
  searchValue: string
  categoryId: string | null
  page: number
  sort: Sort
}

export const documentsDefaultFilters: DocumentsFilters = {
  pageSize: 6,
  searchValue: '',
  page: 1,
  categoryId: null,
  sort: 'newest',
}

export const getDocumentsSwrKey = (filters: DocumentsFilters) => ['Documents', filters] as Key

export const documentsFetcher = (filters: DocumentsFilters) => () => {
  console.log(filters)
  console.log(
    isDefined(filters.categoryId) ? `basic-document.file_category.id = ${filters.categoryId}` : null
  )
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'basic-document', BasicDocumentMeili>>(filters.searchValue, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "basic-document"',
        isDefined(filters.categoryId)
          ? `basic-document.file_category.id = ${filters.categoryId}`
          : null,
      ].filter(isDefined),
      sort: [
        filters.sort === 'newest' ? 'basic-document.date_added:desc' : null,
        filters.sort === 'oldest' ? 'basic-document.date_added:asc' : null,
      ].filter(Boolean) as string[],
    })
    .then(unwrapFromSearchIndex('basic-document'))
}

// export const documentsSectionPrefetch = {
//   sectionTypename: 'ComponentSectionsDocumentsSection',
//   key: getDocumentsSectionSwrKey(documentsSectionDefaultFilters),
//   fetcher: documentsSectionFetcher(documentsSectionDefaultFilters),
// } as const
