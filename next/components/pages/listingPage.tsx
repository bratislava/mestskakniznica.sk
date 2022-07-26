import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import { EventCardEntityFragment, PageEntity } from '../../graphql'

import { parseSubCategories } from '../../utils/page'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface PageProps {
  page: PageEntity
  allEvents: EventCardEntityFragment[]
  news: PageEntity[]
}

function ListingPage({ page, allEvents, news }: PageProps) {
  const { t } = useTranslation('common')

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
                  ? news.slice(0, 4).map((page) => ({
                      title: page.attributes?.title ?? '',
                      url: page.attributes?.slug ?? '',
                      moreLinkTitle: t('more'),
                    }))
                  : allEvents.slice(0, 4).map((event) => ({
                      title: event.attributes?.title ?? '',
                      url: event.attributes?.slug ?? '',
                      moreLinkTitle: t('more'),
                    }))
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
