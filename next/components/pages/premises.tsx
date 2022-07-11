import { PageEntity, PremiseEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'

import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import PremiseCard from "../Molecules/PremiseCard"
import Sections from "../Molecules/Sections"

export interface PremisesPageProps {
  premises: PremiseEntity[]
  page: PageEntity
}

function Premises({ page, premises }: PremisesPageProps) {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-gray-900">
          <PageTitle title={page?.attributes?.title ?? ''} description={page?.attributes?.description ?? ''} />
          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12 border-b border-gray-900">
            {premises.map((item) => (
              <PremiseCard
                address={item?.attributes?.address || ''}
                image={item?.attributes?.image?.data}
                title={item?.attributes?.title || ''}
                url={item?.attributes?.url || ''}
                key={item?.attributes?.url}
              />
            ))}
          </div>

          <div className="lg:w-[980px] lg:pl-[200px] place-content-center">
            {page?.attributes?.sections && <Sections sections={page?.attributes?.sections} />}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default Premises
