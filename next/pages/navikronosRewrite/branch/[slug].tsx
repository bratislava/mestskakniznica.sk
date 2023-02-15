import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import PageWrapper from '@components/layouts/PageWrapper'
import BranchPage from '@components/pages/BranchPage'
import { BranchEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'
import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { CLNavikronosPageProps, navikronosConfig, useNavikronos } from '@utils/navikronos'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type PageProps = {
  branch: BranchEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ branch, general }: PageProps) => {
  const { t } = useTranslation(['common'])
  const { getPathForEntity } = useNavikronos()

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={branch.attributes?.locale ?? ''}
        slug={`${t('branch_slug')}${branch.attributes?.slug}`}
        localizations={branch.attributes?.localizations?.data
          .filter(isPresent)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            // TODO locale is switched on purpose to get en url if user is on sk page and vice versa
            slug: `${
              branch.attributes?.locale === 'en'
                ? '/navstivte/nase-lokality/'
                : '/visit/our-locations/'
            }${localization.attributes?.slug}`,
          }))}
      >
        <DefaultPageLayout title={branch.attributes?.title} seo={branch.attributes?.seo}>
          <BranchPage branch={branch} />
        </DefaultPageLayout>
      </PageWrapper>
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
    locales.map((locale) => client.BranchStaticPaths({ locale }))
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

  const [{ branches }, general, translations, navikronosStaticProps] = await Promise.all([
    client.BranchBySlug({
      slug,
      locale,
    }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
    navikronosGetStaticProps(navikronosConfig, ctx, {
      type: 'branch',
      slug,
    }),
  ])

  const branch = branches?.data[0] ?? null

  if (!branch) return { notFound: true } as const

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
