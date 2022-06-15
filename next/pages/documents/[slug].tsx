import { DocumentCategoryBySlugQuery, FooterQuery, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import DocumentCategoryPage from '../../components/pages/documentCategoryPage'
import { client } from '../../utils/gql'
import { AsyncServerProps } from '../../utils/types'
import { shouldSkipStaticPaths } from '../../utils/utils'

interface DocumentPageProps {
  slug: string
  locale: string
  menus: NonNullable<MenusQuery['menus']>
  footer: FooterQuery['footer']
  documentCategory: NonNullable<DocumentCategoryBySlugQuery['documentCategoryBySlug']>
}

function Page({ documentCategory, locale, slug, menus, footer }: DocumentPageProps) {
  return (
    <PageWrapper locale={locale ?? 'sk'} slug={slug ?? ''}>
      <DefaultPageLayout
        title={documentCategory?.page?.title}
        Seo={documentCategory?.page?.Seo}
        menus={menus}
        footer={footer}
      >
        <DocumentCategoryPage locale={locale} documentCategory={documentCategory} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let paths: any = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }
  const { fileCategories } = await client.FileCategories()
  if (fileCategories) {
    paths = fileCategories.map((path) => ({
      params: {
        slug: path?.slug || '',
      },
    }))
  }

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  if (!ctx?.params?.slug || typeof ctx.params.slug !== 'string') return { notFound: true }
  const { slug } = ctx.params

  // TODO change to single query
  const { documentCategoryBySlug } = await client.DocumentCategoryBySlug({
    slug,
  })
  const { menus } = await client.Menus({
    locale,
  })
  const { footer } = await client.Footer({
    locale,
  })

  if (!documentCategoryBySlug) return { notFound: true }

  return {
    props: {
      slug,
      locale,
      menus,
      footer,
      documentCategory: documentCategoryBySlug,
      ...(await serverSideTranslations(locale, ['common', 'newsletter'])),
    },
    revalidate: 900,
  }
}

export default Page
