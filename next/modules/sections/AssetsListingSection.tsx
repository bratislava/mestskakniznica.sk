import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next/pages'
import React, { useEffect } from 'react'

import { FolderIcon } from '@/assets/icons'
import AssetsCategorySelect from '@/components/Atoms/Assets/AssetsCategorySelect'
import SearchField from '@/components/Atoms/SearchField'
import SortSelect, { Sort } from '@/components/Atoms/SortSelect'
import { Pagination } from '@/components/ui'
import { useSearch } from '@/hooks/useSearch'
import AssetRow from '@/modules/cards-and-rows/AssetRow'
import {
  assetsDefaultFilters,
  assetsFetcher,
  AssetsFilters,
  getAssetsQueryKey,
} from '@/services/meili/fetchers/assetsFetcher'
import { useNavikronos } from '@/utils/navikronos'
import { Enum_Disclosure_Type_Fixed } from '@/utils/types'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

const AssetsListingSection = () => {
  const { t } = useTranslation()
  const { getPathForEntity } = useNavikronos()

  // TODO add scroll to results

  const [filters, setFilters] = useRoutePreservedState<AssetsFilters>(assetsDefaultFilters)

  const { input, setInput, searchValue, setSearchValue } = useSearch({ syncWithUrlQuery: false })

  const { data } = useQuery({
    queryKey: getAssetsQueryKey(filters),
    queryFn: () => assetsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    if (
      categoryId &&
      Object.values(Enum_Disclosure_Type_Fixed).includes(categoryId as Enum_Disclosure_Type_Fixed)
    ) {
      setFilters({
        ...filters,
        page: 1,
        assetCategoryId: null,
        disclosureType: categoryId as Enum_Disclosure_Type_Fixed,
      })
    } else {
      setFilters({ ...filters, page: 1, assetCategoryId: categoryId, disclosureType: null })
    }
  }

  const handleSortChange = (sort: Sort) => {
    setFilters({ ...filters, page: 1, sort })
  }

  useEffect(() => {
    if (filters.searchValue === searchValue) {
      return
    }

    setFilters((prevFilters) => ({ ...prevFilters, page: 1, searchValue }))
  }, [filters.searchValue, searchValue, setFilters])

  // TODO: Advanced data fetching + no results message

  return (
    <>
      <div className="mt-6 mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <SearchField
            placeholder={t('whatAreYouLookingFor')}
            className="text-base"
            isLarge
            input={input}
            setInput={setInput}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="md:col-span-2">
          <AssetsCategorySelect onCategoryChange={handleCategoryChange} />
        </div>
        <SortSelect onChange={handleSortChange} defaultSelected={filters.sort} />
      </div>

      <div className="mt-6 border-y border-border-dark pb-10 lg:mt-16 lg:pb-32">
        {/* Assets */}
        {data?.hits.map((asset) => {
          const { id, title, type, slug, file, category } = asset
          const metadata = type === 'disclosure' && asset.contractor ? asset.contractor : undefined

          let badgeExt: string | React.JSX.Element
          if (Array.isArray(file)) {
            badgeExt =
              file.length > 1 ? (
                <FolderIcon />
              ) : (
                (file[0]?.ext?.toUpperCase().replace('.', '') ?? '')
              )
          } else {
            badgeExt = file?.ext?.toUpperCase().replace('.', '') ?? ''
          }

          return (
            <AssetRow
              key={id}
              title={title}
              linkHref={getPathForEntity({ type, slug }) ?? '#'}
              fileExt={badgeExt}
              category={category}
              addedAt={type === 'disclosure' ? asset.addedAt : asset.publishedAt}
              metadata={metadata}
            />
          )
        })}
        {data?.estimatedTotalHits ? (
          <div className="mt-6 flex justify-center lg:justify-end">
            <Pagination
              max={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
              onChangeNumber={handlePageChange}
              value={filters.page}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default AssetsListingSection
