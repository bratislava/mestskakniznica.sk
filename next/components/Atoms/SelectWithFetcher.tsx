// TODO this component was copied from Marianum project
import { QueryKey, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import SelectField, { Option, SelectProps, SingleSelect } from '@/components/Atoms/SelectField'

type SelectWithFetcherProps = {
  queryKey: QueryKey
  queryFn: () => Promise<Option[]>
  defaultOption: Option
} & Pick<SelectProps, 'id' | 'placeholder' | 'label' | 'disabled'> &
  Pick<SingleSelect, 'onSelectionChange'>

const SelectWithFetcher = ({
  queryKey,
  defaultOption,
  queryFn,
  disabled: originalDisabled,
  onSelectionChange,
  ...rest
}: SelectWithFetcherProps) => {
  const { data, isError, isLoading } = useQuery({ queryKey, queryFn, staleTime: Infinity })

  const options = useMemo(() => {
    if (data) {
      return [defaultOption, ...data]
    }
    return [defaultOption]
  }, [data, defaultOption])

  return (
    <SelectField
      options={options}
      defaultSelected={defaultOption.key}
      multiple={false}
      disabled={isLoading || isError || originalDisabled}
      onSelectionChange={onSelectionChange}
      {...rest}
    />
  )
}

export default SelectWithFetcher
