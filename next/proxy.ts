import { navikronosConfig } from '@/utils/navikronosConfig'

import { getNavikronosMiddleware } from './navikronos/getNavikronosMiddleware'

export const proxy = getNavikronosMiddleware(navikronosConfig)
