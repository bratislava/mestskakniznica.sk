import RichText from '@modules/formatting/RichText'
import cx from 'classnames'

export interface FlatTextCenterProps {
  className?: string
  imgSrc?: string
  alt?: string
  content?: string
}

export const FlatTextCenter = ({ className, imgSrc, alt, content }: FlatTextCenterProps) => {
  return (
    <div className={cx(className, 'float-none m-auto max-w-[780px] space-y-10')}>
      {imgSrc && <img src={imgSrc} alt={alt} />}
      <RichText content={content ?? ''} />
    </div>
  )
}

export default FlatTextCenter
