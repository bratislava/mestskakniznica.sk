import 'react-datepicker/dist/react-datepicker.css'

import { PageEntity, PageEntityFragment, PaginationFragment } from '../../graphql'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import ListingCard from '../Molecules/ListingCard'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { client } from '../../utils/gql'
import { SectionContainer } from '../ui/SectionContainer/SectionContainer'
import { Pagination } from '../ui/Pagination/Pagination'

export interface PageProps {
  page: PageEntity
  news: PageEntityFragment[]
  pagination: PaginationFragment
}

function NewsListingPage({ page, news, pagination }: PageProps) {
  const { t } = useTranslation('common')
  const { locale } = usePageWrapperContext()
  const [paginatedNews, setPaginatedNews] = useState<PageEntityFragment[]>(news)
  const [paginationData, setPaginationData] = useState<PaginationFragment | null>(pagination)

  const handleChangeOffsetPage = async (num: number) => {
    const { pages } = await client.PagesByLayoutPaginated({
      layout: 'news',
      locale,
      sort: 'createdAt:desc',
      start: (num - 1) * 10,
      limit: 10,
    })
    // fetch(
    //   `/api/paginated-news?layout=news&locale=${locale}&sort=createdAt:desc&limit=10&start=${
    //     (num - 1) * 10
    //   }`
    // )
    // const result = await res.json()

    setPaginatedNews(pages?.data ?? [])
    setPaginationData(pages?.meta.pagination || null)
  }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page as PageEntity} />
      </SectionContainer>
      <SectionContainer>
        <div className="pb-[48px]">
          <div className="pt-16">
            <header className="m-auto border-b border-gray-900 text-[40px] leading-[48px]">
              <h1>{t('newsListingTitle')}</h1>
            </header>
          </div>
        </div>

        <div className="m-auto grid items-stretch gap-4 gap-y-10 pt-6 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {paginatedNews?.map((page) => (
            <ListingCard card={page} key={page.attributes?.slug} />
          ))}
        </div>
        <div className="m-auto flex w-fit md:mr-0">
          <Pagination
            max={paginationData?.pageCount ?? 0}
            value={paginationData?.page ?? 1}
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
