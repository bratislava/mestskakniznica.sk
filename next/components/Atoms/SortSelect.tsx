import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import SelectField, { SelectItem } from '@/components/Atoms/SelectField'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultSelected: Sort
  onChange?: (sort: Sort) => void
}

const SortSelect = ({ defaultSelected, onChange }: SortSelectProps) => {
  const { t } = useTranslation()

  const options = useMemo(
    () => [
      { key: 'newest', label: t('sortSelect.byNewest') },
      { key: 'oldest', label: t('sortSelect.byOldest') },
    ],
    [t],
  )

  return (
    <SelectField
      items={options}
      onSelectionChange={(selectedKey) => onChange?.(selectedKey as Sort)}
      selectedKey={defaultSelected}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectField>
  )
}

export default SortSelect
