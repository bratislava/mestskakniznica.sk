import { NavigationConfig } from '@/services/navigation/typesNavigation'

export const navigationConfig: NavigationConfig = {
  cacheTtl: 10_000,
  host: process.env.NEXT_PUBLIC_NEXT_HOST ?? 'mestskakniznica.sk',
}
