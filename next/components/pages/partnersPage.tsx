import { PageEntity, PartnerEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, Partner, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import { client } from '../../utils/gql'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import PartnerSkeleton from '../ui/Partner/PartnerSkeleton'

export interface IPartnersPageProps {
  page: PageEntity
}

const PartnersPage = ({ page }: IPartnersPageProps) => {
  const { t } = useTranslation('common')
  const { locale = 'sk' } = usePageWrapperContext()

  const { data: partners, error } = useSWR(['Partners', locale], (_key, locale) =>
    client.SortedPartners({ locale })
  )

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

        {error || null}

        {!partners && !error && (
          <>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <PartnerSkeleton key={index} featured />
              ))}
            </div>
            <div className="mt-12 flex flex-col space-y-3">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <PartnerSkeleton key={index} />
              ))}
            </div>
          </>
        )}

        {partners?.featuredPartners && partners.featuredPartners.data.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {partners.featuredPartners.data.map((partner) => (
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

        {partners?.notFeaturedPartners && partners.notFeaturedPartners.data.length > 0 && (
          <div className="mt-12 flex flex-col space-y-3">
            {partners.notFeaturedPartners.data.map((partner) => (
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
