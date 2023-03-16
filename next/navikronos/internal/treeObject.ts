import { isDefined } from '@utils/isDefined'

import { NavikronosConfig } from '../types'
import {
  ContentTypeRouteEntity,
  EntryRouteEntity,
  NavikronosBreadcrumb,
  NavikronosBreadcrumbs,
  NavikronosChild,
  NavikronosChildren,
  NavikronosSitemap,
  NavikronosSitemapEntry,
  NavikronosStaticProps,
  RouteEntity,
  RouteEntityWithLocale,
  RouteEntityWithLocaleOptional,
  StrapiEntity,
} from './internalTypes'
import {
  getContentTypeAliasEntryRouteMap,
  getStrapiTypenameAliasMap,
} from './objectUtils/strapiTypenameAliasMap'
import { ParsedTreeNode } from './parsedTreeUtils/parseTree'
import { getParsedTreeObject } from './routeObject'

type CurrentPath = string | null

type GetPathForEntity<Config> = (
  routeEntity: RouteEntityWithLocaleOptional<Config, true>
) => string | null

type Localizations<Config> = RouteEntityWithLocale<Config>[] | null

type GetEntityForStrapiEntity<Config> = <StrapiTypename extends string>(
  strapiEntity: StrapiEntity<Config, StrapiTypename> | undefined | null
) => RouteEntity<Config> | null

type GetPathForStrapiEntity<Config> = <StrapiTypename extends string>(
  strapiEntity: StrapiEntity<Config, StrapiTypename> | undefined | null
) => string | null

type RouteEntityAndTitle<Config> = {
  title: string
  entity: RouteEntity<Config> | null
}

type RouteEntityAndTitleWithChildren<Config> = RouteEntityAndTitle<Config> & {
  children: RouteEntityAndTitleWithChildren<Config>[]
}

type Sitemap<Config> = RouteEntityAndTitleWithChildren<Config> | null
type Breadcrumbs<Config> = RouteEntityAndTitle<Config>[] | null
type Children<Config> = RouteEntityAndTitle<Config>[] | null
type Siblings<Config> = RouteEntityAndTitle<Config>[] | null
type Parents<Config> = RouteEntityAndTitle<Config>[] | null

export type NavikronosObject<Config> = {
  currentPath: CurrentPath
  getPathForEntity: GetPathForEntity<Config>
  getEntityForStrapiEntity: GetEntityForStrapiEntity<Config>
  getPathForStrapiEntity: GetPathForStrapiEntity<Config>
  localizations: Localizations<Config>
  sitemap: Sitemap<Config>
  children: Children<Config>
  siblings: Siblings<Config>
  parents: Parents<Config>
  getBreadcrumbs(title?: string): Breadcrumbs<Config>
}

