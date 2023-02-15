import { getMiddleware } from './navikronos/getMiddleware'
import { navikronosConfig } from '@utils/navikronos'

export const middleware = getMiddleware(navikronosConfig)
