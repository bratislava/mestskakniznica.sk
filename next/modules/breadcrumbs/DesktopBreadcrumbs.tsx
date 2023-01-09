import { HomeIcon } from '@assets/icons'
import BreadcrumbItem from '@modules/breadcrumbs/BreadcrumbItem'
import { BreadcrumbsProps } from '@modules/breadcrumbs/Breadcrumbs'
import { useTranslation } from 'next-i18next'
import { useBreadcrumbs } from 'react-aria'

const DesktopBreadcrumbs = ({ crumbs, ...rest }: BreadcrumbsProps) => {
  const { t } = useTranslation('common')
  const { navProps } = useBreadcrumbs(rest)

  return (
    <nav {...navProps} className="flex min-w-0 text-sm">
      <ol className="flex w-fit items-center overflow-hidden py-4">
        <BreadcrumbItem url="/">
          <HomeIcon />
          <span className="sr-only">{t('homepage')}</span>
        </BreadcrumbItem>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            // eslint-disable-next-line react/no-array-index-key
            <BreadcrumbItem key={index} url={crumb.url} isCurrent={isLast}>
              {crumb.title}
            </BreadcrumbItem>
          )
        })}
      </ol>
    </nav>
  )
}

export default DesktopBreadcrumbs
