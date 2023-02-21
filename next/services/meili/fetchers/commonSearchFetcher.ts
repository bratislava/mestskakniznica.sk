import { DisclosureMeili, DocumentMeili } from '@services/meili/meiliTypes'
import { SearchResponse } from 'meilisearch'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { meiliClient } from '../meilisearch'
import { SearchIndexWrapped } from '../searchIndexWrapped'

export const allSearchTypes = [
  'page' as const,
  'blog-post' as const,
  'document' as const,
  'disclosure' as const,
  'event' as const,
  'notice' as const,
]

type CommonSearchResults =
  | SearchIndexWrapped<'page', { slug: string; title: string | null | undefined }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'blog-post', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'document', DocumentMeili>
  | SearchIndexWrapped<'disclosure', DisclosureMeili>
  | SearchIndexWrapped<'event', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'notice', { slug: string }> // TODO: Specify type if needed.

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type CommonSearchType = Unpacked<typeof allSearchTypes>

export interface CommonSearchFilters {
  searchValue: string
  pageSize: number
  page: number
  // If none are selected, all the types are displayed.
  selectedTypes: CommonSearchType[]
}

export type CommonSearchData = SearchResponse<CommonSearchResult>

export type CommonSearchResult = {
  type: CommonSearchType
  title: string
  id: number
  slug: string
}

export const getCommonSearchQueryKey = (filters: CommonSearchFilters, locale: string) => [
  'HomepageSearch',
  filters,
  locale,
]

export const commonSearchFetcher =
  (filters: CommonSearchFilters, locale: string) =>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  () => {
    // If no type is selected, no filters are generated, so all of them are displayed.
    const selectedTypesFilter = filters.selectedTypes.map((type) => `type = ${type}`).join(' OR ')

    return meiliClient
      .index('search_index')
      .search<CommonSearchResults>(filters.searchValue, {
        ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
        filter: [selectedTypesFilter, `locale = ${locale} OR locale NOT EXISTS`],
      })
      .then((response) => {
        const newHits = response.hits.map((hit) => {
          const { type } = hit

          // TODO: Fix types, but not worth it.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
          const dataInner = (hit as any)[type]

          return {
            type,
            title: dataInner.title,
            id: dataInner.id,
            slug: dataInner.slug,
          } as CommonSearchResult
        })

        return { ...response, hits: newHits }
      })
  }
