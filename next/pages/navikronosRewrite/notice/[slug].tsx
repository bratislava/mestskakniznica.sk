import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import NoticePage from '@components/pages/NoticePage'
import { GeneralQuery, NoticeEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { extractLocalizationsWithSlug } from '@utils/extractLocalizations'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type NoticePageProps = {
  notice: NoticeEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ notice, general }: NoticePageProps) => {
  if (!notice) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout
        title={notice.attributes?.title}
        seo={notice.attributes?.seo}
        defaultMetaDescription={notice.attributes?.body}
      >
        <NoticePage notice={notice} />
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
    locales.map((locale) => client.NoticesStaticPaths({ locale }))
  )

  const entities = pathArraysForLocales
    .flatMap(({ notices }) => notices?.data || [])
    .filter(isDefined)

  if (entities) {
    paths = entities
      .filter(isDefined)
      .filter((entity) => entity?.attributes?.slug)
      .map((entity) => ({
        params: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          slug: entity.attributes!.slug,
          locale: entity.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`Notices: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<NoticePageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} notice ${slug}`)

  const { notices } = await client.NoticeBySlug({ slug, locale })
  const notice = notices?.data[0] ?? null
  if (!notice) return { notFound: true }

  const localizations = extractLocalizationsWithSlug('notice', notice)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
    await navikronosGetStaticProps(
      navikronosConfig,
      ctx,
      {
        type: 'notice',
        slug,
      },
      localizations
    ),
  ])

  return {
    props: {
      notice,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Page)
