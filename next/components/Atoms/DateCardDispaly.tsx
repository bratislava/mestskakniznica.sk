import cx from 'classnames'

import { dayForDifferentDateTo } from '../../utils/utils'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface DateCardProps {
  dateFrom: string
  dateTo: string
  textSize: string
  wrapperClass?: string
}

function DateCardDisplay({ dateFrom, dateTo, textSize, wrapperClass }: DateCardProps) {
  const { locale } = usePageWrapperContext()
  const { day, month } = dayForDifferentDateTo(new Date(dateFrom), new Date(dateTo))

  const text = locale == 'en' ? `${month}. ${day}.` : `${day}. ${month}.`

  return (
    <div className={cx('m-auto text-center', wrapperClass)}>
      <div className={cx(textSize)}>{text}</div>
      {/* <div className="text-xs capitalize">{month}</div> */}
    </div>
  )
}

export default DateCardDisplay
