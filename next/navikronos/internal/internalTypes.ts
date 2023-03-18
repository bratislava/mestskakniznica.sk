import { CLNavikronosConfig } from '@utils/navikronos'

import { NavikronosConfig } from '../config-type'
import { NavikronosClientLocaleNavigations } from './sharedTypes'

type EntryRoutesConfig<Config extends NavikronosConfig> = Config['entryRoutes']
type EntryRoutesConfigKeys<Config extends NavikronosConfig> = keyof EntryRoutesConfig<Config>
type EntryRoutesConfigValues<Config extends NavikronosConfig> =
  EntryRoutesConfig<Config>[EntryRoutesConfigKeys<Config>]

type ContentTypeRoutesConfig<Config extends NavikronosConfig> = Config['contentTypeRoutes']
type ContentTypeRoutesConfigKeys<Config extends NavikronosConfig> =
  keyof ContentTypeRoutesConfig<Config>
type ContentTypeRoutesConfigValues<Config extends NavikronosConfig> =
  ContentTypeRoutesConfig<Config>[ContentTypeRoutesConfigKeys<Config>]

type StaticRoutesConfig<Config extends NavikronosConfig> = Config['staticRoutes']
type StaticRoutesConfigKeys<Config extends NavikronosConfig> = keyof StaticRoutesConfig<Config>
type StaticRoutesConfigValues<Config extends NavikronosConfig> =
  StaticRoutesConfig<Config>[StaticRoutesConfigKeys<Config>]

export type StrapiEntryRouteEntity<Config extends NavikronosConfig> =
  EntryRoutesConfigValues<Config> extends infer U
    ? U extends { strapiTypename: infer T }
      ? { __typename: T; id: string }
      : never
    : never

export type StrapiContentTypeRouteEntity<Config extends NavikronosConfig> =
  ContentTypeRoutesConfigValues<Config> extends infer U
    ? U extends { strapiTypename: infer T; pathAttribute: infer K extends string }
      ? { __typename: T; attributes: Record<K, string> }
      : never
    : never

export type StrapiEntity<Config extends NavikronosConfig> =
  | StrapiEntryRouteEntity<Config>
  | StrapiContentTypeRouteEntity<Config>

const x = <Config extends NavikronosConfig>(e: Omit<StrapiEntity<Config>, never>) => {
  if (e.__typename) {
  }
}

export type StaticRouteEntity<Config extends NavikronosConfig> = {
  type: 'static'
  id: StaticRoutesConfigKeys<Config>
}

export type ContentTypeRouteEntity<
  Config extends NavikronosConfig,
  NullUndefinedSlug = false
> = ContentTypeRoutesConfigValues<Config> extends infer U
  ? U extends { alias: infer T }
    ? { type: T; slug: NullUndefinedSlug extends true ? string | null | undefined : string }
    : never
  : never

// export type ContentTypeRouteEntity<
//   Config,
//   NullUndefinedSlug = false
// > = Config extends NavikronosConfig<
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   infer StaticRoutesIds,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   infer EntryRoutesAliases,
//   infer ContentTypeRoutesAliases
// >
//   ? {
//       type: ContentTypeRoutesAliases
//       slug: NullUndefinedSlug extends true ? string | null | undefined : string
//     }
//   : never

export type EntryRouteEntity<
  Config extends NavikronosConfig,
  NullUndefinedId = false
> = EntryRoutesConfigValues<Config> extends infer U
  ? U extends { alias: infer T }
    ? {
        type: T
        /**
         * Strapi works with `number` id, but GraphQL returns `string` ids, for easier usage Navikronos accepts the `string`
         * variation.
         */
        id: NullUndefinedId extends true ? string | null | undefined : string
      }
    : never
  : never

// export type EntryRouteEntity<Config, NullUndefinedId = false> = Config extends NavikronosConfig<
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   infer StaticRoutesIds,
//   infer EntryRoutesAliases,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   infer ContentTypeRoutesAliases
// >
//   ? {
//       type: EntryRoutesAliases
//       /**
//        * Strapi works with `number` id, but GraphQL returns `string` ids, for easier usage Navikronos accepts the `string`
//        * variation.
//        */
//       id: NullUndefinedId extends true ? string | null | undefined : string
//     }
//   : never

export type RouteEntity<Config extends NavikronosConfig, NullUndefinedIdSlug = false> =
  | StaticRouteEntity<Config>
  | ContentTypeRouteEntity<Config, NullUndefinedIdSlug>
  | EntryRouteEntity<Config, NullUndefinedIdSlug>

export type RouteEntityWithLocale<
  Config extends NavikronosConfig,
  NullUndefinedIdSlug = false
> = RouteEntity<Config, NullUndefinedIdSlug> & { locale: string }

export type RouteEntityWithLocaleOptional<
  Config extends NavikronosConfig,
  NullUndefinedIdSlug = false
> = RouteEntity<Config, NullUndefinedIdSlug> & { locale?: string }

export type NavikronosStaticProps<Config extends NavikronosConfig> = {
  navigation: NavikronosClientLocaleNavigations
  locale: string
  locales: string[]
  currentEntity?: Omit<RouteEntity<Config>, never> | null
  currentEntityLocalizations?: RouteEntityWithLocale<Config>[]
  breadcrumbsTitle?: string
}
