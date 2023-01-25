import Header from '@components/AppLayout/Header'
import MobileHeader from '@components/AppLayout/MobileNavigation/MobileHeader'
import { MenuItem } from '@modules/navigation/NavMenu'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import React, { useMemo } from 'react'

const HeaderWrapper = () => {
  const { menus } = useGeneralContext()

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
      <div className="hidden lg:block lg:px-8">
        <Header menus={menusParsed} />
      </div>
      <div className="block lg:hidden">
        <MobileHeader menus={menusParsed} />
      </div>
    </>
  )
}

export default HeaderWrapper
