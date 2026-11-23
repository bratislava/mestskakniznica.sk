import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import BranchPage from '@/components/pages/BranchPage'
import { BranchEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { getNavigationStaticProps } from '@/services/navigation/getNavigationStaticProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'
import { NOT_FOUND } from '@/utils/consts'
import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'

type PageProps = {
  branch: BranchEntityFragment
  general: GeneralQuery
} & SSRConfig &
  NavigationPageProps

const Page = ({ branch, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout
        title={branch?.title}
        seo={branch?.seo}
        defaultMetaDescription={branch?.body}
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
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BranchStaticPaths({ locale })),
  )
  const entities = pathArraysForLocales.flatMap(({ branches }) => branches || []).filter(isDefined)

  const paths: GetStaticPathsResult<StaticParams>['paths'] = entities
    .filter((entity) => entity.slug)
    .map((entity) => ({
      params: {
        slug: entity.slug,
      },
      locale: entity.locale || '',
    }))

  // eslint-disable-next-line no-console
  console.log(`Branches: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) {
    return NOT_FOUND
  }

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} branch ${slug}`)

  const { branches } = await client.BranchBySlug({
    slug,
    locale,
  })
  const branch = branches[0] ?? null
  if (!branch) {
    return NOT_FOUND
  }

  const localizations = extractLocalizationsWithSlug('branch', branch)

  const [general, translations, navigationStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    getNavigationStaticProps({
      locale,
      currentEntity: {
        type: 'branch',
        slug,
      },
      currentEntityLocalizations: localizations,
      breadcrumbsTitle: branch.title,
    }),
  ])

  return {
    props: {
      slug,
      branch,
      general,
      navigationStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
