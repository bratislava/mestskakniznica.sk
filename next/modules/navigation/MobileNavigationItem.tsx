import { useState } from 'react'

import { ChevronRightIcon } from '@/assets/icons'
import MobileSubnavigation from '@/modules/navigation/MobileSubnavigation'
import { MenuItem } from '@/modules/navigation/NavMenu'

interface navItemProps {
  menu: MenuItem
}

const MobileNavigationItem = ({ menu }: navItemProps) => {
  const [isSubnavigationOpen, setSubnavigationOpen] = useState(false)

  return (
    <div className="w-full px-4 text-h3 leading-[1.2]">
      {/* TODO replace by Button - touch event click also link in subnavigation modal - this needs to be fixed by better component structure */}
      <button
        type="button"
        onClick={() => setSubnavigationOpen(true)}
        // variant="unstyled"
        className="flex w-full items-center justify-between border-b border-border-dark py-4"
      >
        {menu.label}
        <ChevronRightIcon />
      </button>
      <MobileSubnavigation
        isOpen={isSubnavigationOpen}
        menuSections={menu.items}
        onClose={() => setSubnavigationOpen(false)}
      />
    </div>
  )
}

export default MobileNavigationItem
