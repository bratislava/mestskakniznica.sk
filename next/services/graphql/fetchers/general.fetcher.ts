import { now } from '@internationalized/date'
import { client } from '@/services/graphql/gql'
import { bratislavaTimezone } from '@/utils/consts'

export const generalFetcher = (locale: string) => {
  const midnightTimestamp = now(bratislavaTimezone)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toAbsoluteString()

  return client.General({ eventsFrom: midnightTimestamp, locale })
}
