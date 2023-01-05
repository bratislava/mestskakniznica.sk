import { CallToAction } from '@bratislava/ui-city-library/CallToAction/CallToAction'
import { RowSubcategory } from '@bratislava/ui-city-library/RowSubcategory/RowSubcategory'
import React from 'react'

export interface SubListingProps {
  title?: string
  url?: string
  linkTitle?: string
}

export const SubListing = ({ title, url, linkTitle }: SubListingProps) => {
  return (
    <div>
      <div className="hidden md:block">
        <CallToAction
          className="h-[180px] w-full"
          key={title}
          title={title || ''}
          href={url || ''}
          showMoreText={linkTitle}
        />
      </div>

      <RowSubcategory className="md:hidden" title={title || ''} href={url ?? ''} />
    </div>
  )
}

export default SubListing
