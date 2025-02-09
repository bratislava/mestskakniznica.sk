import { useTranslation } from 'next-i18next'

import { useNavikronos } from '@/utils/navikronos'

export const useGetOtherLocale = () => {
  const { i18n } = useTranslation()
  const { localizations, getPathForEntity } = useNavikronos()

  if (localizations?.[0]) {
    return {
      locale: localizations[0].locale,
      path: getPathForEntity(localizations[0]) ?? '#',
    }
  }

  return {
    locale: i18n.language === 'sk' ? 'en' : 'sk',
    path: '/',
  }
}
