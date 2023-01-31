import { GetStaticPropsContext } from 'next/types'

import { navikronosQueryParam } from './const'
import { fetchNavigation } from './fetchNavigation'
import { NavikronosConfig } from './types'

export const navikronosGetStaticProps = async ({
  navikronosConfig,
  ctx: { params },
}: {
  navikronosConfig: NavikronosConfig
  ctx: GetStaticPropsContext<{ [navikronosQueryParam]: string }>
}) => {
  const navigation = await fetchNavigation(navikronosConfig)

  return { navigation }
}
