import ChevronRight from '@assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { CallToAction } from '@bratislava/ui-city-library/CallToAction/CallToAction'
import { RowSubcategory } from '@bratislava/ui-city-library/RowSubcategory/RowSubcategory'
import React from 'react'

export interface SubListingProps {
  title?: string
  url?: string
  linkTitle?: string
}

export const SubListing = ({ title, url, linkTitle }: SubListingProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <UILink key={title} href={url || ''}>
      <CallToAction
        className="mt-0 hidden h-[180px] w-full md:flex"
        key={title}
        title={title || ''}
        href={url || ''}
        bottomText={linkTitle}
        hasIcon={false}
        uppercase={false}
        customIcon={
          <span className="ml-2 inline-flex">
            <ChevronRight />
          </span>
        }
      />

      <RowSubcategory className="md:hidden" title={title || ''} icon={<ChevronRight />} />
    </UILink>
  )
}

export default SubListing

interface PageLocalization {
  locale: string | null | undefined
  slug: string | null | undefined
}

function otherLocale(arg0: string, localizations: PageLocalization[]) {
  throw new Error('Function not implemented.')
}

function usePageWrapperContext(): { localizations: PageLocalization[]; locale: string } {
  throw new Error('Function not implemented.')
}
