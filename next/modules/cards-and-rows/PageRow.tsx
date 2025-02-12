import { ChevronRightIcon } from '@/assets/icons'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'

type PageRowProps = {
  className?: string
  title: string
  href: string
}

const PageRow = ({ className, title, href }: PageRowProps) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer items-center justify-between border border-border-dark p-3 lg:p-4',
        className,
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
