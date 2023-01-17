import { ChevronRightIcon } from '@assets/icons'
import MLink from '@modules/common/MLink'
import cx from 'classnames'

export interface RowSubcategoryProps {
  className?: string
  title: string
  href: string
}

export const RowSubcategory = ({ className, title, href }: RowSubcategoryProps) => {
  return (
    <div
      className={cx(
        'relative flex cursor-pointer items-center justify-between border border-border-dark p-3 lg:p-4',
        className
      )}
    >
      <MLink href={href} stretched className="text-foreground-heading" variant="basic">
        {title}
      </MLink>
      <ChevronRightIcon />
    </div>
  )
}
