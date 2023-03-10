export type NavikronosConfig<
  StaticRoutesIds extends string = string,
  EntryRoutesAliases extends string = string,
  ContentTypeRoutesAliases extends string = string,
  ContentTypeRouteInner extends { strapiTypename: string; pathAttribute: string } = {
    strapiTypename: string
    pathAttribute: string
  }
> = {
  strapiUrl: string
  cacheTtl: number
  rewritePrefix: string
  staticRoutes: Record<StaticRoutesIds, { rewrite: string }>
  entryRoutes: Record<
    string,
    {
      alias: EntryRoutesAliases
      strapiTypename: string
      rewrite: (id: number) => string
    }
  >
  contentTypeRoutes: Record<
    string,
    {
      alias: ContentTypeRoutesAliases
      rewrite: (slug: string) => string
    } & ContentTypeRouteInner
  >
}

export type ExtremTyp<Config, S extends string = string> = Config extends NavikronosConfig<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer StaticRoutesIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer EntryRoutesAliases,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer ContentTypeRoutesAliases,
  infer ContentTypeRouteInner
>
  ? NonNullable<S> extends ContentTypeRouteInner['strapiTypename']
    ? {
        __typename?: S
        attributes?:
          | {
              [A in Extract<ContentTypeRouteInner, { strapiTypename: S }>['pathAttribute']]?:
                | string
                | null
            }
          | null
      }
    : never
  : never

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer EntryRoutesAliases,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer ContentTypeRoutesAliases
>
  ? {
      type: 'static'
      id: StaticRoutesIds
    }
  : never

export type ContentRouteEntity<Config, NullUndefinedSlug = false> = Config extends NavikronosConfig<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer StaticRoutesIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer EntryRoutesAliases,
  infer ContentTypeRoutesAliases
>
  ? {
      type: ContentTypeRoutesAliases
      slug: NullUndefinedSlug extends true ? string | null | undefined : string
    }
  : never

export type EntryRouteEntity<Config, NullUndefinedId = false> = Config extends NavikronosConfig<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer StaticRoutesIds,
  infer EntryRoutesAliases,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  currentEntityLocalizations: RouteEntityWithLocale<Config>[]
}

export type NavikronosBreadcrumb = {
  title: string
  path: string
}

export type NavikronosBreadcrumbs = NavikronosBreadcrumb[]

export type NavikronosChild = NavikronosBreadcrumb & {
  children?: NavikronosChildren
}

export type NavikronosChildren = NavikronosChild[]

export type NavikronosSitemapEntry = {
  title: string
  path: string
  children?: NavikronosSitemapEntry[]
}

export type NavikronosSitemap = NavikronosSitemapEntry[]
