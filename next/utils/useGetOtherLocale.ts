import { useTranslation } from 'next-i18next/pages'

import { useNavigation } from '@/services/navigation/NavigationProvider'

export const useGetOtherLocale = () => {
  const { i18n } = useTranslation()
  const { localizations, getPathForEntity } = useNavigation()

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
