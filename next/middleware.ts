import { getMiddleware } from './navikronos/getMiddleware'
import { navikronosConfig } from '@utils/navikronosConfig'

export const middleware = getMiddleware(navikronosConfig)
