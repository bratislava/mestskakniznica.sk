import { MenuEntity, MenuEntityResponseCollection } from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { IEvent } from '../../utils/types'
import HeaderNavigation from './Navigation/HeaderNavigation'
import NavigationItem from './Navigation/NavigationItem'
import SearchBox from './Navigation/SearchBox'
import SkipNavigation from './SkipNavigation'

interface HeaderProps {
  menus: MenuEntity[]
  latestEvents?: IEvent[]
}

function Header({ menus, latestEvents }: HeaderProps) {
  const { t } = useTranslation('common')
  return (
    <>
      <div className="m-auto max-w-[1180px]">
        <div className="mx-auto flex justify-between items-center border-b border-gray-900">
          <Link href="/" passHref>
            <a className="uppercase flex flex-row items-center h-[40px] cursor-pointer">
              <h1>
              {t('pageTitle')
                .split(' ')
                .map((word) => (
                  <span
                    key={word}
                    className="uppercase first:pl-0 first:pr-3 text-27 border-r border-gray-900 h-[40px] pt-[7px] pb-[7px] px-3"
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </a>
          </Link>

          <SkipNavigation />

          <div className="">
            <HeaderNavigation />
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[1180px] border-b border-gray-900">
        <div className="flex justify-between items-center">
          <NavigationMenu.Root aria-label={t('navAriaLabel')}>
            <NavigationMenu.List className="flex">
              {menus?.map((menu, index) => (
                <NavigationItem latestEvents={latestEvents} index={index} menu={menu.attributes} key={index} />
              ))}
            </NavigationMenu.List>

            <NavigationMenu.Viewport className="m-auto max-w-full w-1180 absolute bg-white z-50" />
          </NavigationMenu.Root>

          <SearchBox text={t('searchBook')} />
        </div>
      </div>
    </>
  )
}

export default Header
