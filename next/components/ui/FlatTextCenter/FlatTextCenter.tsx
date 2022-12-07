import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface FlatTextCenterProps {
  className?: string
  imgSrc?: string
  alt?: string
  content?: string
}

export const FlatTextCenter = ({ className, imgSrc, alt, content }: FlatTextCenterProps) => {
  const { Markdown: UIMarkdown } = useUIContext()
  return (
    <div className={cx(className, 'float-none m-auto max-w-[780px] space-y-10')}>
      {imgSrc && <img src={imgSrc} alt={alt} />}
      <UIMarkdown paragraphClassName="text-sm" content={content ?? ''} />
    </div>
  )
}

export default FlatTextCenter
