import { createUseNavikronosHook } from '@/navikronos/NavikronosProvider'

// Re-export config and types from the separate config file
export {
  type CLNavikronosConfig,
  type CLNavikronosPageProps,
  navikronosConfig,
} from './navikronosConfig'
import { navikronosConfig } from './navikronosConfig'

export const useNavikronos = createUseNavikronosHook(navikronosConfig)
