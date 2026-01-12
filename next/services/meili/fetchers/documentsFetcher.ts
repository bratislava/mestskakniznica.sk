import { Sort } from '@/components/Atoms/SortSelect'
import { getMeilisearchPageOptions } from '@/services/meili/getMeilisearchPageOptions'
import { meiliClient } from '@/services/meili/meilisearch'
import { DisclosureMeili, DocumentMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped } from '@/services/meili/searchIndexWrapped'
import { isDefined } from '@/utils/isDefined'
import { Enum_Disclosure_Type_Fixed } from '@/utils/types'

export type DocumentsFilters = {
  pageSize: number
  searchValue: string
  documentCategoryId: string | null
  disclosureType: Enum_Disclosure_Type_Fixed | null
  page: number
  sort: Sort
}

export const documentsDefaultFilters: DocumentsFilters = {
  pageSize: 6,
  searchValue: '',
  page: 1,
  documentCategoryId: null,
  disclosureType: null,
  sort: 'newest',
}

type DocumentDisclosureResultsType =
  | SearchIndexWrapped<'document', DocumentMeili>
  | SearchIndexWrapped<'disclosure', DisclosureMeili>

export const getDocumentsQueryKey = (filters: DocumentsFilters) => ['documents', filters]

export const documentsFetcher = (filters: DocumentsFilters) => {
  return meiliClient
    .index('search_index')
    .search<DocumentDisclosureResultsType>(filters.searchValue, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "document" OR type = "disclosure"',
        isDefined(filters.documentCategoryId)
          ? `document.documentCategory.id = ${filters.documentCategoryId}`
          : null,
        // Using quotes because disclosureType can contain spaces
        isDefined(filters.disclosureType) ? `disclosure.type = "${filters.disclosureType}"` : null,
      ].filter(isDefined),
      sort: [
        filters.sort === 'newest' ? 'commonAttributes.addedAtTimestamp:desc' : null,
        filters.sort === 'oldest' ? 'commonAttributes.addedAtTimestamp:asc' : null,
      ].filter(Boolean) as string[],
    })
    .then((response) => {
      const newHits = response.hits
        .map((hit) => {
          const { type } = hit
          const isDocument = type === 'document'
          const isDisclosure = type === 'disclosure'

          if (isDocument) {
            return {
              ...hit.document,
              category: hit.document.documentCategory.label,
              type,
            }
          }
          if (isDisclosure) {
            return {
              ...hit.disclosure,
              category: hit.disclosure.type,
              type,
            }
          }

          return null
        })
        .filter(isDefined)

      return { ...response, hits: newHits }
    })
}
