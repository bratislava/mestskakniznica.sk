import RichText from '@modules/formatting/RichText'
import cx from 'classnames'

export interface FlatTextCenterProps {
  className?: string
  content?: string
}

export const FlatTextCenter = ({ className, content }: FlatTextCenterProps) => {
  return (
    <div className={cx(className, 'float-none m-auto max-w-[780px] space-y-10')}>
      <RichText content={content ?? ''} />
    </div>
  )
}

export default FlatTextCenter
