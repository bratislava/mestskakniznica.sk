import { navikronosConfig } from '@/utils/navikronosConfig'

import { getNavikronosMiddleware } from './navikronos/getNavikronosMiddleware'

export const middleware = getNavikronosMiddleware(navikronosConfig)
