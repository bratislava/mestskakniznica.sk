import { Sort } from '@components/Atoms/SortSelect'
import { UploadFile } from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import { Enum_Disclosure_Type_Fixed } from '@utils/types'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { meiliClient } from '../meilisearch'
import { DisclosureMeili, DocumentMeili } from '../meiliTypes'
import { SearchIndexWrapped } from '../searchIndexWrapped'

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
      const newHits = response.hits.map((hit) => {
        const { type } = hit

        // TODO: Fix types, but not worth it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        const dataInner = (hit as any)[type]

        return {
          type,
          id: dataInner.id,
          title: dataInner.title,
          slug: dataInner.slug,
          addedAt: dataInner.addedAt,
          category: type === 'document' ? dataInner.documentCategory.label : dataInner.type,
          file: dataInner.file,
        } as {
          type: typeof hit.type
          id: string
          title: string
          slug: string
          addedAt: string
          category: string | null | undefined
          file: Omit<UploadFile, '__typename'>
        }
      })

      return { ...response, hits: newHits }
    })
}
