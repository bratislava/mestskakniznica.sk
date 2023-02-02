import { getAliasContentTypeMap } from './navikronosObject/getAliasContentTypeMap'
import { traverseTree } from './navikronosObject/traverseTree'
import { NavikronosClientNavigation, NavikronosConfig, NavikronosStaticProps } from './types'

export type NavikronosObject = {}

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
  const getRoute = ({ type, id, slug, locale }: any) => {
    const localeTree = tree[locale ?? globalLocale]
    if (!localeTree) {
      return null
    }
    if (type === 'static') {
      const map = localeTree.maps.staticRoutesMap2
      if (map.has(id)) {
        return map.get(id)?.fullPath
      }
    }
    const entryAlias = aliases.entryRoutes.get(type)
    if (entryAlias) {
      return localeTree.maps.entryRoutesMap2.get([entryAlias, id])?.fullPath
    }

    const contentTypeAlias = aliases.contentTypeRoutes.get(type)
    if (contentTypeAlias) {
      return localeTree.maps.contentTypeRoutesMap2
        .get(contentTypeAlias)
        ?.fullPath?.replace(':slug', slug)
    }
  }

  const current = getRoute(currentRoute)
  const getEntity = () => {}

  return { tree, currentRoute, getRoute, current }
}
