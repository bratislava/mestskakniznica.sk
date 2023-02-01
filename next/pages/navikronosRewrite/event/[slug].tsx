import { EventEntityFragment, GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { isPresent } from '@utils/utils'
import last from 'lodash/last'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import PageWrapper from '@components/layouts/PageWrapper'
import EventPage from '@components/pages/eventPage'

type PageProps = {
  event: EventEntityFragment
  general: GeneralQuery
} & SSRConfig

const EventSlugPage = ({ event, general }: PageProps) => {
  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={event.attributes?.locale ?? ''}
        slug={event.attributes?.slug ?? ''}
        localizations={event.attributes?.localizations?.data
          .filter(isPresent)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            slug: localization.attributes?.slug,
          }))}
      >
        <DefaultPageLayout title={event.attributes?.title} Seo={event.attributes?.Seo}>
          <EventPage event={event} />
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales }) => {
  let paths: GetStaticPathsResult<StaticParams>['paths'] = []

  const pathArraysForLocales = await Promise.all(
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
          slug: entity.attributes?.slug!,
          locale: entity.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`Events: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const slug = params?.slug

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} event ${slug} on ${slug}`)

  const [{ events }, general, translations] = await Promise.all([
    client.EventBySlug({
      slug,
      locale,
    }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter']),
  ])

  const event = events?.data[0] ?? null

  if (!event) return { notFound: true } as const

  return {
    props: {
      slug,
      event,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

export default EventSlugPage
