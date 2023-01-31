/**
 * @tsImport
 * { "mode": "compile" }
 */

import type { Rewrite } from 'next/dist/lib/load-custom-routes'

import {
  NavikronosClientNavigation,
  NavikronosClientRoute,
  NavikronosClientRoutes,
  NavikronosConfig,
} from './types'

export const fetchNavigation = async (config: NavikronosConfig) => {
  const fetched = await fetch(`${config.strapiUrl}/navikronos/`)
  const json = await fetched.json()

  return json as NavikronosClientNavigation
}

export const generateRewrites = async (config: NavikronosConfig) => {
  const navigation = await fetchNavigation(config)

  const rewrites: Rewrite[] = []

  const getRewrite = (route: NavikronosClientRoute, path: string[]): Rewrite | null => {
    switch (route.type) {
      case 'contentType': {
        const x = config.contentTypeRoutes[route.contentTypeUid]
        return {
          source: `/${path.join('/')}/:slug`,
          destination: x.rewrite(':slug'),
        }
      }

      case 'empty':
        return null

      case 'entry':
        {
          const x = config.entryRoutes[route.contentTypeUid]
          return {
            source: `/${[...path, route.path].join('/')}`,
            destination: x.rewrite(route.path),
          }
        }
        break

      case 'static':
        const x = config.staticRoutes[route.id]
        return {
          source: `/${[...path, route.path].join('/')}`,
          destination: x.rewrite,
        }
        break

      case 'listing':
        return null
        break
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

  return rewrites
}
