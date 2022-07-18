import 'react-datepicker/dist/react-datepicker.css'

import { PageEntity, PagesByLayoutWithFieldPaginationQuery, Pagination as MetaPagination } from '@bratislava/strapi-sdk-city-library'
import { Pagination, SectionContainer } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { IEvent } from '../../utils/types'
import NewsListingCard from "../Molecules/NewsListingCard"
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import { convertPagesToEvents } from '@utils/utils'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'

export interface PageProps {
  page: PageEntity
  news: IEvent[]
  pagination: MetaPagination
}

function NewsListingPage({ page, news, pagination }: PageProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()
  const [paginatedNews, setPaginatedNews] = useState(news);
  const [paginationData, setPaginationData] = useState(pagination);

  const handleChangeOffsetPage = async (num: number) => {
    const res = await fetch(`/api/paginated-news?layout=news&locale=${locale}&sort=createdAt:desc&limit=10&start=${(num-1) * 10}`)
    const result: PagesByLayoutWithFieldPaginationQuery = await res.json()
    
    result.pages?.data && setPaginatedNews(convertPagesToEvents(result.pages?.data))
    result.pages?.meta.pagination && setPaginationData(result.pages?.meta.pagination)
  }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="pb-[48px]">
          <div className="pt-16">
            <header className="m-auto text-[40px] leading-[48px] border-b border-gray-900">
              <h1>{t('newsListingTitle')}</h1>
            </header>
          </div>
        </div>

        <div className="pt-6 pb-16 m-auto grid sm:grid-cols-2 gap-4 lg:gap-x-5 items-stretch md:grid-cols-3 lg:grid-cols-4 gap-y-10">
          {paginatedNews?.map((event) => (
            <NewsListingCard event={event} key={event.slug} />
          ))}
        </div>
        <div className="flex md:mr-0 w-fit m-auto">
          <Pagination
            max={paginationData.pageCount}
            value={paginationData.page}
            onChangeNumber={(num) => {
              handleChangeOffsetPage(num)
            }}
            previousButtonAriaLabel={t('previousPage')}
            nextButtonAriaLabel={t('nextPage')}
            currentInputAriaLabel={t('currentPage')}
          />
        </div>
      </SectionContainer>
    </>
  )
}

export default NewsListingPage
