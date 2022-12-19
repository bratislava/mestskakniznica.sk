import { PageEntity, PremiseEntityFragment } from '@bratislava/strapi-sdk-city-library'
import { LoadingSpinner, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import useSWR from 'swr'

import { client } from '../../utils/gql'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import PremiseCard from '../Molecules/PremiseCard'
import Sections from '../Molecules/Sections'

export interface PremisesPageProps {
  page: PageEntity
}

const Premises = ({ page }: PremisesPageProps) => {
  const { locale = 'sk' } = usePageWrapperContext()

  const { data, error } = useSWR(['Premises', locale], (_key, locale) =>
    client.Premises({ locale })
  )

  const premises = data?.premises?.data

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-border-dark">
          <PageTitle
            title={page?.attributes?.title ?? ''}
            description={page?.attributes?.description ?? ''}
          />
          {!premises && !error && <LoadingSpinner className="pt-12" />}

          <div className="mb-16 grid gap-x-5 gap-y-8 border-b border-border-dark pt-12 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {premises?.map((item) => (
              <PremiseCard
                address={item?.attributes?.address || ''}
                image={item?.attributes?.image?.data}
                title={item?.attributes?.title || ''}
                url={item?.attributes?.url || ''}
                key={item?.attributes?.url}
              />
            ))}
          </div>

          <div className="place-content-center lg:w-[980px] lg:pl-[200px]">
            {page?.attributes?.sections && <Sections sections={page?.attributes?.sections} />}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default Premises
