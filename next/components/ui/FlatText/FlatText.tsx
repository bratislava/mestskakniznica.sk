import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { Video } from '../Video/Video'

export interface FlatTextProps {
  className?: string
  media?: string
  alt?: string
  mediaType?: string
  content?: string
}

export function FlatText({ className, media, alt, mediaType, content }: FlatTextProps) {
  const { Markdown: UIMarkdown } = useUIContext()
  return (
    <div className={cx(className, 'space-y-10 ')}>
      {media && mediaType === 'image' && <img src={media} alt={alt} />}
      {media && mediaType === 'video' && (
        <div className="flex justify-center w-full">
          <Video mediaUrl={media} />
        </div>
      )}
      <UIMarkdown paragraphClassName="text-sm" content={content ?? ''} />
    </div>
  )
}

export default FlatText
