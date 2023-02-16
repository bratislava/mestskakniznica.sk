import { GetStaticPropsContext } from 'next/types'

import { fetchNavigation } from './fetchNavigation'
import {
  NavikronosConfig,
  NavikronosStaticProps,
  RouteEntity,
  RouteEntityWithLocale,
} from './types'

export const navikronosGetStaticProps = async <Config extends NavikronosConfig>(
  navikronosConfig: Config,
  { locale }: Pick<GetStaticPropsContext, 'locale'>,
  currentEntity?: RouteEntity<Config>,
  currentEntityLocalizations?: RouteEntityWithLocale<Config>[]
) => {
  const { navigation } = await fetchNavigation(navikronosConfig)

  return {
    navigation,
    currentEntity: currentEntity ?? null,
    currentEntityLocalizations: currentEntityLocalizations ?? [],
    locale,
  } as NavikronosStaticProps<Config>
}
