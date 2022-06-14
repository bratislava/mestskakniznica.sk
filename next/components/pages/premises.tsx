import { PageFragment } from '@bratislava/strapi-sdk-city-library'

import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs'
import { IPremises } from '../../utils/types'
import Sections from '../../components/Molecules/Sections'
import PremiseCard from '../../components/Molecules/PremiseCard'

export interface PremisesPageProps {
  premises: IPremises[]
  page: PageFragment
}

const Premises = ({ page, premises }: PremisesPageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-gray-900">
          <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />
          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12 border-b border-gray-900">
            {premises.map((item) => (
              <PremiseCard
                address={item.address || ''}
                image={item.image}
                title={item.title || ''}
                url={item.url || ''}
                key={item.url}
              />
            ))}
          </div>

          <div className="lg:w-[980px] lg:pl-[200px] place-content-center">
            {page?.sections && <Sections sections={page.sections} />}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default Premises
