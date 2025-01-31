import { AriaBreadcrumbsProps } from 'react-aria'

import DesktopBreadcrumbs from '@/modules/breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@/modules/breadcrumbs/MobileBreadcrumbs'

export type BreadcrumbListItem = { title: string; url?: string | null }

export type BreadcrumbsProps = AriaBreadcrumbsProps & {
  crumbs: { title: string; path: string | null }[] | null
}

const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <>
      <div className="hidden lg:flex">
        <DesktopBreadcrumbs crumbs={crumbs} />
      </div>
      <div className="lg:hidden">
        <MobileBreadcrumbs crumbs={crumbs} />
      </div>
    </>
  )
}

export default Breadcrumbs
