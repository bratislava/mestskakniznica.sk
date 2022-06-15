import cx from 'classnames'
import { ReactNode } from 'react'

interface DetailsRowProps {
  classWrapper: string
  text: string
  svgIcon: ReactNode
}

function DetailsRow({ classWrapper, text, svgIcon }: DetailsRowProps) {
  return (
    <div className={cx(classWrapper)}>
      <div className="align-top">{svgIcon}</div>
      <div className="pl-[15px]">{text}</div>
    </div>
  )
}

export default DetailsRow
