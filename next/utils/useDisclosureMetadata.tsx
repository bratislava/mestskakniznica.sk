import FormatCurrency from '@modules/formatting/FormatCurrency'
import FormatDate from '@modules/formatting/FormatDate'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import { DisclosureEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'

export const useDisclosureMetadata = () => {
  const { t } = useTranslation('common', { keyPrefix: 'DocumentMetadata' })

  const getDisclosureMetadata = (disclosure: DisclosureEntityFragment) => {
    if (!disclosure.attributes) {
      return []
    }

    const {
      type,
      addedAt,
      dateFrom,
      dateTo,
      idNumber,
      amount,
      description,
      contractor,
      grantProvider,
      grantYear,
    } = disclosure.attributes

    const period =
      dateFrom && dateTo ? <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} /> : null

    const dataToTake = [
      { label: t('category'), value: type },
      { label: t('addedAt'), value: <FormatDate value={addedAt} valueType="ISO" /> },
      { label: t('period'), value: period },
      { label: t('idNumber'), value: idNumber },
      { label: t('amount'), value: amount ? <FormatCurrency value={amount} /> : null },
      { label: t('description'), value: description },
      { label: t('contractor'), value: contractor },
      { label: t('grantProvider'), value: grantProvider },
      { label: t('grantYear'), value: grantYear },
    ]

    return dataToTake.filter((m) => m.value)
  }

  return { getDisclosureMetadata }
}
