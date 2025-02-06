import { ReactNode } from 'react'

import cn from '@/utils/cn'

interface DetailsRowProps {
  classWrapper: string
  text: ReactNode
  svgIcon: ReactNode
}

const DetailsRow = ({ classWrapper, text, svgIcon }: DetailsRowProps) => {
  return (
    <div className={cn(classWrapper)}>
      <div className="align-top">{svgIcon}</div>
      <div className="pl-[15px]">{text}</div>
    </div>
  )
}

export default DetailsRow
