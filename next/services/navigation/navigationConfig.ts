import { NavigationConfig } from '@/services/navigation/typesNavigation'

export const navigationConfig: NavigationConfig = {
  cacheTtl: 10_000,
  searchPaths: {
    sk: '/vyhladavanie',
    en: '/search',
  },
}
