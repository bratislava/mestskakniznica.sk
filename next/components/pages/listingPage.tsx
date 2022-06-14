import * as React from 'react'
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs'
import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { Listing, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import { parseSubCategories } from '../../utils/page'
import { useTranslation } from 'next-i18next'
import { IEvent } from '../../utils/types'

export interface PageProps {
  page: PageFragment
  allEvents: IEvent[]
  news: IEvent[]
}

const ListingPage = ({ page, allEvents, news }: PageProps) => {
  const { t } = useTranslation('common')

  const subCategories = parseSubCategories(page?.pageCategory?.subCategories ?? [])
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />

        {/* Subcategories */}
        {subCategories.map((subCategory, index) => (
          <Listing
            className="mt-8 md:mt-16"
            key={index}
            title={subCategory.title}
            url={subCategory.url}
            moreLinkTitle={subCategory.moreLinkTitle}
            pages={
              subCategory.pages[0]?.url === 'latestNews' || subCategory.pages[0]?.url === 'latestEvents'
                ? subCategory.pages[0]?.url === 'latestNews'
                  ? news.slice(0, 4).map((singleNes) => ({
                      title: singleNes.eventTitle ?? '',
                      url: singleNes.slug ?? '',
                      moreLinkTitle: t('more'),
                    }))
                  : allEvents.slice(0, 4).map((event) => ({
                      title: event.eventTitle ?? '',
                      url: event.slug ?? '',
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
