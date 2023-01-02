import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface PageTitleProps {
  className?: string
  title?: string
  description?: string
  hasDivider?: boolean
}

export const PageTitle = ({ className, title, description, hasDivider = true }: PageTitleProps) => {
  const { Markdown: UIMarkdown } = useUIContext()
  return (
    <div className={cx(className)}>
      <h1 className="mt-6 text-h1 lg:mt-16">{title}</h1>
      {/* Divider */}
      {hasDivider && <div className="mt-4 border-b-[1px] border-border-dark lg:mt-6" />}
      {/* Description */}
      {description && (
        <UIMarkdown
          paragraphClassName="text-base lg:text-defaul"
          className="mt-6 w-full text-foreground-body md:w-8/12"
          content={description ?? ''}
        />
      )}
    </div>
  )
}

export default PageTitle
