import { getRewrites } from './getRewrites'
import {
  NavigationRewrites,
  NavikronosClientLocaleNavigations,
  NavikronosClientNavigation,
  NavikronosConfig,
} from './types'

let cache: {
  timestamp: number
  value: {
    navigation: NavikronosClientLocaleNavigations
    rewrites: NavigationRewrites
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
