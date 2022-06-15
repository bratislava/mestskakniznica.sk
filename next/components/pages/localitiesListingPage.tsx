import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { Localities, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'

import { ILocality } from '../../utils/types'
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface LocalityPageProps {
  localities: ILocality[]
  page: PageFragment
}

function LocalitiesListingPage({ page, localities }: LocalityPageProps) {
  const { t } = useTranslation(['common', 'homepage'])
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-gray-900 border-b">
          <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />

          <Localities altDesign mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY} localities={localities} />

          <div className="pt-12">
            <div className="text-[32px] mb-8">{t('moreInformation')}</div>
            <Sections sections={page.sections} className="pb-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4" />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default LocalitiesListingPage
