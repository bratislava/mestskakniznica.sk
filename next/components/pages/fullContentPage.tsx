import * as React from 'react'

import PageBreadcrumbs from '@/components/Molecules/PageBreadcrumbs'
import Sections from '@/components/Molecules/Sections'
import { PageTitle, SectionContainer } from '@/components/ui'
import { PageEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

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
