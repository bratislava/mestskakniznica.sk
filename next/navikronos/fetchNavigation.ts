import { getNavikronosTreeObject, NavikronosTreeObject } from './navikronosTreeObject'
import { NavikronosClientLocaleNavigations, NavikronosConfig } from './types'

let cache: {
  timestamp: number
  value: {
    navigation: NavikronosClientLocaleNavigations
    navikronosObject: NavikronosTreeObject<any>
  }
} | null = null

const fetchNonCached = async (config: NavikronosConfig) => {
  const response = await fetch(`${config.strapiUrl}/navikronos/`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const json = await response.json()

  return json as NavikronosClientLocaleNavigations
}

export const fetchNavigation = async <Config extends NavikronosConfig>(config: Config) => {
  if (cache?.timestamp && cache.timestamp + config.cacheTtl > Date.now()) {
    return cache.value
  }

  const navigation = await fetchNonCached(config)
  const navikronosObject = getNavikronosTreeObject<Config>(config, navigation)

  const value = { navigation, navikronosObject }
  cache = { timestamp: Date.now(), value }

  return value
}
