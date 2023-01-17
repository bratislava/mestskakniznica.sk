import SelectWithFetcher from '@components/Atoms/SelectWithFetcher'
import {
  documentCategoriesFetcher,
  documentCategoriesQueryKey,
} from '@services/graphql/fetchers/document-categories.fetcher'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

type DocumentsCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const DocumentsCategorySelect = ({ onCategoryChange = () => {} }: DocumentsCategorySelectProps) => {
  const { t } = useTranslation('common')

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      queryKey={documentCategoriesQueryKey}
      defaultOption={defaultOption}
      queryFn={documentCategoriesFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsCategorySelect
