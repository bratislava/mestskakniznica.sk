import Section from '@components/AppLayout/Section'
import BookCard, { Book } from '@modules/common/Cards/BookCard'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useGeneralContext } from '@utils/generalContext'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

type SectionHomepageNewBooksProps = { books: Book[] }

const SectionHomepageNewBooks = ({ books }: SectionHomepageNewBooksProps) => {
  const { t } = useTranslation('homepage')
  const { general } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

  return (
    <Section>
      <section className="relative flex w-full flex-col py-10">
        <h2 className="text-center text-h3 md:text-left">{t('newBooksTitle')}</h2>
        <div className="overflow-x-auto ">
          <div className="flex gap-x-4 py-6 xl:grid xl:grid-cols-6">
            {books.map((book) => (
              <div key={book.url} className="shrink-0">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="top-12 right-0 flex justify-center pt-1 md:absolute md:w-fit">
          <ShowMoreLink
            href={
              getPathForEntity({
                type: 'page',
                id: general?.data?.attributes?.newBooksPage?.data?.id,
              }) ?? ''
            }
          >
            {t('newBooksAll')}
          </ShowMoreLink>
        </div>
      </section>
    </Section>
  )
}

export default SectionHomepageNewBooks
