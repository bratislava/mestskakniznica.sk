import Section from '@components/AppLayout/Section'
import BookCard, { Book } from '@modules/common/Cards/BookCard'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

type SectionHomepageNewBooksProps = { books: Book[] }

const SectionHomepageNewBooks = ({ books }: SectionHomepageNewBooksProps) => {
  const { t, i18n } = useTranslation('homepage')

  return (
    <Section>
      <section className="relative flex w-full flex-col py-10">
        <h2 className="text-center text-h3 md:text-left">{t('newBooksTitle')}</h2>
        <div className="overflow-x-auto ">
          <div className="flex gap-x-4 py-6 xl:grid xl:grid-cols-6">
            {books.map((book) => (
              <div className="shrink-0" key={book.url}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="top-12 right-0 flex justify-center pt-1 md:absolute md:w-fit">
          <ShowMoreLink
            href={
              i18n.language === 'en'
                ? '/en/services/reading/new-additions'
                : '/sluzby/citanie/knizne-novinky'
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
