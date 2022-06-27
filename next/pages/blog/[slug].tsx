import { BlogPostBySlugQuery, FooterQuery, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import { isPresent, shouldSkipStaticPaths } from '../../utils/utils'

interface IBlogPostPageProps {
  slug: string
  post: BlogPostBySlugQuery['blogPostBySlug']
  menus: MenusQuery['menus']
  footer: FooterQuery['footer']
}

function Page({ post, slug, menus, footer }: IBlogPostPageProps) {
  const { t } = useTranslation('common')

  if (!menus || !post) {
    return null
  }

  // TEMP fix for not localized blog posts

  // const postData = post.localizations?.map((data) => ({
  //   slug: t('mutation_blog_slug') + data?.slug,
  //   locale: data?.locale,
  // }))

  const postData = [
    {
      slug: t('mutation_blog_slug') + post?.slug,
      locale: 'sk',
    },
  ]

  return (
    // <PageWrapper locale={post.locale ?? 'sk'} slug={slug ?? ''} localizations={postData?.filter(isPresent)}>
    <PageWrapper locale={'sk'} slug={slug ?? ''} localizations={postData?.filter(isPresent)}>
      <DefaultPageLayout title={post.title} menus={menus} footer={footer}>
        <BlogPostPage blogPost={post} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: any = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const { blogPosts } = await client.BlogPostStaticPaths()

  if (blogPosts) {
    paths = blogPosts
      .filter(isDefined)
      .filter((blog) => blog.slug)
      .map((blog) => ({
        params: {
          slug: blog?.slug || '',
        },
      }))
  }
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IBlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  if (!ctx?.params?.slug || typeof ctx.params.slug !== 'string') return { notFound: true }
  const { slug } = ctx.params

  const { blogPostBySlug } = await client.BlogPostBySlug({ slug })
  const { menus } = await client.Menus({ locale })
  const { footer } = await client.Footer({ locale })
  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

  if (!blogPostBySlug && !menus) return { notFound: true }

  return {
    props: {
      slug,
      menus: menus,
      footer,
      post: blogPostBySlug,
      ...translations,
    },
    revalidate: 900, // revalidade every 5 minutes - TODO change for prod
  }
}

export default Page
