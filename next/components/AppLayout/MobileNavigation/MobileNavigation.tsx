import MobileNavigationItem from './MobileNavigationItem';
import { ReactComponent as Accessibility } from '../../../assets/images/accessibility.svg';
import { useEffect } from 'react';
import { otherLocale, usePageWrapperContext } from '../../layouts/PageWrapper';
import Link from 'next/link';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MenusQuery } from '@bratislava/strapi-sdk-city-library';
import { useTranslation } from 'next-i18next';

interface MobileNavigationProps {
  onClose: () => void;
  menus: NonNullable<MenusQuery['menus']>;
}

export const MobileNavigation = ({ onClose, menus }: MobileNavigationProps) => {
  const { t } = useTranslation(['common', 'homepage']);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const { localizations, locale } = usePageWrapperContext();
  const otherLocaleData = otherLocale(locale ?? 'sk', localizations);

  const openingHours = t('openHoursInfo');
  // TODO load opening hours
  // const openingHours = mainLocality?.isCurrentlyOpen
  //   ? t('openingHours') +
  //     ' ' +
  //     Time24To12Format(mainLocality.localityOpenTo, locale)
  //   : t('openingHoursClosed');

  return (
    <div className="m-auto max-w-1180 fixed bg-white h-screen inset-x-0 top-0 z-30 border-gray-900">
      <div className="flex justify-between border-b h-[61px] border-gray-900">
        <div className="flex h-full">
          <div className="px-5 h-full flex items-center">
            <Link
              href={otherLocaleData.path}
              locale={otherLocaleData.locale}
              passHref
            >
              <a className="font-normal text-sm border-gray-900 leading-[19.6px]">
                {otherLocaleData.locale.toUpperCase()}
              </a>
            </Link>
          </div>
          {/*<div className="px-5 h-full flex items-center cursor-pointer">*/}
          {/*  <Accessibility />*/}
          {/*</div>*/}
        </div>
        <button className="px-5" onClick={onClose}>
          X
        </button>
      </div>

      {menus?.map((menu, index) => (
        <MobileNavigationItem menu={menu} key={index} menus={menus} />
      ))}
      <div className="pl-4 pr-4 pt-[47px] pb-4">
        <div className="border-gray-900 border-b pb-4 text-[16px]">
          <Link href={t('openingHoursPageLink')} passHref>
            <a>{openingHours}</a>
          </Link>
        </div>
      </div>
      <div className="pl-4 pr-4 pb-10">
        <div className="border-gray-900 border-b pb-4 text-[16px]">
          <Link href="https://opac.mestskakniznica.sk/opac" passHref>
            <a target="_blank">{t('onlineCatalog')}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
