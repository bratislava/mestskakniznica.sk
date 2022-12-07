import ArrowRight from '@assets/images/arrow-right-strong.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface SubpageItemProps {
  className?: string
  title?: string
  description?: string
  url?: string
}

export const SubpageItem = ({ className, title, description, url }: SubpageItemProps) => {
  const { Link: UILink, Markdown: UIMarkdown } = useUIContext()

  return (
    <UILink className={cx(className)} href={url ?? '#'}>
      <h3 className="border-gray-universal-100 text-md">{title}</h3>
      {description && (
        <UIMarkdown className="mt-4 text-sm text-gray-universal-70" content={description} />
      )}
      <div className="mt-6 flex items-center justify-between border-[1px] border-gray-universal-100 p-4">
        <span className="text-sm">{title}</span>

        {url && <ArrowRight />}
      </div>
    </UILink>
  )
}

export default SubpageItem
