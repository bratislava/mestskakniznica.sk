import React, { useState, useEffect } from 'react'

import { BookNewsDetail, Link } from '@bratislava/ui-city-library'
import { useTranslation } from 'next-i18next'
import Section from '../AppLayout/Section'
import { OpacBook } from '../../utils/opac'

const LIMIT = 6
const OFFSET = 1

interface SectionOpacBookNewsProps {
  books: OpacBook[]
}

const SectionOpacBookNews = ({ books }: SectionOpacBookNewsProps) => {
  const { t } = useTranslation('homepage')

  return (
    <>
      {books.length ? (
        <Section>
          <section className="relative flex flex-col py-10 w-full">
            <h2 className="text-center md:text-left text-lg">{t('newBooksTitle')}</h2>
            <div className="overflow-x-auto ">
              <div className="w-fit min-w-full  flex justify-between py-6 gap-4 sm:gap-6 lg:gap-6 items-stretch">
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
                      i
                    ) => (
                      <BookNewsDetail
                        className="w-[160px]"
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
            </div>
            <div className="flex justify-center md:absolute md:w-fit top-12 pt-1 right-0">
              <Link
                href="https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=30"
                hasIcon={true}
                title={t('newBooksAll')}
                size="large"
                className="text-center"
                target={'_blank'}
              >
                {t('newBooksAll')}
              </Link>
            </div>
          </section>
        </Section>
      ) : (
        <div className="flex justify-center items-center mt-4">Book news from opac have not initialized</div>
      )}
    </>
  )
}

export default SectionOpacBookNews
