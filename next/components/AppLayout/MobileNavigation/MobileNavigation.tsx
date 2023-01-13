import { useGeneralContext } from '@utils/generalContext'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper'
import MobileNavigationItem from './MobileNavigationItem'

interface MobileNavigationProps {
  onClose: () => void
}

export const MobileNavigation = ({ onClose }: MobileNavigationProps) => {
  const { t } = useTranslation(['common', 'homepage'])
  const { menus } = useGeneralContext()

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
    <div className="fixed inset-x-0 top-0 z-30 m-auto h-screen border-border-dark bg-white">
      <div className="flex h-[61px] justify-between border-b border-border-dark">
        <div className="flex h-full">
          <div className="flex h-full items-center px-5">
            <Link
              href={otherLocaleData.path}
              locale={otherLocaleData.locale}
              className="border-border-dark text-base font-normal"
            >
              {otherLocaleData.locale.toUpperCase()}
            </Link>
          </div>
          {/* <div className="px-5 h-full flex items-center cursor-pointer"> */}
          {/*  <Accessibility /> */}
          {/* </div> */}
        </div>
        {/* TODO ARIA: add aria label and replace by Button */}
        <button className="px-5" type="button" onClick={onClose}>
          X
        </button>
      </div>

      {menus?.data?.map((menu, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MobileNavigationItem menu={menu} key={index} />
      ))}
      <div className="px-4 pt-[47px] pb-4">
        <div className="border-b border-border-dark pb-4 text-[16px]">
          <Link href={t('openingHoursPageLink')}>{openingHours}</Link>
        </div>
      </div>
      <div className="px-4 pb-10">
        <div className="border-b border-border-dark pb-4 text-[16px]">
          <Link href="https://opac.mestskakniznica.sk/opac" target="_blank">
            {t('onlineCatalog')}
          </Link>
        </div>
      </div>
    </div>
  )
}
