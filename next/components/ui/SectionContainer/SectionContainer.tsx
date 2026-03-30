import { ReactNode } from 'react'

import cn from '@/utils/cn'

type SectionContainerProps = {
  children: ReactNode
  hasBorder?: boolean
  className?: string
}

export const SectionContainer = ({
  children,
  hasBorder = false,
  className,
}: SectionContainerProps) => {
  return (
    <div className={cn('mx-auto w-full px-4 lg:max-w-[1244px] lg:px-8', className)}>
      <div
        className={cn({
          'border-b border-border-dark': hasBorder,
        })}
      >
        {children}
      </div>
    </div>
  )
}
