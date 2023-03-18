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
  EntryRoutesConfigValues<Config> extends { strapiTypename: infer T extends string }
    ? { __typename: T; id: string }
    : never

export type StrapiContentTypeRouteEntity<Config extends NavikronosConfig> =
  ContentTypeRoutesConfigValues<Config> extends {
    strapiTypename: infer T extends string
    pathAttribute: infer K extends string
  }
    ? { __typename: T; attributes: Record<K, string> }
    : never

export type StrapiEntity<Config extends NavikronosConfig> =
  | StrapiEntryRouteEntity<Config>
  | StrapiContentTypeRouteEntity<Config>

export type StaticRouteEntity<Config extends NavikronosConfig> = {
  type: 'static'
  id: StaticRoutesConfigKeys<Config>
}

export type ContentTypeRouteEntity<
  Config extends NavikronosConfig,
  NullUndefinedSlug = false
> = ContentTypeRoutesConfigValues<Config> extends { alias: infer T }
  ? { type: T; slug: NullUndefinedSlug extends true ? string | null | undefined : string }
  : never

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
    : {
        type: string
        id: NullUndefinedId extends true ? string | null | undefined : string
      }
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
  currentEntity?: RouteEntity<Config> | null
  currentEntityLocalizations?: RouteEntityWithLocale<Config>[]
  breadcrumbsTitle?: string
}
