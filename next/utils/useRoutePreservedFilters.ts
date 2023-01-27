import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const QUERY_KEY = 'useRoutePreservedFiltersQueryKey_RHbbQ463lH'

/**
 *
 * @param defaultValue
 */
export const useRoutePreservedFilters = <T>(defaultValue: T) => {
  const router = useRouter()

  const getDefaultState = () => {
    console.log(router.query[QUERY_KEY])
    if (router.query[QUERY_KEY]) {
      try {
        return JSON.parse(router.query[QUERY_KEY] as string) as T
      } catch (error) {
        return defaultValue
      }
    }

    return defaultValue
  }
  const useStateReturnValue = useState(getDefaultState())
  const [filters] = useStateReturnValue

  useEffect(() => {
    console.log(JSON.stringify(filters))
    router.replace(
      { pathname: window.location.pathname, query: { filters: JSON.stringify(filters) } },
      null,
      { shallow: true }
    )
    // `router` in deps causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return useStateReturnValue
}
