import { SearchResponse } from 'meilisearch'

import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { meiliClient } from '../meilisearch'
import { SearchIndexWrapped } from '../searchIndexWrapped'

export const allSearchTypes = [
  'page' as const,
  'blog-post' as const,
  'event' as const,
  'basic-document' as const,
  'notice' as const,
  // 'premise' as const,
]

type CommonSearchResults =
  | SearchIndexWrapped<'page', { slug: string; title: string | null | undefined }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'basic-document', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'blog-post', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'event', { slug: string }> // TODO: Specify type if needed.
  | SearchIndexWrapped<'notice', { slug: string }> // TODO: Specify type if needed.
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

export const getCommonSearchQueryKey = (filters: CommonSearchFilters, locale: string) => [
  'HomepageSearch',
  filters,
  locale,
]

export const commonSearchFetcher =
  (
    filters: CommonSearchFilters,
    locale: string,
    slugs: { event: string; notice: string; blog: string; document: string }
  ) =>
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

          const { slug, title } = dataInner

          const link = (() => {
            if (type === 'blog-post') {
              // TODO: use function to get full path
              return locale === 'sk' ? `${slugs.blog}${slug}` : `/en${slugs.blog}${slug}`
            }

            if (type === 'basic-document') {
              // TODO IMPORTANT: use function to get full path, fix undefined in url, add english url
              return locale === 'sk' ? `${slugs.document}${slug}` : `/en${slugs.document}${slug}`
            }

            if (type === 'event') {
              // TODO: use function to get full path
              return locale === 'sk' ? `${slugs.event}${slug}` : `/en${slugs.event}${slug}`
            }

            if (type === 'notice') {
              // TODO: use function to get full path
              return locale === 'sk' ? `${slugs.notice}${slug}` : `/en${slugs.notice}${slug}`
            }

            return `${dataInner.slug}`
          })()

          return { type, title, link, data: dataInner } as CommonSearchResult
        })

        return { ...response, hits: newHits }
      })
  }