export const getNavikronosCurrentRouteObject = <Config extends NavikronosConfig>(
  config: Config,
  {
    navigation,
    currentEntity,
    locale: globalLocale,
    currentEntityLocalizations,
  }: NavikronosStaticProps<Config>
): NavikronosObject<Config> => {
  const treeObject = getParsedTreeObject(config, navigation)
  const aliases = getContentTypeAliasEntryRouteMap(config)

  const currentEntityNode = (() => {
    if (!currentEntity) {
      return null
    }

    return treeObject.getNodeByEntity({
      ...currentEntity,
      locale: globalLocale,
    } as RouteEntityWithLocale<Config, true>)
  })()

  const getPathForEntity: GetPathForEntity<Config> = (entity) => {
    const route = treeObject.getNodeByEntity({
      ...entity,
      locale: entity.locale ?? globalLocale,
    })

    if (!route) {
      return null
    }

    if (route.original.type === 'contentType') {
      const { slug } = entity as ContentTypeRouteEntity<Config, true>
      if (!slug) {
        return null
      }

      return route?.fullPath(slug) ?? null
    }

    return route?.fullPath() ?? null
  }

  const getBreadcrumbs = (title: string) => {
    if (!currentEntityNode) {
      return null
    }

    const breadcrumbs: NavikronosBreadcrumbs = []
    let current: ParsedTreeNode | undefined = currentEntityNode
    while (current) {
      if (current.original.type === 'contentType') {
        breadcrumbs.push({ path: current.fullPath(title), title })
      } else {
        breadcrumbs.push({ path: current.fullPath(), title: current.original.title })
      }
      current = current.parent
    }

    return breadcrumbs.reverse()
  }

  // const getSiteMap = () => {
  //   const mapFn = (node: ParsedTreeNode): NavikronosSitemapEntry | null => {
  //     if (node.original.type === 'contentType') {
  //       return null
  //     }
  //     const children = node.children?.map(mapFn).filter(isDefined)
  //
  //     return {
  //       title: node.original.title,
  //       path: node.fullPath(),
  //       children,
  //     }
  //   }
  //   return treeObject.tree[globalLocale]?.navigation.map(mapFn).filter(isDefined)
  // }

  const currentPath = (() => {
    if (!currentEntityNode) {
      return null
    }

    if (currentEntityNode.original.type === 'contentType') {
      const { slug } = currentEntity as ContentTypeRouteEntity<Config>

      if (!slug) {
        return null
      }

      return currentEntityNode?.fullPath(slug) ?? null
    }

    return currentEntityNode?.fullPath() ?? null
  })()

  const nodeToChild = (child: ParsedTreeNode): NavikronosChild | null => {
    if (child.original.type === 'contentType') {
      return null
    }
    return {
      title: child.original.title,
      path: child.fullPath(),
      children: child.children?.map(nodeToChild).filter(isDefined),
    } as NavikronosChild
  }

  const nodeToGec = (node: ParsedTreeNode) => {
    if (node.original.type === 'contentType') {
      return null
    }
    if (node.original.type === 'static') {
      return {
        title: node.original.title,
        entity: { type: 'static', id: node.original.id },
      } as RouteEntityAndTitle<Config>
    }
    if (node.original.type === 'entry') {
      return {
        title: node.original.title,
        entity: {
          type: aliases.get(node.original.contentTypeUid),
          id: String(node.original.entryId),
        },
      } as RouteEntityAndTitle<Config>
    }
    if (node.original.type === 'empty') {
      return {
        title: node.original.title,
        entity: null,
      } as RouteEntityAndTitle<Config>
    }
    return null
  }

  const nodeToGecChild = (node: ParsedTreeNode) => {
    if (node.original.type === 'contentType') {
      return null
    }

    return {
      ...nodeToGec(node),
      children: node.children?.map(nodeToGecChild).filter(isDefined) ?? [],
    } as RouteEntityAndTitleWithChildren<Config>
  }

  // const getChildren = (node = currentEntityNode) => {
  //   if (!node) {
  //     return []
  //   }
  //
  //   return (node.children ?? []).map(nodeToChild).filter(isDefined)
  // }

  const sitemap =
    treeObject.tree[globalLocale]?.navigation.map(nodeToGecChild).filter(isDefined) ?? null

  const children = currentEntityNode?.children?.map(nodeToGec).filter(isDefined) ?? null
  const siblings = currentEntityNode?.parent?.children?.map(nodeToGec).filter(isDefined) ?? null
  const parents = (() => {
    const nodes: ParsedTreeNode[] = []
    let current = currentEntityNode?.parent
    while (current) {
      nodes.push(current)
      current = current.parent
    }

    return nodes.map(nodeToGec).filter(isDefined)
  })()

  const strapiTypenameAliasMap = getStrapiTypenameAliasMap(config)

  const getEntityForStrapiEntity: GetEntityForStrapiEntity<Config> = (strapiEntity) => {
    if (!strapiEntity?.__typename) {
      return null
    }

    if (strapiTypenameAliasMap.entryRoutes.has(strapiEntity.__typename)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = strapiTypenameAliasMap.entryRoutes.get(strapiEntity.__typename)!
      return {
        type: route.alias,
        id: (strapiEntity as { id: string }).id,
      } as EntryRouteEntity<Config, false>
    }

    if (strapiTypenameAliasMap.contentTypeRoutes.has(strapiEntity.__typename)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = strapiTypenameAliasMap.contentTypeRoutes.get(strapiEntity.__typename)!
      return {
        type: route.alias,
        // TODO: type
        slug: (strapiEntity as any)?.attributes?.[route.pathAttribute],
      } as ContentTypeRouteEntity<Config, false>
    }

    return null
  }

  const getPathForStrapiEntity: GetPathForStrapiEntity<Config> = (strapiEntity) => {
    const entity = getEntityForStrapiEntity(strapiEntity) as RouteEntityWithLocaleOptional<
      Config,
      true
    > | null
    if (!entity) {
      return null
    }

    return getPathForEntity(entity)
  }

  return {
    getPathForEntity,
    getBreadcrumbs: getBreadcrumbs as any,
    currentPath,
    sitemap,
    localizations: currentEntityLocalizations,
    children,
    siblings,
    parents,
    getEntityForStrapiEntity,
    getPathForStrapiEntity,
  }
}
