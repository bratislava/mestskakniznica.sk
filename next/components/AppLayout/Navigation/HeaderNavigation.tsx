import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'

import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import { useGeneralContext } from '@utils/generalContext'
import { useNavikronos } from '@utils/navikronos'

const HeaderNavigation = () => {
  const { localizations, locale } = usePageWrapperContext()
  const otherLocaleData = otherLocale(locale ?? 'sk', localizations)
  const { t } = useTranslation('common')
  const { general } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

  return (
    <div className="flex flex-wrap text-sm">
      <MLink
        href={
          getPathForEntity({
            type: 'page',
            id: general?.data?.attributes?.openingHoursPage?.data?.id,
          }) ?? ''
        }
        variant="basic"
        className="relative grid place-content-center border-l border-border-dark px-3"
      >
        {t('openingHours')}
      </MLink>
      <MLink
        href="https://opac.mestskakniznica.sk/opac"
        variant="basic"
        target="_blank"
        className="grid place-content-center border-l border-border-dark px-3"
      >
        {t('onlineCatalog')}
      </MLink>
      {/* TODO: Navikronos */}
      <MLink
        href={otherLocaleData.path}
        locale={otherLocaleData.locale}
        aria-label={t('otherLocaleAriaLabel')}
        variant="basic"
        className="grid place-content-center border-l border-border-dark pl-3"
      >
        {otherLocaleData.locale.toUpperCase()}
      </MLink>
    </div>
  )
}

export default HeaderNavigation
