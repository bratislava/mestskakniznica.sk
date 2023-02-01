import transform from 'lodash/transform'
import {
  NavigationRewrites,
  NavikronosClientLocaleNavigations,
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosConfig,
} from './types'

export const getRewrites = (
  config: NavikronosConfig,
  navigation: NavikronosClientLocaleNavigations
) => {
  const getRewrite = (route: NavikronosClientRoute, path: string[]): [string, string] | null => {
    switch (route.type) {
      case 'contentType': {
        const routeConfig = config.contentTypeRoutes[route.contentTypeUid]
        if (!routeConfig) {
          return null
        }
        const source = `/${path.join('/')}/:slug`
        return [source, `/${config.rewritePrefix}${routeConfig.rewrite(':slug')}`]
      }

      case 'empty':
        return null

      case 'entry': {
        const routeConfig = config.entryRoutes[route.contentTypeUid]
        if (!routeConfig) {
          return null
        }
        const source = `/${[...path, route.path].join('/')}`
        return [source, `/${config.rewritePrefix}${routeConfig.rewrite(route.entryId)}`]
      }

      case 'static':
        const routeConfig = config.staticRoutes[route.id]
        if (!routeConfig) {
          return null
        }
        return [
          `/${[...path, route.path].join('/')}`,
          `/${config.rewritePrefix}${routeConfig.rewrite}`,
        ]

      case 'listing':
        return null
    }
  }

  const innerTraverse = (
    routes: NavikronosClientRoutes | undefined,
    path: string[] = [],
    rewrites: [string, string][] = []
  ) => {
    if (!routes) {
      return rewrites
    }

    routes.forEach((route) => {
      const rewrite = getRewrite(route, path)

      if (rewrite) {
        rewrites.push(rewrite)
      }
      if (route.type !== 'contentType' && route.children) {
        innerTraverse(route.children, [...path, route.path], rewrites)
      }
    })

    return rewrites
  }

  return transform(navigation, (r: Record<string, NavigationRewrites>, localeNavigation, key) => {
    r[key] = Object.fromEntries(innerTraverse(localeNavigation))
  })
}
