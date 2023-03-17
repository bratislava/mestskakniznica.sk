import { GetStaticPropsContext } from 'next/types'

import { NavikronosConfig } from './config-type'
import { fetchNavikronos } from './internal/fetch'
import { NavikronosStaticProps } from './internal/internalTypes'

export const navikronosGetStaticProps = async <Config extends NavikronosConfig>({
  navikronosConfig,
  ctx,
  ...rest
}: {
  navikronosConfig: Config
  ctx: Pick<GetStaticPropsContext, 'locale'>
} & Partial<
  Pick<
    NavikronosStaticProps<Config>,
    'currentEntity' | 'currentEntityLocalizations' | 'breadcrumbsTitle'
  >
>) => {
  const { navigation } = await fetchNavikronos(navikronosConfig)

  if (!ctx.locale) {
    throw new Error(`"ctx" provided to "navikronosGetStaticProps" doesn't contain locale!`)
  }

  return {
    navigation,
    locale: ctx.locale,
    ...rest,
  } satisfies NavikronosStaticProps<Config>
}
