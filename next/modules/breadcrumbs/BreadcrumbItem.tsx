import React, { useRef } from 'react'
import { AriaBreadcrumbItemProps, useBreadcrumbItem } from 'react-aria'

import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { BreadcrumbListItem } from '@/modules/breadcrumbs/Breadcrumbs'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'

type BreadcrumbItemProps = AriaBreadcrumbItemProps &
  Pick<BreadcrumbListItem, 'url'> & { isMobile?: boolean }

const BreadcrumbItem = ({ url, isMobile = false, ...rest }: BreadcrumbItemProps) => {
  const ref = useRef(null)
  const { itemProps } = useBreadcrumbItem(rest, ref)

  return (
    // min-w-0 https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child
    <li className={cn('flex min-w-0 list-none items-center', { 'shrink-0': !rest.isCurrent })}>
      {url && !rest.isCurrent ? (
        <MLink
          // href={url} must go after spreading itemProps because itemProps can contain href=undefined from useBreadcrumbItem
          {...itemProps}
          href={url}
          ref={ref}
          variant="breadcrumb"
          className={isMobile ? '-mx-4 flex shrink-0 items-center gap-x-1.5 px-4 py-1' : ''}
        >
          {isMobile && <ChevronLeftIcon />}
          {rest.children}
        </MLink>
      ) : (
        <span {...itemProps} ref={ref} className="truncate">
          {rest.children}
        </span>
      )}

      {!rest.isCurrent && !isMobile && (
        <span aria-hidden="true" className="shrink-0 px-1.5">
          <ChevronRightIcon />
        </span>
      )}
    </li>
  )
}

export default BreadcrumbItem
