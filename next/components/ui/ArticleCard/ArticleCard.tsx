import ChevronRight from '@assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

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
  const { Link: UILink } = useUIContext()

  return (
    <UILink href={pageLink?.url ?? '#'}>
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
        </div>

        {publishedDate && (
          <label className="mt-2 cursor-pointer text-xs text-gray-universal-70">
            {publishedDate}
          </label>
        )}

        <h5 className="mt-2 text-gray-universal-100">{title}</h5>

        {pageLink?.url && (
          <UILink className="mt-6 flex items-center space-x-[9px]" href={pageLink?.url ?? '#'}>
            <span className="text-xs text-gray-universal-100">{pageLink?.title}</span>
            <ChevronRight />
          </UILink>
        )}
      </div>
    </UILink>
  )
}

export default ArticleCard
