import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface FlatTextCenterProps {
  className?: string
  imgSrc?: string
  alt?: string
  content?: string
}

export function FlatTextCenter({ className, imgSrc, alt, content }: FlatTextCenterProps) {
  const { Markdown: UIMarkdown } = useUIContext()
  return (
    <div className={cx(className, 'space-y-10 max-w-[780px] m-auto float-none')}>
      {imgSrc && <img src={imgSrc} alt={alt} />}
      <UIMarkdown paragraphClassName="text-sm" content={content ?? ''} />
    </div>
  )
}

export default FlatTextCenter
