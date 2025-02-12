import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounceValue } from 'usehooks-ts'

type UseSearchOptions = {
  syncWithUrlQuery?: boolean
}

export const useSearch = ({ syncWithUrlQuery = false }: UseSearchOptions) => {
  const [routerQueryValue, setRouterQueryValue] = useQueryParam(
    'query',
    withDefault(StringParam, ''),
    {
      removeDefaultsFromUrl: true,
    },
  )
  const [input, setInput] = useState<string>('')
  const value = syncWithUrlQuery ? routerQueryValue : input
  const [debouncedInput] = useDebounceValue<string>(value, 300)
  const [searchValue, setSearchValue] = useState<string>(value)

  const emptyValue = debouncedInput.trim() === ''

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  return {
    input: value,
    setInput: syncWithUrlQuery
      ? (setRouterQueryValue as Dispatch<SetStateAction<string>>)
      : setInput,
    searchValue,
    setSearchValue,
    emptyValue,
  }
}
