import PageCard from '@modules/cards-and-rows/PageCard'
import PageRow from '@modules/cards-and-rows/PageRow'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { NavikronosChildren } from '../../../navikronos/types'

export interface ListingProps {
  className?: string
  title?: string
  url?: string
  moreLinkTitle?: string
  listingChildren: NavikronosChildren
  hasDivider?: boolean
}

export const Listing = ({
  className,
  title,
  url,
  moreLinkTitle,
  listingChildren,
  hasDivider,
}: ListingProps) => {
  const { t } = useTranslation()

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
        {listingChildren?.map((page, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <div className="hidden md:block">
              <PageCard
                className="h-[180px]"
                key={page.title}
                title={page.title}
                href={page.path}
                showMoreText={t('more')}
              />
            </div>

            <PageRow className="md:hidden" title={page.title} href={page.path} />
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
