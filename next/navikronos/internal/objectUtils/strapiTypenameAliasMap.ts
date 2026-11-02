import { NavikronosConfig } from '../../config-type'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const getStrapiTypenameAliasMap = <Config extends NavikronosConfig>(config: Config) => {
  const entryRoutes = new Map(
    Object.values(config.entryRoutes).map(
      ({ strapiTypename, alias }) => [strapiTypename, { alias }] as const,
    ),
  )
  const contentTypeRoutes = new Map(
    Object.values(config.contentTypeRoutes).map(
      ({ strapiTypename, alias, pathAttribute }) =>
        [strapiTypename, { alias, pathAttribute }] as const,
    ),
  )

  return { entryRoutes, contentTypeRoutes }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const getContentTypeAliasMap = <Config extends NavikronosConfig>(config: Config) => {
  const entryRoutes = new Map(
    Object.entries(config.entryRoutes).map(([uid, { alias }]) => [uid, alias] as const),
  )
  const contentTypeRoutes = new Map(
    Object.entries(config.contentTypeRoutes).map(([uid, { alias }]) => [uid, alias] as const),
  )

  return { entryRoutes, contentTypeRoutes }
}
