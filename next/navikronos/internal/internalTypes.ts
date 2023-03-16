import { NavikronosConfig } from '../types'
import { NavikronosClientLocaleNavigations } from './sharedTypes'

export type StrapiEntity<
  Config,
  Typename extends string = string
> = Config extends NavikronosConfig<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer StaticRoutesIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer EntryRoutesAliases,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer ContentTypeRoutesAliases,
  infer EntryRoutesStrapiTypenames,
  infer ContentTypeRouteInner
>
  ? Typename extends ContentTypeRouteInner['strapiTypename']
    ? {
        __typename: Typename
        attributes?:
          | {
              [A in Extract<
                ContentTypeRouteInner,
                { strapiTypename: Typename }
              >['pathAttribute']]?: string | null
            }
          | null
      }
    : Typename extends EntryRoutesStrapiTypenames
    ? { __typename: Typename; id?: string | null }
    : never
  : never

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

export type ContentTypeRouteEntity<
  Config,
  NullUndefinedSlug = false
> = Config extends NavikronosConfig<
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
  | ContentTypeRouteEntity<Config, NullUndefinedIdSlug>
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
