import { NavikronosConfig } from '../../types'

type AliasContentTypeMap<Config> = Config extends NavikronosConfig<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer StaticRoutesIds,
  infer EntryRoutesAliases,
  infer ContentTypeRoutesAliases
>
  ? {
      entryRoutes: Map<EntryRoutesAliases, string>
      contentTypeRoutes: Map<ContentTypeRoutesAliases, string>
    }
  : never

/**
 * Returns a map
 * @param config
 */
export const getAliasContentTypeMap = <Config extends NavikronosConfig>(config: Config) => {
  const entryRoutes = new Map(
    Object.entries(config.entryRoutes).map(([uid, { alias }]) => [alias, uid] as const)
  )
  const contentTypeRoutes = new Map(
    Object.entries(config.contentTypeRoutes).map(([uid, { alias }]) => [alias, uid] as const)
  )

  return { entryRoutes, contentTypeRoutes } as AliasContentTypeMap<Config>
}
