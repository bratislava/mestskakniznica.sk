import { NavigationRewrites, NavikronosClientNavigation, NavikronosConfig } from './types'
import { getRewrites } from './getRewrites'

let cache: {
  timestamp: number
  value: {
    navigation: NavikronosClientNavigation
    rewrites: NavigationRewrites
  }
} | null = null

const fetchNonCached = async (config: NavikronosConfig) => {
  const fetched = await fetch(`${config.strapiUrl}/navikronos/`)
  const json = await fetched.json()

  return json as NavikronosClientNavigation
}

export const fetchNavigation = async (config: NavikronosConfig) => {
  if (cache?.timestamp && cache.timestamp + config.cacheTtl > Date.now()) {
    return cache.value
  }

  const navigation = await fetchNonCached(config)
  const rewrites = getRewrites(config, navigation)

  const value = { navigation, rewrites }
  cache = { timestamp: Date.now(), value }

  return value
}
