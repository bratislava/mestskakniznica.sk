import {
  ComponentMenuSections,
  EventCardEntityFragment,
  Maybe,
  Menu,
} from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import Subnavigation from './Subnavigation'

interface navItemProps {
  menu: Menu | undefined | null
  latestEvents?: EventCardEntityFragment[]
}

const NavigationItem = ({ menu, latestEvents }: navItemProps) => {
  const menuSections: Maybe<ComponentMenuSections>[] = menu?.menuSections || []
  const router = useRouter()

  const isCurrentLink = useMemo(
    () => router.asPath.includes(menu?.menuSlug ?? ''),
    [menu?.menuSlug, router.asPath]
  )

  return (
    <NavigationMenu.Item className="h-14 w-[160px] border-r border-border-dark pl-3 pt-[28px] pb-1 first:pl-0 last:border-r-0">
      {menu?.menuSlug && (
        <NavigationMenu.Trigger
          className={cx('flex h-full text-lg font-normal', {
            'text-foreground-body': isCurrentLink,
          })}
        >
          <Link href={`/${menu.menuSlug}`} passHref>
            <a tabIndex={-1} className="h-full text-left text-foreground-heading hover:underline">
              {menu?.menuTitle}
            </a>
          </Link>
        </NavigationMenu.Trigger>
      )}
      {menuSections && (
        <NavigationMenu.Content>
          <Subnavigation
            menuSections={menuSections}
            latestEvents={latestEvents}
            menuTotalColumns={menu?.menuTotalColumns}
            menuSlug={menu?.menuSlug}
          />
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  )
}

export default NavigationItem
