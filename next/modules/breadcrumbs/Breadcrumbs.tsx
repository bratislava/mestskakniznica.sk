import DesktopBreadcrumbs from '@modules/breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@modules/breadcrumbs/MobileBreadcrumbs'
import { CLNavikronosConfig } from '@utils/navikronos'
import { AriaBreadcrumbsProps } from 'react-aria'

import { NavikronosRouteBreadcrumbs } from '../../navikronos/types'

export type BreadcrumbListItem = { title: string; url?: string | null }

export type BreadcrumbsProps = AriaBreadcrumbsProps & {
  crumbs: NavikronosRouteBreadcrumbs<CLNavikronosConfig>
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
