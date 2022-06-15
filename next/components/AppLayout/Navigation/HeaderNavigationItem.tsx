import React, { ReactNode } from 'react'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface INavigationItemProps {
  url: string
  children: ReactNode
}

const HeaderNavigationItem = ({ url, children }: INavigationItemProps) => {
  const router = useRouter()

  return (
    <div className="cursor-pointer font-normal md:flex text-xs leading-[19.6px] py-[10px] border-gray-900">
      <div
        className={cx('font-normal', {
          'text-primary': router.pathname.startsWith(url),
        })}
      >
        <Link href={url} passHref>
          <a href={url}>{children}</a>
        </Link>
      </div>
    </div>
  )
}

export default HeaderNavigationItem
