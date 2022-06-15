import {
  Enum_Page_Layout,
  Page,
  PageFragment,
  PageEventFragment,
  ComponentLocalityPartsLocalityOpeningHours,
  SectionLinkPageFragment,
  ComponentSectionsLocalityDetails,
} from '@bratislava/strapi-sdk-city-library'
export const dateTimeString = (date: Date | string, dateTo: Date | string, locale: string = 'sk') => {
  const newDate = new Date(date)
  const dayFrom = newDate.toLocaleString('en-US', { day: 'numeric' })
  const monthFrom = newDate.toLocaleString('en-US', { month: 'numeric' })
  const fromTime = newDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  const newDateTo = new Date(dateTo)
  const dayTo = newDateTo.toLocaleString('en-US', { day: 'numeric' })
  const monthTo = newDateTo.toLocaleString('en-US', { month: 'numeric' })
  const yearTo = newDateTo.toLocaleString('en-US', { year: 'numeric' })
  const toTime = newDateTo.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  if (dayFrom === dayTo && monthFrom === monthTo)
    if (locale == 'sk') {
      return `${dayFrom}. ${monthFrom}. ${yearTo}, ${fromTime} - ${toTime}`
    } else {
      return `${monthFrom}. ${dayFrom}. ${yearTo}, ${fromTime} - ${toTime}`
    }
  else if (monthFrom === monthTo)
    if (locale == 'sk') {
      return `${dayFrom}. - ${dayTo}. ${monthTo}. ${yearTo}, ${fromTime} - ${toTime}`
    } else {
      return `${monthFrom}. ${dayFrom}. - ${monthTo}. ${dayTo}. ${yearTo}, ${fromTime} - ${toTime}`
    }
  else {
    if (locale == 'sk') {
      return `${dayFrom}. ${monthFrom}. - ${dayTo}. ${monthTo}. ${yearTo}, ${fromTime} - ${toTime}`
    } else {
      return `${monthFrom}. ${dayFrom}. - ${monthTo}. ${dayTo}. ${yearTo}, ${fromTime} - ${toTime}`
    }
  }
}

import { IEvent, ILocality } from './types'

export const arrayify = (input: string | string[] | undefined | null) => {
  if (input === undefined || input === null) {
    return [] as undefined[]
  }
  if (typeof input === 'string') return [input]
  return input
}

export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  if (a === null || a === undefined) return false
  return true
}

export const formatDateToLocal = (date: Date | string, locale: string = 'sk') => {
  const newDate = new Date(date)
  const day = newDate.toLocaleString('en-US', { day: 'numeric' })
  const month = newDate.toLocaleString('en-US', { month: 'numeric' })
  const year = newDate.toLocaleString('en-US', { year: 'numeric' })

  return locale == 'sk' ? `${day}. ${month}. ${year}` : `${month}. ${day}. ${year}`
}

export const Time24To12Format = (time: any, locale: string) => {
  if (locale == 'en') {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1) // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM' // Set AM/PM
      time[0] = +time[0] % 12 || 12 // Adjust hours
      time = time[0] + time[5]
    }
    return time // return adjusted time or original string
  } else {
    return time
  }
}

