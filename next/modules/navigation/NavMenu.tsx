import NavMenuItem from '@modules/navigation/NavMenuItem'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import React from 'react'

export type MenuLink = {
  label: string
  url: string
}

export type MenuSection = {
  items: MenuLink[]
  colSpan: number
  label?: string
  showMoreLink?: MenuLink
}

export type MenuItem = {
  label: string
  colCount: number
  items: MenuSection[]
}

type NavigationMenuProps = {
  menus: MenuItem[]
  isSearchOpen: boolean
}

const NavMenu = ({ menus, isSearchOpen }: NavigationMenuProps) => {
  const { t } = useTranslation('common')

  return (
    <AnimatePresence>
      {!isSearchOpen && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <NavigationMenu.Root aria-label={t('navAriaLabel')}>
            <NavigationMenu.List className="flex">
              {menus.map((menu, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <NavMenuItem key={index} menu={menu} isFirst={index === 0} />
              ))}
            </NavigationMenu.List>

            {/* Viewport represents popup div with links that appears under menu button */}
            <NavigationMenu.Viewport className="absolute z-50 m-auto w-1180 max-w-full bg-white text-foreground-body" />
          </NavigationMenu.Root>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavMenu
