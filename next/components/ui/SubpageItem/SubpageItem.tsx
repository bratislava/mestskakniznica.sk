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
      <h3 className="border-border-dark text-h4">{title}</h3>
      {description && (
        <UIMarkdown className="mt-4 text-base text-foreground-body" content={description}/>
      )}
      <div className="mt-6 flex items-center justify-between border-[1px] border-border-dark p-4">
        <span className="text-base">{title}</span>

        {url && <ArrowRight/>}
      </div>
    </UILink>
  )
}

export default SubpageItem
