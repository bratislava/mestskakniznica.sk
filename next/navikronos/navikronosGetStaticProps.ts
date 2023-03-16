import { GetStaticPropsContext } from 'next/types'

import { fetchNavikronos } from './internal/fetch'
import { NavikronosStaticProps, RouteEntity, RouteEntityWithLocale } from './internal/internalTypes'
import { NavikronosConfig } from './types'

export const navikronosGetStaticProps = async <Config extends NavikronosConfig>(
  navikronosConfig: Config,
  { locale }: Pick<GetStaticPropsContext, 'locale'>,
  currentEntity?: RouteEntity<Config>,
  currentEntityLocalizations?: RouteEntityWithLocale<Config>[]
) => {
  const { navigation } = await fetchNavikronos(navikronosConfig)

  return {
    navigation,
    currentEntity: currentEntity ?? null,
    currentEntityLocalizations: currentEntityLocalizations ?? [],
    locale,
  } as NavikronosStaticProps<Config>
}
