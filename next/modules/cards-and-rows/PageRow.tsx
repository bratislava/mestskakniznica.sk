import { ChevronRightIcon } from '@assets/icons'
import cx from 'classnames'

import MLink from '@/modules/common/MLink'

type PageRowProps = {
  className?: string
  title: string
  href: string
}

const PageRow = ({ className, title, href }: PageRowProps) => {
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

export default PageRow
