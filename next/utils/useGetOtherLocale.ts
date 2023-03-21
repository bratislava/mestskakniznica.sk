import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'

export const useGetOtherLocale = () => {
  const { i18n } = useTranslation('common')
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
