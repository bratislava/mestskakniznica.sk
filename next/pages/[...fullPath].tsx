import { Enum_Page_Layout, GeneralQuery, PageEntity, PageEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { prefetchPageSections } from '@utils/prefetchPageSections'
import { isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'
import { ReactNode } from 'react'
import { DehydratedState, Hydrate } from 'react-query'

import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import FullContentPage from '../components/pages/fullContentPage'
import ListingPage from '../components/pages/listingPage'
import SidebarContentPage from '../components/pages/sidebarContentPage'
import SublistingPage from '../components/pages/sublistingPage'

type PageProps = {
  page: PageEntityFragment
  general: GeneralQuery
  dehydratedState: DehydratedState
}

const Page = ({ page, general, dehydratedState }: PageProps) => {
  let pageComponentByLayout: ReactNode = null

  // TODO replace PageEntity by PageEntityFragment
  // eslint-disable-next-line default-case
  switch (page?.attributes?.layout) {
    case Enum_Page_Layout.Listing:
      pageComponentByLayout = <ListingPage page={page as PageEntity} />
      break

    case Enum_Page_Layout.Sublisting:
      pageComponentByLayout = <SublistingPage page={page as PageEntity} />
      break

    case Enum_Page_Layout.FullContent:
      pageComponentByLayout = <FullContentPage page={page as PageEntity} />
      break

    case Enum_Page_Layout.ContentWithSidebar:
      pageComponentByLayout = <SidebarContentPage page={page as PageEntity} />
      break
  }

  return (
    <Hydrate state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <PageWrapper
          locale={page?.attributes?.locale ?? ''}
          slug={page?.attributes?.slug ?? ''}
          localizations={page?.attributes?.localizations?.data
            .filter(isPresent)
            .map((localization) => ({
              locale: localization.attributes?.locale,
              slug: localization.attributes?.slug,
            }))}
        >
          <DefaultPageLayout title={page?.attributes?.title} seo={page?.attributes?.seo}>
            {pageComponentByLayout}
          </DefaultPageLayout>
        </PageWrapper>
      </GeneralContextProvider>
    </Hydrate>
  )
}

// TODO use common functions to prevent duplicate code
interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales = ['sk', 'en'] }) => {
  let paths: GetStaticPathsResult<StaticParams>['paths'] = []

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.PagesStaticPaths({ locale }))
  )

  const entities = pathArraysForLocales.flatMap(({ pages }) => pages?.data || []).filter(isDefined)

  if (entities.length > 0) {
    paths = entities
      .filter((page) => page.attributes?.slug)
      .map((page) => ({
        params: {
          fullPath: page.attributes?.slug?.split('/') ?? [],
          locale: page?.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const fullPathJoined = params?.fullPath.join('/')
  if (!fullPathJoined) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${fullPathJoined ?? ''}`)

  const [{ pages }, general, translations] = await Promise.all([
    await client.PageBySlug({
      slug: fullPathJoined,
      locale,
    }),
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter', 'homepage']),
  ])
  const page = pages?.data[0] ?? null

  if (!page) return { notFound: true } as { notFound: true }

  const dehydratedState = await prefetchPageSections(page, locale)

  return {
    props: {
      slug: fullPathJoined,
      page,
      dehydratedState,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
