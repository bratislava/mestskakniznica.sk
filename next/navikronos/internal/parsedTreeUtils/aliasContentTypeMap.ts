import { NavikronosConfig } from '../../config-type'
import { AliasContentTypeMap } from '../internalTypes'

export const getAliasContentTypeMap = <Config extends NavikronosConfig>(config: Config) => {
  const entryRoutes = new Map(
    Object.entries(config.entryRoutes).map(([uid, { alias }]) => [alias, uid] as const)
  )
  const contentTypeRoutes = new Map(
    Object.entries(config.contentTypeRoutes).map(([uid, { alias }]) => [alias, uid] as const)
  )

  return { entryRoutes, contentTypeRoutes } as AliasContentTypeMap<Config>
}
