import Image from 'next/image'
import React from 'react'

import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'

export interface Book {
  title?: string
  coverUrl?: string
  url?: string
}

type BookProps = { book: Book }

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=311%3A2924&t=7m7llxI0ez8IO3hP-0
 *
 * Author is included in the design, but the API doesn't return it.
 */
const BookCard = ({ book }: BookProps) => {
  const hasCover = Boolean(book.coverUrl)

  return (
    <CardWrapper className="relative flex w-[126px] flex-col gap-2 md:w-[180px] md:gap-4">
      <div
        className={cn('relative h-[162px] w-full overflow-hidden md:h-[232px]', {
          'select-none border border-border-dark pl-4 pt-3 text-[32px] uppercase': !hasCover,
        })}
      >
        {!hasCover && <span>{book.title && book.title[0]}</span>}
        {hasCover && (
          <Image
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            src={book.coverUrl!}
            className="object-contain"
            alt=""
            fill
            unoptimized
          />
        )}
      </div>
      <h3>
        <MLink
          href={book.url ?? ''}
          variant="basic"
          stretched
          // Most of the books titles are two lines long, so we fix the height constant to avoid layout shifts when there
          // happens to be row with only single column book titles.
          // The default line height is leading-6, but if that changes this will break, so it's set to be sure.
          className="line-clamp-2 md:h-[48px] md:leading-6"
          target="_blank"
        >
          {book.title}
        </MLink>
      </h3>
    </CardWrapper>
  )
}

export default BookCard
