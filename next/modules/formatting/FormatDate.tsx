import { useMemo } from 'react'
import { DateFormatterOptions, useDateFormatter } from 'react-aria'

import { bratislavaTimezone } from '@/utils/consts'
import { isDefined } from '@/utils/isDefined'

/**
 * It's hard to make up a name, name the format by the first usage. Then at the end we can change the naming.
 */
const formats = {
  default: { year: 'numeric', month: 'numeric', day: 'numeric' } as DateFormatterOptions,
}

// Copied from: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/components/atoms/FormatDate.tsx

type FormatDateProps = {
  format?: keyof typeof formats
} & (
  | {
      valueType?: 'date' // default value
      value?: Date | null
    }
  | { valueType: 'ISO'; value?: string | null }
  | { valueType: 'timestamp'; value?: number | null }
)

const FormatDate = ({ value, format = 'default', valueType }: FormatDateProps) => {
  const date = useMemo(() => {
    if (!isDefined(value)) {
      return null
    }
    if (valueType === 'ISO' || valueType === 'timestamp') {
      return new Date(value)
    }
    // valueType === 'date' || valueType === undefined

    return value
  }, [value, valueType])

  const formatter = useDateFormatter({ ...formats[format], timeZone: bratislavaTimezone })

  // A missing value renders nothing instead of "Invalid Date".
  return date ? <>{formatter.format(date)}</> : null
}

export default FormatDate
