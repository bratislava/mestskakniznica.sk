import {
  NavigationLocaleRewrites,
  NavigationRewrites,
  NavikronosClientLocaleNavigations,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosConfig,
} from './types'

export const getRewrites = (
  config: NavikronosConfig,
  navigation: NavikronosClientLocaleNavigations
) => {
  const getRewrite = (
    route: NavikronosClientRoute,
    path: string[]
  ): { key: string; value: string } | null => {
    switch (route.type) {
      // eslint-disable-next-line switch-case/no-case-curly
      case 'contentType': {
        const routeConfig = config.contentTypeRoutes[route.contentTypeUid]
        if (!routeConfig) {
          return null
        }
        const key = `/${path.join('/')}/:slug`
        return { key, value: `/${config.rewritePrefix}${routeConfig.rewrite(':slug')}` }
      }

      case 'empty':
        return null

      // eslint-disable-next-line switch-case/no-case-curly
      case 'entry': {
        const routeConfig = config.entryRoutes[route.contentTypeUid]
        if (!routeConfig) {
          return null
        }
        const key = `/${[...path, route.path].join('/')}`
        return { key, value: `/${config.rewritePrefix}${routeConfig.rewrite(route.entryId)}` }
      }

      // eslint-disable-next-line switch-case/no-case-curly
      case 'static': {
        const routeConfig = config.staticRoutes[route.id]
        if (!routeConfig) {
          return null
        }
        return {
          key: `/${[...path, route.path].join('/')}`,
          value: `/${config.rewritePrefix}${routeConfig.rewrite}`,
        }
      }

      case 'listing':
        return null

      default:
        return null
    }
  }

  const innerTraverse = (
    routes: NavikronosClientRoutes | undefined,
    path: string[] = [],
    rewritesMap: NavigationLocaleRewrites = new Map<string, string>()
  ) => {
    if (!routes) {
      return rewritesMap
    }

    routes.forEach((route) => {
      const rewrite = getRewrite(route, path)

      if (rewrite) {
        rewritesMap.set(rewrite.key, rewrite.value)
      }
      if (route.type !== 'contentType' && route.children) {
        innerTraverse(route.children, [...path, route.path], rewritesMap)
      }
    })

    return rewritesMap
  }

  const rewritesArray = Object.entries(navigation).map(
    ([locale, localeNavigation]) => [locale, innerTraverse(localeNavigation)] as const
  )

  return new Map(rewritesArray)
}
