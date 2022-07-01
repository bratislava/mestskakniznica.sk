import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import HeaderNavigationItem from './HeaderNavigationItem'

function HeaderNavigation() {
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
    <div className="container flex flex-wrap border-gray-900 pr-0">
      {/* <div className="border-gray-900 border-l w-10 p-2.5"> */}
      {/*  <Accessibility /> */}
      {/* </div> */}
      <div className="group border-l border-gray-900">
        <HeaderNavigationItem url={t('openingHoursPageLink')}>
          <div className="px-[12px] font-normal text-gray-900 hover:underline">{openingHours}</div>
          {/* TODO show he div below again once the one above contains dynami opening hours */}
          {/* <div className="mt-2 absolute w-40 bg-white text-center py-5 px-3 border z-50 transform scale-0 focus-within:scale-100 group-hover:scale-100 cursor-default">
              {t('openHoursInfo')}
            </div> */}
        </HeaderNavigationItem>
      </div>
      <div className="border-l border-gray-900">
        <div className="cursor-pointer border-gray-900 py-[10px] text-xs font-normal leading-[19.6px] md:flex">
          <Link href="https://opac.mestskakniznica.sk/opac" passHref>
            <a target="_blank" className="px-[12px] font-normal">
              {t('onlineCatalog')}
            </a>
          </Link>
        </div>
      </div>
      <Link href={otherLocaleData.path} locale={otherLocaleData.locale} passHref>
        <a
          aria-label={t('otherLocaleAriaLabel')}
          className="border-l border-gray-900 py-[10px] pl-[12px] text-sm font-normal leading-[19.6px]"
        >
          {otherLocaleData.locale.toUpperCase()}
        </a>
      </Link>
    </div>
  )
}

export default HeaderNavigation
