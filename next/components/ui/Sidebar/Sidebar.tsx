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

export const Sidebar = ({ className, title, href, categories, activeCategory }: SidebarProps) => {
  return (
    <div className={className}>
      <Link href={href} variant="plain" className="flex items-center gap-x-4 text-base">
        <ArrowLeft/>
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
              className={cx(
                'transform border-b py-3 text-base transition-all duration-200 ease-linear',
                {
                  'border-border-light text-foreground-body': !isActive,
                  'flex items-center gap-x-5.5 border-border-dark pl-1.5 text-foreground-heading':
                  isActive,
                }
              )}
            >
              {isActive && <ChevronRight/>}
              {category.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
