import { navigationConfig } from '@/services/navigation/navigationConfig'
import {
  ContentType,
  NavigationObject,
  RouteEntity,
  RouteEntityWithLocale,
} from '@/services/navigation/typesNavigation'

const typenameContentTypeMap = {
  BlogPostEntity: 'blog-post',
  EventEntity: 'event',
  NoticeEntity: 'notice',
  BranchEntity: 'branch',
  AssetEntity: 'asset',
  DisclosureEntity: 'disclosure',
} as const satisfies Record<string, ContentType>

export type StrapiEntity =
  | { __typename?: 'PageEntity'; attributes?: { newSlug?: string | null } | null }
  | {
      __typename?: keyof typeof typenameContentTypeMap
      attributes?: { slug?: string | null } | null
    }

const isPageEntity = (
  strapiEntity: StrapiEntity,
): strapiEntity is Extract<StrapiEntity, { __typename?: 'PageEntity' }> =>
  strapiEntity.__typename === 'PageEntity'

export const getEntityForStrapiEntity = (
  strapiEntity: StrapiEntity | null | undefined,
): RouteEntity | null => {
  if (!strapiEntity?.__typename) {
    return null
  }

  if (isPageEntity(strapiEntity)) {
    return { type: 'page', slug: strapiEntity.attributes?.newSlug }
  }

  return {
    type: typenameContentTypeMap[strapiEntity.__typename],
    slug: strapiEntity.attributes?.slug,
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
