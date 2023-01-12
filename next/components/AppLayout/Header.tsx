import MLink from '@modules/common/MLink'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import HeaderNavigation from './Navigation/HeaderNavigation'
import HeaderSearchBox from './Navigation/HeaderSearchBox'
import NavigationItem from './Navigation/NavigationItem'
import SkipToContentButton from './SkipToContentButton'

const Header = () => {
  const { t } = useTranslation('common')
  const { menus } = useGeneralContext()

  const [isSearchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className="m-auto max-w-[1180px]">
        <div className="mx-auto flex justify-between border-b border-border-dark">
          <div>
            <MLink
              href="/"
              className="flex h-full text-[27px] uppercase leading-[26px] tracking-[0.6px]"
            >
              {t('pageTitle')
                .split(' ')
                .map((word) => (
                  <span
                    key={word}
                    className="border-r border-border-dark px-3 py-[7px] first:pl-0 first:pr-3"
                  >
                    {word}
                  </span>
                ))}
            </MLink>
          </div>
          <SkipToContentButton />
          <HeaderNavigation />
        </div>
      </div>
      <div className="m-auto max-w-[1180px] border-b border-border-dark">
        <div className="relative flex h-14 items-center justify-between">
          <AnimatePresence>
            {!isSearchOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <NavigationMenu.Root aria-label={t('navAriaLabel')}>
                  <NavigationMenu.List className="flex">
                    {menus?.data?.map((menu, index) => (
                      <NavigationItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        menu={menu.attributes}
                        isFirst={index === 0}
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
