import { isDefined } from '@utils/isDefined'
import { navikronosConfig } from '@utils/navikronos'

import { getAliasContentTypeMap } from './navikronosParsedTreeUtils/getAliasContentTypeMap'
import {
  NavikronosParsedTree,
  NavikronosParsedTreeNode,
  traverseNavigation,
} from './navikronosParsedTreeUtils/traverseNavigation'
import {
  ContentRouteEntity,
  EntryRouteEntity,
  ExtremTyp,
  NavikronosBreadcrumb,
  NavikronosBreadcrumbs,
  NavikronosChild,
  NavikronosChildren,
  NavikronosClientLocaleNavigations,
  NavikronosConfig,
  NavikronosSitemap,
  NavikronosSitemapEntry,
  NavikronosStaticProps,
  RouteEntityWithLocale,
  RouteEntityWithLocaleOptional,
  StaticRouteEntity,
} from './types'

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
) => NavikronosParsedTreeNode | null

export type NavikronosTreeObject<Config extends NavikronosConfig> = {
  tree: NavikronosParsedTree
  getNodeByEntity: GetTreeNodeByEntity<Config>
  getNodeByPath: (path: string, locale: string) => NavikronosParsedTreeNode | null
}

export const getNavikronosTreeObject = <Config extends NavikronosConfig>(
  config: Config,
  navigation: NavikronosClientLocaleNavigations
): NavikronosTreeObject<Config> => {
  const tree = traverseNavigation(config, navigation)

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

type GetPathForEntity<Config> = (
  routeEntity: RouteEntityWithLocaleOptional<Config, true>
) => string | null

type CurrentRouteLocalization = { locale: string; path: string }

export const abc = <S extends string>(x: ExtremTyp<typeof navikronosConfig, S>) => {
  return x
}

type G<Config> = <S extends string>(a: ExtremTyp<Config, S> | undefined | null) => void

export type NavikronosObject<Config> = {
  getPathForEntity: GetPathForEntity<Config>
  currentPath: string | null
  sitemap: NavikronosSitemap | null
  getBreadcrumbs(title?: string): NavikronosBreadcrumb[] | null
  currentRouteLocalizations: CurrentRouteLocalization[]
  children: NavikronosChildren
  siblings: NavikronosChildren
  parent: NavikronosChild | null
  test: G<Config>
}

export const getNavikronosCurrentRouteObject = <Config extends NavikronosConfig>(
  config: Config,
  {
    navigation,
    currentEntity,
    locale: globalLocale,
    currentEntityLocalizations,
  }: NavikronosStaticProps<Config>
): NavikronosObject<Config> => {
  const originalObject = getNavikronosTreeObject(config, navigation)

  const currentEntityNode = (() => {
    if (!currentEntity) {
      return null
    }

    return originalObject.getNodeByEntity({
      ...currentEntity,
      locale: globalLocale,
    } as RouteEntityWithLocale<Config, true>)
  })()

  const getPathForEntity: GetPathForEntity<Config> = (entity) => {
    const route = originalObject.getNodeByEntity({
      ...entity,
      locale: entity.locale ?? globalLocale,
    })

    if (!route) {
      return null
    }

    if (route.original.type === 'contentType') {
      const { slug } = entity as ContentRouteEntity<Config, true>
      if (!slug) {
        return null
      }

      return route?.fullPath(slug) ?? null
    }

    return route?.fullPath() ?? null
  }

  const currentRouteLocalizations = currentEntityLocalizations
    .map((entity) => ({
      locale: entity.locale,
      path: getPathForEntity(entity as RouteEntityWithLocaleOptional<Config, true>),
    }))
    .filter((entity) => isDefined(entity.path)) as CurrentRouteLocalization[]

  const getBreadcrumbs = (title: string) => {
    if (!currentEntityNode) {
      return null
    }

    const breadcrumbs: NavikronosBreadcrumbs = []
    let current: NavikronosParsedTreeNode | undefined = currentEntityNode
    while (current) {
      if (current.original.type === 'contentType') {
        breadcrumbs.push({ path: current.fullPath(title), title })
      } else {
        breadcrumbs.push({ path: current.fullPath(), title: current.original.title })
      }
      current = current.parent
    }

    return breadcrumbs.reverse()
  }

  const getSiteMap = () => {
    const mapFn = (route: NavikronosParsedTreeNode): NavikronosSitemapEntry | null => {
      if (route.original.type === 'contentType') {
        return null
      }
      const children = route.children?.map(mapFn).filter(isDefined)

      return {
        title: route.original.title,
        path: route.fullPath(),
        children,
      }
    }
    return originalObject.tree[globalLocale]?.navigation.map(mapFn).filter(isDefined)
  }

  const currentPath = (() => {
    if (!currentEntityNode) {
      return null
    }

    if (currentEntityNode.original.type === 'contentType') {
      const { slug } = currentEntity as ContentRouteEntity<Config>

      if (!slug) {
        return null
      }

      return currentEntityNode?.fullPath(slug) ?? null
    }

    return currentEntityNode?.fullPath() ?? null
  })()

  const nodeToChild = (child: NavikronosParsedTreeNode): NavikronosChild | null => {
    if (child.original.type === 'contentType') {
      return null
    }
    return {
      title: child.original.title,
      path: child.fullPath(),
      children: child.children?.map(nodeToChild).filter(isDefined),
    } as NavikronosChild
  }

  const getChildren = (node = currentEntityNode) => {
    if (!node) {
      return []
    }

    return (node.children ?? []).map(nodeToChild).filter(isDefined)
  }

  const children = getChildren()
  const siblings = getChildren(currentEntityNode?.parent)
  const parent = currentEntityNode?.parent ? nodeToChild(currentEntityNode.parent) : null

  const sitemap = getSiteMap()

  const test: G<Config> = (a) => {}

  return {
    getPathForEntity,
    getBreadcrumbs,
    currentPath,
    sitemap: sitemap as any, // todo
    currentRouteLocalizations,
    children,
    siblings,
    parent,
    test,
  }
}
