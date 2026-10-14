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

  const menusParsed: MenuItem[] = useMemo(() => {
    return (
      menus
        .map((menu) => {
          if (!menu?.menuTitle) return null

          const label = menu?.menuTitle
          const items =
            menu?.menuSections
              ?.map((section) => {
                if (!section) return null

                const sectionLabel = section.sectionTitle ?? undefined
                const sectionItems =
                  section.sectionLinks
                    // eslint-disable-next-line sonarjs/no-nested-functions
                    ?.map((link) => {
                      // If sectionLinkBranch is set, it takes precedence and sectionLinkPage is ignored.
                      if (link?.sectionLinkBranch?.slug) {
                        return {
                          label:
                            link.sectionLinkTitle ??
                            link?.sectionLinkBranch?.title ??
                            '',
                          url:
                            getPathForEntity({
                              type: 'branch',
                              slug: link?.sectionLinkBranch?.slug,
                            }) ?? '#',
                        }
                      }

                      if (link?.sectionLinkPage?.documentId) {
                        return {
                          label:
                            link.sectionLinkTitle ??
                            link?.sectionLinkPage?.title ??
                            '',
                          url:
                            getPathForEntity({
                              type: 'page',
                              id: link?.sectionLinkPage?.documentId,
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

          return { label, items, colCount: menu.menuTotalColumns ?? 4 }
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
