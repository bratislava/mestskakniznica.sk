import DocumentPage from '@components/pages/DocumentPage'
import { DisclosureEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { GetServerSideProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type PageProps = {
  disclosure: DisclosureEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ disclosure, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DocumentPage entity={disclosure} />
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
  console.log(`Revalidating ${locale} disclosure ${slug}`)

  const { disclosures } = await client.DisclosureBySlug({ slug })
  const disclosure = disclosures?.data[0] ?? null
  if (!disclosure) return { notFound: true } as const

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'newsletter']),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'disclosure',
        slug,
      },
      // TODO: Improve for unlocalized entities.
      currentEntityLocalizations: locales
        ?.filter((innerLocale) => innerLocale !== locale)
        .map((innerLocale) => ({
          type: 'disclosure',
          slug,
          locale: innerLocale,
        })),
      breadcrumbsTitle: disclosure.attributes?.title,
    }),
  ])

  return {
    props: {
      slug,
      disclosure,
      general,
      navikronosStaticProps,
      ...translations,
    },
  }
}

export default wrapNavikronosProvider(Page)
