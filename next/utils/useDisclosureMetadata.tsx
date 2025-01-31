import { useTranslation } from 'next-i18next'

import FormatCurrency from '@/modules/formatting/FormatCurrency'
import FormatDate from '@/modules/formatting/FormatDate'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import { DisclosureEntityFragment } from '@/services/graphql'
import { getDisclosureTypeFixed } from '@/utils/getDisclosureTypeFixed'

export const useDisclosureMetadata = () => {
  const { t } = useTranslation('common')

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
      { label: t('DocumentMetadata.category'), value: getDisclosureTypeFixed(type) },
      {
        label: t('DocumentMetadata.addedAt'),
        value: <FormatDate value={addedAt} valueType="ISO" />,
      },
      { label: t('DocumentMetadata.period'), value: period },
      { label: t('DocumentMetadata.idNumber'), value: idNumber },
      {
        label: t('DocumentMetadata.amount'),
        value: amount ? <FormatCurrency value={amount} /> : null,
      },
      { label: t('DocumentMetadata.description'), value: description },
      { label: t('DocumentMetadata.contractor'), value: contractor },
      { label: t('DocumentMetadata.grantProvider'), value: grantProvider },
      { label: t('DocumentMetadata.grantYear'), value: grantYear },
    ]

    return dataToTake.filter((m) => m.value)
  }

  return { getDisclosureMetadata }
}
