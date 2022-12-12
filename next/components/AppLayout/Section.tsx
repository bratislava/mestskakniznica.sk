import cx from 'classnames'
import { ReactNode } from 'react'

export interface SectionProps {
  children: ReactNode
  noBorder?: boolean
}

export default function Section({ children, noBorder = false }: SectionProps) {
  return (
    <div
      className={cx('m-auto max-w-[1180px] border-border-dark', {
        'border-b': !noBorder,
      })}
    >
      {children}
    </div>
  )
}
