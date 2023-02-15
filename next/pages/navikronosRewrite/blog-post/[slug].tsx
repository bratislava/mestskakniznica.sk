import { BlogPostEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import PageWrapper from '@components/layouts/PageWrapper'
import BlogPostPage from '@components/pages/blogPostPage'
import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type PageProps = {
  slug: string
  blogPost: BlogPostEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ blogPost, slug, general }: PageProps) => {
  const { i18n } = useTranslation('common')

  if (!blogPost) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        slug={slug ?? ''}
        localizations={blogPost.attributes?.localizations?.data
          .filter(isDefined)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            slug: localization.attributes?.slug,
          }))}
      >
        <DefaultPageLayout title={blogPost.attributes?.title} seo={blogPost.attributes?.seo}>
          <BlogPostPage blogPost={blogPost} />
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
          slug: entity.attributes!.slug!,
          locale: entity.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`BlogPosts: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} blog posts ${slug}`)

  const [{ blogPosts }, general, translations, navikronosStaticProps] = await Promise.all([
    client.BlogPostBySlug({ slug, locale }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
    navikronosGetStaticProps(navikronosConfig, ctx, {
      type: 'blog-post',
      slug,
    }),
  ])
  const blogPost = blogPosts?.data[0] ?? null

  if (!blogPost) return { notFound: true }

  return {
    props: {
      slug,
      blogPost,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Page)
