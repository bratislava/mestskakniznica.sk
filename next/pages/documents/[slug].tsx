import { FileCategoryEntity, FooterEntity, MenuEntity } from '@bratislava/strapi-sdk-city-library'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import DocumentCategoryPage from '../../components/pages/documentCategoryPage'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import { shouldSkipStaticPaths } from '../../utils/utils'

interface IDocumentPageProps {
  slug: string
  locale: string
  menus: MenuEntity[]
  footer: FooterEntity
  documentCategory: FileCategoryEntity
}

function Page({ documentCategory, locale, slug, menus, footer }: IDocumentPageProps) {
  if (!menus || !documentCategory) {
    return null
  }

  return (
    <PageWrapper locale={locale ?? 'sk'} slug={slug ?? ''}>
      <DefaultPageLayout
        title={documentCategory?.attributes?.page?.data?.attributes?.title}
        Seo={documentCategory?.attributes?.page?.data?.attributes?.Seo}
        menus={menus}
        footer={footer}
      >
        <DocumentCategoryPage locale={locale} documentCategory={documentCategory} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: { params: { slug: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const fileCategories = await client.FileCategories()
  if (fileCategories.fileCategories) {
    paths = fileCategories?.fileCategories.data.filter(isDefined).map((path) => ({
      params: {
        slug: path?.attributes?.slug || '',
      },
    }))
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IDocumentPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  if (!ctx?.params?.slug || typeof ctx.params.slug !== 'string') return { notFound: true }
  const { slug } = ctx.params

  // TODO change to single query
  const documentCategoryBySlug = await client.DocumentCategoryBySlug({ slug })
  const { menus } = await client.Menus({ locale })
  const { footer } = await client.Footer({ locale })
  const translations = (await serverSideTranslations(locale, ['common', 'newsletter'])) as any

  if (!documentCategoryBySlug.fileCategories && !menus) return { notFound: true }

  return {
    props: {
      slug,
      locale,
      menus: menus?.data,
      footer: footer?.data,
      documentCategory: documentCategoryBySlug.fileCategories?.data[0],
      ...translations,
    },
    revalidate: 86400,
  }
}

export default Page
