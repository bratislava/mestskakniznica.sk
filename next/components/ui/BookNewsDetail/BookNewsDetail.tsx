import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface BookNewsDetailProps {
  className?: string
  title: string
  imgSrc?: string
  author?: string
  detailLink?: string
  linkClassName?: string
}

export const BookNewsDetail = ({
  className,
  title,
  imgSrc,
  author,
  detailLink,
  linkClassName,
}: BookNewsDetailProps) => {
  const { Link: UILink, Image: UIImage } = useUIContext()

  return (
    <div className={cx(className, 'group flex flex-col pt-4 hover:pt-0')}>
      {imgSrc && (
        <UILink target="_blank" className={cx(linkClassName, 'flex')} href={detailLink ?? ''}>
          <UIImage src={imgSrc} shadow={false} alt={title} />
        </UILink>
      )}
      <h6 className="mt-4 max-h-12 overflow-hidden text-sm group-hover:underline" title={title}>
        <UILink target="_blank" href={detailLink ?? ''}>
          {title.length > 35 ? `${title.slice(0, 35)}...` : title}
        </UILink>
      </h6>
      {/* {author && <span className="mt-[7px] text-xs text-text-body">{author}</span>} */}
    </div>
  )
}

export default BookNewsDetail
