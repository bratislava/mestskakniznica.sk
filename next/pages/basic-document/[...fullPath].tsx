import BasicDocumentPage from '@components/pages/BasicDocumentPage'
import { BasicDocumentEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import last from 'lodash/last'
import { GetServerSideProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import PageWrapper from '../../components/layouts/PageWrapper'

type PageProps = {
  basicDocument: BasicDocumentEntityFragment
  slug: string
  general: GeneralQuery
} & SSRConfig

const Page = ({ basicDocument, general, slug }: PageProps) => {
  const { i18n } = useTranslation('common')

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper locale={i18n.language} slug={slug}>
        <BasicDocumentPage basicDocument={basicDocument} />
      </PageWrapper>
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getServerSideProps: GetServerSideProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const slug = last(params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(
    `Revalidating ${locale} basic document ${slug} on ${params?.fullPath.join('/') ?? ''}`
  )

  const [{ basicDocuments }, general, translations] = await Promise.all([
    await client.BasicDocumentBySlug({ slug }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'newsletter']),
  ])

  const basicDocument = basicDocuments?.data[0] ?? null

  if (!basicDocument) return { notFound: true } as const

  return {
    props: {
      slug,
      basicDocument,
      general,
      ...translations,
    },
  }
}

export default Page
