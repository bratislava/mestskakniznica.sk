import BasicDocumentPage from '@components/pages/BasicDocumentPage'
import { BasicDocumentEntity, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { arrayify } from '@utils/utils'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../../components/layouts/PageWrapper'

interface IFilePageProps {
  basicDocument: BasicDocumentEntity
  locale: string
  slug: string
  general: GeneralQuery
}

const Page = ({ basicDocument, locale, general, slug }: IFilePageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <PageWrapper locale={locale ?? 'sk'} slug={slug}>
        <BasicDocumentPage file={basicDocument} />
      </PageWrapper>
    </GeneralContextProvider>
  )
}

export const getServerSideProps: GetServerSideProps<IFilePageProps> = async ({
  locale = 'sk',
  query,
}) => {
  const slug = arrayify(query.slug)[0]

  if (!slug) return { notFound: true }

  const [{ basicDocuments }, translations, general] = await Promise.all([
    await client.BasicDocumentBySlug({ slug }),
    serverSideTranslations(locale, ['common', 'newsletter']),
    generalFetcher(locale),
  ])

  if (!basicDocuments?.data[0]) return { notFound: true }

  return {
    props: {
      slug,
      locale,
      basicDocument: basicDocuments?.data[0],
      general,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(translations as any),
    },
  }
}

export default Page
