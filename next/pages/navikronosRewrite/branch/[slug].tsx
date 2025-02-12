import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import BranchPage from '@/components/pages/BranchPage'
import { navikronosGetStaticProps } from '@/navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '@/navikronos/wrapNavikronosProvider'
import { BranchEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

type PageProps = {
  branch: BranchEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ branch, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout
        title={branch.attributes?.title}
        seo={branch.attributes?.seo}
        defaultMetaDescription={branch.attributes?.body}
      >
        <BranchPage branch={branch} />
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

// TODO use common functions to prevent duplicate code
interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales = ['sk', 'en'] }) => {
  let paths: GetStaticPathsResult<StaticParams>['paths'] = []

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BranchStaticPaths({ locale })),
  )
  const entities = pathArraysForLocales
    .flatMap(({ branches }) => branches?.data || [])
    .filter(isDefined)

  if (entities.length > 0) {
    paths = entities
      .filter((entity) => entity.attributes?.slug)
      .map((entity) => ({
        params: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          slug: entity.attributes!.slug,
          locale: entity.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`Branches: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} branch ${slug}`)

  const { branches } = await client.BranchBySlug({
    slug,
    locale,
  })
  const branch = branches?.data[0] ?? null
  if (!branch) return { notFound: true } as const

  const localizations = extractLocalizationsWithSlug('branch', branch)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'branch',
        slug,
      },
      currentEntityLocalizations: localizations,
      breadcrumbsTitle: branch.attributes?.title,
    }),
  ])

  return {
    props: {
      slug,
      branch,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Page)
