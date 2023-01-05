import { CallToAction, RowSubcategory } from '@components/ui'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import cx from 'classnames'
import React from 'react'

export interface ListingProps {
  className?: string
  title?: string
  url?: string
  moreLinkTitle?: string
  pages: { title: string; url: string; moreLinkTitle: string }[]
  hasDivider?: boolean
}

export const Listing = ({
  className,
  title,
  url,
  moreLinkTitle,
  pages,
  hasDivider,
}: ListingProps) => {
  return (
    <div className={cx(className)}>
      {moreLinkTitle && url && (
        <div className="group/showMore relative flex w-full items-center justify-between">
          <h2 className="text-h3 normal-case">
            <MLink href={url} variant="basic" stretched>
              {title}
            </MLink>
          </h2>
          <ShowMoreLink href={url} tabIndex={-1} parentGroup>
            {moreLinkTitle}
          </ShowMoreLink>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-y-2 md:mt-6 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {pages?.map((page) => (
          <div>
            <div className="hidden md:block">
              <CallToAction
                className="h-[180px]"
                key={page.title}
                title={page.title}
                href={page.url}
                showMoreText={page.moreLinkTitle}
              />
            </div>

            <RowSubcategory className="md:hidden" title={page.title} href={page.url} />
          </div>
        ))}
      </div>
      {hasDivider && (
        <div className="mt-16 hidden w-full border-b-[1px] border-border-dark md:flex" />
      )}
    </div>
  )
}

export default Listing
