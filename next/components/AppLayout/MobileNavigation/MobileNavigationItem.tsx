import { Menu, MenuFragment, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import MobileSubnavigation from './MobileSubnavigation'

interface navItemProps {
  menu: Menu | MenuFragment | undefined | null
  menus: NonNullable<MenusQuery['menus']>
}

function MobileNavigationItem({ menu, menus }: navItemProps) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const menuSections: any = menu?.menuSections
  return (
    <div className={cx('w-full cursor-pointer px-4 text-default font-normal')}>
      <button
        onClick={() => setOpen(true)}
        className={cx(
          'flex w-full items-center justify-between border-b border-gray-900 text-default font-normal',
          {
            'text-primary': router.asPath.includes(menu?.menuSlug ?? ''),
          }
        )}
      >
        <div className="text-[20px] text-gray-900">
          <div>{menu?.menuTitle}</div>
        </div>
        <div className="p-5 text-right text-gray-900">{'>'}</div>
      </button>
      <div>
        {isOpen && (
          <MobileSubnavigation menuSections={menuSections} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  )
}

export default MobileNavigationItem
