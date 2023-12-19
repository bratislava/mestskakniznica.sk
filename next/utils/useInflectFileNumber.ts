import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

export const useInflectFileNumber = () => {
  const { t, i18n } = useTranslation('common')

  const getInflectFileNumberTranslation = useCallback(
    (number: number): string => {
      if (number === 1) {
        return t('singularKeyFiles', { number })
      }
      if (number >= 2 && number <= 4) {
        return t('dualKeyFiles', { number })
      }
      return t('pluralKeyFiles', { number })
    },
    [i18n.language, t]
  )
  return { getInflectFileNumberTranslation }
}
