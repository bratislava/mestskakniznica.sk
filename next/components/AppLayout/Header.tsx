import MLink from '@modules/common/MLink'
import NavMenu, { MenuItem } from '@modules/navigation/NavMenu'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import HeaderNavigation from './Navigation/HeaderNavigation'
import HeaderSearchBox from './Navigation/HeaderSearchBox'
import SkipToContentButton from './SkipToContentButton'

const Header = () => {
  const { t } = useTranslation('common')
  const { menus } = useGeneralContext()

  const [isSearchOpen, setSearchOpen] = useState(false)

  const menusParsed: MenuItem[] = useMemo(() => {
    return (
      menus?.data
        .map((menu) => {
          if (!menu.attributes?.menuTitle) return null

          const label = menu.attributes?.menuTitle
          const items =
            menu.attributes?.menuSections
              ?.map((section) => {
                if (!section) return null

                const sectionLabel = section.sectionTitle ?? undefined
                const sectionItems =
                  section.sectionLinks
                    ?.map((link) => {
                      if (!link?.sectionLinkPage?.data?.attributes?.slug) return null

                      const linkLabel =
                        link.sectionLinkTitle ?? link.sectionLinkPage?.data?.attributes?.title
                      const url = link.sectionLinkPage?.data?.attributes?.slug

                      return { label: linkLabel, url }
                    })
                    .filter(isDefined) ?? []

                return {
                  label: sectionLabel,
                  items: sectionItems,
                  colSpan: section.sectionColumnSpan ?? 1,
                }
              })
              .filter(isDefined) ?? []
          return { label, items, colCount: menu.attributes.menuTotalColumns ?? 4 }
        })
        .filter(isDefined) ?? []
    )
  }, [menus])

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
          <NavMenu menus={menusParsed} isSearchOpen={isSearchOpen} />
          <HeaderSearchBox isOpen={isSearchOpen} setOpen={setSearchOpen} />
        </div>
      </div>
    </>
  )
}

export default Header
