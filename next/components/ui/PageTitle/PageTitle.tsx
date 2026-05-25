import cn from '@/utils/cn'

export interface PageTitleProps {
  className?: string
  title?: string
  perex?: string
  hasDivider?: boolean
}

export const PageTitle = ({ className, title, perex, hasDivider = true }: PageTitleProps) => {
  return (
    <div className={cn(className)}>
      <h1 className="mt-6 text-h1 lg:mt-16">{title}</h1>
      {hasDivider && <div className="mt-4 border-b border-border-dark lg:mt-6" />}
      {perex && <div className="mt-6 mb-7 w-full text-foreground-body md:w-8/12">{perex}</div>}
    </div>
  )
}

export default PageTitle
