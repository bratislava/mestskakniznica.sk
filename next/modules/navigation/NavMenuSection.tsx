import { MenuSection } from '@modules/navigation/NavMenu'
import NavMenuLatestEvents from '@modules/navigation/NavMenuLatestEvents'
import NavMenuLink from '@modules/navigation/NavMenuLink'
import cx from 'classnames'
import React from 'react'

interface NavigationSectionProps {
  section: MenuSection
  classNames?: string
}

const NavMenuSection = ({ section, classNames }: NavigationSectionProps) => {
  // TODO cols sizing needs revisit
  const isLengthy = section?.items ? section.items.length >= 8 : false

  console.log(section)

  return (
    <div className={classNames}>
      {section.label && <div className="pb-2 text-lg text-foreground-dark">{section.label}</div>}

      {/* TODO replace by <ul> and <li> */}
      <div
        className={cx('grid', {
          // TODO cols sizing needs revisit
          'grid-flow-col grid-rows-8 gap-x-10': isLengthy,
        })}
      >
        {/* eslint-disable react/no-array-index-key */}
        {section.items?.map((menuLink, index) => {
          if (menuLink?.label === 'latestEvents') {
            return <NavMenuLatestEvents key={index} />
          }

          return <NavMenuLink key={index} label={menuLink.label} url={menuLink.url} />
        })}
        {/* eslint-enable react/no-array-index-key */}
      </div>
    </div>
  )
}

export default NavMenuSection
