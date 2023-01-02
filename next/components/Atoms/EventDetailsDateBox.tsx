import { now, parseAbsolute } from '@internationalized/date'
import { bratislavaTimezone } from '@utils/consts'
import { useMemo } from 'react'
import { useDateFormatter } from 'react-aria'
import { twMerge } from 'tailwind-merge'

interface DateCardProps {
  dateFrom: string
  dateTo: string
  textClassname: string
  wrapperClassname?: string
}

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1566%3A19420&t=kXVnnkaG3JsS4Q8o-0
 */
const EventDetailsDateBox = ({
  dateFrom,
  dateTo,
  textClassname,
  wrapperClassname,
}: DateCardProps) => {
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
    <div className={twMerge('m-auto text-center text-foreground-dark', wrapperClassname)}>
      <div className={textClassname}>{dateToDisplay}</div>
    </div>
  )
}

export default EventDetailsDateBox
