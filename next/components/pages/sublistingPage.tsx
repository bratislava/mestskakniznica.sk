import * as React from 'react'
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs'

import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'

import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { parsePages } from '../../utils/page'
import { useTranslation } from 'next-i18next'

export interface SublistingPageProps {
  page: PageFragment
}

const SublistingPage = ({ page }: SublistingPageProps) => {
  const { t } = useTranslation('common')

  const pages = page?.pageCategory?.pages ? parsePages(page?.pageCategory?.pages) : undefined

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />

        {/* Subcategory Pages */}
        {pages && (
          <Listing
            className="mt-8 md:mt-16"
            title={page?.title ?? ''}
            pages={pages.map((page) => ({
              title: page.title ?? '',
              url: page.url ?? '',
              moreLinkTitle: t('more'),
            }))}
          />
        )}
      </SectionContainer>
    </>
  )
}

export default SublistingPage
