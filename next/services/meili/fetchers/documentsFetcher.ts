import { Sort } from '@components/Atoms/SortSelect'
import { isDefined } from '@utils/isDefined'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { meiliClient } from '../meilisearch'
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

export const getDocumentsQueryKey = (filters: DocumentsFilters) => ['documents', filters]

export const documentsFetcher = (filters: DocumentsFilters) => {
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
