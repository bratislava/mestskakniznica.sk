import { NavikronosConfig } from '../../types'

type StrapiTypenameAliasMap = {
  entryRoutes: Map<string, { alias: string }>
  contentTypeRoutes: Map<string, { alias: string; pathAttribute: string }>
}

/**
 * Returns a map
 * @param config
 */
export const getStrapiTypenameAliasMap = <Config extends NavikronosConfig>(config: Config) => {
  const entryRoutes = new Map(
    Object.values(config.entryRoutes).map(
      ({ strapiTypename, alias }) => [strapiTypename, { alias }] as const
    )
  )
  const contentTypeRoutes = new Map(
    Object.values(config.contentTypeRoutes).map(
      ({ strapiTypename, alias, pathAttribute }) =>
        [strapiTypename, { alias, pathAttribute }] as const
    )
  )

  return { entryRoutes, contentTypeRoutes } as StrapiTypenameAliasMap
}

export const getContentTypeAliasEntryRouteMap = <Config extends NavikronosConfig>(
  config: Config
) => {
  return new Map(
    Object.entries(config.entryRoutes).map(([uid, { alias }]) => [uid, alias] as const)
  )
}
