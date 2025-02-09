import { ReactNode } from 'react'

import cn from '@/utils/cn'

type SectionContainerProps = {
  children: ReactNode
  hasBorder?: boolean
}

export const SectionContainer = ({ children, hasBorder = false }: SectionContainerProps) => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-[1244px] lg:px-8">
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
