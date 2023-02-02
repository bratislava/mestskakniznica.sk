import { NavikronosConfig } from '../types'

export const getAliasContentTypeMap = (config: NavikronosConfig) => {
  const entryRoutes = new Map(
    Object.entries(config.entryRoutes).map(([uid, { alias }]) => [alias, uid])
  )
  const contentTypeRoutes = new Map(
    Object.entries(config.contentTypeRoutes).map(([uid, { alias }]) => [alias, uid])
  )

  return { entryRoutes, contentTypeRoutes }
}
