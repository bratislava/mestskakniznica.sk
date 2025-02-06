import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useMemo } from 'react'

import { MenuSection } from '@/modules/navigation/NavMenu'
import NavMenuContentCell from '@/modules/navigation/NavMenuContentCell'
import NavMenuSection from '@/modules/navigation/NavMenuSection'
import cn from '@/utils/cn'

type NavigationSectionProps = {
  colCount: number
  sections: MenuSection[]
}

const NavMenuContent = ({ colCount, sections }: NavigationSectionProps) => {
  // Parse sections into grid cells:
  // - group sections with colSpan=0 to column
  // - sections with colSpan=0 should be followed by section with colSpan=1 - this needs to be set up in Strapi
  const menuCells = useMemo(() => {
    const cells: (MenuSection | MenuSection[])[] = []
    let groupedSections: MenuSection[] = []

    sections.forEach((section) => {
      if (section.colSpan && groupedSections.length > 0) {
        cells.push(groupedSections)
        groupedSections = []
      }
      if (section.colSpan) {
        cells.push(section)
      }
      if (section.colSpan === 0) {
        groupedSections.push(section)
      }
    })
    if (groupedSections.length > 0) {
      cells.push(groupedSections)
    }

    return cells
  }, [sections])

  return (
    <NavigationMenu.Content
      // To disable "onHover" behaviour, needs to be set also in NavMenuTrigger
      // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      className={cn('grid w-full gap-x-10 border border-border-light bg-white px-4 py-8', {
        'grid-cols-3': colCount === 3,
        'grid-cols-4': colCount === 4,
      })}
    >
      {/* eslint-disable react/no-array-index-key */}
      {menuCells.map((cell, index) => {
        if (Array.isArray(cell)) {
          return (
            <NavMenuContentCell key={index} colSpan={1}>
              {cell.map((section, sectionIndex) => (
                <NavMenuSection
                  key={sectionIndex}
                  section={section}
                  classNames={sectionIndex !== 0 ? 'pt-8' : ''}
                />
              ))}
            </NavMenuContentCell>
          )
        }
        return (
          <NavMenuContentCell key={index} colSpan={cell.colSpan}>
            <NavMenuSection key={index} section={cell} />
          </NavMenuContentCell>
        )
      })}
      {/* eslint-enable react/no-array-index-key */}
    </NavigationMenu.Content>
  )
}

export default NavMenuContent
