import useSwr from 'swr'
import { Fetcher, Key } from 'swr/dist/types'

import useGetSwrExtras from './useGetSwrExtras'

function useSwrWithExtras<Data = any, SWRKey extends Key = null>(
  key: SWRKey,
  fetcher: Fetcher<Data, SWRKey> | null
) {
  const { data, error } = useSwr(key, fetcher)

  const { loading, loadingAndNoDataToDisplay, dataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  return {
    loading,
    loadingAndNoDataToDisplay,
    dataToDisplay,
    delayedLoading,
    data,
    error,
  }
}

export default useSwrWithExtras
