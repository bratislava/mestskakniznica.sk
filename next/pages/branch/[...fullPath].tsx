import BranchPage from '@components/pages/BranchPage'
import { generalFetcher } from '@utils/fetchers/general.fetcher'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'
import { isPresent, shouldSkipStaticPaths } from '@utils/utils'
import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../../components/Molecules/ErrorDisplay'
import ErrorPage from '../../components/pages/ErrorPage'
import { BranchEntityFragment, GeneralQuery } from '../../graphql'

interface IPageProps {
  locale: string
  branch: BranchEntityFragment
  general: GeneralQuery
  error?: IDisplayError
}

const EventSlugPage = ({ branch, general, error }: IPageProps) => {
  const { t } = useTranslation(['common'])

  if (error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={error} />
      </ErrorPage>
    )
  }

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
        <DefaultPageLayout
          title={branch.attributes?.title}
          // TODO add seo to Strapi
          // Seo={branch.attributes?.Seo}
        >
          <BranchPage branch={branch} />
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  let paths: Array<{ params: { fullPath: string[]; locale: string } }> = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BranchStaticPaths({ locale }))
  )
  const branches = pathArraysForLocales
    .flatMap(({ branches: branchesInner }) => branchesInner?.data || [])
    .filter(isDefined)

  if (branches.length > 0) {
    paths = branches
      .filter((branch) => branch.attributes?.slug)
      .map((branch) => ({
        params: {
          fullPath: `${branch.attributes?.locale === 'sk' ? '/navstivte/' : '/visit/'}${branch
            .attributes?.slug!}`
            .split('/')
            .slice(1),
          locale: branch.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} BRANCHES`)
  return { paths, fallback: 'blocking' }
}

// TODO define type of fullPath to string[]
export const getStaticProps: GetStaticProps<IPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  const slug = last(ctx?.params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} branch ${slug} on ${ctx?.params?.fullPath}`)

  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

  try {
    const [{ branches }, general] = await Promise.all([
      client.BranchBySlug({
        slug,
        locale,
      }),
      generalFetcher(locale),
    ])

    const branch = branches?.data[0] ?? null

    if (!branch) return { notFound: true } as const

    return {
      props: {
        slug,
        branch,
        locale,
        general,
        ...translations,
      },
      revalidate: 10,
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 10,
    }
  }
}

export default EventSlugPage
