import { NavikronosConfig } from '../config-type'
import { EntryRouteEntity, RouteEntityWithLocale, StaticRouteEntity } from './internalTypes'
import { getAliasContentTypeMap } from './parsedTreeUtils/aliasContentTypeMap'
import { LocaleParsedTreeMap, ParsedTreeNode, parseTree } from './parsedTreeUtils/parseTree'
import { NavikronosClientLocaleNavigations } from './sharedTypes'

const replaceLastPartWithSlug = (path: string) => {
  const parts = path.split('/')
  if (parts[parts.length - 1] === '') {
    return path
  }
  parts[parts.length - 1] = ':slug'
  return parts.join('/')
}

type GetTreeNodeByEntity<Config> = (
  entity: RouteEntityWithLocale<Config, true>
) => ParsedTreeNode | null

export type ParsedTreeObject<Config extends NavikronosConfig> = {
  tree: LocaleParsedTreeMap
  getNodeByEntity: GetTreeNodeByEntity<Config>
  getNodeByPath: (path: string, locale: string) => ParsedTreeNode | null
}

export const getParsedTreeWithUtilities = <Config extends NavikronosConfig>(
  config: Config,
  navigation: NavikronosClientLocaleNavigations
): ParsedTreeObject<Config> => {
  const tree = parseTree(config, navigation)
  const aliases = getAliasContentTypeMap(config)

  const getNodeByEntity: GetTreeNodeByEntity<Config> = (entity) => {
    const localeTree = tree[entity.locale]
    if (!localeTree) {
      return null
    }
    const { type } = entity

    if (type === 'static') {
      const map = localeTree.maps.staticRoutesIdMap
      const { id } = entity as StaticRouteEntity<Config>
      if (map.has(id)) {
        return map.get(id) ?? null
      }
    }
    const entryAlias = aliases.entryRoutes.get(type)
    if (entryAlias) {
      const { id } = entity as EntryRouteEntity<Config, true>

      if (typeof id !== 'string') {
        return null
      }
      const numberId = parseInt(id, 10)
      if (Number.isNaN(numberId)) {
        return null
      }

      return localeTree.maps.entryRoutesAliasIdMap.get([entryAlias, numberId]) ?? null
    }

    const contentTypeAlias = aliases.contentTypeRoutes.get(type)
    if (contentTypeAlias) {
      return localeTree.maps.contentTypeRoutesAliasMap.get(contentTypeAlias) ?? null
    }

    return null
  }

  const getNodeByPath = (path: string, locale: string) => {
    const localeTree = tree[locale]
    if (!localeTree) {
      return null
    }

    const slugPath = replaceLastPartWithSlug(path)

    if (localeTree.maps.contentTypeRoutesPathMap.has(slugPath)) {
      return localeTree.maps.contentTypeRoutesPathMap.get(slugPath) ?? null
    }

    if (localeTree.maps.staticRoutesPathMap.has(path)) {
      return localeTree.maps.staticRoutesPathMap.get(path) ?? null
    }

    if (localeTree.maps.entryRoutesPathMap.has(path)) {
      return localeTree.maps.entryRoutesPathMap.get(path) ?? null
    }

    return null
  }

  return { tree, getNodeByEntity, getNodeByPath }
}
