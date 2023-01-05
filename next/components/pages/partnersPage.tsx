import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, Partner, SectionContainer } from '@bratislava/ui-city-library'
import { getPartnersQueryKey, partnersFetcher } from '@utils/fetchers/partners.fetcher'
import { useTranslation } from 'next-i18next'
import { useQuery } from 'react-query'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface IPartnersPageProps {
  page: PageEntity
}

const PartnersPage = ({ page }: IPartnersPageProps) => {
  const { t, i18n } = useTranslation('common')

  // There's no need to handle loading, as the data are prefetched and never change.
  const { data } = useQuery({
    queryKey: getPartnersQueryKey(i18n.language),
    queryFn: () => partnersFetcher(i18n.language),
    staleTime: Infinity, // The data are static and don't need to be reloaded.
  })

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

        {data?.featuredPartners && data.featuredPartners.data.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {data.featuredPartners.data.map((partner) => (
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

        {data?.notFeaturedPartners && data.notFeaturedPartners.data.length > 0 && (
          <div className="mt-12 flex flex-col space-y-3">
            {data.notFeaturedPartners.data.map((partner) => (
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
