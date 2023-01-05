import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import NewBooksSection from '@modules/sections/NewBooksSection'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface BookNewsPageProps {
  page: PageEntity
}

// TODO: Remove this page and use only section
const BookNewsPage = ({ page }: BookNewsPageProps) => {
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

        <NewBooksSection />
      </SectionContainer>
    </>
  )
}

export default BookNewsPage
