import { BlogPostEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { shouldSkipStaticPaths } from '@utils/utils'
import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'

interface IBlogPostPageProps {
  slug: string
  blogPost: BlogPostEntityFragment
  general: GeneralQuery
}

const Page = ({ blogPost, slug, general }: IBlogPostPageProps) => {
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

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  let paths: { params: { fullPath: string[]; locale: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BlogPostStaticPaths({ locale }))
  )

  const blogPosts = pathArraysForLocales
    .flatMap(({ blogPosts: blogPostsInner }) => blogPostsInner?.data || [])
    .filter(isDefined)

  if (blogPosts) {
    paths = blogPosts
      .filter(isDefined)
      .filter((blog) => blog?.attributes?.slug)
      .map((blog) => ({
        params: {
          fullPath: `${
            blog.attributes?.locale === 'sk'
              ? '/sluzby/vzdelavanie/clanky/'
              : '/services/education/articles/'
          }${blog.attributes?.slug!}`
            .split('/')
            .slice(1),
          locale: blog.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} BLOG POSTS`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IBlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  const slug = last(ctx?.params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} blog post ${slug} on ${ctx?.params?.fullPath}`)

  const [{ blogPosts }, general] = await Promise.all([
    client.BlogPostBySlug({ slug, locale }),
    generalFetcher(locale),
  ])
  const blogPost = blogPosts?.data[0] ?? null
  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

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
