import SelectWithFetcher from '@components/Atoms/SelectWithFetcher'
import { client } from '@utils/gql'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

type DocumentsCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const mappedFetcher = () =>
  client.FileCategories().then(
    (data) =>
      data.fileCategories?.data.map((category) => ({
        label: category.attributes?.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: category.id!,
      })) ?? []
  )

const DocumentsCategorySelect = ({ onCategoryChange = () => {} }: DocumentsCategorySelectProps) => {
  const { t } = useTranslation('common')

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey="DocumentsCategorySelect"
      defaultOption={defaultOption}
      fetcher={mappedFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsCategorySelect
