import useSWR from 'swr'
import { client } from '../utils/gql'
import { hasAttributes } from '../utils/isDefined'

export const useUpcomingEvents = ({ locale }: { locale: string }) => {
  const { data, error } = useSWR(
    ['UpcomingEvents', locale, new Date().toISOString()],
    (_key, locale, date) => client.UpcomingEvents({ locale, date })
  )

  const upcomingEvents = data?.events?.data.filter(hasAttributes)

  const isLoading = !data && !error

  const isEmpty = upcomingEvents?.length === 0

  return {
    error,
    upcomingEvents,
    isLoading,
    isEmpty,
  }
}
