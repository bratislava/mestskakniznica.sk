import { ContentTypePathPrefixesMap } from '@/services/navigation/typesNavigation'

export const getContentTypePathPrefixesMap = (locale: string): ContentTypePathPrefixesMap => {
  return {
    'blog-post': locale === 'sk' ? '/sluzby/vzdelavanie/clanky' : '/services/education/articles',
    event: locale === 'sk' ? '/zazite/podujatia' : '/experience/events',
    notice: locale === 'sk' ? '/zazite/aktuality' : '/experience/news',
    branch: locale === 'sk' ? '/navstivte/nase-lokality' : '/visit/our-locations',
    asset:
      locale === 'sk'
        ? '/o-nas/dokumenty-a-zverejnovanie-informacii/dokumenty'
        : '/about-us/documents-and-public-disclosure-of-information/documents',
    disclosure:
      locale === 'sk'
        ? '/o-nas/dokumenty-a-zverejnovanie-informacii/zverejnovanie'
        : '/about-us/documents-and-public-disclosure-of-information/disclosure',
  }
}
