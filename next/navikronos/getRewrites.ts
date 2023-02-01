import {
  NavigationRewrites,
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosConfig,
} from './types'

export const getRewrites = (config: NavikronosConfig, navigation: NavikronosClientNavigation) => {
  const rewrites: [string, string][] = []

  const getRewrite = (route: NavikronosClientRoute, path: string[]): [string, string] | null => {
    switch (route.type) {
      case 'contentType': {
        const x = config.contentTypeRoutes[route.contentTypeUid]
        if (!x) {
          return null
        }
        const source = `/${path.join('/')}/:slug`
        return [source, `/${config.rewritePrefix}${x.rewrite(':slug')}`]
      }

      case 'empty':
        return null

      case 'entry': {
        const x = config.entryRoutes[route.contentTypeUid]
        if (!x) {
          return null
        }
        const source = `/${[...path, route.path].join('/')}`
        return [source, `/${config.rewritePrefix}${x.rewrite(route.entryId)}`]
      }

      case 'static':
        const x = config.staticRoutes[route.id]
        if (!x) {
          return null
        }
        return [`/${[...path, route.path].join('/')}`, `/${config.rewritePrefix}${x.rewrite}`]

      case 'listing':
        return null
    }
  }

  const innerTraverse = (routes: NavikronosClientRoutes, path: string[]) => {
    routes.forEach((route) => {
      const rewrite = getRewrite(route, path)

      if (rewrite) {
        rewrites.push(rewrite)
      }
      if (route.type !== 'contentType' && route.children) {
        innerTraverse(route.children, [...path, route.path])
      }
    })
  }

  innerTraverse(navigation, [])

  return Object.fromEntries(rewrites) as NavigationRewrites
}
