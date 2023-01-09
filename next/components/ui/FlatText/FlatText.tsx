import RichText from '@modules/formatting/RichText'
import cx from 'classnames'

import { Video } from '../Video/Video'

export interface FlatTextProps {
  className?: string
  media?: string
  alt?: string
  mediaType?: string
  content?: string
}

export const FlatText = ({ className, media, alt, mediaType, content }: FlatTextProps) => {
  return (
    <div className={cx(className, 'space-y-10 ')}>
      {media && mediaType === 'image' && <img src={media} alt={alt} />}
      {media && mediaType === 'video' && (
        <div className="flex w-full justify-center">
          <Video mediaUrl={media} />
        </div>
      )}
      <RichText content={content ?? ''} />
    </div>
  )
}

export default FlatText
