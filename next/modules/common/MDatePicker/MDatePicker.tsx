import 'react-datepicker/dist/react-datepicker.css'

import enIE from 'date-fns/locale/en-IE'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ReactDatePicker, { DatePickerProps, registerLocale } from 'react-datepicker'

import cn from '@/utils/cn'

/* https://unix.stackexchange.com/a/62317
 * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
registerLocale('en', enIE)
registerLocale('sk', sk)

type Props = DatePickerProps & {
  size?: 'respo' | 'small' | 'default'
}

const MDatePicker = ({ size = 'respo', ...props }: Props) => {
  const { i18n } = useTranslation()

  return (
    <div className="flex flex-col">
      <ReactDatePicker
        locale={i18n.language}
        {...props}
        className={cn('base-focus-ring base-input w-full placeholder:text-foreground-heading', {
          'px-3 py-2 lg:px-4 lg:py-3': size === 'respo',
          'px-3 py-2': size === 'small',
          'px-4 py-3': size === 'default',
        })}
        dateFormat="dd. MM. yyyy"
        calendarClassName="w-screen lg:w-auto"
      />
    </div>
  )
}

export default MDatePicker
