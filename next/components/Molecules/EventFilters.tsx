import { useControlledState } from '@react-stately/utils'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useToggleState } from 'react-stately'

import DropdownIcon from '@/assets/images/dropdown.svg'
import { FilterModal } from '@/components/Molecules/FilterModal'
import { Select } from '@/components/ui'
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
}

const Inner = ({ filters: filtersInput, onFiltersChange }: EventFiltersProps) => {
  const { t, i18n } = useTranslation('common')

  const defaultFiltersValue = useMemo(() => ({ locale: i18n.language }), [i18n.language])

  const [filters, setFilters] = useControlledState(
    filtersInput,
    defaultFiltersValue,
    onFiltersChange
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
    }))
    return [{ key: '', title: t('eventFilters.eventType') }, ...parsedTypes]
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

  const handleDateFromChange = (dateFrom: Date) => {
    setFilters({ ...filters, dateFrom })
  }

  const handleDateToChange = (dateTo: Date) => {
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
    <div className="flex grow flex-col">
      <div className="flex grow flex-col items-center gap-x-5 lg:mt-3 lg:flex-row">
        <div className="h-auto w-full border-b-[1px] border-b-[#000] px-3 text-base text-[#000] lg:border lg:border-border-light lg:py-2">
          <MDatePicker
            selected={filters.dateFrom}
            onChange={handleDateFromChange}
            chooseDayAriaLabelPrefix={t('eventFilters.dateAriaLabel')}
            className="my-5 w-full placeholder:text-foreground-heading lg:my-0"
            placeholderText={t('eventFilters.eventsDateFrom')}
            dateFormat="dd. MM. yyyy"
            calendarClassName="w-screen lg:w-auto"
            shouldCloseOnSelect={false}
          />
        </div>
        <div className="h-auto w-full border-b-[1px] border-b-[#000] px-3 text-base text-[#000] lg:border lg:border-border-light lg:py-2">
          <MDatePicker
            selected={filters.dateTo}
            onChange={handleDateToChange}
            chooseDayAriaLabelPrefix={t('eventFilters.dateAriaLabel')}
            className="my-5 w-full placeholder:text-foreground-heading lg:my-0"
            placeholderText={t('eventFilters.eventsDateTo')}
            dateFormat="dd. MM. yyyy"
            calendarClassName="w-screen lg:w-auto"
            shouldCloseOnSelect={false}
          />
        </div>
        <Select
          className="w-full border-b-[1px] border-b-[#000] py-3 lg:border-0 lg:border-border-light"
          selectClassName="border-0 lg:border"
          options={tags}
          value={filters.eventTypeId ?? ''}
          onChange={(ev) => handleEventTypeIdChange(ev.key)}
        />
        <Select
          className="w-full border-b-[1px] border-b-[#000] py-3 lg:border-0 lg:border-border-light"
          selectClassName="border-0 lg:border"
          options={categories}
          value={filters.eventCategoryId ?? ''}
          onChange={(ev) => handleEventCategoryIdChange(ev.key)}
        />
        <Select
          className="w-full border-b-[1px] border-b-[#000] py-3 lg:border-0 lg:border-border-light"
          selectClassName="border-0 lg:border"
          options={localities}
          value={filters.eventBranchId ?? ''}
          onChange={(ev) => handleEventBranchIdChange(ev.key)}
        />
      </div>

      <div className="shrink-0 p-3 text-center lg:mt-3 lg:p-0 lg:text-right">
        <Button variant="secondary" className="w-1/2 uppercase lg:w-max" onPress={resetFilters}>
          {t('eventFilters.resetFilters')}
        </Button>
      </div>
    </div>
  )
}

const EventFilters = ({ filters, onFiltersChange }: EventFiltersProps) => {
  const { t } = useTranslation('common')

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { isSelected, toggle } = useToggleState({ defaultSelected: false })

  return (
    <div className="mt-4 mb-6 lg:mb-8 lg:mt-6 lg:block lg:border lg:border-border-dark lg:p-6">
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
            <Inner filters={filters} onFiltersChange={onFiltersChange} />
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
