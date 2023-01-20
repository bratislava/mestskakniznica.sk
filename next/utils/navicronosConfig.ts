import { string } from 'yup'

export const navicronosConfig = {
  strapiUrl: process.env.STRAPI_URL,
  staticRoutes: ['vyhladavanie', 'xx'] as const,
  multipleRoutesAliases: {
    'api:event': 'event',
  } as const,
  specificRoutesAliases: {
    'api:page': 'page',
  } as const,
  // aliases: [{
  //   type: 'api:event',
  //   alias: 'event',
  // }]
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
  function getRoute(a: MultipleRouteTypes, details: { path: string }): string
  function getRoute(a: SpecificRouteTypes, details: { id: string }): string
  function getRoute(x: string, details?: { path?: string; id?: string }): string {
    return 'xx'
  }

  return { getRoute }
}

const b = x(navicronosConfig)
b.getRoute('vyhladavanie')
b.getRoute('event', { path: 'asd' })
b.getRoute('page', { id: 'asd' })
// b.getRouteMultiple('event', 'asd')
