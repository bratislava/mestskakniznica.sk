import * as React from 'react';
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PageFragment,
  PartnerFragment,
} from '@bratislava/strapi-sdk-city-library';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Partner,
  PageTitle,
  SectionContainer,
} from '@bratislava/ui-city-library';
import { useTranslation } from 'next-i18next';

export type TSortedPartners = {
  featuredPartners: PartnerFragment[];
  notFeaturedPartners: PartnerFragment[];
};

export interface PartnersPageProps {
  page: PageFragment;
  partners: TSortedPartners;
}

const PartnersPage = ({ page, partners }: PartnersPageProps) => {
  const { t } = useTranslation('common');
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle
          title={page?.title ?? ''}
          description={page?.description ?? ''}
        />

        {partners.featuredPartners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {partners.featuredPartners.map((partner) => (
              <Partner
                key={partner.title}
                title={partner.title || ''}
                logo={partner.logo?.url ?? ''}
                alt={partner.logo?.alternativeText ?? ''}
                pageLink={{
                  title: t('showWeb').toUpperCase(),
                  url: partner.url || '',
                }}
                featured={partner.featured}
              />
            ))}
          </div>
        )}

        {partners.notFeaturedPartners.length > 0 && (
          <div className="flex flex-col space-y-3 mt-12">
            {partners.notFeaturedPartners.map((partner) => (
              <Partner
                key={partner.title}
                title={partner.title || ''}
                pageLink={{
                  title: t('showWeb').toUpperCase(),
                  url: partner.url || '',
                }}
                featured={partner.featured}
              />
            ))}
          </div>
        )}
      </SectionContainer>
    </>
  );
};

export default PartnersPage;
