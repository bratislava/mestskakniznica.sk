import { GetStaticPropsContext } from 'next/types'

import { fetchNavigation } from './fetchNavigation'
import { NavikronosConfig, NavikronosStaticProps } from './types'

export const navikronosGetStaticProps = async (
  navikronosConfig: NavikronosConfig,
  ctx: GetStaticPropsContext,
  currentRoute: { type: string; id: number }
) => {
  const { navigation } = await fetchNavigation(navikronosConfig)
  const { locale } = ctx

  return { navigation, currentRoute, locale } as NavikronosStaticProps
}
