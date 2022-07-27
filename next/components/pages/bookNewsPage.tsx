import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import {
  BookNewsDetail,
  LoadingSpinner,
  PageTitle,
  Pagination,
  SectionContainer,
} from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getOpacBooks, OpacBook } from '../../utils/opac'
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'

export interface BookNewsPageProps {
  page: PageEntity
}

export const BOOKS_PER_PAGE = 24

function BookNewsPage({ page }: BookNewsPageProps) {
  const { t } = useTranslation(['homepage', 'common'])

  const { data: books, error } = useSWR(['OpacBookNews'], (_key) => getOpacBooks())

  const [displayedBooks, setDisplayedBooks] = useState<OpacBook[]>([])
  const [pageNumber, setPageNumber] = useState(1)

  const pagesCount = Math.ceil(books?.length ?? 0 / BOOKS_PER_PAGE)

  useEffect(() => {
    const startIndex = (pageNumber - 1) * BOOKS_PER_PAGE
    const endIndex = startIndex + BOOKS_PER_PAGE

    setDisplayedBooks(books?.slice(startIndex, endIndex) ?? [])
  }, [books, error, pageNumber, setDisplayedBooks])

  const handleChangePage = (num: number) => {
    if (num > 0 && num <= pagesCount) setPageNumber(num)
  }

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

        {!books && !error ? (
          <LoadingSpinner className="my-[15vh]" />
        ) : !error && books ? (
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
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
          <div className="mt-4 flex justify-center">{t('noOpacBookNews')}</div>
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
