import { navikronosConfig } from '@/utils/navikronos'

import { getNavikronosMiddleware } from './navikronos/getNavikronosMiddleware'

export const middleware = getNavikronosMiddleware(navikronosConfig)
