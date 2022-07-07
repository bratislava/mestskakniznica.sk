import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { Localities, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'

import { ILocality } from '../../utils/types'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface LocalityPageProps {
  localities: ILocality[]
  page: PageEntity
}

function LocalitiesListingPage({ page, localities }: LocalityPageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-b border-gray-900">
          <PageTitle title={page?.attributes?.title ?? ''} description={page?.attributes?.description ?? ''} />

          <Localities
            altDesign
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
            localities={localities}
          />

          <div className="pt-12">
            <div className="mb-8 text-[32px]">{t('moreInformation')}</div>
            <Sections
              sections={page?.attributes?.sections || []}
              className="grid gap-4 pb-16 md:grid-cols-2 lg:grid-cols-4"
            />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default LocalitiesListingPage
