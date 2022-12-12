import cx from 'classnames'

import { Link } from '../Link/Link'

export interface CtaProps {
  className?: string
  title: string
  href: string
  bottomText?: string
  customIcon?: React.ReactNode
  hasIcon: boolean
  uppercase?: boolean
}

export const CallToAction = ({
  className,
  title,
  href,
  bottomText,
  customIcon,
  hasIcon = true,
  uppercase = true,
}: CtaProps) => {
  return (
    <div className="border border-border-dark">
      <Link href={href} hasIcon={hasIcon} uppercase={uppercase}>
        <div className={cx('relative flex flex-col space-y-4 p-4', className)}>
          <div className="h-full overflow-hidden text-[20px]">{title}</div>
          <div className="cursor-pointer text-sm uppercase underline decoration-2">
            {bottomText}
            {customIcon}
          </div>
        </div>
      </Link>
    </div>
  )
}
