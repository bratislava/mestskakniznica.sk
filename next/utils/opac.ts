import XMLConvertor from 'xml-js'

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
    const response = await fetch('/opacBookNews')
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
    return []
  }
}
