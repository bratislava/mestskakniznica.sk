import cx from 'classnames'
import { ReactNode } from 'react'

interface DetailsRowProps {
  classWrapper: string
  text: ReactNode
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
