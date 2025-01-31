import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useState } from 'react'

import ChevronLeft from '@/assets/images/chevron-left.svg'
import ChevronRight from '@/assets/images/chevron-right.svg'
import { Input } from '@/components/ui'
import Button from '@/modules/common/Button'

export interface PaginationProps {
  max: number
  value: number
  onChangeNumber: (num: number) => void
}

export const Pagination = ({ max, value, onChangeNumber }: PaginationProps) => {
  const { t } = useTranslation()

  const [displayValue, setDisplayValue] = useState(value.toString())

  useEffect(() => {
    setDisplayValue(value.toString())
  }, [value])

  const handleChange = useCallback(
    (ev: React.BaseSyntheticEvent) => {
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
    [max, onChangeNumber]
  )

  return (
    <div className="flex items-center gap-x-3">
      <Button
        className="p-4"
        variant="plain-primary"
        onPress={() => {
          if (value - 1 > 0) onChangeNumber(value - 1)
        }}
        aria-label={t('pagination.previousPage')}
      >
        <ChevronLeft className="w-2" />
      </Button>
      <div className="flex items-center gap-x-4 text-base">
        <Input
          labelClassName="sr-only"
          labelContent={t('pagination.currentPage')}
          inputClassName={cx('text-center text-base', {
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
      <Button
        className="p-4"
        variant="plain-primary"
        onPress={() => {
          if (value + 1 <= max) onChangeNumber(value + 1)
        }}
        aria-label={t('pagination.nextPage')}
      >
        <ChevronRight className="w-2" />
      </Button>
    </div>
  )
}
