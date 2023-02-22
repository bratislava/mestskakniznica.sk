import cx from 'classnames'
import { ReactNode } from 'react'

type SectionContainerProps = {
  children: ReactNode
  hasBorder?: boolean
}

export const SectionContainer = ({ children, hasBorder = false }: SectionContainerProps) => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-[1244px] lg:px-8">
      <div
        className={cx({
          'border-b border-border-dark': hasBorder,
        })}
      >
        {children}
      </div>
    </div>
  )
}
