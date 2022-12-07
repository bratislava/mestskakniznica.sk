import 'react-datepicker/dist/react-datepicker.css'

import { Select } from '@bratislava/ui-city-library'
import enUs from 'date-fns/locale/en-US'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import DatePicker, { registerLocale } from 'react-datepicker'

import { usePageWrapperContext } from '../layouts/PageWrapper'

registerLocale('en', enUs)
registerLocale('sk', sk)

interface IEventOptionItem {
  key: string
  title: string
}

interface IEventFilters {
  startDate: Date | null
  endDate: Date | null
  onStartChange: (date: Date | null) => void
  onEndChange: (date: Date | null) => void
  tags: IEventOptionItem[]
  categories: IEventOptionItem[]
  localities: IEventOptionItem[]
  selectedEventTags: IEventOptionItem | null | undefined
  selectedCategory: IEventOptionItem | null | undefined
  selectedLocality: IEventOptionItem | null | undefined
  setSelectedEventTags: (data: IEventOptionItem | null | undefined) => void
  setSelectedCategory: (data: IEventOptionItem | null | undefined) => void
  setSelectedLocality: (data: IEventOptionItem | null | undefined) => void
}

const EventFilters = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  tags,
  categories,
  localities,
  selectedEventTags,
  selectedCategory,
  selectedLocality,
  setSelectedEventTags,
  setSelectedCategory,
  setSelectedLocality,
}: IEventFilters) => {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <>
      <div className="h-auto w-full border-b-[1px] border-b-[#000] px-3 text-sm text-[#000] lg:w-[268px] lg:border lg:border-gray-universal-200 lg:py-2">
        <DatePicker
          onChange={onStartChange}
          selected={startDate}
          chooseDayAriaLabelPrefix={t('dateAriaLabel')}
          className="my-5 w-full placeholder:text-gray-900 lg:my-0"
          placeholderText={t('eventsDateFrom')}
          dateFormat="dd. MM. yyyy"
          locale={locale === 'sk' ? 'sk' : 'en'}
          calendarClassName="w-screen lg:w-auto"
          shouldCloseOnSelect={false}
        />
      </div>
      <div className="h-auto w-full border-b-[1px] border-b-[#000] px-3 text-sm text-[#000] lg:w-[268px] lg:border lg:border-gray-universal-200 lg:py-2">
        <DatePicker
          onChange={onEndChange}
          selected={endDate}
          chooseDayAriaLabelPrefix={t('dateAriaLabel')}
          className="my-5 w-full placeholder:text-gray-900 lg:my-0"
          placeholderText={t('eventsDateTo')}
          dateFormat="dd. MM. yyyy"
          locale={locale === 'sk' ? 'sk' : 'en'}
          calendarClassName="w-screen lg:w-auto"
          shouldCloseOnSelect={false}
        />
      </div>
      <Select
        className="w-full border-b-[1px] border-b-[#000] py-3 lg:w-[268px] lg:border-0 lg:border-gray-universal-200"
        selectClassName="border-0 lg:border"
        options={tags}
        value={selectedEventTags ?? tags[0].title}
        onChange={(ev) => setSelectedEventTags(ev)}
      />
      <Select
        className="w-full border-b-[1px] border-b-[#000] py-3 lg:w-[268px] lg:border-0 lg:border-gray-universal-200"
        selectClassName="border-0 lg:border"
        options={categories}
        value={selectedCategory ?? categories[0].title}
        onChange={(ev) => setSelectedCategory(ev)}
      />
      <Select
        className="w-full border-b-[1px] border-b-[#000] py-3 lg:w-[268px] lg:border-0 lg:border-gray-universal-200"
        selectClassName="border-0 lg:border"
        options={localities}
        value={selectedLocality ?? localities[0].title}
        onChange={(ev) => setSelectedLocality(ev)}
      />
    </>
  )
}

export default EventFilters
