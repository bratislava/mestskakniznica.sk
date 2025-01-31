import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { PageEntityFragment } from '@services/graphql'
import * as React from 'react'

import { isDefined } from '@/utils/isDefined'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface FullContentPageProps {
  page: PageEntityFragment
}

const FullContentPage = ({ page }: FullContentPageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} perex={page?.attributes?.perex ?? ''} />

        <div className="mt-8">
          <Sections sections={page.attributes?.sections?.filter(isDefined) ?? []} />
        </div>
      </SectionContainer>
    </>
  )
}

export default FullContentPage
