import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import HeaderNavigationItem from './HeaderNavigationItem'

const HeaderNavigation = () => {
  const { localizations, locale } = usePageWrapperContext()
  const otherLocaleData = otherLocale(locale ?? 'sk', localizations)
  const { t } = useTranslation('common')

  const openingHours = t('openingHours2')
  // TODO load opening hours
  // const openingHours = mainLocality?.isCurrentlyOpen
  //   ? t('openingHours') +
  //     ' ' +
  //     Time24To12Format(mainLocality.localityOpenTo, locale)
  //   : t('openingHoursClosed');

  return (
    <div className="flex flex-wrap pr-0">
      {/* <div className="border-border-dark border-l w-10 p-2.5"> */}
      {/*  <Accessibility /> */}
      {/* </div> */}
      <div className="group border-l border-border-dark">
        <HeaderNavigationItem url={t('openingHoursPageLink')}>
          <div className="px-[12px] font-normal text-foreground-heading hover:underline">
            {openingHours}
          </div>
          {/* TODO show the div below again once the one above contains dynamic opening hours */}
          {/* <div className="mt-2 absolute w-40 bg-white text-center py-5 px-3 border z-50 transform scale-0 focus-within:scale-100 group-hover:scale-100 cursor-default">
              {t('openHoursInfo')}
            </div> */}
        </HeaderNavigationItem>
      </div>
      <div className="border-l border-border-dark">
        <div className="border-border-dark py-[10px] text-sm font-normal md:flex">
          <Link
            href="https://opac.mestskakniznica.sk/opac"
            target="_blank"
            className="px-[12px] font-normal hover:underline"
          >
            {t('onlineCatalog')}
          </Link>
        </div>
      </div>
      <Link
        href={otherLocaleData.path}
        locale={otherLocaleData.locale}
        aria-label={t('otherLocaleAriaLabel')}
        className="border-l border-border-dark py-[10px] pl-[12px] text-base font-normal"
      >
        {otherLocaleData.locale.toUpperCase()}
      </Link>
    </div>
  )
}

export default HeaderNavigation
