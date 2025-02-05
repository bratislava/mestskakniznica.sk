import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import SelectField from '@/components/Atoms/SelectField'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSelected: Sort
  onChange?: (sort: Sort) => void
}

const SortSelect = ({ defaultSelected, onChange = () => {} }: SortSelectProps) => {
  const { t } = useTranslation()

  const options = useMemo(
    () => [
      { key: 'newest', label: t('sortSelect.byNewest') },
      { key: 'oldest', label: t('sortSelect.byOldest') },
    ],
    [t]
  )

  return (
    <SelectField
      options={options}
      onSelectionChange={onChange as (sort: string) => void}
      defaultSelected={defaultSelected}
    />
  )
}

export default SortSelect
