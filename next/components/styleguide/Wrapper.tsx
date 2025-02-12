import { ReactNode } from 'react'

import cn from '@/utils/cn'

type WrapperProps = {
  title?: string
  children: ReactNode
  direction?: 'column' | 'row'
  noBorder?: boolean
}

/**
 * Based on Marianum: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/pages/styleguide/index.tsx
 */

export const Wrapper = ({ title, children, direction = 'row', noBorder }: WrapperProps) => {
  const wrapperClassNames = cn(
    'border-t-1 mb-10 flex flex-col border border-b-0 border-l-0 border-r-0 border-solid border-border-dark pt-10',
    { 'border-t-0': noBorder },
  )

  const childrenClassNames = cn('flex', {
    'flex-col space-y-2': direction === 'column',
    'justify-between space-x-2': direction === 'row',
  })

  return (
    <div className={wrapperClassNames}>
      {title && <h2 className="pb-2 text-h2">{title}</h2>}
      <div className={childrenClassNames}>{children}</div>
    </div>
  )
}
