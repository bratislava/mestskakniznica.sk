/**
 * @tsImport
 * { "mode": "compile" }
 */

import { NavikronosClientNavigation, NavikronosConfig } from './types'

export const fetchNavigation = async (config: NavikronosConfig) => {
  const fetched = await fetch(`${config.strapiUrl}/navikronos/`)
  const json = await fetched.json()

  return json as NavikronosClientNavigation
}
