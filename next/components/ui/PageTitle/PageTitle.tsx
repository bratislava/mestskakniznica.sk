import cx from 'classnames'

export interface PageTitleProps {
  className?: string
  title?: string
  perex?: string
  hasDivider?: boolean
}

export const PageTitle = ({ className, title, perex, hasDivider = true }: PageTitleProps) => {
  return (
    <div className={cx(className)}>
      <h1 className="mt-6 text-h1 lg:mt-16">{title}</h1>
      {/* Divider */}
      {hasDivider && <div className="mt-4 border-b-[1px] border-border-dark lg:mt-6" />}
      {/* Perex, base font size */}
      {perex && <div className="mt-6 mb-7 w-full text-foreground-body md:w-8/12">{perex}</div>}
    </div>
  )
}

export default PageTitle
