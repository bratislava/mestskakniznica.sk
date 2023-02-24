import prettyBytes from 'pretty-bytes'

import { isDefined } from './isDefined'

export const isPresent = <U>(value: U | null | undefined | void): value is U => {
  return value !== null && value !== undefined
}

export const dayForDifferentDateTo = (dateFrom: Date, dateTo: Date, twoDigit = false) => {
  const today = new Date()
  const dFrom = new Date(dateFrom)
  const dTo = new Date(dateTo)

  // reset hours
  today.setHours(0, 0, 0, 0)
  dFrom.setHours(0, 0, 0, 0)
  dTo.setHours(0, 0, 0, 0)

  // display today if event is between from-to
  if (today <= dTo && today >= dFrom) {
    const todayDay = today.toLocaleString('en-US', {
      day: twoDigit ? '2-digit' : 'numeric',
    })
    const todayMonth = today.toLocaleString('en-US', {
      month: twoDigit ? '2-digit' : 'numeric',
    })
    const todayYear = today.toLocaleString('en-US', {
      year: 'numeric',
    })
    return { day: todayDay, month: todayMonth, year: todayYear, date: today }

    // display last event day if its in the past
  }
  if (today > dTo) {
    const toDay = dTo.toLocaleString('en-US', {
      day: twoDigit ? '2-digit' : 'numeric',
    })
    const toMonth = dTo.toLocaleString('en-US', {
      month: twoDigit ? '2-digit' : 'numeric',
    })
    const toYear = dTo.toLocaleString('en-US', {
      year: 'numeric',
    })
    return { day: toDay, month: toMonth, year: toYear, date: dTo }
  }

  // display event starting date
  const day = dFrom.toLocaleString('en-US', {
    day: twoDigit ? '2-digit' : 'numeric',
  })
  const month = dFrom.toLocaleString('en-US', {
    month: twoDigit ? '2-digit' : 'numeric',
  })
  const year = dFrom.toLocaleString('en-US', {
    year: 'numeric',
  })

  return { day, month, year, date: dFrom }
}

// method for determining if event already happened
export const isEventPast = (dateTo: Date | string | null): boolean => {
  if (!dateTo) return false

  const today = new Date()
  const endDate = new Date(dateTo)
  today.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  return today > endDate
}

export const isServer = () => typeof window === 'undefined'

export const isProductionDeployment = () => process.env.NEXT_PUBLIC_IS_STAGING !== 'true'

export const getFileSize = (size: number | undefined, language: string) => {
  if (isDefined(size)) {
    return prettyBytes(size * 1000, {
      locale: language,
    })
  }
  return size
}
