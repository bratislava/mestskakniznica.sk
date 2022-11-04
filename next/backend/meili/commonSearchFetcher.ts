import { meiliClient } from '@utils/meilisearch'
import { SearchResponse } from 'meilisearch'
import { Key } from 'swr'

import { getMeilisearchPageOptions } from './getMeilisearchPageOptions'
import { SearchIndexWrapped } from './searchIndexWrapped'

export const allSearchTypes = [
  'page' as const,
  // 'article' as const,
]

type CommonSearchResults = SearchIndexWrapped<'page', { slug: string; title: string | null | undefined }> // TODO: Specify type if needed.
// | SearchIndexWrapped<'article', { slug: string }> // TODO: Specify type if needed.

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
  link: string
}

export const getCommonSearchSwrKey = (filters: CommonSearchFilters, locale: string) =>
  ['HomepageSearch', filters, locale] as Key

export const commonSearchFetcher = (filters: CommonSearchFilters, locale: string) => () => {
  // If no type is selected, no filters are generated, so all of them are displayed.
  const selectedTypesFilter = filters.selectedTypes.map((type) => `type = ${type}`).join(' OR ')

  return meiliClient
    .index('search_index')
    .search<CommonSearchResults>(filters.searchValue, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        selectedTypesFilter,
        `locale = ${locale} OR locale NOT EXISTS`,
      ],
    })
    .then((response) => {
      const newHits = response.hits.map((hit) => {
        const { type } = hit

        // TODO: Fix types, but not worth it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        const dataInner = (hit as any)[type]

        const { title, slug: link } = dataInner
        return { type, title, link, data: dataInner } as CommonSearchResult
      })

      return { ...response, hits: newHits }
    })
}