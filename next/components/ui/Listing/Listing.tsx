import PageCard from '@modules/cards-and-rows/PageCard'
import PageRow from '@modules/cards-and-rows/PageRow'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { CLNavikronosConfig, useNavikronos } from '@utils/navikronos'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useId } from 'react'

import { NavikronosRouteChildren } from '../../../navikronos/types'

export interface ListingProps {
  className?: string
  title?: string
  url?: string
  listingChildren: NavikronosRouteChildren<CLNavikronosConfig>
  hasDivider?: boolean
}

export const Listing = ({ className, title, url, listingChildren, hasDivider }: ListingProps) => {
  const { t } = useTranslation()
  const { getPathForEntity } = useNavikronos()
  const id = useId()

  return (
    <div className={cx(className)}>
      <div className="group/showMore relative flex w-full items-center justify-between">
        {title && (
          <h2 id={id} className="text-h3 normal-case">
            {title}
          </h2>
        )}
        {url && (
          <ShowMoreLink href={url} parentGroup aria-labelledby={id}>
            {t('more')}
          </ShowMoreLink>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-y-2 md:mt-6 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {listingChildren?.map((page, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <div className="hidden md:block">
              <PageCard
                className="h-[180px]"
                key={page.title}
                title={page.title}
                href={getPathForEntity(page.entity) ?? '#'}
                showMoreText={t('more')}
              />
            </div>

            <PageRow
              className="md:hidden"
              title={page.title}
              href={getPathForEntity(page.entity) ?? '#'}
            />
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
