import { NavigationConfig } from '@/services/navigation/typesNavigation'

export const navigationConfig: NavigationConfig = {
  cacheTtl: 10_000,
  rewritePrefix: 'navigationRewrite',
  searchPaths: {
    sk: '/vyhladavanie',
    en: '/search',
  },
}
