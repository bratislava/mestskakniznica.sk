import { useTranslation } from 'next-i18next'

import MLink from '@/modules/common/MLink'
import { useGeneralContext } from '@/utils/generalContext'
import { useNavikronos } from '@/utils/navikronos'
import { useGetOtherLocale } from '@/utils/useGetOtherLocale'

const HeaderNavigation = () => {
  const { t } = useTranslation()
  const { general } = useGeneralContext()
  const { getPathForStrapiEntity } = useNavikronos()
  const otherLocale = useGetOtherLocale()

  return (
    <div className="flex flex-wrap text-sm">
      <MLink
        href={getPathForStrapiEntity(general?.data?.attributes?.openingHoursPage?.data) ?? '#'}
        variant="basic"
        // Using `ring-inset` because offset doesn't look appealing in this context
        className="relative grid place-content-center border-l border-border-dark px-3 ring-inset ring-offset-0"
      >
        {t('navigation.openingHours')}
      </MLink>
      <MLink
        href="https://opac.mestskakniznica.sk/opac"
        variant="basic"
        target="_blank"
        className="grid place-content-center border-l border-border-dark px-3 ring-inset ring-offset-0"
      >
        {t('navigation.onlineCatalog')}
      </MLink>
      <MLink
        href={otherLocale.path}
        locale={otherLocale.locale}
        aria-label={t('navigation.aria.otherLocaleAriaLabel')}
        variant="basic"
        className="grid place-content-center border-l border-border-dark pl-3 ring-inset ring-offset-0"
      >
        {otherLocale.locale.toUpperCase()}
      </MLink>
    </div>
  )
}

export default HeaderNavigation
