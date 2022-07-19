import { BlogPostEntity, FooterEntity, MenuEntity } from '@bratislava/strapi-sdk-city-library'
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
  post: BlogPostEntity
  menus: MenuEntity[]
  footer: FooterEntity
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
      slug: t('mutation_blog_slug') + post?.attributes?.slug,
      locale: 'sk',
    },
  ]

  return (
    // TODO revert this back when blog posts are localized
    // <PageWrapper locale={post.locale ?? 'sk'} slug={slug ?? ''} localizations={postData?.filter(isPresent)}>
    <PageWrapper locale={'sk'} slug={slug ?? ''} localizations={postData?.filter(isPresent)}>
      <DefaultPageLayout title={post?.attributes?.title} menus={menus} footer={footer}>
        <BlogPostPage blogPost={post} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { slug: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const { blogPosts } = await client.BlogPostStaticPaths()

  if (blogPosts) {
    paths = blogPosts.data
      .filter(isDefined)
      .filter((blog) => blog?.attributes?.slug)
      .map((blog) => ({
        params: {
          slug: blog?.attributes?.slug || '',
        },
      }))
  }
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IBlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  if (!ctx?.params?.slug || typeof ctx.params.slug !== 'string') return { notFound: true }
  const { slug } = ctx.params

  const { blogPosts, menus, footer } = await client.BlogPostBySlug({ slug, locale })
  const blogPostBySlug = blogPosts?.data[0];
  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

  if (!blogPostBySlug && !menus) return { notFound: true }

  return {
    props: {
      slug,
      menus: menus?.data ?? [],
      footer: footer?.data,
      post: blogPostBySlug,
      ...translations,
    },
    revalidate: 86400,
  }
}

export default Page
