import MLink from '@modules/common/MLink'
import { MenuLink } from '@modules/navigation/NavMenu'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

const NavMenuLink = ({ label, url }: MenuLink) => {
  return (
    <NavigationMenu.Link asChild>
      <MLink variant="navmenu" href={url} className="py-2">
        {label}
      </MLink>
    </NavigationMenu.Link>
  )
}

export default NavMenuLink
