import type { Book } from '@modules/common/Cards/BookCard'
import { isDefined } from '@utils/isDefined'
import { mockNewBooks } from '@utils/mockNewBooks'
import ufs from 'url-file-size'
import XMLConvertor from 'xml-js'

/*
 * This is a service that acts as a proxy and fetches new books from OPAC.
 *
 * It serves multiple purposes:
 * 1. OPAC is unstable and very slow.
 * 2. OPAC returns the data in XML. We convert it to JSON.
 * 3. It reloads the new books every hour automatically and acts as a cache.
 * 4. OPAC doesn't support paging.
 * 5. OPAC returns a generic book cover for books without a cover, and it is not possible to detect
 *    it from the URL as it is different each time:
 *    (e.g. https://coverlinker.biblib.net/?k=ZW5jXzk3ODM2MjUxMjY0NTQtTA==&h=ZW5jXy1M)
 *    In this service, we check whether it's the generic cover and return nothing in that case.
 *
 * The data are not persisted and are wiped when Next service shuts down (which is OK).
 */

const bookNewsUrl = 'https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=60&rtrnxml=true'

interface OpacBook {
  title: { _text: string }
  author: { _text: string }
  coverURL: { _text: string }
  recURL: { _text: string }
}

interface OpacResponse {
  xml: {
    book: OpacBook[]
  }
}

/**
 * Non-persistent storage for fetched books.
 */
let fetchedBooks: Book[] | null = null

/**
 * An object containing coverUrl and whether the cover is not generic (is generic = false).
 */
const bookCoverMap: Record<string, boolean> = {}

/**
 * Goes all over unchecked images a detects whether the book has a generic image cover.
 */
const checkCoverImages = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const book of fetchedBooks ?? []) {
    if (!book.coverUrl) {
      // eslint-disable-next-line no-continue
      continue
    }
    try {
      // Image is already checked.
      if (book.coverUrl in bookCoverMap) {
        // eslint-disable-next-line no-continue
        continue
      }
      // `url-file-size` gets only filesize information from the server, there's no need to download
      // the whole image.
      // eslint-disable-next-line no-await-in-loop
      const coverFileSize = await ufs(book.coverUrl)

      // Checking image size in bytes is a reliable way how to detect a generic cover.
      bookCoverMap[book.coverUrl] = coverFileSize !== 9149

      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
}

const fetchBooks = async () => {
  // In localhost environments mock books are returned not to reset the service with each compilation.
  if (process.env.NEXT_PUBLIC_IS_LOCALHOST === 'true') {
    fetchedBooks = mockNewBooks
    return
  }

  try {
    const response = await fetch(bookNewsUrl)
    const text = await response.text()
    const opac: OpacResponse = XMLConvertor.xml2js(text, { compact: true }) as OpacResponse

    fetchedBooks = opac.xml.book.map((book) => {
      /* eslint-disable no-underscore-dangle */
      const coverUrl = book?.coverURL?._text
      return {
        title: book?.title?._text,
        coverUrl: coverUrl === ' --- ' ? undefined : coverUrl,
        url: book?.recURL?._text,
      }
      /* eslint-enable no-underscore-dangle */
    })
    // Check is called asynchronously without waiting for a result.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkCoverImages()
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

let refreshIntervalTimer: NodeJS.Timer | null = null

export interface NewBooksResponse {
  books: Book[]
  total: number
}

export const getNewBooks = async ({
  page,
  pageSize,
}: {
  page?: number
  pageSize?: number
}): Promise<NewBooksResponse> => {
  if (!refreshIntervalTimer) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    refreshIntervalTimer = setInterval(() => fetchBooks(), 3_600_000)
  }

  if (!fetchedBooks) {
    // This might trigger multiple requests when `fetchedBooks` are not initialized yet.
    await fetchBooks()
  }

  const books =
    fetchedBooks?.map((book) => {
      if (!book.coverUrl) {
        return book
      }

      const imageChecked = book.coverUrl in bookCoverMap
      // As the check is run asynchronously without waiting for a result, the cover might not be checked,
      // in that case we return the cover even if it's generic.
      const coverUrl = imageChecked
        ? bookCoverMap[book.coverUrl]
          ? book.coverUrl
          : undefined
        : book.coverUrl
      return {
        ...book,
        coverUrl,
      }
    }) ?? []

  if (isDefined(page) && isDefined(pageSize)) {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    return { books: books.slice(startIndex, endIndex), total: books.length }
  }

  return { books, total: books.length }
}
