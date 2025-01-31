import React, { useMemo } from 'react'

import Header from '@/components/AppLayout/Header'
import MobileHeader from '@/components/AppLayout/MobileNavigation/MobileHeader'
import { MenuItem } from '@/modules/navigation/NavMenu'
import { useGeneralContext } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

const HeaderWrapper = () => {
  const { menus } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

  // TODO move parsing into context and return parsed menu from context
  // TODO simplify parsing
  // TODO move this component somewhere more appropriate or delete it
  // eslint-disable-next-line sonarjs/cognitive-complexity
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
                      // If sectionLinkBranch is set, it takes precedence and sectionLinkPage is ignored.
                      if (link?.sectionLinkBranch?.data?.attributes?.slug) {
                        return {
                          label:
                            link.sectionLinkTitle ??
                            link?.sectionLinkBranch.data?.attributes?.title ??
                            '',
                          url:
                            getPathForEntity({
                              type: 'branch',
                              slug: link?.sectionLinkBranch.data?.attributes?.slug,
                            }) ?? '#',
                        }
                      }

                      if (link?.sectionLinkPage?.data?.id) {
                        return {
                          label:
                            link.sectionLinkTitle ??
                            link?.sectionLinkPage.data?.attributes?.title ??
                            '',
                          url:
                            getPathForEntity({
                              type: 'page',
                              id: link?.sectionLinkPage.data?.id,
                            }) ?? '#',
                        }
                      }

                      return null
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
  }, [menus, getPathForEntity])

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
