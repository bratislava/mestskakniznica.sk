// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-underscore-dangle */
import { isDefined } from '@/utils/isDefined'

import { NavikronosConfig } from '../config-type'
import {
  ContentTypeRouteEntity,
  EntryRouteEntity,
  NavikronosStaticProps,
  RouteEntity,
  RouteEntityWithLocale,
  RouteEntityWithLocaleOptional,
  StrapiContentTypeRouteEntity,
  StrapiEntity,
  StrapiEntryRouteEntity,
} from './internalTypes'
import {
  getContentTypeAliasMap,
  getStrapiTypenameAliasMap,
} from './objectUtils/strapiTypenameAliasMap'
import { ParsedTreeNode } from './parsedTreeUtils/parseTree'
import { getParsedTreeWithUtilities } from './parsedTreeWithUtilities'

type CurrentPath = string | null

type GetPathForEntity<Config extends NavikronosConfig> = (
  routeEntity: RouteEntityWithLocaleOptional<Config, true> | null,
) => string | null

type Localizations<Config extends NavikronosConfig> = RouteEntityWithLocale<Config>[] | null

type GetEntityForStrapiEntity<Config extends NavikronosConfig> = (
  strapiEntity: StrapiEntity<Config> | undefined | null,
) => RouteEntity<Config> | null

type GetPathForStrapiEntity<Config extends NavikronosConfig> = (
  strapiEntity: StrapiEntity<Config> | undefined | null,
) => string | null

export type RouteEntityAndTitle<Config extends NavikronosConfig> = {
  title: string
  entity: RouteEntity<Config> | null
  path: string | null
}

export type RouteEntityAndTitleWithChildren<Config extends NavikronosConfig> =
  RouteEntityAndTitle<Config> & {
    children: RouteEntityAndTitleWithChildren<Config>[]
  }

type Sitemap<Config extends NavikronosConfig> = RouteEntityAndTitleWithChildren<Config>[] | null
type Breadcrumbs<Config extends NavikronosConfig> = RouteEntityAndTitle<Config>[] | null
type Children<Config extends NavikronosConfig> = RouteEntityAndTitleWithChildren<Config>[] | null
type Siblings<Config extends NavikronosConfig> = RouteEntityAndTitleWithChildren<Config>[] | null
type Parents<Config extends NavikronosConfig> = RouteEntityAndTitle<Config>[] | null
type Parent<Config extends NavikronosConfig> = RouteEntityAndTitle<Config> | null

export type NavikronosObject<Config extends NavikronosConfig> = {
  currentPath: CurrentPath
  getPathForEntity: GetPathForEntity<Config>
  getEntityForStrapiEntity: GetEntityForStrapiEntity<Config>
  getPathForStrapiEntity: GetPathForStrapiEntity<Config>
  localizations: Localizations<Config>
  sitemap: Sitemap<Config>
  children: Children<Config>
  siblings: Siblings<Config>
  parents: Parents<Config>
  parent: Parent<Config>
  breadcrumbs: Breadcrumbs<Config>
}

