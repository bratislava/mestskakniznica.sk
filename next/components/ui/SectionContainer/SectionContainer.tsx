import cx from 'classnames'
import { HTMLAttributes } from 'react'

interface SectionContainerProps {
  hasBackground?: boolean
  noPadding?: boolean
}

export const SectionContainer = ({
  children,
  className,
  hasBackground = false,
  noPadding = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & SectionContainerProps) => {
  return (
    <div className={cx({ 'px-4 lg:px-8': !noPadding }, className)} {...rest}>
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </div>
  )
}
