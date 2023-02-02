import ManyKeysMap from 'many-keys-map'

import {
  NavikronosClientLocaleNavigations,
  NavikronosClientNavigation,
  NavikronosClientRoute,
} from '../types'

type EnhancedRoute = {
  original: NavikronosClientRoute
  children?: EnhancedRoute[]
  parent?: EnhancedRoute
  path: string | null
  fullPath: string | null
}
// add parent

type Maps = {
  staticRoutesMap: Map<string, EnhancedRoute>
  staticRoutesMap2: Map<string, EnhancedRoute>
  entryRoutesMap: Map<string, EnhancedRoute>
  entryRoutesMap2: ManyKeysMap<[string, number], EnhancedRoute>
  contentTypeRoutesMap: Map<string, EnhancedRoute>
  contentTypeRoutesMap2: Map<string, EnhancedRoute>
}

const traverseRoute = (route: NavikronosClientRoute, maps: Maps, parent?: EnhancedRoute) => {
  // create object beforehand to it can be assigned
  const enhanced: Partial<EnhancedRoute> = {}
  enhanced.original = route
  enhanced.parent = parent
  // TODO slug
  enhanced.path = route.type !== 'contentType' ? route.path : ':slug'
  // TODO null type
  enhanced.fullPath = (() => {
    const fullPath = [enhanced.path]
    let x = parent
    while (x) {
      fullPath.push(x.path as string)
      x = x.parent
    }
    return `/${fullPath.reverse().join('/')}`
  })()

  if (route.type === 'static') {
    maps.staticRoutesMap.set(enhanced.fullPath, enhanced as EnhancedRoute)
    maps.staticRoutesMap2.set(route.id, enhanced as EnhancedRoute)
  }

  if (route.type === 'entry') {
    maps.entryRoutesMap.set(enhanced.fullPath, enhanced as EnhancedRoute)
    maps.entryRoutesMap2.set([route.contentTypeUid, route.entryId], enhanced as EnhancedRoute)
  }

  if (route.type === 'contentType') {
    maps.contentTypeRoutesMap.set(enhanced.fullPath, enhanced as EnhancedRoute)
    maps.contentTypeRoutesMap2.set(route.contentTypeUid, enhanced as EnhancedRoute)
  }

  if (route.type !== 'contentType' && route.children) {
    enhanced.children = route.children.map((child) =>
      traverseRoute(child, maps, enhanced as EnhancedRoute)
    )
  }

  return enhanced as EnhancedRoute
}

const traverseLocale = (navigation?: NavikronosClientNavigation) => {
  if (!navigation) {
    return null
  }
  const maps: Maps = {
    staticRoutesMap: new Map(),
    staticRoutesMap2: new Map(),
    entryRoutesMap: new Map(),
    entryRoutesMap2: new ManyKeysMap(),
    // entryRoutesMap2: new Map(),
    contentTypeRoutesMap: new Map(),
    contentTypeRoutesMap2: new Map(),
  }

  return {
    maps,
    navigation: navigation.map((route) => traverseRoute(route, maps)),
  }
}

export const traverseTree = (navigation: NavikronosClientLocaleNavigations) => {
  const x = performance.now()
  const entriesMapped = Object.entries(navigation).map(
    ([locale, localeNavigation]) => [locale, traverseLocale(localeNavigation)] as const
  )
  console.log('perf', performance.now() - x)

  return Object.fromEntries<ReturnType<typeof traverseLocale>>(entriesMapped)
}
