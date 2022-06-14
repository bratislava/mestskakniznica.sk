import HeaderNavigationItem from './HeaderNavigationItem'
import Accessibility from '@assets/images/accessibility.svg'
import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Time24To12Format } from '@utils/utils'

interface HeaderNavigationProps {}

const HeaderNavigation = (_props: HeaderNavigationProps) => {
  const { localizations, locale } = usePageWrapperContext()
  const otherLocaleData = otherLocale(locale ?? 'sk', localizations)
  const { t } = useTranslation('common')

  const openingHours = t('openHoursInfo')
  // TODO load opening hours
  // const openingHours = mainLocality?.isCurrentlyOpen
  //   ? t('openingHours') +
  //     ' ' +
  //     Time24To12Format(mainLocality.localityOpenTo, locale)
  //   : t('openingHoursClosed');

  return (
    <div className="container flex flex-wrap border-gray-900 pr-0">
      {/*<div className="border-gray-900 border-l w-10 p-2.5">*/}
      {/*  <Accessibility />*/}
      {/*</div>*/}
      <div className="group border-l border-gray-900">
        <HeaderNavigationItem url={t('openingHoursPageLink')}>
          <div className="font-normal px-[12px] text-gray-900 hover:underline">{openingHours}</div>
          {/* TODO show he div below again once the one above contains dynami opening hours */}
          {/* <div className="mt-2 absolute w-40 bg-white text-center py-5 px-3 border z-50 transform scale-0 focus-within:scale-100 group-hover:scale-100 cursor-default">
              {t('openHoursInfo')}
            </div> */}
        </HeaderNavigationItem>
      </div>
      <div className="border-gray-900 border-l">
        <div className="cursor-pointer font-normal md:flex text-xs leading-[19.6px] py-[10px] border-gray-900">
          <Link href="https://opac.mestskakniznica.sk/opac" passHref>
            <a target="_blank" className="font-normal px-[12px]">
              {t('onlineCatalog')}
            </a>
          </Link>
        </div>
      </div>
      <Link href={otherLocaleData.path} locale={otherLocaleData.locale} passHref>
        <a
          aria-label={t('otherLocaleAriaLabel')}
          className="pl-[12px] font-normal text-sm border-gray-900 border-l py-[10px] leading-[19.6px]"
        >
          {otherLocaleData.locale.toUpperCase()}
        </a>
      </Link>
    </div>
  )
}

export default HeaderNavigation
