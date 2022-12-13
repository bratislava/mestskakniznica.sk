import { BookNewsDetail, Link } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'

import { OpacBook } from '../../utils/opac'
import Section from '../AppLayout/Section'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface SectionOpacBookNewsProps {
  books: OpacBook[]
}

const SectionOpacBookNews = ({ books }: SectionOpacBookNewsProps) => {
  const { t } = useTranslation('homepage')
  const { locale } = usePageWrapperContext()

  return (
    <>
      {books.length > 0 ? (
        <Section>
          <section className="relative flex w-full flex-col py-10">
            <h2 className="text-center text-h3 md:text-left">{t('newBooksTitle')}</h2>
            <div className="overflow-x-auto ">
              <div className="flex w-fit  min-w-full items-stretch justify-between gap-4 py-6 sm:gap-6 lg:gap-6">
                {books
                  .slice(0, 6)
                  .map(
                    (
                      {
                        title: { _text: title },
                        coverURL: { _text: imageSrc },
                        recURL: { _text: link },
                        author: { _text: author },
                      },
                      index
                    ) => (
                      <BookNewsDetail
                        className="w-[160px]"
                        key={index}
                        title={title}
                        imgSrc={imageSrc}
                        author={author !== ' --- ' ? author : ''}
                        detailLink={link}
                        linkClassName="w-full h-[232px]"
                      />
                    )
                  )}
              </div>
            </div>
            <div className="top-12 right-0 flex justify-center pt-1 md:absolute md:w-fit">
              <Link
                href={
                  locale === 'en'
                    ? '/en/services/reading/new-additions'
                    : '/sluzby/citanie/knizne-novinky'
                }
                hasIcon
                title={t('newBooksAll')}
                size="large"
                className="text-center"
              >
                {t('newBooksAll')}
              </Link>
            </div>
          </section>
        </Section>
      ) : (
        <div className="mt-4 flex items-center justify-center">{t('noOpacBookNews')}</div>
      )}
    </>
  )
}

export default SectionOpacBookNews
