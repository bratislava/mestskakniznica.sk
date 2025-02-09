import { useTranslation } from 'next-i18next'

import FormatCurrency from '@/modules/formatting/FormatCurrency'
import FormatDate from '@/modules/formatting/FormatDate'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import { DisclosureEntityFragment } from '@/services/graphql'
import { getDisclosureTypeFixed } from '@/utils/getDisclosureTypeFixed'

export const useDisclosureMetadata = () => {
  const { t } = useTranslation()

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
      { label: t('documentMetadata.category'), value: getDisclosureTypeFixed(type) },
      {
        label: t('documentMetadata.addedAt'),
        value: <FormatDate value={addedAt} valueType="ISO" />,
      },
      { label: t('documentMetadata.period'), value: period },
      { label: t('documentMetadata.idNumber'), value: idNumber },
      {
        label: t('documentMetadata.amount'),
        value: amount ? <FormatCurrency value={amount} /> : null,
      },
      { label: t('documentMetadata.description'), value: description },
      { label: t('documentMetadata.contractor'), value: contractor },
      { label: t('documentMetadata.grantProvider'), value: grantProvider },
      { label: t('documentMetadata.grantYear'), value: grantYear },
    ]

    return dataToTake.filter((m) => m.value)
  }

  return { getDisclosureMetadata }
}
