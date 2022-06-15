import puppeteer from 'puppeteer'

const BASE_URL = `https://opac.mestskakniznica.sk`

interface IBook {
  title: string | null | undefined
  imgSrc: string | undefined
  detailLink: string
  authors: string[]
}

class OpacClient {
  private _cache: IBook[] | null

  constructor() {
    this._cache = null
  }

  getLoadedBookNews = async (limit: any, offset: any) => {
    if (this._cache) return this._getBooks(limit, offset)
    else return null
  }

  fetchOpacBookNews = async () => {
    console.log('fetchOpacBookNews')
    return await this._fetchData()
  }

  private _getBooks = (limit: any, offset: any) => {
    console.log('_getBooks', { limit, offset })
    const books = this._cache?.slice(offset, offset + limit)

    return {
      books: books,
      count: this._cache?.length,
    }
  }

  private _fetchData = async () => {
    console.log('_fetchData')
    try {
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()

      await page.goto(`${BASE_URL}/opac?fn=searchform&extSrchNews=30`, {
        waitUntil: 'networkidle0',
      })

      const LIMIT = '100'

      this._cache = []
      await this._changePageSize(page, LIMIT)
      this._cache = this._cache.concat(await this._parseBooks(page))
      await this._goToNextPage(page)
      this._cache = this._cache.concat(await this._parseBooks(page))
      await this._goToNextPage(page)
      this._cache = this._cache.concat(await this._parseBooks(page))

      console.log('browser.close')
      await browser.close()

      return this._cache
    } catch (error) {
      throw new Error(`OpacClient error while getting data: ${error}`)
    }
  }

  private _changePageSize = async (page: puppeteer.Page, pageSize: string) => {
    console.log('_changePageSize')
    await page.select('select[name="clbc"]', pageSize)
    await page.waitForNavigation()
  }

  private _goToNextPage = async (page: puppeteer.Page) => {
    console.log('_goToNextPage')
    await page.click('.navig_right')
    await page.waitForSelector('#scrLoading', { hidden: true })
  }

  // code from opacBooks - jonatan
  private _parseBooks = async (page: puppeteer.Page) => {
    console.log('_parseBooks')
    // !!!
    // Do not use variables from outside of evaluate function as it will be
    // evalueated in the context of opac webpage, where those variables
    // won't be available
    // !!!
    const newBooks: IBook[] = await page.evaluate(() => {
      const parsedBooks = []
      const bookElements = document.getElementsByClassName('col-12 border-top-default')

      for (let i = 0; i < bookElements.length; i++) {
        const book = bookElements[i]
        const titleElement = book.querySelector('div .header-default')
        let title = titleElement?.textContent
        if (title && title.length > 15) title = title.substring(0, 20) + '...'

        const bookPath = book.querySelector('div .header-default')?.getAttribute('href')
        const detailLink = `https://opac.mestskakniznica.sk/opac${bookPath}`

        const imgSrc = book.querySelector('img')?.src

        const authors: string[] = []
        const aTags = book.querySelectorAll('a')
        aTags.forEach((a) => {
          if (a.href.includes('author')) authors.push(a.text)
        })

        parsedBooks.push({
          title,
          imgSrc,
          detailLink,
          authors,
        })
      }

      return parsedBooks
    })
    return newBooks
  }
}

const client = new OpacClient()

export default client
