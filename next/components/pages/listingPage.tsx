import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { PageEntity } from '@services/graphql'
import {
  getLatestNewsQueryKey,
  latestNewsFetcher,
} from '@services/graphql/fetchers/latestNews.fetcher'
import { useGeneralContext } from '@utils/generalContext'
import { parseSubCategories } from '@utils/page'
import { useTranslation } from 'next-i18next'
import { useQuery } from 'react-query'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import { useNavikronos } from '@utils/navikronos'

export interface PageProps {
  page: PageEntity
}

const ListingPage = ({ page }: PageProps) => {
  const { t, i18n } = useTranslation('common')
  const { upcomingEvents } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

  // There's no need to handle loading, as the data are prefetched and never change.
  const { data: latestNewsData } = useQuery({
    queryKey: getLatestNewsQueryKey(i18n.language),
    queryFn: () => latestNewsFetcher(i18n.language),
    staleTime: Infinity, // The data are static and don't need to be reloaded.
  })

  const subCategories = parseSubCategories(
    page?.attributes?.pageCategory?.data?.attributes?.subCategories?.data ?? []
  )
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.attributes?.title ?? ''} perex={page?.attributes?.perex ?? ''} />

        {/* Subcategories */}
        {subCategories.map((subCategory, index) => (
          <Listing
            className="mt-8 md:mt-16"
            key={index}
            title={subCategory.title}
            url={subCategory.url ?? getPathForEntity({ type: 'page', id: subCategory.id }) ?? '#'}
            moreLinkTitle={subCategory.moreLinkTitle}
            pages={
              subCategory.pages[0]?.url === 'latestNews' ||
              subCategory.pages[0]?.url === 'latestEvents'
                ? subCategory.pages[0]?.url === 'latestNews'
                  ? latestNewsData?.pages?.data?.map((page) => ({
                      title: page.attributes?.title ?? '',
                      url: getPathForEntity({ type: 'page', id: page.id }) ?? '#',
                      moreLinkTitle: t('more'),
                    })) ?? []
                  : upcomingEvents?.data.map((event) => ({
                      title: event.attributes?.title ?? '',
                      url: getPathForEntity({ type: 'event', slug: event.attributes?.slug }) ?? '#',
                      moreLinkTitle: t('more'),
                    })) ?? []
                : subCategory.pages.map((page) => ({
                    title: page.title ?? '',
                    url: page.url ?? getPathForEntity({ type: 'page', id: subCategory.id }) ?? '#',
                    moreLinkTitle: t('more'),
                  }))
            }
            hasDivider={subCategories.length > 1 && index != subCategories.length - 1}
          />
        ))}
      </SectionContainer>
    </>
  )
}

export default ListingPage
