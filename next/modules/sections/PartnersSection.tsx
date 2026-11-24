import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next/pages'

import PartnerCardRow from '@/modules/cards-and-rows/PartnerCardRow'
import { getPartnersQueryKey, partnersFetcher } from '@/services/graphql/fetchers/partners.fetcher'

const PartnersSection = () => {
  const { i18n } = useTranslation()

  // There's no need to handle loading, as the data are prefetched and never change.
  const { data } = useQuery({
    queryKey: getPartnersQueryKey(i18n.language),
    queryFn: () => partnersFetcher(i18n.language),
    staleTime: Infinity, // The data are static and don't need to be reloaded.
  })

  return (
    <>
      {data?.featuredPartners && data.featuredPartners.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.featuredPartners.map((partner, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <PartnerCardRow
                id={`featured-partner-${index}`}
                title={partner?.title ?? ''}
                logo={partner?.logo?.url ?? ''}
                linkHref={partner?.url ?? '#'}
                featured
              />
            </li>
          ))}
        </ul>
      )}

      {data?.notFeaturedPartners && data.notFeaturedPartners.length > 0 && (
        <ul className="mt-12 flex flex-col lg:space-y-3">
          {data.notFeaturedPartners.map((partner, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <PartnerCardRow
                id={`non-featured-partner-${index}`}
                title={partner?.title || ''}
                linkHref={partner?.url || ''}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PartnersSection
