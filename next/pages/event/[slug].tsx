import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import EventPage from '@/components/pages/eventPage'
import { EventEntityFragment, GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { getNavigationStaticProps } from '@/services/navigation/getNavigationStaticProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'
import { NOT_FOUND } from '@/utils/consts'
import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'

type PageProps = {
  event: EventEntityFragment
  general: GeneralQuery
} & SSRConfig &
  NavigationPageProps

const EventSlugPage = ({ event, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout
        title={event?.title}
        seo={event?.seo}
        defaultMetaDescription={event?.description}
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
  const pathArraysForLocales = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    locales!.map((locale) => client.EventStaticPaths({ locale })),
  )
  const entities = pathArraysForLocales.flatMap(({ events }) => events || []).filter(isDefined)

  const paths: GetStaticPathsResult<StaticParams>['paths'] = entities
    .filter((entity) => entity.slug)
    .map((entity) => ({
      params: {
        slug: entity.slug,
      },
      locale: entity.locale || '',
    }))

  // eslint-disable-next-line no-console
  console.log(`Events: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { locale, params } = ctx
  const slug = params?.slug

  if (!slug || !locale) {
    return NOT_FOUND
  }

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} event ${slug} on ${slug}`)

  const { events } = await client.EventBySlug({
    slug,
    locale,
  })
  const event = events[0] ?? null
  if (!event) {
    return NOT_FOUND
  }

  const localizations = extractLocalizationsWithSlug('event', event)

  const [general, translations, navigationStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    getNavigationStaticProps({
      locale,
      currentEntity: {
        type: 'event',
        slug,
      },
      currentEntityLocalizations: localizations,
      breadcrumbsTitle: event.title,
    }),
  ])

  return {
    props: {
      slug,
      event,
      general,
      navigationStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default EventSlugPage
