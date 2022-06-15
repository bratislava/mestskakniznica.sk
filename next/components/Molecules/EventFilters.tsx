import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import sk from 'date-fns/locale/sk'
import enUs from 'date-fns/locale/en-US'
import { Select } from '@bratislava/ui-city-library'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import { useTranslation } from 'next-i18next'

registerLocale('en', enUs)
registerLocale('sk', sk)

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
}) => {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()

  return (
    <>
      <div
        className={
          'h-auto lg:py-2 px-3 text-sm lg:w-[268px] lg:border lg:border-gray-universal-200 border-b-[1px] border-b-[#000] text-[#000] w-full'
        }
      >
        <DatePicker
          onChange={onStartChange}
          selected={startDate}
          chooseDayAriaLabelPrefix={t('dateAriaLabel')}
          className="w-full placeholder-gray-900 my-5 lg:my-0"
          placeholderText={t('eventsDateFrom')}
          dateFormat="dd. MM. yyyy"
          locale={locale === 'sk' ? 'sk' : 'en'}
          calendarClassName="w-screen lg:w-auto"
          shouldCloseOnSelect={false}
        />
      </div>
      <div
        className={
          'h-auto lg:py-2 px-3 text-sm lg:w-[268px] lg:border lg:border-gray-universal-200 border-b-[1px] border-b-[#000] text-[#000] w-full'
        }
      >
        <DatePicker
          onChange={onEndChange}
          selected={endDate}
          chooseDayAriaLabelPrefix={t('dateAriaLabel')}
          className="w-full placeholder-gray-900 my-5 lg:my-0"
          placeholderText={t('eventsDateTo')}
          dateFormat="dd. MM. yyyy"
          locale={locale === 'sk' ? 'sk' : 'en'}
          calendarClassName="w-screen lg:w-auto"
          shouldCloseOnSelect={false}
        />
      </div>
      <Select
        className={'py-3 w-full border-b-[1px] border-b-[#000] lg:border-gray-universal-200 lg:border-0 lg:w-[268px]'}
        selectClassName={'border-0 lg:border'}
        options={tags}
        value={selectedEventTags ?? tags[0].title}
        onChange={(ev) => setSelectedEventTags(ev)}
      />
      <Select
        className={'py-3 w-full border-b-[1px] border-b-[#000] lg:border-gray-universal-200 lg:border-0 lg:w-[268px]'}
        selectClassName={'border-0 lg:border'}
        options={categories}
        value={selectedCategory ?? categories[0].title}
        onChange={(ev) => setSelectedCategory(ev)}
      />
      <Select
        className={'py-3 w-full border-b-[1px] border-b-[#000] lg:border-gray-universal-200 lg:border-0 lg:w-[268px]'}
        selectClassName={'border-0 lg:border'}
        options={localities}
        value={selectedLocality ?? localities[0].title}
        onChange={(ev) => setSelectedLocality(ev)}
      />
    </>
  )
}

export default EventFilters
