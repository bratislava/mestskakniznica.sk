import ChevronRight from '@assets/images/chevron-right.svg'
import MLink from '@modules/common/MLink'
import FormatDate from '@modules/formatting/FormatDate'
import cx from 'classnames'

import Placeholder from '../../../assets/images/list-item-thumbnail.jpeg'

export interface ArticleCardProps {
  className?: string
  title?: string
  pageLink?: { title?: string; url?: string }
  media?: string
  mediaType?: string
  publishedDate?: string
}

export const ArticleCard = ({
  className,
  title,
  pageLink,
  media,
  mediaType,
  publishedDate,
}: ArticleCardProps) => {
  return (
    <MLink href={pageLink?.url ?? '#'}>
      <div className={cx(className, 'flex flex-col')}>
        <div className="flex w-full">
          {media && mediaType === 'image' && (
            <img src={media} alt={title} className="h-48 w-full object-cover" />
          )}
          {media && mediaType === 'video' && (
            <video
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              className="h-48 w-full object-cover"
            >
              <source src={media} />
              Your browser does not support HTML video.
            </video>
          )}{' '}
          {!media && <img src={Placeholder.src} alt={title} className="h-48 w-full object-cover" />}
        </div>

        {publishedDate && (
          <label className="mt-2 cursor-pointer text-sm text-foreground-body">
            <FormatDate value={publishedDate} valueType="ISO" />
          </label>
        )}

        <h5 className="mt-2">{title}</h5>

        {pageLink?.url && (
          <MLink className="mt-6 flex items-center space-x-[9px]" href={pageLink?.url ?? '#'}>
            <span className="text-sm text-foreground-heading">{pageLink?.title}</span>
            <ChevronRight />
          </MLink>
        )}
      </div>
    </MLink>
  )
}

export default ArticleCard
