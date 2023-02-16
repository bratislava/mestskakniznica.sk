import ManyKeysMap from 'many-keys-map'

import {
  NavikronosClientLocaleNavigations,
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosConfig,
} from '../types'

type NextRewrite = ((slug: string) => string | null) & (() => string | null)

type GetPathFn = ((slug?: string) => string) | (() => string)

export type NavikronosTreeNode = {
  original: NavikronosClientRoute
  children?: NavikronosTreeNode[]
  parent?: NavikronosTreeNode
  path: string | null
  fullPath: GetPathFn
  nextRewrite: NextRewrite
}

export type NavikronosLocaleTreeMaps = {
  staticRoutesPathMap: Map<string, NavikronosTreeNode>
  staticRoutesIdMap: Map<string, NavikronosTreeNode>
  entryRoutesPathMap: Map<string, NavikronosTreeNode>
  entryRoutesAliasIdMap: ManyKeysMap<[string, number], NavikronosTreeNode>
  contentTypeRoutesPathMap: Map<string, NavikronosTreeNode>
  contentTypeRoutesAliasMap: Map<string, NavikronosTreeNode>
}

export type NavikronosLocaleTree = {
  maps: NavikronosLocaleTreeMaps
  navigation: NavikronosTreeNode[]
} | null

export type NavikronosTree = Record<string, NavikronosLocaleTree>

const getNextRewrite = (config: NavikronosConfig, route: NavikronosClientRoute): NextRewrite => {
  const nullFn = () => null

  switch (route.type) {
    // eslint-disable-next-line switch-case/no-case-curly
    case 'contentType': {
      const routeConfig = config.contentTypeRoutes[route.contentTypeUid]
      if (!routeConfig) {
        return nullFn
      }
      return ((slug: string) =>
        `/${config.rewritePrefix}${routeConfig.rewrite(slug)}`) as NextRewrite
    }

    case 'empty':
      return nullFn

    // eslint-disable-next-line switch-case/no-case-curly
    case 'entry': {
      const routeConfig = config.entryRoutes[route.contentTypeUid]
      if (!routeConfig) {
        return nullFn
      }
      return () => `/${config.rewritePrefix}${routeConfig.rewrite(route.entryId)}`
    }

    // eslint-disable-next-line switch-case/no-case-curly
    case 'static': {
      const routeConfig = config.staticRoutes[route.id]
      if (!routeConfig) {
        return nullFn
      }
      return () => `/${config.rewritePrefix}${routeConfig.rewrite}`
    }

    case 'listing':
      return nullFn

    default:
      return nullFn
  }
}

const traverseRoute = (
  config: NavikronosConfig,
  route: NavikronosClientRoute,
  maps: NavikronosLocaleTreeMaps,
  parent?: NavikronosTreeNode
) => {
  // create object beforehand to it can be assigned
  const node: Partial<NavikronosTreeNode> = {}
  node.original = route
  node.parent = parent
  // TODO slug
  node.path = route.type !== 'contentType' ? route.path : ':slug'
  // TODO null type
  node.fullPath = (slug?: string) => {
    const fullPath = [route.type === 'contentType' && slug ? slug : node.path]

    let current = parent
    while (current) {
      fullPath.push(current.path as string)
      current = current.parent
    }
    return `/${fullPath.reverse().join('/')}`
  }
  node.nextRewrite = getNextRewrite(config, route)

  if (route.type === 'static') {
    maps.staticRoutesPathMap.set(node.fullPath(), node as NavikronosTreeNode)
    maps.staticRoutesIdMap.set(route.id, node as NavikronosTreeNode)
  }

  if (route.type === 'entry') {
    maps.entryRoutesPathMap.set(node.fullPath(), node as NavikronosTreeNode)
    maps.entryRoutesAliasIdMap.set(
      [route.contentTypeUid, route.entryId],
      node as NavikronosTreeNode
    )
  }

  if (route.type === 'contentType') {
    maps.contentTypeRoutesPathMap.set(node.fullPath(), node as NavikronosTreeNode)
    maps.contentTypeRoutesAliasMap.set(route.contentTypeUid, node as NavikronosTreeNode)
  }

  if (route.type !== 'contentType' && route.children) {
    node.children = route.children.map((child) =>
      traverseRoute(config, child, maps, node as NavikronosTreeNode)
    )
  }

  return node as NavikronosTreeNode
}

const traverseLocale = (
  config: NavikronosConfig,
  navigation?: NavikronosClientNavigation
): NavikronosLocaleTree => {
  if (!navigation) {
    return null
  }
  const maps: NavikronosLocaleTreeMaps = {
    staticRoutesPathMap: new Map(),
    staticRoutesIdMap: new Map(),
    entryRoutesPathMap: new Map(),
    entryRoutesAliasIdMap: new ManyKeysMap(),
    contentTypeRoutesPathMap: new Map(),
    contentTypeRoutesAliasMap: new Map(),
  }

  return {
    maps,
    navigation: navigation.map((route) => traverseRoute(config, route, maps)),
  }
}

export const traverseTree = (
  config: NavikronosConfig,
  navigation: NavikronosClientLocaleNavigations
): NavikronosTree => {
  const entriesMapped = Object.entries(navigation).map(
    ([locale, localeNavigation]) => [locale, traverseLocale(config, localeNavigation)] as const
  )

  return Object.fromEntries(entriesMapped)
}
