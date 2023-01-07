import { bratislavaTimezone } from '@utils/consts'
import { useMemo } from 'react'
import { DateFormatterOptions, useDateFormatter } from 'react-aria'

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
      value: Date
    }
  | { valueType: 'ISO'; value: string }
  | { valueType: 'timestamp'; value: number }
)

const FormatDate = ({ value, format = 'default', valueType }: FormatDateProps) => {
  const date = useMemo(() => {
    if (valueType === 'ISO' || valueType === 'timestamp') {
      return new Date(value)
    }
    // valueType === 'date' || valueType === undefined
    return value
  }, [value, valueType])

  const formatter = useDateFormatter({ ...formats[format], timeZone: bratislavaTimezone })

  return <>{formatter.format(date)}</>
}

export default FormatDate
