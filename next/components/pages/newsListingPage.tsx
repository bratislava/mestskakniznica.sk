import 'react-datepicker/dist/react-datepicker.css'

import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import { Enum_Page_Layout, PageEntity, PageEntityFragment } from '../../graphql'
import { usePagesPaginated } from '../../hooks/usePagesPaginated'
import { client } from '../../utils/gql'
import ListingCard from '../Molecules/ListingCard'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import { Pagination } from '../ui/Pagination/Pagination'
import { SectionContainer } from '../ui/SectionContainer/SectionContainer'

export interface PageProps {
  page: PageEntity
}

const NewsListingPage = ({ page }: PageProps) => {
  const { t } = useTranslation('common')
  const { locale = 'sk' } = usePageWrapperContext()

  const { data: newsCount, error: newsCountError } = useSWR(
    ['NewsCount', { locale, layout: 'news' }],
    (_key, variables) => client.PagesByLayoutCount(variables)
  )
  const totalCount = newsCount?.pages?.meta.pagination.total ?? 0

  // TODO show loading and error, add LoadMore button - check the hook for more useful variables
  const { setSize, filteredPages, strapiMetaPagination } = usePagesPaginated({
    locale,
    layout: Enum_Page_Layout.News,
  })

  const handlePageChange = async (page: number) => {
    setSize(page)
  }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page}/>
      </SectionContainer>
      <SectionContainer>
        <div className="pb-[48px]">
          <div className="pt-16">
            <header className="m-auto border-b border-border-dark text-h2">
              <h1>{t('newsListingTitle')}</h1>
            </header>
          </div>
        </div>

        <div
          className="m-auto grid items-stretch gap-4 gap-y-10 pt-6 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {filteredPages?.map((page) => (
            <ListingCard card={page as PageEntityFragment} key={page?.attributes?.slug}/>
          ))}
        </div>
        <div className="m-auto flex w-fit md:mr-0">
          <Pagination
            max={totalCount}
            value={strapiMetaPagination?.page ?? 1}
            onChangeNumber={(num) => {
              handlePageChange(num)
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
