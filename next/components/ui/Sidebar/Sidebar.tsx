import ArrowLeft from '@assets/images/arrow-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'

import { Link } from '../Link/Link'

export interface SidebarProps {
  className?: string
  title: string
  href: string
  categories: ICategory[]
  activeCategory: number
}

export interface ICategory {
  title: string
  href: string
}

export function Sidebar({ className, title, href, categories, activeCategory }: SidebarProps) {
  return <div className={className}>
    <Link href={href} variant="plain" className="text-base flex items-center gap-x-4">
      <ArrowLeft />
      {title}
    </Link>
    <div className={cx('flex flex-col')}>
      {categories.map((category, i) => {
        const isActive = activeCategory === i
        return (
          <Link
            key={category.title}
            href={category.href}
            variant="plain"
            className={cx('py-3 border-b text-base tranform transition-all duration-200 ease-linear', {
              'border-input-stroke text-gray-universal-70': !isActive,
              'border-gray-universal-100 text-gray-universal-100 flex items-center gap-x-5.5 pl-1.5': isActive,
            })}
          >
            {isActive && <ChevronRight />}
            {category.title}
          </Link>
        )
      })}
    </div>
  </div>
}
