import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import EventPage from '@components/pages/eventPage'
import { EventEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'

type PageProps = {
  event: EventEntityFragment
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

const EventSlugPage = ({ event, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout
        title={event.attributes?.title}
        seo={event.attributes?.seo}
        defaultMetaDescription={event.attributes?.description}
      >
        <EventPage event={event} />
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales }) => {
  let paths: GetStaticPathsResult<StaticParams>['paths'] = []

  const pathArraysForLocales = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    locales!.map((locale) => client.EventStaticPaths({ locale }))
  )
  const entities = pathArraysForLocales
    .flatMap(({ events }) => events?.data || [])
    .filter(isDefined)

  if (entities.length > 0) {
    paths = entities
      .filter((entity) => entity.attributes?.slug)
      .map((entity) => ({
        params: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain,@typescript-eslint/no-non-null-assertion
          slug: entity.attributes?.slug!,
          locale: entity.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`Events: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} event ${slug} on ${slug}`)

  const { events } = await client.EventBySlug({
    slug,
    locale,
  })
  const event = events?.data[0] ?? null
  if (!event) return { notFound: true } as const

  const localizations = extractLocalizationsWithSlug('event', event)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'event',
        slug,
      },
      currentEntityLocalizations: localizations,
      breadcrumbsTitle: event.attributes?.title,
    }),
  ])

  return {
    props: {
      slug,
      event,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(EventSlugPage)