export const dayForDifferentDateTo = (dateFrom: Date, dateTo: Date, twoDigit: boolean = false) => {
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
  } else if (today > dTo) {
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

export const convertPagesToEvents = (pages: PageFragment[]) => {
  const events: IEvent[] = []

  pages.forEach((page) => {
    events.push(convertPageToEventDisplay(page))
  })

  return events
}

export const convertPagesEventsToEvents = (pages: PageEventFragment[]) => {
  const events: IEvent[] = []

  pages.forEach((page) => {
    events.push(convertPageToEventDisplay(page))
  })

  return events
}

export const convertPageToEventDisplay = (
  page: PageFragment | SectionLinkPageFragment | PageEventFragment
): IEvent | any => {
  if (page.layout === Enum_Page_Layout.Event) {
    const eventDetails = page.sections?.find((section) => section?.__typename === 'ComponentSectionsEventDetails')
    return {
      ...page.sections?.find((section) => section?.__typename === 'ComponentSectionsEventDetails'),
      slug: page.slug || '',
      listingImage: page.listingImage || undefined,
      eventCustomType: 'event',
      eventLocality:
        eventDetails && eventDetails.__typename === 'ComponentSectionsEventDetails' ? eventDetails.eventLocality : null,
      eventCategory:
        eventDetails && eventDetails.__typename === 'ComponentSectionsEventDetails' ? eventDetails.eventCategory : null,
    }
  } else if (page.layout === Enum_Page_Layout.Announcement) {
    return {
      eventTitle: page.title || '',
      listingImage: page.listingImage || undefined,
      eventCustomType: 'announcement',
      slug: page.slug || '',
    }
  } else if (page.layout === Enum_Page_Layout.News) {
    return {
      eventTitle: page.title,
      date_added: page.date_added,
      listingImage: page.listingImage,
      eventCustomType: 'news',
      slug: page.slug,
      dateFrom: page.created_at,
    }
  }
}

export const convertPagesToLocalities = (pages: PageFragment[], onlyForHomepage = false): ILocality[] => {
  const localities: ILocality[] = []

  pages.forEach((page) => {
    const localityDetails = page.sections?.find((section) => section?.__typename === 'ComponentSectionsLocalityDetails')

    if (localityDetails?.__typename === 'ComponentSectionsLocalityDetails') {
      if (localityDetails.displayOnHomePage && onlyForHomepage) {
        localities.push(convertPageToLocality(page, localityDetails))
      } else if (!onlyForHomepage) {
        localities.push(convertPageToLocality(page, localityDetails))
      }
    }
  })

  return localities
}

export const convertPageToLocality = (
  page: PageFragment,
  localityDetails: ComponentSectionsLocalityDetails | any
): ILocality | any => {
  if (page.layout === Enum_Page_Layout.Locality) {
    const { localityOpenFrom, localityOpenTo, isCurrentlyOpen } = getMainOpeningHours(localityDetails.localitySections)

    return {
      localityOpenFrom,
      localityOpenTo,
      localityTitle: localityDetails.localityTitle,
      localitySlug: page.slug,
      localitySections: localityDetails.localitySections,
      localityAddress: localityDetails.localityAddress,
      localityLatitude: localityDetails.localityLatitude,
      localityLongitude: localityDetails.localityLongitude,
      isMainLocality: localityDetails.isMainLocality,
      isCurrentlyOpen,
    }
  }
}

const getMainOpeningHours = (sections: ComponentLocalityPartsLocalityOpeningHours[]) => {
  const mainSection = sections.find((section) => section.isMainSection)

  if (!mainSection)
    return {
      localityOpenFrom: '00:00',
      localityOpenTo: '00:00',
      isCurrentlyOpen: false,
    }

  //find day when the section is open for the most time
  //opening hours are like this, because strapi did not allow another nested custom component
  let openFrom = '00:00'
  let openTo = '00:00'
  const customArray = [
    {
      from: getHoursAndMinutes(mainSection.openingHoursSundayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursSundayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursMondayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursMondayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursTuesdayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursTuesdayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursWednesdayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursWednesdayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursThursdayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursThursdayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursFridayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursFridayTo),
    },
    {
      from: getHoursAndMinutes(mainSection.openingHoursSaturdayFrom),
      to: getHoursAndMinutes(mainSection.openingHoursSaturdayTo),
    },
  ]

  const today = new Date()
  const isCurrentlyOpen = getIsCurrentlyOpen(today, customArray[today.getDay()])

  customArray.sort((a, b) => {
    if (a.to.hours - a.from.hours < b.to.hours - b.from.hours) return 1
    if (a.to.hours - a.from.hours > b.to.hours - b.from.hours) return -1
    return 0
  })

  openFrom = `${formatTime(customArray[0].from.hours)}:${formatTime(customArray[0].from.minutes)}`
  openTo = `${formatTime(customArray[1].to.hours)}:${formatTime(customArray[1].to.minutes)}`

  return {
    localityOpenFrom: openFrom,
    localityOpenTo: openTo,
    isCurrentlyOpen,
  }
}

const formatTime = (time: number) => {
  const temp = time.toString()
  if (temp.length == 1) return `0${temp}`
  return temp
}

const getHoursAndMinutes = (time: string) => {
  if (!time)
    return {
      minutes: 0,
      hours: 0,
    }
  const splitted = time.split(':')

  return {
    minutes: Number(splitted[1]),
    hours: Number(splitted[0]),
  }
}

export const getIsCurrentlyOpen = (
  today: Date,
  time: {
    from: { minutes: number; hours: number }
    to: { minutes: number; hours: number }
  }
): boolean => {
  return today.getHours() < time.to.hours && today.getHours() > time.from.hours
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

// TEMP fix for build step where tokenized var isn't replaced until we figure out a better way
export const shouldSkipStaticPaths = () => process.env.NODE_ENV === 'development' || tokenizedSrapiUrlNoAvailable()

// this happens in build environment because token replacement happens only once dockerized
export const tokenizedSrapiUrlNoAvailable = () => process.env.STRAPI_URL === '%{STRAPI_URL}%'
