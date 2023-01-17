import { BlogPostEntityFragment, GeneralQuery } from '@services/graphql'
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
import BlogPostPage from '../../components/pages/blogPostPage'

type PageProps = {
  slug: string
  blogPost: BlogPostEntityFragment
  general: GeneralQuery
} & SSRConfig

const Page = ({ blogPost, slug, general }: PageProps) => {
  const { i18n } = useTranslation('common')

  if (!blogPost) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={i18n.language}
        slug={slug ?? ''}
        localizations={blogPost.attributes?.localizations?.data
          .filter(isDefined)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            slug: localization.attributes?.slug,
          }))}
      >
        <DefaultPageLayout title={blogPost?.attributes?.title}>
          <BlogPostPage blogPost={blogPost} />
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
    locales.map((locale) => client.BlogPostStaticPaths({ locale }))
  )

  const entities = pathArraysForLocales
    .flatMap(({ blogPosts }) => blogPosts?.data || [])
    .filter(isDefined)

  if (entities) {
    paths = entities
      .filter(isDefined)
      .filter((entity) => entity?.attributes?.slug)
      .map((entity) => ({
        params: {
          fullPath: `${
            entity.attributes?.locale === 'sk'
              ? '/sluzby/vzdelavanie/clanky/'
              : '/services/education/articles/'
          }${entity.attributes?.slug!}`
            .split('/')
            .slice(1),
          locale: entity.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`BlogPosts: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const slug = last(params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} blog posts ${slug} on ${params?.fullPath.join('/') ?? ''}`)

  const [{ blogPosts }, general, translations] = await Promise.all([
    client.BlogPostBySlug({ slug, locale }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
  ])
  const blogPost = blogPosts?.data[0] ?? null

  if (!blogPost) return { notFound: true }

  return {
    props: {
      slug,
      blogPost,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
