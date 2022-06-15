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

export function BookNewsDetail({
  className,
  title,
  imgSrc,
  author,
  detailLink,
  linkClassName,
}: BookNewsDetailProps) {
  const { Link: UILink, Image: UIImage } = useUIContext()
  return (
    <div className={cx(className, 'flex flex-col group pt-4 hover:pt-0')}>
      {imgSrc && (
        <UILink target="_blank" className={cx(linkClassName, 'flex')} href={detailLink ?? ''}>
          <UIImage src={imgSrc} shadow={false} alt={title} />
        </UILink>
      )}
      <h6 className="mt-4 text-sm max-h-12 overflow-hidden group-hover:underline" title={title}>
        <UILink target="_blank" href={detailLink ?? ''}>
          {title.length > 35 ? `${title.slice(0, 35)  }...` : title}
        </UILink>
      </h6>
      {/* {author && ( */}
      {/*  <span className="text-xs text-gray-universal-70 mt-[7px]"> */}
      {/*    {author} */}
      {/*  </span> */}
      {/* )} */}
    </div>
  )
}

export default BookNewsDetail
