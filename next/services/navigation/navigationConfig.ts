import { NavigationConfig } from '@/services/navigation/typesNavigation'
import { environment } from '@/src/environment'

export const navigationConfig: NavigationConfig = {
  cacheTtl: 10_000,
  host: environment.nextHost,
}
