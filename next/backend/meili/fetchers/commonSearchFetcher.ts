import { meiliClient } from '@utils/meilisearch'
import { SearchResponse } from 'meilisearch'
import { Key } from 'swr'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { SearchIndexWrapped } from '../searchIndexWrapped'

export const allSearchTypes = [
  'page' as const,
  'blog-post' as const,
  'event' as const,
  'basic-document' as const,
  // 'premise' as const,
]

type CommonSearchResults =
  | SearchIndexWrapped<'page', { slug: string; title: string | null | undefined }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'basic-document', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'blog-post', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'event', { slug: string }> // TODO: Specify type if needed.
// | SearchIndexWrapped<'premise', { url: string }> // TODO: Specify type if needed.

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
      filter: [selectedTypesFilter, `locale = ${locale} OR locale NOT EXISTS`],
    })
    .then((response) => {
      const newHits = response.hits.map((hit) => {
        const { type } = hit

        // TODO: Fix types, but not worth it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        const dataInner = (hit as any)[type]

        if (type === 'blog-post') {
          const { title, slug } = dataInner
          // TODO: use function to get full path
          const link =
            locale === 'sk'
              ? `sluzby/vzdelavanie/clanky/${slug}`
              : `en/services/education/articles/${slug}`
          return { type, title, link, data: dataInner } as CommonSearchResult
        }

        if (type === 'basic-document') {
          const { title, slug } = dataInner
          // TODO IMPORTANT: use function to get full path, fix undefined in url, add english url
          const link =
            locale === 'sk'
              ? `o-nas/dokumenty-a-zverejnovanie-informacii/${slug}`
              : `en/about-us/documents-and-public-disclosure-of-information/${slug}`
          return { type, title, link, data: dataInner } as CommonSearchResult
        }

        const { title, slug: link } = dataInner
        return { type, title, link, data: dataInner } as CommonSearchResult
      })

      return { ...response, hits: newHits }
    })
}
