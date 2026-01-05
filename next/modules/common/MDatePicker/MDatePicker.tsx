import 'react-datepicker/dist/react-datepicker.css'

import enIE from 'date-fns/locale/en-IE'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ReactDatePicker, { DatePickerProps, registerLocale } from 'react-datepicker'

/* https://unix.stackexchange.com/a/62317
 * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
registerLocale('en', enIE)
registerLocale('sk', sk)

const MDatePicker = (props: DatePickerProps) => {
  const { i18n } = useTranslation()

  return (
    <div>
      <ReactDatePicker
        locale={i18n.language}
        {...props}
        className="base-focus-ring w-full border border-border-dark px-3 py-2 placeholder:text-foreground-heading lg:px-4 lg:py-3"
        dateFormat="dd. MM. yyyy"
        calendarClassName="w-screen lg:w-auto"
      />
    </div>
  )
}

export default MDatePicker
