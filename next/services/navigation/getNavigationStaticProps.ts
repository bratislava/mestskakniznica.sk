import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import {
  NavigationStaticProps,
  RouteEntity,
  RouteEntityWithLocale,
} from '@/services/navigation/typesNavigation'

/**
 * Use in getStaticProps or getServerSideProps and return the result as `navigationStaticProps`, `_app` provides it to
 * `useNavigation`.
 */
export const getNavigationStaticProps = async ({
  locale,
  currentEntity,
  currentEntityLocalizations,
  breadcrumbsTitle,
}: {
  locale: string
  currentEntity?: RouteEntity
  currentEntityLocalizations?: RouteEntityWithLocale[]
  breadcrumbsTitle?: string | null
}): Promise<NavigationStaticProps> => {
  const navigation = await fetchNavigation(navigationConfig)

  // Using null to make the object serializable
  return {
    navigation,
    locale,
    currentEntity: currentEntity ?? null,
    currentEntityLocalizations: currentEntityLocalizations ?? null,
    breadcrumbsTitle: breadcrumbsTitle ?? null,
  }
}
