import { PageEntity, PartnerFragment } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, Partner, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"

export type TSortedPartners = {
  featuredPartners: PartnerFragment[]
  notFeaturedPartners: PartnerFragment[]
}

export interface PartnersPageProps {
  page: PageEntity
  partners: TSortedPartners
}

function PartnersPage({ page, partners }: PartnersPageProps) {
  const { t } = useTranslation('common')
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} description={page?.attributes?.description ?? ''} />

        {partners.featuredPartners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {partners.featuredPartners.map((partner) => (
              <Partner
                key={partner?.attributes?.title}
                title={partner?.attributes?.title || ''}
                logo={partner?.attributes?.logo?.data?.attributes?.url ?? ''}
                alt={partner?.attributes?.logo?.data?.attributes?.alternativeText ?? ''}
                pageLink={{
                  title: t('showWeb').toUpperCase(),
                  url: partner?.attributes?.url || '',
                }}
                featured={partner?.attributes?.featured}
              />
            ))}
          </div>
        )}

        {partners.notFeaturedPartners.length > 0 && (
          <div className="flex flex-col space-y-3 mt-12">
            {partners.notFeaturedPartners.map((partner) => (
              <Partner
                key={partner?.attributes?.title}
                title={partner?.attributes?.title || ''}
                pageLink={{
                  title: t('showWeb').toUpperCase(),
                  url: partner?.attributes?.url || '',
                }}
                featured={partner?.attributes?.featured}
              />
            ))}
          </div>
        )}
      </SectionContainer>
    </>
  )
}

export default PartnersPage
