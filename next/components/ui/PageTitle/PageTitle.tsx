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
      <h1 className="mt-6 text-md2 lg:mt-16 lg:text-2xl">{title}</h1>
      {/* Divider */}
      {hasDivider && <div className="mt-4 border-b-[1px] border-gray-700 lg:mt-6" />}
      {/* Description */}
      {description && (
        <UIMarkdown
          paragraphClassName="text-sm lg:text-defaul"
          className="mt-6 w-full text-gray-universal-70 md:w-8/12"
          content={description ?? ''}
        />
      )}
    </div>
  )
}

export default PageTitle
