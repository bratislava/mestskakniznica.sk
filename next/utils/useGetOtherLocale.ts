import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'

export const useGetOtherLocale = () => {
  const { i18n } = useTranslation('common')
  const { currentRouteLocalizations } = useNavikronos()

  if (currentRouteLocalizations[0]) {
    return {
      locale: currentRouteLocalizations[0].locale,
      path: currentRouteLocalizations[0].path,
    }
  }

  return {
    locale: i18n.language === 'sk' ? 'en' : 'sk',
    path: '/',
  }
}
