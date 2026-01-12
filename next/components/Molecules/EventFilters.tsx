import { useControlledState } from '@react-stately/utils'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo } from 'react'
import { useToggleState } from 'react-stately'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import DropdownIcon from '@/assets/images/dropdown.svg'
import SelectField, { SelectItem } from '@/components/Atoms/SelectField'
import { FilterModal } from '@/components/Molecules/FilterModal'
import Button from '@/modules/common/Button'
import MDatePicker from '@/modules/common/MDatePicker/MDatePicker'
import {
  eventPropertiesFetcher,
  getEventPropertiesQueryKey,
} from '@/services/graphql/fetchers/event-properties.fetcher'
import { EventsFiltersShared } from '@/services/meili/fetchers/eventsFetcher'

type EventFiltersProps = {
  filters: EventsFiltersShared
  onFiltersChange: (filters: EventsFiltersShared) => void
   
  onModalClose?: () => void
}

const Inner = ({ filters: filtersInput, onFiltersChange, onModalClose }: EventFiltersProps) => {
  const { t, i18n } = useTranslation()

  const defaultFiltersValue = useMemo(() => ({ locale: i18n.language }), [i18n.language])

  const [tagFromQueryParam] = useQueryParam('tag', withDefault(StringParam, ''))

  const [filters, setFilters] = useControlledState<EventsFiltersShared>(
    filtersInput,
    defaultFiltersValue,
    onFiltersChange,
  )

  // There's no need to handle loading, as the data are prefetched and never change.
  const { data: eventPropertiesData } = useQuery({
    queryKey: getEventPropertiesQueryKey(i18n.language),
    queryFn: () => eventPropertiesFetcher(i18n.language),
    staleTime: Infinity, // The data are static and don't need to be reloaded.
  })

  const tags = useMemo(() => {
    const eventTags = eventPropertiesData?.eventTags?.data ?? []
    const parsedTypes = eventTags.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
      slug: attributes?.slug ?? '',
    }))

    return [{ key: '', title: t('eventFilters.eventType'), slug: '' }, ...parsedTypes]
  }, [eventPropertiesData?.eventTags?.data, t])

  const categories = useMemo(() => {
    const eventCategories = eventPropertiesData?.eventCategories?.data ?? []
    const parsedCategories = eventCategories.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
    }))

    return [{ key: '', title: t('eventFilters.eventCategory') }, ...parsedCategories]
  }, [eventPropertiesData?.eventCategories?.data, t])

  const localities = useMemo(() => {
    const eventBranches = eventPropertiesData?.branches?.data ?? []
    const parsedLocalities = eventBranches.map(({ attributes, id }) => ({
      key: id ?? '',
      title: attributes?.title ?? '',
    }))

    return [{ key: '', title: t('eventFilters.eventLocality') }, ...parsedLocalities]
  }, [eventPropertiesData?.branches?.data, t])

  // TODO rewrite so we can enable exhaustive-deps rule
  useEffect(() => {
    if (tagFromQueryParam) {
      const found = tags.find((tag) => tag.slug === tagFromQueryParam)
      if (found) {
        onFiltersChange({ ...filtersInput, eventTypeId: found.key })
      }
    }
     
  }, [tagFromQueryParam])

  const handleDateFromChange = (dateFrom: Date | null) => {
    setFilters({ ...filters, dateFrom })
  }

  const handleDateToChange = (dateTo: Date | null) => {
    setFilters({ ...filters, dateTo })
  }

  const handleEventTypeIdChange = (eventTypeId: string) => {
    setFilters({ ...filters, eventTypeId })
  }

  const handleEventCategoryIdChange = (eventCategoryId: string) => {
    setFilters({ ...filters, eventCategoryId })
  }

  const handleEventBranchIdChange = (eventBranchId: string) => {
    setFilters({ ...filters, eventBranchId })
  }

  const resetFilters = () => {
    setFilters(defaultFiltersValue)
  }

  return (
    <div className="flex flex-col max-lg:h-full max-lg:justify-between lg:mt-3">
      <div className="grid items-center gap-x-5 gap-y-4 py-2 max-lg:p-4 lg:grid-cols-5">
        <MDatePicker
          selected={filters.dateFrom}
          onChange={handleDateFromChange}
          chooseDayAriaLabelPrefix={t('eventFilters.dateAriaLabel')}
          placeholderText={t('eventFilters.eventsDateFrom')}
          shouldCloseOnSelect={false}
          size="small"
        />
        <MDatePicker
          selected={filters.dateTo}
          onChange={handleDateToChange}
          chooseDayAriaLabelPrefix={t('eventFilters.dateAriaLabel')}
          placeholderText={t('eventFilters.eventsDateTo')}
          shouldCloseOnSelect={false}
          size="small"
        />
        <SelectField
          aria-label={t('eventFilters.eventType')}
          items={tags}
          selectedKey={filters.eventTypeId ?? ''}
          onSelectionChange={(selectedKey) => { handleEventTypeIdChange(selectedKey as string); }}
          size="small"
        >
          {(item) => <SelectItem label={item.title} id={item.key} />}
        </SelectField>
        <SelectField
          aria-label={t('eventFilters.eventCategory')}
          items={categories}
          selectedKey={filters.eventCategoryId ?? ''}
          onSelectionChange={(selectedKey) => { handleEventCategoryIdChange(selectedKey as string); }}
          size="small"
        >
          {(item) => <SelectItem label={item.title} id={item.key} />}
        </SelectField>
        <SelectField
          aria-label={t('eventFilters.eventLocality')}
          items={localities}
          selectedKey={filters.eventBranchId ?? ''}
          onSelectionChange={(selectedKey) => { handleEventBranchIdChange(selectedKey as string); }}
          size="small"
        >
          {(item) => <SelectItem label={item.title} id={item.key} />}
        </SelectField>
      </div>

      <div className="flex shrink-0 flex-col gap-2 max-lg:p-4 lg:mt-3 lg:items-end lg:p-0">
        <Button variant="secondary" className="" onPress={resetFilters}>
          {t('eventFilters.resetFilters')}
        </Button>

        {onModalClose ? (
          <Button variant="primary" className="lg:hidden" onPress={() => { onModalClose?.(); }}>
            {t('eventFilters.useFilters')}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

const EventFilters = ({ filters, onFiltersChange }: EventFiltersProps) => {
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { isSelected, toggle } = useToggleState({ defaultSelected: false })

  return (
    <div className="mb-6 mt-4 lg:mb-8 lg:mt-6 lg:block lg:border lg:border-border-dark lg:p-6">
      {/* Mobile */}
      <div className="flex w-full items-center justify-between border border-border-dark p-4 lg:hidden">
        {/* TODO accessibility 'more content' */}
        <Button
          variant="unstyled"
          className="z-10 flex w-full items-center justify-between gap-y-5"
          onPress={toggle}
        >
          {t('eventsFilter')}
          <DropdownIcon />
        </Button>
        {isSelected && (
          <FilterModal onClose={toggle} title={t('eventsFilter')}>
            <Inner filters={filters} onFiltersChange={onFiltersChange} onModalClose={toggle} />
          </FilterModal>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <h4 className="text-h4">{t('eventsFilter')}</h4>
        </div>
        <Inner filters={filters} onFiltersChange={onFiltersChange} />
      </div>
    </div>
  )
}

export default EventFilters
