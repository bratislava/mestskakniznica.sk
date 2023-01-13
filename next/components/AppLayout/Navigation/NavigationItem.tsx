import { ComponentMenuSections, Maybe, Menu } from '@bratislava/strapi-sdk-city-library'
import MLink from '@modules/common/MLink'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import Subnavigation from './Subnavigation'

interface navItemProps {
  menu: Menu | undefined | null
  isFirst: boolean
}

const NavigationItem = ({ menu, isFirst }: navItemProps) => {
  const menuSections: Maybe<ComponentMenuSections>[] = menu?.menuSections || []
  const router = useRouter()

  const isCurrentLink = useMemo(
    () => router.asPath.includes(menu?.menuSlug ?? ''),
    [menu?.menuSlug, router.asPath]
  )

  return (
    <NavigationMenu.Item className="flex h-14 border-r border-border-dark last:border-r-0 lg:w-[134px] xl:w-[160px]">
      {menu?.menuSlug && (
        <NavigationMenu.Trigger
          className={cx('flex w-full text-h5', {
            'text-foreground-body': isCurrentLink,
          })}
        >
          <MLink
            href={`/${menu.menuSlug}`}
            tabIndex={-1}
            variant="basic"
            className={cx('flex h-full w-full items-end pb-1 text-foreground-heading', {
              'ml-3': !isFirst,
            })}
          >
            {menu?.menuTitle}
          </MLink>
        </NavigationMenu.Trigger>
      )}
      {menuSections && (
        <NavigationMenu.Content>
          <Subnavigation menuSections={menuSections} menuTotalColumns={menu?.menuTotalColumns} />
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  )
}

export default NavigationItem
