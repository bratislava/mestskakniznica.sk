import RichText from '@modules/formatting/RichText'
import cx from 'classnames'

export interface FlatTextProps {
  className?: string
  content?: string
}

export const FlatText = ({ className, content }: FlatTextProps) => {
  return (
    <div className={cx(className, 'space-y-10 ')}>
      <RichText content={content ?? ''} />
    </div>
  )
}

export default FlatText
