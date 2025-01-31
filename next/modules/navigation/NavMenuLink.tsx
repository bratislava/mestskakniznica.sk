import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import MLink from '@/modules/common/MLink'
import { MenuLink } from '@/modules/navigation/NavMenu'

// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing

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
