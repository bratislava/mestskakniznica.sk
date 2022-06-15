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
    <div className="border border-gray-900">
      <Link href={href} hasIcon={hasIcon} uppercase={uppercase}>
        <div className={cx('p-4 relative flex flex-col space-y-4', className)}>
          <div className="h-full text-[20px] overflow-hidden">{title}</div>
          <div className="text-sm cursor-pointer uppercase underline decoration-2">
            {bottomText}
            {customIcon}
          </div>
        </div>
      </Link>
    </div>
  )
}
