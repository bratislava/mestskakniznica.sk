import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import * as React from 'react'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface FullContentPageProps {
  page: PageEntity
}

const FullContentPage = ({ page }: FullContentPageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} perex={page?.attributes?.perex ?? ''} />

        {/* Sections */}
        {page?.attributes?.sections && <Sections sections={page.attributes?.sections ?? []} />}
      </SectionContainer>
    </>
  )
}

export default FullContentPage
