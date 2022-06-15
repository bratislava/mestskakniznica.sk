import XMLConvertor from 'xml-js'

export interface OpacBook {
  title: { _text: string }
  author: { _text: string }
  coverURL: {
    _text: string
  }
  recURL: {
    _text: string
  }
}

export interface Opac {
  xml: {
    book: OpacBook[]
  }
}

export const getOpacBooks = async () => {
  try {
    const text = await fetch('http://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=60&rtrnxml=true')
    const xml = await text.text()
    const opac: Opac = XMLConvertor.xml2js(xml, { compact: true }) as Opac
    // despite the above typecast, the object returned may miss some values - replacing them with '' should be safe for most uses
    return opac.xml.book.map((unsafeBook) => {
      let coverUrl = unsafeBook?.coverURL?._text || ''
      if ([' --- ', ''].includes(coverUrl)) {
        coverUrl = '/book-empty-cover.png'
      }
      return {
        title: { _text: unsafeBook?.title?._text || '' },
        author: { _text: unsafeBook?.author?._text || '' },
        coverURL: {
          _text: coverUrl,
        },
        recURL: {
          _text: unsafeBook?.recURL?._text || '',
        },
      }
    })
  } catch (error) {
    return []
  }
}
