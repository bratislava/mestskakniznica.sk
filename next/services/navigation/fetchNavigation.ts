import i18nextConfig from '@/next-i18next.config'
import { client } from '@/services/graphql/gql'
import { getContentTypePathPrefixesMap } from '@/services/navigation/getContentTypePathPrefixesMap'
import { parseTopLevelPages } from '@/services/navigation/parseTopLevelPages'
import { NavigationConfig, NavigationObject } from '@/services/navigation/typesNavigation'

let cache: {
  timestamp: number
  value: NavigationObject
} | null = null

// The config is a CommonJS file, so its types are not inferred.
const { locales } = (i18nextConfig as { i18n: { locales: string[] } }).i18n

const fetchNonCachedNavigation = async (): Promise<NavigationObject> => {
  const localeNavigations = await Promise.all(
    locales.map(async (locale) => {
      const { topLevelPages } = await client.Navigation({ locale })

      const { pagePathsMap } = parseTopLevelPages(topLevelPages?.data ?? [])
      const { contentTypePathPrefixesMap } = getContentTypePathPrefixesMap(locale)

      return [locale, { pagePathsMap, contentTypePathPrefixesMap }] as const
    }),
  )

  return Object.fromEntries(localeNavigations)
}

/**
 * Fetches and caches navigation data of all locales directly from the Strapi client.
 * Use this function in getStaticProps and in getServerSideProps
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
