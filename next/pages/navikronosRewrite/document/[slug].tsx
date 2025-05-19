import { ParsedUrlQuery } from 'node:querystring'

import { GetServerSideProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DocumentPage from '@/components/pages/DocumentPage'
import { navikronosGetStaticProps } from '@/navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '@/navikronos/wrapNavikronosProvider'
import { DocumentEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { NOT_FOUND } from '@/utils/consts'
import { GeneralContextProvider } from '@/utils/generalContext'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

type PageProps = {
  document: DocumentEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ document, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DocumentPage entity={document} />
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params, locales } = ctx
  const slug = params?.slug

  if (!slug || !locale) {
    return NOT_FOUND
  }

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} document ${slug}`)

  const { documents } = await client.DocumentBySlug({ slug })
  const document = documents?.data[0] ?? null
  if (!document) {
    return NOT_FOUND
  }

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'document',
        slug,
      },
      // TODO: Improve for unlocalized entities.
      currentEntityLocalizations: locales
        ?.filter((innerLocale) => innerLocale !== locale)
        .map((innerLocale) => ({
          type: 'document' as const,
          slug,
          locale: innerLocale,
        })),
      breadcrumbsTitle: document.attributes?.title,
    }),
  ])

  return {
    props: {
      slug,
      document,
      general,
      navikronosStaticProps,
      ...translations,
    },
  }
}

export default wrapNavikronosProvider(Page)
