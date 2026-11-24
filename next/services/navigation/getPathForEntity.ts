import { navigationConfig } from '@/services/navigation/navigationConfig'
import {
  ContentType,
  NavigationObject,
  RouteEntity,
  RouteEntityWithLocale,
} from '@/services/navigation/typesNavigation'

const typenameContentTypeMap = {
  Page: 'page',
  BlogPost: 'blog-post',
  Event: 'event',
  Notice: 'notice',
  Branch: 'branch',
  Asset: 'asset',
  Disclosure: 'disclosure',
} as const satisfies Record<string, 'page' | ContentType>

export type StrapiEntity = {
  __typename?: keyof typeof typenameContentTypeMap
  slug?: string | null
}

export const getEntityForStrapiEntity = (
  strapiEntity: StrapiEntity | null | undefined,
): RouteEntity | null => {
  if (!strapiEntity?.__typename) {
    return null
  }

  return {
    type: typenameContentTypeMap[strapiEntity.__typename],
    slug: strapiEntity.slug,
  }
}

/**
 * Returns the path without the locale prefix, `Link` and `router.push` add it.
 */
export const getPathForEntity = (navigation: NavigationObject, entity: RouteEntityWithLocale) => {
  if (entity.type === 'search') {
    return navigationConfig.searchPaths[entity.locale] ?? null
  }

  const localeNavigation = navigation[entity.locale]
  if (!entity.slug || !localeNavigation) {
    return null
  }

  if (entity.type === 'page') {
    return localeNavigation.pagePathsMap[entity.slug]?.path ?? null
  }

  const pathPrefix = localeNavigation.contentTypePathPrefixesMap[entity.type]

  return pathPrefix ? `${pathPrefix}/${entity.slug}` : null
}
