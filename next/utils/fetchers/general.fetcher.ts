import { now } from '@internationalized/date'
import { bratislavaTimezone } from '@utils/consts'
import { client } from '@utils/gql'

export const generalFetcher = (locale: string) => {
  const midnightTimestamp = now(bratislavaTimezone)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toAbsoluteString()

  return client.General({ eventsFrom: midnightTimestamp, locale })
}
