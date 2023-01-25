import { ChevronRightIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import MobileSubnavigation from '@modules/navigation/MobileSubnavigation'
import { MenuItem } from '@modules/navigation/NavMenu'
import { useState } from 'react'

interface navItemProps {
  menu: MenuItem
}

const MobileNavigationItem = ({ menu }: navItemProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="w-full px-4 text-h3 leading-[1.2]">
      <Button
        onPress={() => setOpen(true)}
        variant="unstyled"
        className="flex w-full items-center justify-between border-b border-border-dark py-4"
      >
        {menu.label}
        <ChevronRightIcon />
      </Button>
      <div>
        {isOpen && <MobileSubnavigation menuSections={menu.items} onClose={() => setOpen(false)} />}
      </div>
    </div>
  )
}

export default MobileNavigationItem
