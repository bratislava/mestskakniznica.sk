import { getNavigationMiddleware } from '@/services/navigation/getNavigationMiddleware'
import { navigationConfig } from '@/services/navigation/navigationConfig'

export const proxy = getNavigationMiddleware(navigationConfig)
