import i18nextConfig from '@/next-i18next.config'
import { client } from '@/services/graphql/gql'
import { parseContentTypePathPrefixes } from '@/services/navigation/parseContentTypePathPrefixes'
import { parseTopLevelPages } from '@/services/navigation/parseTopLevelPages'
import { NavigationConfig, NavigationObject } from '@/services/navigation/typesNavigation'

// Inspired by City Library - Navikronos custom plugin
// https://github.com/bratislava/mestskakniznica.sk/blob/dfef31c799e1a903af4fa30aa1be5c3f27ae5418/next/navikronos/internal/fetch.ts

let cache: {
  timestamp: number
  value: NavigationObject
} | null = null

// The config is a CommonJS file, so its types are not inferred.
const { locales } = (i18nextConfig as { i18n: { locales: string[] } }).i18n

const fetchNonCachedNavigation = async (): Promise<NavigationObject> => {
  const localeNavigations = await Promise.all(
    locales.map(async (locale) => {
      const { navigation, topLevelPages } = await client.Navigation({ locale })

      const { pagePathsMap } = parseTopLevelPages(topLevelPages?.data ?? [])
      const { contentTypePathPrefixesMap } = parseContentTypePathPrefixes(navigation, pagePathsMap)

      return [locale, { pagePathsMap, contentTypePathPrefixesMap }] as const
    }),
  )

  return Object.fromEntries(localeNavigations)
}

/**
 * Fetches and caches navigation data of all locales directly from the Strapi client.
 * Use this function in getStaticProps, getServerSideProps and in the proxy - proxy always runs on the Node.js runtime,
 * so it can use the GraphQL client too.
 *
 * @param config
 */
export const fetchNavigation = async (config: NavigationConfig) => {
  if (cache?.timestamp && cache.timestamp + config.cacheTtl > Date.now()) {
    return cache.value
  }

  const navigation = await fetchNonCachedNavigation()

  cache = { timestamp: Date.now(), value: navigation }

  return navigation
}
