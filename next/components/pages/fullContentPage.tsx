import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import * as React from 'react'

import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface FullContentPageProps {
  page: PageFragment
}

function FullContentPage({ page }: FullContentPageProps) {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />

        {/* Sections */}
        {page?.sections && <Sections sections={page.sections ?? []} />}
      </SectionContainer>
    </>
  )
}

export default FullContentPage
