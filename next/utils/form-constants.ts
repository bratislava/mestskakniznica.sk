import { now } from '@internationalized/date'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import { useTranslation } from 'next-i18next'

import { IRadioOption } from '@/components/ui/RadioGroup/RadioGroup'
import { bratislavaTimezone } from '@/utils/consts'

export interface IFormOption {
  key: string
  label: IFormLabelOption[]
  price?: string
}

interface IFormLabelOption {
  locale: string
  label: string
}

const convertValue = (value: any) => {
  if (isBoolean(value)) {
    return value ? 'Áno' : 'Nie'
  }
  if (isDate(value)) {
    return value.toLocaleDateString('sk', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  return String(value)
}

/* eslint-disable no-secrets/no-secrets */
const getMailTranslationKey = (key: string): string => {
  const translationMap: { key: string; value: string }[] = [
    { key: 'fName', value: 'first_name' },
    { key: 'lName', value: 'last_name' },
    { key: 'postalCode', value: 'postal_code' },
    { key: 'useTempAddress', value: 'temporary_address' },
    { key: 'tempAddress', value: 'mail_temp_address' },
    { key: 'tempCity', value: 'mail_temp_city' },
    { key: 'tempPostalCode', value: 'mail_temp_postal_code' },
    { key: 'IDType', value: 'ID_type' },
    { key: 'birthDate', value: 'birth_date' },
    { key: 'IDNumber', value: 'ID_number' },
    {
      key: 'authorizedToUseBlindDepartment',
      value: 'mail_blind_dep',
    },
    { key: 'acceptFormTerms', value: 'mail_accept_terms' },
    { key: 'readerCardNumber', value: 'reader_card_number' },
    { key: 'books', value: 'book_list' },
    { key: 'bookId', value: 'book_number' },
    { key: 'spaceCount', value: 'space_count' },
    { key: 'eventDate', value: 'event_date' },
    { key: 'eventTime', value: 'event_time' },
    { key: 'excursionType', value: 'excursion_type' },
    { key: 'excursionDate', value: 'date' },
    { key: 'excursionTime', value: 'excursion_from_time' },
    { key: 'cardType', value: 'ID_type' },
    { key: 'libraryName', value: 'library_name' },
    { key: 'ICO', value: 'tax_id' },
    { key: 'DIC', value: 'vat_number' },
    { key: 'IBAN', value: 'IBAN' },
    { key: 'acceptFeesTerms', value: 'mail_accept_fees' },
    { key: 'placeOfIssue', value: 'place_of_issue' },
    { key: 'packageNumber', value: 'package_number' },
    { key: 'issueDate', value: 'issue_date' },
    { key: 'link', value: 'book_number' },
    { key: 'instrumentType', value: 'instrument_type' },
    { key: 'where', value: 'reader_form_where' },
    { key: 'rechercheTopic', value: 'recherche_topic' },
    { key: 'rechercheKeyWords', value: 'recherche_keywords' },
    { key: 'recherchePurpose', value: 'recherche_purpose' },
    { key: 'rechercheLiteratureTime', value: 'recherche_literature_time' },
    { key: 'rechercheDocumentsType', value: 'recherche_documents_type' },
    {
      key: 'rechercheDemandedLanguages',
      value: 'recherche_demanded_languages',
    },
    { key: 'attachment', value: 'attachments' },
    { key: 'techType', value: 'tech_type' },
    { key: 'term', value: 'term' },
    { key: 'venue', value: 'space' },
    { key: 'eventType', value: 'venue_type' },
    { key: 'dateFrom', value: 'mail_date_from' },
    { key: 'timeFrom', value: 'mail_time_from' },
    { key: 'dateTo', value: 'mail_date_to' },
    { key: 'timeTo', value: 'mail_time_to' },
    { key: 'link', value: 'book_number' },
    { key: 'books', value: 'book_list' },
    { key: 'placeOfIssue', value: 'place_of_issue' },
    { key: 'packageNumber', value: 'package_number' },
    { key: 'issueDate', value: 'issue_date' },
  ]

  return translationMap.find((item) => item.key === key)?.value ?? key
}
/* eslint-enable no-secrets/no-secrets */

const key = (k: string, t: (arg0: string, args1: any) => string): string =>
  t(getMailTranslationKey(k), { lng: 'sk' })

// TODO fix eslint
function flattenObject(
  o: any,
  t: (arg0: string, args1: any) => string,
  prefix = '',
  result: { [key: string]: any } = {},
  keepNull = true
) {
  if (isString(o) || isNumber(o) || isBoolean(o) || isDate(o) || (keepNull && isNull(o))) {
    // eslint-disable-next-line no-param-reassign
    result[key(prefix, t)] = convertValue(o)
    return result
  }

  if (isArray(o) || isPlainObject(o)) {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in o) {
      let pref = key(prefix, t)
      if (isArray(o)) {
        pref = `${pref} (${Number(i) + 1})`
      } else if (isEmpty(prefix)) {
        pref = i
      } else {
        pref = `${key(prefix, t)}. ${key(i, t)}`
      }
      flattenObject(o[i], t, pref, result, keepNull)
    }
    return result
  }
  return result
}

export const convertDataToBody = (data: object, t: (arg0: string, args1: any) => string) =>
  flattenObject(data, t)

export const useGetFormOptions = (options: IFormOption[], showPrice = true): IRadioOption[] => {
  const temp: IRadioOption[] = []
  const { i18n } = useTranslation()

  options.forEach((item) =>
    temp.push({
      key: item.key,
      title: `${item.label.find((l) => l.locale === (i18n.language ?? 'sk'))?.label ?? '-'} ${
        showPrice ? item.price ?? '' : ''
      }`,
      price: item.price ?? null,
    } as IRadioOption)
  )
  return temp
}

/**
 * Replaces `LocalDate.now().toString()` from @js-joda/core
 *
 * Returns e.g. 2022-12-31.
 */
export const getLocalDateForYup = () => {
  return now(bratislavaTimezone).toString().slice(0, 10)
}
