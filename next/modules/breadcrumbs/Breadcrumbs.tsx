import DesktopBreadcrumbs from '@modules/breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@modules/breadcrumbs/MobileBreadcrumbs'
import { AriaBreadcrumbsProps } from 'react-aria'

import { NavikronosBreadcrumbs } from '../../navikronos/internal/internalTypes'

export type BreadcrumbListItem = { title: string; url?: string }

export type BreadcrumbsProps = AriaBreadcrumbsProps & {
  crumbs: NavikronosBreadcrumbs | null
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
