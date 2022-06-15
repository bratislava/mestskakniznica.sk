import ArrowRight from '@assets/images/arrow-right-strong.svg'
import cx from 'classnames'
import { ReactNode } from 'react'

export interface RowSubcategoryProps {
  className?: string
  title: string
  icon?: ReactNode
}

export function RowSubcategory({ className, title, icon = <ArrowRight /> }: RowSubcategoryProps) {
  return <div
    className={cx(
      'group cursor-pointer flex items-center justify-between border border-gray-universal-100 p-3 lg:p-4',
      className
    )}
  >
    <p className="text-sm text-gray-universal-100 group-hover:underline">{title}</p>
    {icon}
  </div>
}
