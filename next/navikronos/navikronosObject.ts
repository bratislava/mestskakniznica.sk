import { getAliasContentTypeMap } from './navikronosObject/getAliasContentTypeMap'
import { traverseTree } from './navikronosObject/traverseTree'
import { NavikronosClientNavigation, NavikronosConfig, NavikronosStaticProps } from './types'

export type NavikronosObject = {}

type GetRoute = ((type: 'static', id: string, locale?: string) => string | null) &
  ((entryAlias: string, id: number, locale?: string) => string | null) &
  ((contentTypeAlias: string, slug: string, locale?: string) => string | null)

export const getNavikronosObject = (
  config: NavikronosConfig,
  // TODO refine
  { navigation, currentRoute, locale: globalLocale }: NavikronosStaticProps
): NavikronosObject => {
  const tree = traverseTree(navigation)
  const aliases = getAliasContentTypeMap(config)

  // { type: 'static', id: 'search' }, locale
  // { type: 'page', id: 50 }, locale
  // { type: 'event', slug: 'xyz }, locale
  const getRoute: GetRoute = (type, idOrSlug, locale) => {
    const localeTree = tree[locale ?? globalLocale]
    if (!localeTree) {
      return null
    }
    if (type === 'static') {
      const map = localeTree.maps.staticRoutesMap2
      if (map.has(idOrSlug as string)) {
        return map.get(idOrSlug as string)?.fullPath ?? null
      }
    }
    const entryAlias = aliases.entryRoutes.get(type)
    if (entryAlias) {
      return localeTree.maps.entryRoutesMap2.get([entryAlias, idOrSlug as number])?.fullPath ?? null
    }

    const contentTypeAlias = aliases.contentTypeRoutes.get(type)
    if (contentTypeAlias) {
      return (
        localeTree.maps.contentTypeRoutesMap2
          .get(contentTypeAlias)
          ?.fullPath?.replace(':slug', idOrSlug as string) ?? null
      )
    }

    return null
  }

  const current = getRoute(currentRoute.type, currentRoute.id)
  const getEntity = () => {}

  return { tree, currentRoute, getRoute, current }
}
