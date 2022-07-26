import { PageEntity, PartnerEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, Partner, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export type TSortedPartners = {
  featuredPartners: PartnerEntity[]
  notFeaturedPartners: PartnerEntity[]
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
        <PageTitle
          title={page?.attributes?.title ?? ''}
          description={page?.attributes?.description ?? ''}
        />

        {partners.featuredPartners.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
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
          <div className="mt-12 flex flex-col space-y-3">
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
