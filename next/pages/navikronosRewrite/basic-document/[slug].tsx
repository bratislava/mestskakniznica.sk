import BasicDocumentPage from '@components/pages/BasicDocumentPage'
import { BasicDocumentEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetServerSideProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type PageProps = {
  basicDocument: BasicDocumentEntityFragment
  slug: string
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ basicDocument, general, slug }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <BasicDocumentPage basicDocument={basicDocument} />
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params, locales } = ctx
  const slug = params?.slug

  if (!slug || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} basic document ${slug}}`)

  const { basicDocuments } = await client.BasicDocumentBySlug({ slug })
  const basicDocument = basicDocuments?.data[0] ?? null
  if (!basicDocument) return { notFound: true } as const

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'newsletter']),
    navikronosGetStaticProps(
      navikronosConfig,
      ctx,
      {
        type: 'basic-document',
        slug,
      },
      // TODO: Improve for unlocalized entities.
      locales
        ?.filter((innerLocale) => innerLocale !== locale)
        .map((innerLocale) => ({
          type: 'basic-document',
          slug,
          locale: innerLocale,
        }))
    ),
  ])

  return {
    props: {
      slug,
      basicDocument,
      general,
      navikronosStaticProps,
      ...translations,
    },
  }
}

export default wrapNavikronosProvider(Page)
