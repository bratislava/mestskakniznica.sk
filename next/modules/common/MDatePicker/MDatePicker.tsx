import 'react-datepicker/dist/react-datepicker.css'

import enIE from 'date-fns/locale/en-IE'
import sk from 'date-fns/locale/sk'
import { useTranslation } from 'next-i18next'
import React, { ComponentProps } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

/* https://unix.stackexchange.com/a/62317
 * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
registerLocale('en', enIE)
registerLocale('sk', sk)

const MDatePicker = (props: ComponentProps<typeof ReactDatePicker>) => {
  const { i18n } = useTranslation()

  return <ReactDatePicker locale={i18n.language} {...props} />
}

export default MDatePicker
