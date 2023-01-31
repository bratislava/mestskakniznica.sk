export type NavikronosConfig = {
  strapiUrl: string
  redirectPrefix: string
  staticRoutes: Record<string, { rewrite: string }>
  entryRoutes: Record<string, { alias: string; rewrite: (slug: string) => string }>
  contentTypeRoutes: Record<string, { alias: string; rewrite: (slug: string) => string }>
}

export type NavikronosClientRoute =
  | NavikronosClientContentTypeRoute
  | NavikronosClientEmptyRoute
  | NavikronosClientEntryRoute
  | NavikronosClientStaticRoute
  | NavikronosClientListingRoute

export type NavikronosClientRoutes = NavikronosClientRoute[]

export type NavikronosClientRouteWithTitlePath = {
  title: string
  path: string
}
export type NavikronosClientRouteWithChildren = {
  children?: NavikronosClientRoute[]
}

export type NavikronosClientContentTypeRoute = {
  type: 'contentType'
  contentTypeUid: string
}

export type NavikronosClientEmptyRoute = {
  type: 'empty'
} & NavikronosClientRouteWithTitlePath &
  NavikronosClientRouteWithChildren

export type NavikronosClientEntryRoute = {
  type: 'entry'
  contentTypeUid: string
  entryId: number
} & NavikronosClientRouteWithTitlePath &
  NavikronosClientRouteWithChildren

export type NavikronosClientStaticRoute = {
  type: 'static'
  id: string
} & NavikronosClientRouteWithTitlePath &
  NavikronosClientRouteWithChildren

export type NavikronosClientListingRoute = {
  type: 'listing'
  id: string
} & NavikronosClientRouteWithTitlePath &
  NavikronosClientRouteWithChildren

export type NavikronosClientNavigation = NavikronosClientRoutes
