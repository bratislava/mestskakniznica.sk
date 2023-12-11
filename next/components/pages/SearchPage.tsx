import { ChevronRightIcon } from '@assets/icons'
import { PageTitle, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import {
  allSearchTypes,
  commonSearchFetcher,
  CommonSearchFilters,
  CommonSearchType,
  getCommonSearchQueryKey,
} from '@services/meili/fetchers/commonSearchFetcher'
import { useNavikronos } from '@utils/navikronos'
import cx from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { usePlausible } from 'next-plausible'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useDebounce } from 'usehooks-ts'

import { useSearch } from '../../hooks/useSearch'
import { AnimateHeight } from '../Atoms/AnimateHeight'
import SearchField from '../Atoms/SearchField'
import TagToggle from '../Atoms/TagToggle'

const SearchPage = () => {
  const { t, i18n } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()
  const plausible = usePlausible()

  const resultsRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState<CommonSearchFilters>({
    searchValue: '',
    pageSize: 10,
    page: 1,
    selectedTypes: [],
  })

  const isNothingSelected = filters.selectedTypes.length === 0

  const deselectAll = useCallback(() => {
    setFilters({ ...filters, selectedTypes: [], page: 1 })
  }, [filters])

  const isTypeSelected = useCallback(
    (type: CommonSearchType) => {
      return filters.selectedTypes.includes(type)
    },
    [filters]
  )

  const changeTypeSelected = useCallback(
    (changedType: CommonSearchType) => {
      return (value: boolean) => {
        const newSelectedTypes = value
          ? [...filters.selectedTypes, changedType]
          : filters.selectedTypes.filter((type) => type !== changedType)

        setFilters({ ...filters, selectedTypes: newSelectedTypes })
      }
    },
    [filters]
  )

  const { input, setInput, searchValue, setSearchValue } = useSearch({ syncWithUrlQuery: true })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, searchValue }))
  }, [searchValue])

  // TODO: Advanced loading and data fetching
  const { data, isLoading } = useQuery({
    queryKey: getCommonSearchQueryKey(filters, i18n.language),
    queryFn: commonSearchFetcher(filters, i18n.language),
    keepPreviousData: true,
  })

  const debouncedInputForPlausible = useDebounce<string>(filters.searchValue, 2000)
  const [lastInputForPlausible, setLastInputForPlausible] = useState<string>('')
  useEffect(() => {
    const sanitizedInput = debouncedInputForPlausible.toLowerCase().trim().replace(/\s\s+/g, ' ')
    if (sanitizedInput.length > 2 && sanitizedInput !== lastInputForPlausible) {
      plausible('Vyhladavanie', {
        props: {
          Query: sanitizedInput,
          Language: i18n.language,
        },
      })
      setLastInputForPlausible(sanitizedInput)
    }
  }, [debouncedInputForPlausible])

  const { breadcrumbs } = useNavikronos()

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={t('searchTitle')} hasDivider={false} />
        <div className="mt-6 flex flex-col gap-y-4 lg:flex-row lg:gap-y-0">
          <SearchField
            className="h-16"
            input={input}
            setInput={setInput}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="mt-5 flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center">
          <div className="flex w-full items-center gap-3 overflow-auto pb-3 sm:pb-0">
            <TagToggle isSelected={isNothingSelected} onChange={deselectAll}>
              {t('allResults')}
            </TagToggle>
            {allSearchTypes.map((type) => {
              return (
                <TagToggle
                  isSelected={isTypeSelected(type)}
                  onChange={changeTypeSelected(type)}
                  key={type}
                >
                  {t(`searchTags.${type}`)}
                </TagToggle>
              )
            })}
          </div>
        </div>

        <h2 className="sr-only">{t('searchResults')}</h2>
        <div className="mt-5 text-[16px] text-foreground-placeholder">
          {t('resultsFound', { count: data?.estimatedTotalHits ?? 0 })}
        </div>

        {/* eslint-disable-next-line sonarjs/no-redundant-boolean */}
        <div className="mt-12 flex flex-col gap-6">
          <AnimateHeight isVisible>
            {isLoading ? (
              <>
                {Array.from({ length: filters.pageSize }, (_, index) => (
                  <div key={index} role="status" className="w-full animate-pulse select-none gap-3">
                    <div className="group flex w-full flex-col justify-between border-b border-border-dark bg-white py-4 pr-2">
                      <div className="mb-4 h-2.5 w-48 rounded-full bg-foreground-placeholder" />
                      <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-foreground-placeholder" />
                    </div>
                  </div>
                ))}
              </>
            ) : data?.estimatedTotalHits === 0 ? (
              <motion.div
                initial={{ y: 48 }}
                animate={{ y: 0 }}
                className="flex justify-center py-8 text-lg"
              >
                {t('resultsFound', { count: 0 })}
              </motion.div>
            ) : (
              <div ref={resultsRef} className="flex flex-col">
                {data?.hits.map(({ title, type, id, slug }, index) => {
                  const link = getPathForEntity(
                    type === 'page' ? { type, id: String(id) } : { type, slug }
                  )

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Link key={index} href={link ?? '#'}>
                      <div
                        className={cx(
                          'group flex items-center justify-between border-b border-border-dark bg-white py-4 pr-2'
                        )}
                      >
                        <div className="flex items-center gap-x-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-x-4">
                              <h2>{title}</h2>
                              <span className="rounded-[4px] border border-dark px-2 py-[3px] text-[12px] leading-[12px]">
                                {/* TODO proper translation keys */}
                                {t(`searchTags.${type}`)}
                              </span>
                            </div>
                            <div className="flex items-center gap-x-3 text-xs text-foreground-body">
                              <span>{link}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRightIcon className="ml-4 shrink-0" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </AnimateHeight>
          {data?.estimatedTotalHits ? (
            <div className="flex justify-center">
              <Pagination
                max={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
                onChangeNumber={handlePageChange}
                value={filters.page}
                previousButtonAriaLabel={t('previousPage')}
                nextButtonAriaLabel={t('nextPage')}
                currentInputAriaLabel={t('currentPage')}
              />
            </div>
          ) : null}
        </div>
      </SectionContainer>
    </>
  )
}

export default SearchPage
