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
  ctx: Pick<GetStaticPropsContext, 'locale' | 'locales'>
} & Partial<
  Pick<
    NavikronosStaticProps<Config>,
    'currentEntity' | 'currentEntityLocalizations' | 'breadcrumbsTitle'
  >
>) => {
  const { navigation } = await fetchNavikronos(navikronosConfig)

  if (!ctx.locale || !ctx.locales) {
    throw new Error(
      `"ctx" provided to "navikronosGetStaticProps" doesn't contain "locale" or "locales"!`
    )
  }

  return {
    navigation,
    locale: ctx.locale,
    locales: ctx.locales,
    ...rest,
  } satisfies NavikronosStaticProps<Config>
}
