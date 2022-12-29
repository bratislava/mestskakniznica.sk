import { now, parseAbsolute } from '@internationalized/date'
import { bratislavaTimezone } from '@utils/consts'
import cx from 'classnames'
import { useMemo } from 'react'
import { useDateFormatter } from 'react-aria'

interface DateCardProps {
  dateFrom: string
  dateTo: string
  textSize: string
  wrapperClass?: string
}

const EventDetailsDateBox = ({ dateFrom, dateTo, textSize, wrapperClass }: DateCardProps) => {
  const formatter = useDateFormatter({
    day: 'numeric',
    month: 'numeric',
    timeZone: bratislavaTimezone,
  })

  const dateToDisplay = useMemo(() => {
    if (!dateFrom) {
      return null
    }
    const from = parseAbsolute(dateFrom, bratislavaTimezone)
    if (!dateTo) {
      return formatter.format(from.toDate())
    }

    const to = parseAbsolute(dateTo, bratislavaTimezone)
    const nowZoned = now(bratislavaTimezone)

    const startsBeforeNow = from.compare(nowZoned) < 0
    const endsAfterNow = to.compare(nowZoned) > 0

    // The event is currently happening. We display the current date.
    if (startsBeforeNow && endsAfterNow) {
      return formatter.format(nowZoned.toDate())
    }
    // The event is in the future. We display the start date.
    if (!startsBeforeNow) {
      return formatter.format(from.toDate())
    }
    // The event is in the past. We display the end date.
    if (!endsAfterNow) {
      return formatter.format(to.toDate())
    }

    return null
  }, [formatter, dateFrom, dateTo])

  return (
    <div className={cx('m-auto text-center', wrapperClass)}>
      <div className={cx(textSize)}>{dateToDisplay}</div>
      {/* <div className="text-sm capitalize">{month}</div> */}
    </div>
  )
}

export default EventDetailsDateBox
