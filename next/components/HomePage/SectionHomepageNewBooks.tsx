import { useTranslation } from 'next-i18next/pages'

import { SectionContainer } from '@/components/ui'
import BookCard, { Book } from '@/modules/cards-and-rows/BookCard'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { useGeneralContext } from '@/utils/generalContext'

type SectionHomepageNewBooksProps = { books: Book[] }

const SectionHomepageNewBooks = ({ books }: SectionHomepageNewBooksProps) => {
  const { t } = useTranslation()
  const { general } = useGeneralContext()
  const { getFullPath } = useNavigation()

  return (
    <SectionContainer hasBorder>
      <section className="relative flex w-full flex-col py-10">
        <h2 className="text-center text-h3 md:text-left">
          {t('sectionHomepageNewBooks.newBooksTitle')}
        </h2>

        <div className="-mx-2 overflow-x-auto px-2">
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
            href={getFullPath(general?.data?.attributes?.newBooksPage?.data) ?? '#'}
          >
            {t('sectionHomepageNewBooks.newBooksAll')}
          </ShowMoreLink>
        </div>
      </section>
    </SectionContainer>
  )
}

export default SectionHomepageNewBooks
