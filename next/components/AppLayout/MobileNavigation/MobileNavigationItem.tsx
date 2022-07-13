import { ComponentMenuSections, Maybe, Menu, MenuEntity, MenuFragment, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import MobileSubnavigation from './MobileSubnavigation'

interface navItemProps {
  menu: MenuEntity
  menus: MenuEntity[]
}

function MobileNavigationItem({ menu, menus }: navItemProps) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const menuSections = menu?.attributes?.menuSections || []
  return (
    <div className={cx('w-full cursor-pointer px-4 text-default font-normal')}>
      <button
        onClick={() => setOpen(true)}
        className={cx('w-full font-normal flex justify-between items-center text-default border-b border-gray-900', {
          'text-primary': router.asPath.includes(menu?.attributes?.menuSlug ?? ''),
        })}
      >
        <div className="text-[20px] text-gray-900">
          <div>{menu?.attributes?.menuTitle}</div>
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
