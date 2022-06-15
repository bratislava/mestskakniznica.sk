import cx from 'classnames'
import { HTMLAttributes } from 'react'

interface SectionContainerProps {
  hasBackground?: boolean
  noPadding?: boolean
}

export function SectionContainer({
  children,
  className,
  hasBackground = false,
  noPadding = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & SectionContainerProps) {
  return <div className={cx({ 'px-4 lg:px-8': !noPadding }, className)} {...rest}>
    <div className="max-w-[1180px] mx-auto">{children}</div>
  </div>
}
