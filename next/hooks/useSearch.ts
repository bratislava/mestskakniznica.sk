import { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

type UseSearchOptions = {
  syncWithUrlQuery?: boolean
}

export const useSearch = ({ syncWithUrlQuery = false }: UseSearchOptions) => {
  const [routerQueryValue] = useQueryParam('query', withDefault(StringParam, ''), {
    removeDefaultsFromUrl: true,
  })
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>('')

  const emptyValue = debouncedInput.trim() === ''

  useEffect(() => {
    if (syncWithUrlQuery) {
      setInput(routerQueryValue)
    }
  }, [routerQueryValue, syncWithUrlQuery])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  return {
    input,
    setInput,
    searchValue,
    setSearchValue,
    emptyValue,
  }
}
