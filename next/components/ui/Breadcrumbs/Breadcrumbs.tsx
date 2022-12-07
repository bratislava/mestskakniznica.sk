import ChevronRight from '@assets/images/chevron-right.svg'
import Home from '@assets/images/home.svg'
import cx from 'classnames'
import { Fragment } from 'react'

import { Link } from '../Link/Link'

export interface BreadcrumbsProps {
  homeLabel?: string
  items: IBreadcrumb[]
}

interface IBreadcrumb {
  title: string
  url: string
}

export const Breadcrumbs = ({ items, homeLabel = 'Home' }: BreadcrumbsProps) => {
  return (
    <div className=" flex h-[56px] text-sm">
      <Link href="/" className="py-4">
        <Home />
        <span className="sr-only">{homeLabel}</span>
      </Link>
      <div className="flex">
        {items.map((item) => (
          <Fragment key={item.url}>
            <div className="py-6 pl-[18px]">
              <ChevronRight />
            </div>
            {item.url && item.url !== null ? (
              <Link
                href={item.url}
                className="cursor-pointer py-4 pl-3"
                uppercase={false}
                size="large"
              >
                <a href={item.url} className="">
                  {item.title}
                </a>
              </Link>
            ) : (
              <div className="flex items-center gap-x-2.5 py-4 pl-3 text-[16px]">
                <div>{item.title}</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
