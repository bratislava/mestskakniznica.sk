import ManyKeysMap from 'many-keys-map'

import { NavikronosConfig } from '../../types'
import {
  NavikronosClientLocaleNavigations,
  NavikronosClientNavigation,
  NavikronosClientRoute,
} from '../sharedTypes'

type NextRewrite = ((slug: string) => string | null) & (() => string | null)

type GetPathFn = ((slug?: string) => string) | (() => string)

export type ParsedTreeNode = {
  original: NavikronosClientRoute
  children?: ParsedTreeNode[]
  parent?: ParsedTreeNode
  path: string | null
  fullPath: GetPathFn
  nextRewrite: NextRewrite
}

export type ParsedTreeMaps = {
  staticRoutesPathMap: Map<string, ParsedTreeNode>
  staticRoutesIdMap: Map<string, ParsedTreeNode>
  entryRoutesPathMap: Map<string, ParsedTreeNode>
  entryRoutesAliasIdMap: ManyKeysMap<[string, number], ParsedTreeNode>
  contentTypeRoutesPathMap: Map<string, ParsedTreeNode>
  contentTypeRoutesAliasMap: Map<string, ParsedTreeNode>
}

export type ParsedTreeAndMaps = {
  maps: ParsedTreeMaps
  navigation: ParsedTreeNode[]
} | null

export type LocaleParsedTreeMap = Record<string, ParsedTreeAndMaps>

const nullFn = () => null

const getNextRewrite = (config: NavikronosConfig, route: NavikronosClientRoute): NextRewrite => {
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
  maps: ParsedTreeMaps,
  parent?: ParsedTreeNode
) => {
  // create object beforehand to it can be assigned
  const node: Partial<ParsedTreeNode> = {}
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
    maps.staticRoutesPathMap.set(node.fullPath(), node as ParsedTreeNode)
    maps.staticRoutesIdMap.set(route.id, node as ParsedTreeNode)
  }

  if (route.type === 'entry') {
    maps.entryRoutesPathMap.set(node.fullPath(), node as ParsedTreeNode)
    maps.entryRoutesAliasIdMap.set([route.contentTypeUid, route.entryId], node as ParsedTreeNode)
  }

  if (route.type === 'contentType') {
    maps.contentTypeRoutesPathMap.set(node.fullPath(), node as ParsedTreeNode)
    maps.contentTypeRoutesAliasMap.set(route.contentTypeUid, node as ParsedTreeNode)
  }

  if (route.type !== 'contentType' && route.children) {
    node.children = route.children.map((child) =>
      traverseRoute(config, child, maps, node as ParsedTreeNode)
    )
  }

  return node as ParsedTreeNode
}

const traverseLocale = (
  config: NavikronosConfig,
  navigation?: NavikronosClientNavigation
): ParsedTreeAndMaps => {
  if (!navigation) {
    return null
  }
  const maps: ParsedTreeMaps = {
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

export const parseTree = (
  config: NavikronosConfig,
  navigation: NavikronosClientLocaleNavigations
): LocaleParsedTreeMap => {
  const entriesMapped = Object.entries(navigation).map(
    ([locale, localeNavigation]) => [locale, traverseLocale(config, localeNavigation)] as const
  )

  return Object.fromEntries(entriesMapped)
}
