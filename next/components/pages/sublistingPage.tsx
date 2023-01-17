import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { PageEntity } from '@services/graphql'
import { parsePages } from '@utils/page'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface SublistingPageProps {
  page: PageEntity
}

const SublistingPage = ({ page }: SublistingPageProps) => {
  const { t } = useTranslation('common')

  const pages = page?.attributes?.pageCategory?.data?.attributes?.pages
    ? parsePages(page?.attributes?.pageCategory?.data?.attributes?.pages)
    : undefined

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} perex={page?.attributes?.perex ?? ''} />

        {/* Subcategory Pages */}
        {pages && (
          <Listing
            className="mt-8 md:mt-16"
            title={page?.attributes?.title ?? ''}
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
