import { Sort } from '@/components/Atoms/SortSelect'
import { getMeilisearchPageOptions } from '@/services/meili/getMeilisearchPageOptions'
import { meiliClient } from '@/services/meili/meilisearch'
import { AssetMeili, DisclosureMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped } from '@/services/meili/searchIndexWrapped'
import { isDefined } from '@/utils/isDefined'
import { Enum_Disclosure_Type_Fixed } from '@/utils/types'

export type AssetsFilters = {
  pageSize: number
  searchValue: string
  assetCategoryId: string | null
  disclosureType: Enum_Disclosure_Type_Fixed | null
  page: number
  sort: Sort
}

export const assetsDefaultFilters: AssetsFilters = {
  pageSize: 6,
  searchValue: '',
  page: 1,
  assetCategoryId: null,
  disclosureType: null,
  sort: 'newest',
}

type AssetDisclosureResultsType =
  | SearchIndexWrapped<'asset', AssetMeili>
  | SearchIndexWrapped<'disclosure', DisclosureMeili>

export const getAssetsQueryKey = (filters: AssetsFilters) => ['assets', filters]

export const assetsFetcher = (filters: AssetsFilters) => {
  return meiliClient
    .index('search_index')
    .search<AssetDisclosureResultsType>(filters.searchValue, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "asset" OR type = "disclosure"',
        isDefined(filters.assetCategoryId)
          ? `asset.assetCategory.id = ${filters.assetCategoryId}`
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
          const isAsset = type === 'asset'
          const isDisclosure = type === 'disclosure'

          if (isAsset) {
            return {
              ...hit.asset,
              category: hit.asset.assetCategory.label,
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
