import { EventCardEntityFragment, MenuEntity } from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import HeaderNavigation from './Navigation/HeaderNavigation'
import HeaderSearchBox from './Navigation/HeaderSearchBox'
import NavigationItem from './Navigation/NavigationItem'
import SkipNavigation from './SkipNavigation'

interface HeaderProps {
  menus: MenuEntity[]
  upcomingEvents?: EventCardEntityFragment[]
}

const Header = ({ menus, upcomingEvents }: HeaderProps) => {
  const { t } = useTranslation('common')

  const [isSearchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className="m-auto max-w-[1180px]">
        <div className="mx-auto flex justify-between border-b border-border-dark">
          <div>
            <Link href="/" passHref>
              <a className="flex h-full cursor-pointer uppercase">
                {t('pageTitle')
                  .split(' ')
                  .map((word) => (
                    <span
                      key={word}
                      className="border-r border-border-dark px-3 pt-[7px] pb-[6px] text-[27px] uppercase leading-[27px] first:pl-0 first:pr-3"
                    >
                      {word}
                    </span>
                  ))}
              </a>
            </Link>
          </div>

          <SkipNavigation />

          <div>
            <HeaderNavigation />
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[1180px] border-b border-border-dark">
        <div className="relative flex h-14 items-center justify-between">
          <AnimatePresence>
            {!isSearchOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <NavigationMenu.Root aria-label={t('navAriaLabel')}>
                  <NavigationMenu.List className="flex">
                    {menus?.map((menu, index) => (
                      <NavigationItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        latestEvents={upcomingEvents}
                        menu={menu.attributes}
                      />
                    ))}
                  </NavigationMenu.List>

                  <NavigationMenu.Viewport className="absolute z-50 m-auto w-1180 max-w-full bg-white" />
                </NavigationMenu.Root>
              </motion.div>
            )}
          </AnimatePresence>
          <HeaderSearchBox isOpen={isSearchOpen} setOpen={setSearchOpen} />
        </div>
      </div>
    </>
  )
}

export default Header
