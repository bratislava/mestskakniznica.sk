import { MenuEntity } from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import MobileNavigationItem from './MobileNavigationItem'

interface MobileNavigationProps {
  onClose: () => void
  menus: MenuEntity[]
}

export function MobileNavigation({ onClose, menus }: MobileNavigationProps) {
  const { t } = useTranslation(['common', 'homepage'])

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const { localizations, locale } = usePageWrapperContext()
  const otherLocaleData = otherLocale(locale ?? 'sk', localizations)

  const openingHours = t('openingHours2')
  // TODO load opening hours
  // const openingHours = mainLocality?.isCurrentlyOpen
  //   ? t('openingHours') +
  //     ' ' +
  //     Time24To12Format(mainLocality.localityOpenTo, locale)
  //   : t('openingHoursClosed');

  return (
    <div className="max-w-1180 fixed inset-x-0 top-0 z-30 m-auto h-screen border-gray-900 bg-white">
      <div className="flex h-[61px] justify-between border-b border-gray-900">
        <div className="flex h-full">
          <div className="flex h-full items-center px-5">
            <Link href={otherLocaleData.path} locale={otherLocaleData.locale} passHref>
              <a className="border-gray-900 text-sm font-normal leading-[19.6px]">
                {otherLocaleData.locale.toUpperCase()}
              </a>
            </Link>
          </div>
          {/* <div className="px-5 h-full flex items-center cursor-pointer"> */}
          {/*  <Accessibility /> */}
          {/* </div> */}
        </div>
        <button className="px-5" onClick={onClose}>
          X
        </button>
      </div>

      {menus?.map((menu, index) => (
        <MobileNavigationItem menu={menu} key={index} menus={menus} />
      ))}
      <div className="pl-4 pr-4 pt-[47px] pb-4">
        <div className="border-b border-gray-900 pb-4 text-[16px]">
          <Link href={t('openingHoursPageLink')} passHref>
            <a>{openingHours}</a>
          </Link>
        </div>
      </div>
      <div className="pl-4 pr-4 pb-10">
        <div className="border-b border-gray-900 pb-4 text-[16px]">
          <Link href="https://opac.mestskakniznica.sk/opac" passHref>
            <a target="_blank">{t('onlineCatalog')}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
