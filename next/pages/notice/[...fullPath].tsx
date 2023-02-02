import NoticePage from '@components/pages/NoticePage'
import { GeneralQuery, NoticeEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import last from 'lodash/last'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'

type NoticePageProps = {
  slug: string
  notice: NoticeEntityFragment
  general: GeneralQuery
} & SSRConfig

const Page = ({ notice, slug, general }: NoticePageProps) => {
  const { i18n } = useTranslation('common')

  if (!notice) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={i18n.language}
        slug={slug ?? ''}
        localizations={notice.attributes?.localizations?.data
          .filter(isDefined)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            slug: localization.attributes?.slug,
          }))}
      >
        <DefaultPageLayout title={notice.attributes?.title} seo={notice.attributes?.seo}>
          <NoticePage notice={notice} />
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

// TODO use common functions to prevent duplicate code
interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
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
          fullPath: `${
            entity.attributes?.locale === 'sk' ? '/zazite/aktuality/' : '/experience/news/'
          }${entity.attributes?.slug!}`
            .split('/')
            .slice(1),
          locale: entity.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`Notices: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<NoticePageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const slug = last(params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} notice ${slug} on ${params?.fullPath.join('/') ?? ''}`)

  const [{ notices }, general, translations] = await Promise.all([
    client.NoticeBySlug({ slug, locale }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
  ])
  const notice = notices?.data[0] ?? null

  if (!notice) return { notFound: true }

  return {
    props: {
      slug,
      notice,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
