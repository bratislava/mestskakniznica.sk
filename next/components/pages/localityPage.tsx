import { EventCardEntityFragment, PageEntity } from '@bratislava/strapi-sdk-city-library'
import { SectionContainer } from '@bratislava/ui-city-library'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface PageProps {
  page: PageEntity
}

const LocalityPage = ({ page }: PageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-b border-gray-900">
          {page?.attributes?.sections && (
            <Sections sections={page?.attributes?.sections} events={[]} eventsListingUrl="" />
          )}
        </div>
      </SectionContainer>
    </>
  )
}

export default LocalityPage
