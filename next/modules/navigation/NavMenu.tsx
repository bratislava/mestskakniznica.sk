import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import { useNavMenuContext } from '@/modules/navigation/navMenuContext'
import NavMenuItem from '@/modules/navigation/NavMenuItem'

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
  const router = useRouter()

  const { menuValue, setMenuValue } = useNavMenuContext()

  useEffect(() => {
    setMenuValue('')
  }, [router.asPath, setMenuValue])

  return (
    <AnimatePresence>
      {!isSearchOpen && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <NavigationMenu.Root
            value={menuValue}
            onValueChange={setMenuValue}
            aria-label={t('navigation.aria.navAriaLabel')}
            // to re-enable pointer events when menu is open and whole page has pointer events disabled
            className="pointer-events-auto"
          >
            <NavigationMenu.List className="flex">
              {menus.map((menu, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <NavMenuItem key={index} menu={menu} isFirst={index === 0} />
              ))}
            </NavigationMenu.List>

            {/* Viewport represents popup div with links that appears under menu button */}
            <NavigationMenu.Viewport className="absolute z-50 w-full" />
          </NavigationMenu.Root>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavMenu
