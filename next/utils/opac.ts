import XMLConvertor from 'xml-js'
import { isServer } from './utils'

const bookNewsUrl = 'https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=60&rtrnxml=true'

export interface OpacBook {
  title: { _text: string }
  author: { _text: string }
  coverURL: { _text: string }
  recURL: { _text: string }
}

export interface Opac {
  xml: {
    book: OpacBook[]
  }
}

export const getOpacBooks = async () => {
  try {
    // when called from frontend this is proxied through next server to avoid CORS - search for opacBookNews in next.js config
    const response = await fetch(isServer() ? bookNewsUrl : '/opacBookNews')
    console.log(response)
    const text = await response.text()
    const opac: Opac = XMLConvertor.xml2js(text, { compact: true }) as Opac

    // despite the above typecast, the object returned may miss some values - replacing them with '' should be safe for most uses
    return opac.xml.book.map((unsafeBook) => {
      const coverUrl = unsafeBook?.coverURL?._text || ''
      return {
        title: { _text: unsafeBook?.title?._text || '' },
        author: { _text: unsafeBook?.author?._text || '' },
        coverURL: { _text: [' --- ', ''].includes(coverUrl) ? '/book-empty-cover.png' : coverUrl },
        recURL: { _text: unsafeBook?.recURL?._text || '' },
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
