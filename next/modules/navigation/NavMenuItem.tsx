import { MenuItem } from '@modules/navigation/NavMenu'
import NavMenuContent from '@modules/navigation/NavMenuContent'
import NavMenuTrigger from '@modules/navigation/NavMenuTrigger'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

type NavItemProps = {
  menu: MenuItem
  isFirst?: boolean
}

const NavMenuItem = ({ menu, isFirst = false }: NavItemProps) => {
  return (
    <NavigationMenu.Item className="flex h-14 border-r border-border-dark last:border-r-0 lg:w-[134px] xl:w-[160px]">
      <NavMenuTrigger label={menu.label} isFirst={isFirst} />
      <NavMenuContent sections={menu.items} colCount={menu.colCount} />
    </NavigationMenu.Item>
  )
}

export default NavMenuItem
