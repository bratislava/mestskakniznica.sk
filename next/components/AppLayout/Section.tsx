import { ReactNode } from 'react'
import cx from 'classnames'

export interface SectionProps {
  children: ReactNode
  noBorder?: boolean
}

export default function Section({ children, noBorder = false }: SectionProps) {
  return (
    <div
      className={cx('m-auto max-w-[1180px] border-gray-700', {
        'border-b': !noBorder,
      })}
    >
      {children}
    </div>
  )
}
