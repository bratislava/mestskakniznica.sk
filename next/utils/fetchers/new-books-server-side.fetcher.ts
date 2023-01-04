import { newBooksDefaultFilters } from '@utils/fetchers/new-books.fetcher'
import { getNewBooks } from '@utils/newBooksService'

/**
 * It is not possible to call Next.js API route on the server, therefore, the function handling it
 * is extracted and called directly.
 *
 * https://nextjs.org/learn/basics/api-routes/api-routes-details
 *
 * Don't import this code anywhere in the client side!
 */

export const newBooksHomePageServerSideFetcher = async () => {
  try {
    const result = await getNewBooks({ page: 1, pageSize: 6 })
    return result?.books ?? null
  } catch (error) {
    // If the request fails we don't want to fail rendering of the home page.
    return null
  }
}

export const newBookServerSideFetcher = () => getNewBooks(newBooksDefaultFilters)
