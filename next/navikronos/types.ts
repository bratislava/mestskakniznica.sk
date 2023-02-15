export type NavikronosConfig<
  StaticRoutesIds extends string = string,
  EntryRoutesAliases extends string = string,
  ContentTypeRoutesAliases extends string = string
> = {
  strapiUrl: string
  cacheTtl: number
  rewritePrefix: string
  staticRoutes: Record<StaticRoutesIds, { rewrite: string }>
  entryRoutes: Record<string, { alias: EntryRoutesAliases; rewrite: (id: number) => string }>
  contentTypeRoutes: Record<
    string,
    { alias: ContentTypeRoutesAliases; rewrite: (slug: string) => string }
  >
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

export type NavikronosClientLocaleNavigations = Record<
  string,
  NavikronosClientNavigation | undefined
>

export type StaticRouteEntity<Config> = Config extends NavikronosConfig<
  infer StaticRoutesIds,
  infer EntryRoutesAliases,
  infer ContentTypeRoutesAliases
>
  ? {
      type: 'static'
      id: StaticRoutesIds
    }
  : never

export type ContentRouteEntity<Config, NullUndefinedSlug = false> = Config extends NavikronosConfig<
  infer StaticRoutesIds,
  infer EntryRoutesAliases,
  infer ContentTypeRoutesAliases
>
  ? {
      type: ContentTypeRoutesAliases
      slug: NullUndefinedSlug extends true ? string | null | undefined : string
    }
  : never

export type EntryRouteEntity<Config, NullUndefinedId = false> = Config extends NavikronosConfig<
  infer StaticRoutesIds,
  infer EntryRoutesAliases,
  infer ContentTypeRoutesAliases
>
  ? {
      type: EntryRoutesAliases
      /**
       * Strapi works with `number` id, but GraphQL returns `string` ids, for easier usage Navikronos accepts the `string`
       * variation.
       */
      id: NullUndefinedId extends true ? string | null | undefined : string
    }
  : never

export type RouteEntity<Config, NullUndefinedIdSlug = false> =
  | StaticRouteEntity<Config>
  | ContentRouteEntity<Config, NullUndefinedIdSlug>
  | EntryRouteEntity<Config, NullUndefinedIdSlug>

export type RouteEntityWithLocale<Config, NullUndefinedIdSlug = false> = RouteEntity<
  Config,
  NullUndefinedIdSlug
> & { locale: string }

export type RouteEntityWithLocaleOptional<Config, NullUndefinedIdSlug = false> = RouteEntity<
  Config,
  NullUndefinedIdSlug
> & { locale?: string }

export type NavikronosStaticProps<Config extends NavikronosConfig> = {
  navigation: NavikronosClientLocaleNavigations
  locale: string
  currentEntity: RouteEntity<Config> | null
}

export type NavikronosBreadcrumb = {
  title: string
  path: string
  children?: NavikronosBreadcrumb[]
}

export type NavikronosBreadcrumbs = NavikronosBreadcrumb[]

export type NavikronosSitemapEntry = {
  title: string
  path: string
  children?: NavikronosSitemapEntry[]
}

export type NavikronosSitemap = NavikronosSitemapEntry[]
