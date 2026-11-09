import { ContentTypePathPrefixesMap } from '@/services/navigation/typesNavigation'

export const getContentTypePathPrefixesMap = (locale: string) => {
  let contentTypePathPrefixesMap: ContentTypePathPrefixesMap
  if (locale === 'en') {
    contentTypePathPrefixesMap = {
      'blog-post': '/services/education/articles',
      event: '/experience/events',
      notice: '/experience/news',
      branch: '/visit/our-locations',
      asset: '/about-us/documents-and-public-disclosure-of-information/documents',
      disclosure: '/about-us/documents-and-public-disclosure-of-information/disclosure',
    }

    return { contentTypePathPrefixesMap }
  }
  contentTypePathPrefixesMap = {
    'blog-post': '/sluzby/vzdelavanie/clanky',
    event: '/zazite/podujatia',
    notice: '/zazite/aktuality',
    branch: '/navstivte/nase-lokality',
    asset: '/o-nas/dokumenty-a-zverejnovanie-informacii/dokumenty',
    disclosure: '/o-nas/dokumenty-a-zverejnovanie-informacii/zverejnovanie',
  }

  return { contentTypePathPrefixesMap }
}
