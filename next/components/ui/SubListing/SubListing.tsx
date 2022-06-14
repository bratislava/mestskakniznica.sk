import { CallToAction } from '@bratislava/ui-city-library/components/CallToAction/CallToAction'
import ChevronRight from '@assets/images/chevron-right.svg'
import { RowSubcategory } from '@bratislava/ui-city-library/components/RowSubcategory/RowSubcategory'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import React from 'react'

export interface SubListingProps {
  title?: string
  url?: string
  linkTitle?: string
}

export const SubListing = ({ title, url, linkTitle }: SubListingProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <UILink key={title} href={url}>
      <CallToAction
        className="hidden md:flex w-full h-[180px] mt-0"
        key={title}
        title={title}
        href={url}
        bottomText={linkTitle}
        hasIcon={false}
        uppercase={false}
        customIcon={
          <span className="inline-flex ml-2">
            <ChevronRight />
          </span>
        }
      />

      <RowSubcategory className="md:hidden" title={title} icon={<ChevronRight />} />
    </UILink>
  )
}

export default SubListing
function otherLocale(arg0: any, localizations: any) {
  throw new Error('Function not implemented.')
}

function usePageWrapperContext(): { localizations: any; locale: any } {
  throw new Error('Function not implemented.')
}
