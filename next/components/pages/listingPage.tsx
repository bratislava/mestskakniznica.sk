import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import { EventCardEntityFragment, PageEntity } from '../../graphql'
import { client } from '../../utils/gql'
import { parseSubCategories } from '../../utils/page'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface PageProps {
  page: PageEntity
}

const ListingPage = ({ page }: PageProps) => {
  const { t } = useTranslation('common')
  const { locale = 'sk' } = usePageWrapperContext()

  const { data: upcomingEventsResponse, error: upcomingEventsError } = useSWR(
    ['UpcomingEvents', locale, new Date().toISOString()],
    (_key, locale, date) => client.UpcomingEvents({ locale, date })
  )
  const upcomingEvents = upcomingEventsResponse?.events?.data

  const { data: latestNewsResponse, error: latestNewsError } = useSWR(
    ['LatestNews', locale],
    (_key, locale) => client.LatestNews({ locale })
  )
  const latestNews = latestNewsResponse?.pages?.data

  const subCategories = parseSubCategories(
    page?.attributes?.pageCategory?.data?.attributes?.subCategories?.data ?? []
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

        {/* Subcategories */}
        {subCategories.map((subCategory, index) => (
          <Listing
            className="mt-8 md:mt-16"
            key={index}
            title={subCategory.title}
            url={subCategory.url}
            moreLinkTitle={subCategory.moreLinkTitle}
            pages={
              subCategory.pages[0]?.url === 'latestNews' ||
              subCategory.pages[0]?.url === 'latestEvents'
                ? subCategory.pages[0]?.url === 'latestNews'
                  ? latestNews?.map((page) => ({
                      title: page.attributes?.title ?? '',
                      url: page.attributes?.slug ?? '',
                      moreLinkTitle: t('more'),
                    })) ?? []
                  : upcomingEvents?.map((event) => ({
                      title: event.attributes?.title ?? '',
                      url: event.attributes?.slug ?? '',
                      moreLinkTitle: t('more'),
                    })) ?? []
                : subCategory.pages.map((page) => ({
                    title: page.title ?? '',
                    url: page.url ?? '',
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
