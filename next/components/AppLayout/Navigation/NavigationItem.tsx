import { MenuFragment, MenuSectionFragment } from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { IEvent } from '@utils/types'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import Subnavigation from './Subnavigation'

interface navItemProps {
  menu: MenuFragment | undefined | null
  latestEvents?: IEvent[]
  index: number
}

function NavigationItem({ index, menu, latestEvents }: navItemProps) {
  const [panelHidden, setPanelHidden] = React.useState(false)
  const menuSections: any = menu?.menuSections
  const router = useRouter()

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => setPanelHidden(true))
    router.events.on('routeChangeComplete', () => setPanelHidden(false))
    return () => {
      router.events.off('routeChangeStart', () => setPanelHidden(true))
      router.events.off('routeChangeComplete', () => setPanelHidden(false))
    }
  }, [router])

  const isCurrentLink = useMemo(() => router.asPath.includes(menu?.menuSlug ?? ''), [router])

  return (
    <NavigationMenu.Item className="border-gray-900 border-r last:border-r-0 pl-3 first:pl-0 pt-[28px] pb-1 h-14 w-[160px]">
      <NavigationMenu.Trigger
        className={cx('font-normal text-default flex h-full', {
          'text-primary': isCurrentLink,
        })}
      >
        <Link href={`/${menu?.menuSlug}`} passHref>
          <a tabIndex={-1} className="text-gray-900 hover:underline text-left h-full">
            {menu?.menuTitle}
          </a>
        </Link>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <Subnavigation
          menuSections={menuSections}
          latestEvents={latestEvents}
          menuTotalColumns={menu?.menuTotalColumns}
          menuSlug={menu?.menuSlug}
        />
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export default NavigationItem
