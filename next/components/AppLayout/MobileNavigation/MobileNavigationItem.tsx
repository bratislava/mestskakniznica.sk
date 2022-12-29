import cx from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { MenuEntity } from '../../../graphql'
import MobileSubnavigation from './MobileSubnavigation'

interface navItemProps {
  menu: MenuEntity
}

const MobileNavigationItem = ({ menu }: navItemProps) => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const menuSections = menu?.attributes?.menuSections || []
  return (
    <div className={cx('w-full cursor-pointer px-4 text-h5 font-normal')}>
      {/* TODO replace by Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cx(
          'flex w-full items-center justify-between border-b border-border-dark text-h5 font-normal',
          {
            'text-foreground-body': router.asPath.includes(menu?.attributes?.menuSlug ?? ''),
          }
        )}
      >
        <div className="text-[20px] text-foreground-heading">
          <div>{menu?.attributes?.menuTitle}</div>
        </div>
        <div className="p-5 text-right text-foreground-heading">{'>'}</div>
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
