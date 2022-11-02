import { convert, ZonedDateTime } from '@js-joda/core'

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1)

// "Sep 17, 2021"
export const getLocalDate = (dateString: string) => {
  const m = capitalize(
    convert(ZonedDateTime.parse(dateString)).toDate().toLocaleDateString('sk', {
      month: 'short',
    })
  )

  const fullDate = convert(ZonedDateTime.parse(dateString))
    .toDate()
    .toLocaleDateString('sk', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .split('.')

  return `${m} ${fullDate[0]}, ${fullDate[2]}`
}

// "1.3.2021"
export const getNumericLocalDate = (dateString: string) =>
  convert(ZonedDateTime.parse(dateString))
    .toDate()
    .toLocaleDateString('sk', {
      dateStyle: 'short',
    })
    .replace(/ /g, '')
