import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import SelectField from '@/components/Atoms/SelectField'
import {
  documentCategoriesFetcher,
  documentCategoriesQueryKey,
} from '@/services/graphql/fetchers/document-categories.fetcher'
import { Enum_Disclosure_Type_Fixed } from '@/utils/types'

type DocumentsCategorySelectProps = {
  onCategoryChange: (id: string | null) => void
}

const DocumentsCategorySelect = ({ onCategoryChange = () => {} }: DocumentsCategorySelectProps) => {
  const { t } = useTranslation()

  // TODO when translating documents, replace labels byt translated values
  const disclosureTypes = useMemo(() => {
    return [
      {
        key: Enum_Disclosure_Type_Fixed.Faktury,
        label: Enum_Disclosure_Type_Fixed.Faktury,
      },
      {
        key: Enum_Disclosure_Type_Fixed.Objednavky,
        label: Enum_Disclosure_Type_Fixed.Objednavky,
      },
      {
        key: Enum_Disclosure_Type_Fixed.Zmluvy,
        label: Enum_Disclosure_Type_Fixed.Zmluvy,
      },
      {
        key: Enum_Disclosure_Type_Fixed.VerejneObstaravanie,
        label: Enum_Disclosure_Type_Fixed.VerejneObstaravanie,
      },
      {
        key: Enum_Disclosure_Type_Fixed.ObchodnaVerejnaSutaz,
        label: Enum_Disclosure_Type_Fixed.ObchodnaVerejnaSutaz,
      },
      {
        key: Enum_Disclosure_Type_Fixed.Granty,
        label: Enum_Disclosure_Type_Fixed.Granty,
      },
      {
        key: Enum_Disclosure_Type_Fixed.Ostatne,
        label: Enum_Disclosure_Type_Fixed.Ostatne,
      },
    ]
  }, [])

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  const { data, isError, isLoading } = useQuery({
    queryKey: documentCategoriesQueryKey,
    queryFn: documentCategoriesFetcher,
    staleTime: Infinity,
  })

  const options = useMemo(() => {
    if (data) {
      return [defaultOption, ...data, ...disclosureTypes]
    }
    return [defaultOption, ...disclosureTypes]
  }, [data, defaultOption, disclosureTypes])

  return (
    <SelectField
      options={options}
      defaultSelected={defaultOption.key}
      multiple={false}
      disabled={isLoading || isError}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default DocumentsCategorySelect
