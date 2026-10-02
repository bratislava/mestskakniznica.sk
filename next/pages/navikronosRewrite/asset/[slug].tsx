import { ParsedUrlQuery } from 'node:querystring'

import { GetServerSideProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import AssetPage from '@/components/pages/AssetPage'
import { navikronosGetStaticProps } from '@/navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '@/navikronos/wrapNavikronosProvider'
import { AssetEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { NOT_FOUND } from '@/utils/consts'
import { GeneralContextProvider } from '@/utils/generalContext'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

type PageProps = {
  asset: AssetEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ asset, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <AssetPage entity={asset} />
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params, locales } = ctx
  const slug = params?.slug

  if (!slug || !locale) {
    return NOT_FOUND
  }

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} asset ${slug}`)

  const { assets } = await client.AssetBySlug({ slug })
  const asset = assets?.data[0] ?? null
  if (!asset) {
    return NOT_FOUND
  }

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'asset',
        slug,
      },
      // TODO: Improve for unlocalized entities.
      currentEntityLocalizations: locales
        ?.filter((innerLocale) => innerLocale !== locale)
        .map((innerLocale) => ({
          type: 'asset' as const,
          slug,
          locale: innerLocale,
        })),
      breadcrumbsTitle: asset.attributes?.title,
    }),
  ])

  return {
    props: {
      slug,
      asset,
      general,
      navikronosStaticProps,
      ...translations,
    },
  }
}

export default wrapNavikronosProvider(Page)
