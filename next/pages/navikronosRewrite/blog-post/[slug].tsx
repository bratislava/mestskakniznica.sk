import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import BlogPostPage from '@/components/pages/blogPostPage'
import { navikronosGetStaticProps } from '@/navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '@/navikronos/wrapNavikronosProvider'
import { BlogPostEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

type PageProps = {
  blogPost: BlogPostEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ blogPost, general }: PageProps) => {
  if (!blogPost) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout title={blogPost.attributes?.title} seo={blogPost.attributes?.seo}>
        <BlogPostPage blogPost={blogPost} />
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          slug: entity.attributes!.slug,
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

  const { blogPosts } = await client.BlogPostBySlug({ slug, locale })
  const blogPost = blogPosts?.data[0] ?? null
  if (!blogPost) return { notFound: true }

  const localizations = extractLocalizationsWithSlug('blog-post', blogPost)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms']),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'blog-post',
        slug,
      },
      currentEntityLocalizations: localizations,
      breadcrumbsTitle: blogPost.attributes?.title,
    }),
  ])

  return {
    props: {
      blogPost,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Page)
