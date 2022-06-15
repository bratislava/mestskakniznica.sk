import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import { Input } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useCallback, useEffect,useState } from 'react'

export interface PaginationProps {
  max: number
  value: number
  onChangeNumber: (num: number) => void
  previousButtonAriaLabel?: string
  nextButtonAriaLabel?: string
  currentInputAriaLabel?: string
}

export function Pagination({
  max,
  value,
  onChangeNumber,
  previousButtonAriaLabel,
  nextButtonAriaLabel,
  currentInputAriaLabel,
}: PaginationProps) {
  const [displayValue, setDisplayValue] = useState(value.toString())

  useEffect(() => {
    setDisplayValue(value.toString())
  }, [value])

  const handleChange = useCallback(
    (ev) => {
      if (parseInt(ev.target.value) <= 0) {
        onChangeNumber(1)
        return
      }

      if (parseInt(ev.target.value) > max) {
        onChangeNumber(max)
        return
      }

      if (parseInt(ev.target.value)) {
        onChangeNumber(parseInt(ev.target.value))
        
      }
    },
    [onChangeNumber]
  )

  return (
    <div className="flex gap-x-6 items-center">
      <button
        className="p-1 cursor-pointer flex"
        onClick={() => {
          if (value - 1 > 0) onChangeNumber(value - 1)
        }}
        aria-label={previousButtonAriaLabel}
      >
        <ChevronLeft className="w-2 cursor-pointer" />
      </button>
      <div className="flex text-sm items-center gap-x-4">
        <Input
          labelClassName="sr-only"
          labelContent={currentInputAriaLabel}
          inputClassName={cx('text-sm text-center', {
            'w-10': value < 10,
            'w-auto': value >= 10,
          })}
          type="number"
          min={1}
          max={max}
          value={displayValue}
          onChange={(ev) => setDisplayValue(ev.target.value)}
          onKeyPress={(ev) => ev.key === 'Enter' && handleChange(ev)}
        />
        <span>/</span>
        <span>{max}</span>
      </div>
      <button
        className="p-1 cursor-pointer flex"
        onClick={() => {
          if (value + 1 <= max) onChangeNumber(value + 1)
        }}
        aria-label={nextButtonAriaLabel}
      >
        <ChevronRight className="w-2" />
      </button>
    </div>
  )
}
