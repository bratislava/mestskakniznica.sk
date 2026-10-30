import { useTranslation } from 'next-i18next/pages'

import MLink from '@/modules/common/MLink'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { opacBaseUrl } from '@/utils/consts'
import { useGeneralContext } from '@/utils/generalContext'
import { useGetOtherLocale } from '@/utils/useGetOtherLocale'

const HeaderNavigation = () => {
  const { t } = useTranslation()
  const { general } = useGeneralContext()
  const { getFullPath } = useNavigation()
  const otherLocale = useGetOtherLocale()

  return (
    <div className="flex flex-wrap text-sm">
      <MLink
        href={getFullPath(general?.data?.attributes?.openingHoursPage?.data) ?? '#'}
        variant="basic"
        // Using `ring-inset` because offset doesn't look appealing in this context
        className="relative grid place-content-center border-l border-border-dark px-3 ring-offset-0 ring-inset"
      >
        {t('navigation.openingHours')}
      </MLink>
      <MLink
        href={opacBaseUrl}
        variant="basic"
        target="_blank"
        className="grid place-content-center border-l border-border-dark px-3 ring-offset-0 ring-inset"
      >
        {t('navigation.onlineCatalog')}
      </MLink>
      <MLink
        href={otherLocale.path}
        locale={otherLocale.locale}
        aria-label={t('navigation.aria.otherLocaleAriaLabel')}
        variant="basic"
        className="grid place-content-center border-l border-border-dark pl-3 ring-offset-0 ring-inset"
      >
        {otherLocale.locale.toUpperCase()}
      </MLink>
    </div>
  )
}

export default HeaderNavigation
