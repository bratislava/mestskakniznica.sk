import ArrowRight from '@assets/images/arrow-right-strong.svg'
import cx from 'classnames'
import { ReactNode } from 'react'

export interface RowSubcategoryProps {
  className?: string
  title: string
  icon?: ReactNode
}

export const RowSubcategory = ({ className, title, icon = <ArrowRight/> }: RowSubcategoryProps) => {
  return (
    <div
      className={cx(
        'group flex cursor-pointer items-center justify-between border border-border-dark p-3 lg:p-4',
        className
      )}
    >
      <p className="text-base text-foreground-heading group-hover:underline">{title}</p>
      {icon}
    </div>
  )
}
