import Link from 'next/link';
import SearchBox from '../Navigation/SearchBox';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MenusQuery } from '@bratislava/strapi-sdk-city-library';
import { useEffect, useState } from 'react';
import SkipNavigation from '../SkipNavigation';
import cx from 'classnames';
import { MobileNavigation } from './MobileNavigation';
import { ReactComponent as Burger } from '../../../assets/images/Burger.svg';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface HeaderProps {
  menus: NonNullable<MenusQuery['menus']>;
}

const MobilHeader = ({ menus }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  //close mobile header on route change
  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(false));
    return () => router.events.off('routeChangeStart', () => setOpen(false));
  }, [router]);

  return (
    <>
      <div className="m-auto">
        <div className="flex justify-between border-b border-gray-900">
          <Link href="/" passHref>
            <>
              <a className="hidden relative w-full uppercase lg:grid grid-cols-10 items-center pr-8">
                {t('pageTitle')
                  .split(' ')
                  .map((word, index) => (
                    <span
                      key={word}
                      className={cx(
                        'border-r border-gray-900 h-[30px] px-[7px] py-[2px] flex items-center min-w-fit',
                        {
                          'col-span-1': word.length <= 4,
                          'col-span-5': word.length > 4,
                        }
                      )}
                    >
                      {word}
                    </span>
                  ))}
                <div className="absolute w-full border-b border-gray-900 -z-10 top-1/2"></div>
              </a>
              <Link href="/" passHref>
                <a className="w-full flex flex-col justify-center">
                  <div className="relative w-full uppercase flex flex-wrap lg:hidden items-center pr-8">
                    {t('pageTitle')
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => (
                        <span
                          key={word}
                          className={cx(
                            'border-r border-gray-900 h-[30px] px-[7px] py-[2px] flex items-center min-w-fit'
                          )}
                        >
                          {word}
                        </span>
                      ))}
                    <div className="absolute w-full border-b border-gray-900 -z-10 bottom-0"></div>
                  </div>
                  <div className="relative w-full uppercase flex flex-wrap lg:hidden items-center pr-8">
                    {t('pageTitle')
                      .split(' ')
                      .slice(2)
                      .map((word) => (
                        <span
                          key={word}
                          className={cx(
                            'border-r border-gray-900 h-[30px] px-[7px] py-[2px] flex items-center min-w-fit'
                          )}
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                </a>
              </Link>
            </>
          </Link>

          <SkipNavigation />

          <div className="border-l border-gray-900">
            <Burger
              onClick={() => setOpen(true)}
              className="m-4 cursor-pointer"
            />
            {isOpen && (
              <MobileNavigation menus={menus} onClose={() => setOpen(false)} />
            )}
          </div>
        </div>
      </div>

      <div className="m-auto border-b border-gray-900">
        <div className="flex">
          <div className="py-2 px-[5px] w-[320px]">
            <SearchBox text={t('searchBook')} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilHeader;
