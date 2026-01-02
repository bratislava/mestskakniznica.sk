import { QueryKey, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import SelectField, { SelectFieldProps } from '@/components/Atoms/SelectField'

type SelectWithFetcherProps<T extends object> = {
  queryKey: QueryKey
  queryFn: () => Promise<T[]>
  defaultOption: T
} & SelectFieldProps<T>

const SelectWithFetcher = <T extends object>({
  queryKey,
  defaultOption,
  queryFn,
  children,
  isDisabled,
  ...rest
}: SelectWithFetcherProps<T>) => {
  const { data, isError, isLoading } = useQuery({ queryKey, queryFn, staleTime: Infinity })

  const items = useMemo(() => {
    if (data) {
      return [defaultOption, ...data]
    }

    return [defaultOption]
  }, [data, defaultOption])

  return (
    <SelectField items={items} isDisabled={isLoading || isError || isDisabled} {...rest}>
      {children}
    </SelectField>
  )
}

export default SelectWithFetcher
