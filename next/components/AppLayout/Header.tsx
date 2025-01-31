import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import MLink from '@/modules/common/MLink'
import NavMenu, { MenuItem } from '@/modules/navigation/NavMenu'

import HeaderNavigation from './Navigation/HeaderNavigation'
import HeaderSearchBox from './Navigation/HeaderSearchBox'
import SkipToContentButton from './SkipToContentButton'

type HeaderProps = {
  menus: MenuItem[]
}

const Header = ({ menus }: HeaderProps) => {
  const { t } = useTranslation()

  const [isSearchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className="m-auto max-w-[1180px]">
        <div className="mx-auto flex justify-between border-b border-border-dark">
          <div>
            <MLink
              href="/"
              // Using `ring-inset` because offset doesn't look appealing in this context
              className="flex h-full text-[27px] uppercase leading-[26px] tracking-[0.6px] ring-inset ring-offset-0"
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
          <NavMenu menus={menus} isSearchOpen={isSearchOpen} />
          <HeaderSearchBox isOpen={isSearchOpen} setOpen={setSearchOpen} />
        </div>
      </div>
    </>
  )
}

export default Header
