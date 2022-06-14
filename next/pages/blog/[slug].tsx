import { BlogPostBySlugQuery, FooterQuery, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import { GetStaticPaths, GetStaticProps } from 'next'
import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import BlogPostPage from '../../components/pages/blogPostPage'
import { client } from '../../utils/gql'
import { shouldSkipStaticPaths, isPresent } from '../../utils/utils'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface BlogPostPageProps {
  slug: string
  locale: string
  post: NonNullable<BlogPostBySlugQuery['blogPostBySlug']>
  menus: NonNullable<MenusQuery['menus']>
  footer: FooterQuery['footer']
}

const Page = ({ post, slug, locale, menus, footer }: BlogPostPageProps) => {
  const { t } = useTranslation('common')
  const postData = post.localizations?.map((data) => {
    return {
      slug: t('mutation_blog_slug') + data.slug,
      locale: data.locale,
    }
  })
  return (
    <PageWrapper locale={post.locale ?? 'sk'} slug={slug ?? ''} localizations={postData?.filter(isPresent)}>
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
    paths = blogPosts.map((blog) => ({
      params: {
        slug: blog?.slug || '',
      },
    }))
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  if (!ctx?.params?.slug || typeof ctx.params.slug !== 'string') return { notFound: true }
  const { slug } = ctx.params

  const { blogPostBySlug } = await client.BlogPostBySlug({
    slug,
    locale,
  })
  const { menus } = await client.Menus({
    locale,
  })
  const { footer } = await client.Footer({
    locale,
  })

  if (!blogPostBySlug) return { notFound: true }

  const pageTranslations = ['common', 'forms', 'newsletter']

  return {
    props: {
      slug,
      menus,
      footer,
      post: blogPostBySlug,
      ...(await serverSideTranslations(locale, pageTranslations)),
    },
    revalidate: 900, // revalidade every 5 minutes - TODO change for prod
  }
}

export default Page
