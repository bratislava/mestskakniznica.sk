import { ReactNode } from 'react'
import cx from 'classnames'

interface DetailsRowProps {
  classWrapper: string
  text: string
  svgIcon: ReactNode
}

const DetailsRow = ({ classWrapper, text, svgIcon }: DetailsRowProps) => {
  return (
    <div className={cx(classWrapper)}>
      <div className="align-top">{svgIcon}</div>
      <div className="pl-[15px]">{text}</div>
    </div>
  )
}

export default DetailsRow
