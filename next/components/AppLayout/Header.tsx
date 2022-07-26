import { EventCardEntityFragment, MenuEntity } from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import HeaderNavigation from './Navigation/HeaderNavigation'
import NavigationItem from './Navigation/NavigationItem'
import SearchBox from './Navigation/SearchBox'
import SkipNavigation from './SkipNavigation'

interface HeaderProps {
  menus: MenuEntity[]
  latestEvents?: EventCardEntityFragment[]
  isHomePage?: boolean
}

function Header({ menus, latestEvents, isHomePage }: HeaderProps) {
  const { t } = useTranslation('common')
  return (
    <>
      <div className="m-auto max-w-[1180px]">
        <div className="mx-auto flex items-center justify-between border-b border-gray-900">
          <Link href="/" passHref>
            <a className="flex h-[40px] cursor-pointer flex-row items-center uppercase">
              {isHomePage ? (
                <h1>
                  {t('pageTitle')
                    .split(' ')
                    .map((word) => (
                      <span
                        key={word}
                        className="h-[40px] border-r border-gray-900 px-3 pt-[7px] pb-[6px] text-27 uppercase first:pl-0 first:pr-3"
                      >
                        {word}
                      </span>
                    ))}
                </h1>
              ) : (
                <>
                  {t('pageTitle')
                    .split(' ')
                    .map((word) => (
                      <span
                        key={word}
                        className="h-[40px] border-r border-gray-900 px-3 pt-[7px] pb-[6px] text-27 uppercase first:pl-0 first:pr-3"
                      >
                        {word}
                      </span>
                    ))}
                </>
              )}
            </a>
          </Link>

          <SkipNavigation />

          <div className="">
            <HeaderNavigation />
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[1180px] border-b border-gray-900">
        <div className="flex items-center justify-between">
          <NavigationMenu.Root aria-label={t('navAriaLabel')}>
            <NavigationMenu.List className="flex">
              {menus?.map((menu, index) => (
                <NavigationItem
                  latestEvents={latestEvents}
                  index={index}
                  menu={menu.attributes}
                  key={index}
                />
              ))}
            </NavigationMenu.List>

            <NavigationMenu.Viewport className="absolute z-50 m-auto w-1180 max-w-full bg-white" />
          </NavigationMenu.Root>

          <SearchBox text={t('searchBook')} />
        </div>
      </div>
    </>
  )
}

export default Header