export const getNavikronosObject = <Config extends NavikronosConfig>(
  config: Config,
  {
    navigation: _navigation,
    locale: _globalLocale,
    locales: _locales,
    currentEntity: _currentEntity,
    currentEntityLocalizations: _currentEntityLocalizations,
    breadcrumbsTitle: _breadcrumbsTitle,
  }: NavikronosStaticProps<Config>,
): // eslint-disable-next-line sonarjs/cognitive-complexity
NavikronosObject<Config> => {
  const _treeObject = getParsedTreeWithUtilities(config, _navigation)
  const _contentTypeAliasMap = getContentTypeAliasMap(config)

  const _currentEntityNode = (() => {
    if (!_currentEntity) {
      return null
    }

    return _treeObject.getNodeByEntity({
      ..._currentEntity,
      locale: _globalLocale,
    } as RouteEntityWithLocale<Config, true>)
  })()

  const _getNodeForEntity = (entity: RouteEntityWithLocaleOptional<Config, true> | null) => {
    if (!entity) {
      return null
    }

    return _treeObject.getNodeByEntity({
      ...entity,
      locale: entity.locale ?? _globalLocale,
    })
  }

  const _getPathForNode = (
    node: ParsedTreeNode | null,
    entity?: RouteEntityWithLocaleOptional<Config, true> | null,
  ) => {
    if (!node) {
      return null
    }

    if (node.original.type === 'contentType' && entity) {
      const { slug } = entity as ContentTypeRouteEntity<Config, true>
      if (!slug) {
        return null
      }

      return node?.fullPath(slug) ?? null
    }

    return node?.fullPath() ?? null
  }

  const getPathForEntity: GetPathForEntity<Config> = (entity) => {
    const node = _getNodeForEntity(entity)

    return _getPathForNode(node, entity)
  }

  const _strapiTypenameAliasMap = getStrapiTypenameAliasMap(config)

  const getEntityForStrapiEntity: GetEntityForStrapiEntity<Config> = (strapiEntity) => {
    if (!strapiEntity?.__typename) {
      return null
    }

    if (_strapiTypenameAliasMap.entryRoutes.has(strapiEntity.__typename)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = _strapiTypenameAliasMap.entryRoutes.get(strapiEntity.__typename)!
      return {
        type: route.alias,
        id: (strapiEntity as StrapiEntryRouteEntity<Config>).id,
      } as EntryRouteEntity<Config>
    }

    if (_strapiTypenameAliasMap.contentTypeRoutes.has(strapiEntity.__typename)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = _strapiTypenameAliasMap.contentTypeRoutes.get(strapiEntity.__typename)!
      return {
        type: route.alias,
        slug: (strapiEntity as StrapiContentTypeRouteEntity<Config>)?.attributes?.[
          route.pathAttribute
        ],
      } as ContentTypeRouteEntity<Config>
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

  const localizations = (() => {
    if (_currentEntityLocalizations) {
      return _currentEntityLocalizations
    }

    if (_currentEntityNode?.original.type === 'static') {
      return _locales
        .filter((locale) => locale !== _globalLocale)
        .map(
          (locale) =>
            ({
              ..._currentEntity,
              locale,
            }) as RouteEntityWithLocale<Config>,
        )
    }

    return []
  })()

  const currentPath = (() => {
    if (!_currentEntityNode) {
      return null
    }

    if (_currentEntityNode.original.type === 'contentType') {
      const { slug } = _currentEntity as ContentTypeRouteEntity<Config>

      if (!slug) {
        return null
      }

      return _currentEntityNode?.fullPath(slug) ?? null
    }

    return _currentEntityNode?.fullPath() ?? null
  })()

  const _nodeToEntityAndTitle = (node: ParsedTreeNode) => {
    if (node.original.type === 'contentType') {
      return null
    }
    if (node.original.type === 'static') {
      return {
        title: node.original.title,
        entity: { type: 'static', id: node.original.id },
        path: _getPathForNode(node),
      } as RouteEntityAndTitle<Config>
    }
    if (node.original.type === 'entry') {
      return {
        title: node.original.title,
        entity: {
          type: _contentTypeAliasMap.entryRoutes.get(node.original.contentTypeUid),
          id: String(node.original.entryId),
        },
        path: _getPathForNode(node),
      } as RouteEntityAndTitle<Config>
    }
    if (node.original.type === 'empty') {
      return {
        title: node.original.title,
        entity: null,
        path: null,
      } as RouteEntityAndTitle<Config>
    }
    return null
  }

  const _nodeToEntityAndTitleWithChildren = (
    node: ParsedTreeNode,
  ): RouteEntityAndTitleWithChildren<Config> | null => {
    if (node.original.type === 'contentType') {
      return null
    }

    return {
      ..._nodeToEntityAndTitle(node),
      children: node.children?.map(_nodeToEntityAndTitleWithChildren).filter(isDefined) ?? [],
    } as RouteEntityAndTitleWithChildren<Config>
  }

  const sitemap: Sitemap<Config> =
    _treeObject.tree[_globalLocale]?.navigation
      .map(_nodeToEntityAndTitleWithChildren)
      .filter(isDefined) ?? null

  const children: Children<Config> =
    _currentEntityNode?.children?.map(_nodeToEntityAndTitleWithChildren).filter(isDefined) ?? null

  const siblings: Siblings<Config> =
    _currentEntityNode?.parent?.children
      ?.map(_nodeToEntityAndTitleWithChildren)
      .filter(isDefined) ?? null

  const parents: Parents<Config> = (() => {
    const nodes: ParsedTreeNode[] = []
    let current = _currentEntityNode?.parent
    while (current) {
      nodes.push(current)
      current = current.parent
    }

    return nodes.map(_nodeToEntityAndTitle).filter(isDefined)
  })()
  const parent: Parent<Config> = parents?.[0] ?? null

  const breadcrumbs: Breadcrumbs<Config> = (() => {
    if (!_currentEntityNode) {
      return null
    }

    const current =
      _currentEntityNode.original.type === 'contentType'
        ? ({
            title: _breadcrumbsTitle,
            entity: {
              type: _contentTypeAliasMap.contentTypeRoutes.get(
                _currentEntityNode.original.contentTypeUid,
              ) as string,
              slug: (_currentEntity as ContentTypeRouteEntity<Config>).slug,
            } as ContentTypeRouteEntity<Config>,
          } as RouteEntityAndTitle<Config>)
        : _nodeToEntityAndTitle(_currentEntityNode)

    const reversedParents = [...parents].reverse()
    return [...reversedParents, current].filter(isDefined)
  })()

  return {
    currentPath,
    getPathForEntity,
    getEntityForStrapiEntity,
    getPathForStrapiEntity,
    localizations,
    sitemap,
    children,
    siblings,
    parents,
    parent,
    breadcrumbs,
  }
}
