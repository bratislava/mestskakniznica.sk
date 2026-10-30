import { useTranslation } from 'next-i18next/pages'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import {
  getEntityForStrapiEntity,
  getPathForEntity,
  StrapiEntity,
} from '@/services/navigation/getPathForEntity'
import {
  NavigationStaticProps,
  RouteEntity,
  RouteEntityWithLocale,
} from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

export type NavigationNode = {
  slug: string
  title: string
  path: string
  children: NavigationNode[]
}

type Breadcrumb = { title: string; path: string | null }

const NavigationContext = createContext<NavigationStaticProps | null>(null)

export const NavigationProvider = ({
  staticProps,
  children,
}: PropsWithChildren<{ staticProps: NavigationStaticProps | undefined }>) => {
  return (
    <NavigationContext.Provider value={staticProps ?? null}>{children}</NavigationContext.Provider>
  )
}

const getNavigationObject = (
  {
    navigation,
    locale,
    currentEntity,
    currentEntityLocalizations,
    breadcrumbsTitle,
  }: NavigationStaticProps,
  searchTitle: string,
) => {
  const { pagePathsMap = {}, contentTypePathPrefixesMap } = navigation[locale] ?? {}

  const getPath = (entity: RouteEntity & { locale?: string }) =>
    getPathForEntity(navigation, { ...entity, locale: entity.locale ?? locale })

  const getFullPath = (strapiEntity: StrapiEntity | null | undefined) => {
    const entity = getEntityForStrapiEntity(strapiEntity)

    return entity ? getPath(entity) : null
  }

  const getNode = (slug: string): NavigationNode | null => {
    const page = pagePathsMap[slug]
    if (!page) {
      return null
    }

    return {
      slug,
      title: page.title,
      path: page.path,
      children: page.childSlugs.map(getNode).filter(isDefined),
    }
  }

  const currentPage =
    currentEntity?.type === 'page' && currentEntity.slug
      ? pagePathsMap[currentEntity.slug]
      : undefined
  const currentPath = currentEntity ? getPath(currentEntity) : null

  /** Parent page of a page, or the parent page set in Navigation for a detail page. */
  const parentSlug = (() => {
    if (!currentEntity || currentEntity.type === 'search') {
      return null
    }
    if (currentEntity.type === 'page') {
      return currentPage?.parentSlug ?? null
    }

    // The path of a page ends with its slug.
    return contentTypePathPrefixesMap?.[currentEntity.type]?.split('/').at(-1) ?? null
  })()

  /** From the closest one. */
  const parents: Breadcrumb[] = []
  const visitedSlugs = new Set<string>()
  let ancestorSlug = parentSlug
  // `visitedSlugs` guards against a loop caused by two pages with the same slug.
  while (ancestorSlug && !visitedSlugs.has(ancestorSlug)) {
    visitedSlugs.add(ancestorSlug)
    const ancestor = pagePathsMap[ancestorSlug]
    if (ancestor) {
      parents.push({ title: ancestor.title, path: ancestor.path })
    }
    ancestorSlug = ancestor?.parentSlug ?? null
  }

  const parent = parents[0] ?? null

  const children = currentPage?.childSlugs.map(getNode).filter(isDefined) ?? null

  const siblings =
    currentPage && parentSlug
      ? (pagePathsMap[parentSlug]?.childSlugs.map(getNode).filter(isDefined) ?? null)
      : null

  const breadcrumbs = (() => {
    if (!currentEntity) {
      return null
    }

    const current = (() => {
      if (currentEntity.type === 'search') {
        return { title: searchTitle, path: currentPath }
      }
      if (currentEntity.type === 'page') {
        return currentPage ? { title: currentPage.title, path: currentPage.path } : null
      }

      return { title: breadcrumbsTitle ?? '', path: null }
    })()

    return [...[...parents].reverse(), current].filter(isDefined)
  })()

  const localizations: RouteEntityWithLocale[] =
    currentEntityLocalizations ??
    (currentEntity?.type === 'search'
      ? Object.keys(navigation)
          .filter((otherLocale) => otherLocale !== locale)
          .map((otherLocale) => ({ type: 'search', locale: otherLocale }))
      : [])

  return {
    currentPath,
    getPathForEntity: getPath,
    getFullPath,
    localizations,
    children,
    siblings,
    parent,
    breadcrumbs,
  }
}

export const useNavigation = () => {
  const staticProps = useContext(NavigationContext)
  const { t } = useTranslation()
  const searchTitle = t('search.searchTitle')

  const navigation = useMemo(
    () => staticProps && getNavigationObject(staticProps, searchTitle),
    [staticProps, searchTitle],
  )

  if (!navigation) {
    throw new Error(
      'You must return `navigationStaticProps` from getStaticProps or getServerSideProps (see `getNavigationStaticProps`) in order to use `useNavigation` hook.',
    )
  }

  return navigation
}
