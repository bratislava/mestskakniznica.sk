/**
 * @tsImport
 * { "mode": "compile" }
 */

import { NavikronosConfig } from '../navikronos/types'

export const navicronosConfig2 = {
  strapiUrl: process.env.STRAPI_URL,
  redirectPrefix: 'navicronosRedirect',
  staticRoutes: [
    {
      name: 'search',
      redirect: 'search',
    } as const,
  ] as const,
  multipleRoutes: [
    {
      contentType: 'api:event',
      alias: 'event',
      redirect: (slug: string) => `event/${slug}`,
    } as const,
  ] as const,
  entityRoutes: [
    {
      contentType: 'api:page',
      alias: 'page',
      redirect: (id: string) => `event/${id}`,
    } as const,
  ],
}
export const navikronosConfig: NavikronosConfig = {
  strapiUrl: process.env.STRAPI_URL as string,
  redirectPrefix: 'navikronosRedirect',
  staticRoutes: {
    search: { rewrite: 'search' },
  },
  entryRoutes: {
    'api::page.page': { alias: 'page', rewrite: (slug) => `/asdasdasd/${slug}` },
  },
  contentTypeRoutes: {
    'api::page.page': { alias: 'page', rewrite: (slug) => `/asdasdasd/${slug}` },
    'api::event.event': { alias: 'event', rewrite: (slug) => `/asdaadsasdasdsdasd/${slug}` },
    'api::branch.branch': {
      alias: 'asd',
      rewrite: (slug) => '/asdasdasd/',
    },
  },
}

function x<
  StaticRoutes extends readonly string[],
  MultipleRouteTypes extends string,
  SpecificRouteTypes extends string
>({
  staticRoutes,
}: {
  staticRoutes: StaticRoutes
  multipleRoutesAliases: Record<string, MultipleRouteTypes>
  specificRoutesAliases: Record<string, SpecificRouteTypes>
}) {
  // const getRouteStatic = (x: StaticRoutes[number]) => {
  //   return 'xx'
  // }
  //
  // const getRouteEntity = (a: MultipleRouteTypes, path: string) => {
  //   return 'xx'
  // }
  //
  // const getRouteMultiple = (a: MultipleRouteTypes, path: string) => {
  //   return 'xx'
  // }

  function getRoute(x: StaticRoutes[number]): string
  function getRoute(a: MultipleRouteTypes, details: { slug: string }): string
  function getRoute(a: SpecificRouteTypes, details: { id: string }): string
  function getRoute(x: string, details?: { slug?: string; id?: string }): string {
    return 'xx'
  }

  return { getRoute }
}

const b = x(navikronosConfig)
b.getRoute('vyhladavanie')
b.getRoute('event', { slug: 'asd' })
b.getRoute('page', { id: 'asd' })
// b.getRouteMultiple('event', 'asd')
