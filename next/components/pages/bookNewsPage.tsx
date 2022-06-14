import { PageFragment } from '@bratislava/strapi-sdk-city-library'

import { BookNewsDetail, PageTitle, Pagination, SectionContainer } from '@bratislava/ui-city-library'
import * as React from 'react'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import { OpacBook } from '../../utils/opac'
import { useTranslation } from 'react-i18next'

export interface BookNewsPageProps {
  page: PageFragment
  books: OpacBook[]
}

export const BOOKS_PER_PAGE = 24

const BookNewsPage = ({ page, books }: BookNewsPageProps) => {
  const { t } = useTranslation('common')
  const [displayedBooks, setDisplayedBooks] = React.useState<OpacBook[]>(books.slice(0, BOOKS_PER_PAGE))
  const [pageNumber, setPageNumber] = React.useState(1)

  const pagesCount = Math.ceil(books.length / BOOKS_PER_PAGE)

  React.useEffect(() => {
    const startIndex = (pageNumber - 1) * BOOKS_PER_PAGE
    const endIndex = startIndex + BOOKS_PER_PAGE

    setDisplayedBooks(books.slice(startIndex, endIndex))
  }, [books, pageNumber, setDisplayedBooks])

  const handleChangePage = (num: number) => {
    if (num > 0 && num <= pagesCount) setPageNumber(num)
  }

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={page?.title ?? ''} description={page?.description ?? ''} />

        {displayedBooks.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 mt-8">
            {displayedBooks.map(
              (
                {
                  title: { _text: title },
                  coverURL: { _text: imageSrc },
                  recURL: { _text: link },
                  author: { _text: author },
                },
                i
              ) => (
                <BookNewsDetail
                  className="w-full"
                  key={i}
                  title={title}
                  imgSrc={imageSrc}
                  author={author !== ' --- ' ? author : ''}
                  detailLink={link}
                  linkClassName="w-full h-[232px]"
                />
              )
            )}
          </div>
        ) : (
          <div className="flex mt-4 justify-center">Book news from opac have not initialized</div>
        )}

        <div className="mt-6 flex justify-end">
          <Pagination
            max={pagesCount}
            value={pageNumber}
            onChangeNumber={(num) => handleChangePage(num)}
            previousButtonAriaLabel={t('previousPage')}
            nextButtonAriaLabel={t('nextPage')}
            currentInputAriaLabel={t('currentPage')}
          />
        </div>
      </SectionContainer>
    </>
  )
}

export default BookNewsPage
