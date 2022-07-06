import { Menu, MenuEntity, MenuFragment, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import MobileSubnavigation from './MobileSubnavigation'

interface navItemProps {
  menu: MenuEntity | MenuFragment | undefined | null
  menus: MenuEntity[]
}

function MobileNavigationItem({ menu, menus }: navItemProps) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const menuSections: any = menu?.attributes?.menuSections
  return (
    <div className={cx('w-full text-default font-normal cursor-pointer px-4')}>
      <button
        onClick={() => setOpen(true)}
        className={cx('w-full font-normal flex justify-between items-center text-default border-b border-gray-900', {
          'text-primary': router.asPath.includes(menu?.attributes?.menuSlug ?? ''),
        })}
      >
        <div className="text-[20px] text-gray-900">
          <div>{menu?.attributes?.menuTitle}</div>
        </div>
        <div className="text-gray-900 text-right p-5">{'>'}</div>
      </button>
      <div>{isOpen && <MobileSubnavigation menuSections={menuSections} onClose={() => setOpen(false)} />}</div>
    </div>
  )
}

export default MobileNavigationItem
