import { useNumberFormatter } from 'react-aria'

const FormatCurrency = ({ value }: { value: number }) => {
  const formatter = useNumberFormatter({
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  })

  return <>{formatter.format(value)}</>
}

export default FormatCurrency
