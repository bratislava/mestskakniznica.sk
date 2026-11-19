import { ParsedUrlQuery } from 'node:querystring'

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { ReactNode } from 'react'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import FullContentPage from '@/components/pages/fullContentPage'
import SidebarContentPage from '@/components/pages/sidebarContentPage'
import { Enum_Page_Layout, GeneralQuery, PageEntityFragment } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { client } from '@/services/graphql/gql'
import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import { getNavigationStaticProps } from '@/services/navigation/getNavigationStaticProps'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'
import { NOT_FOUND } from '@/utils/consts'
<<<<<<<< HEAD:next/pages/[documentId].tsx
import { extractLocalizationsWithDocumentId } from '@/utils/extractLocalizations'
========
import { extractLocalizationsWithSlug } from '@/utils/extractLocalizations'
>>>>>>>> master:next/pages/[...path].tsx
import { GeneralContextProvider } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { prefetchPageSections } from '@/utils/prefetchPageSections'

type PageProps = {
  page: PageEntityFragment
  general: GeneralQuery
  dehydratedState: DehydratedState
} & SSRConfig &
  NavigationPageProps

const Page = ({ page, general, dehydratedState }: PageProps) => {
  let pageComponentByLayout: ReactNode = null

<<<<<<<< HEAD:next/pages/[documentId].tsx
  // TODO replace PageEntity by PageEntityFragment
  switch (page?.layout) {
========
  switch (page?.attributes?.layout) {
>>>>>>>> master:next/pages/[...path].tsx
    case Enum_Page_Layout.FullContent:
      pageComponentByLayout = <FullContentPage page={page} />
      break

    case Enum_Page_Layout.ContentWithSidebar:
      pageComponentByLayout = <SidebarContentPage page={page} />
      break
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <GeneralContextProvider general={general}>
        <DefaultPageLayout
          title={page?.title}
          seo={page?.seo}
          defaultMetaDescription={page?.perex}
        >
          {pageComponentByLayout}
        </DefaultPageLayout>
      </GeneralContextProvider>
    </HydrationBoundary>
  )
}

interface StaticParams extends ParsedUrlQuery {
<<<<<<<< HEAD:next/pages/[documentId].tsx
  documentId: string
========
  path: string[]
>>>>>>>> master:next/pages/[...path].tsx
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const navigation = await fetchNavigation(navigationConfig)

  const paths = Object.entries(navigation).flatMap(([locale, localeNavigation]) =>
    Object.values(localeNavigation?.pagePathsMap ?? {})
      .filter(isDefined)
      .map(({ path }) => ({ params: { path: path.split('/').slice(1) }, locale })),
  )

<<<<<<<< HEAD:next/pages/[documentId].tsx
  const entities = pathArraysForLocales.flatMap(({ pages }) => pages ?? []).filter(isDefined)

  if (entities.length > 0) {
    paths = entities.map((page) => ({
      params: {
        documentId: page.documentId,
        locale: page.locale || '',
      },
    }))
  }

========
>>>>>>>> master:next/pages/[...path].tsx
  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} pages.`)

  return { paths, fallback: 'blocking' }
}

<<<<<<<< HEAD:next/pages/[documentId].tsx
export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { params, locale } = ctx
  const documentId = params?.documentId

  if (!documentId || !locale) {
    return NOT_FOUND
  }

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${documentId}`)

  const { page } = await client.PageByDocumentId({
    documentId,
    locale,
  })
========
export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  params,
  locale,
}) => {
  const path = params?.path
  const slug = path?.at(-1)

  if (!path || !slug || !locale) {
    return NOT_FOUND
  }

  const pathJoined = `/${path.join('/')}`

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${pathJoined}`)

  /** Ensure to be able to open the page only on its own full path. Otherwise, whatever path that ends with the slug would work. */
  const navigation = await fetchNavigation(navigationConfig)
  if (navigation[locale]?.pagePathsMap[slug]?.path !== pathJoined) {
    return NOT_FOUND
  }

  const { pages } = await client.PageBySlug({ slug, locale })
>>>>>>>> master:next/pages/[...path].tsx

  if (!page) {
    return NOT_FOUND
  }

<<<<<<<< HEAD:next/pages/[documentId].tsx
  const localizations = extractLocalizationsWithDocumentId('page', page)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
      currentEntity: {
        type: 'page',
        id: documentId,
      },
      currentEntityLocalizations: localizations,
========
  const [general, translations, navigationStaticProps, dehydratedState] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    getNavigationStaticProps({
      locale,
      currentEntity: { type: 'page', slug },
      currentEntityLocalizations: extractLocalizationsWithSlug('page', page),
>>>>>>>> master:next/pages/[...path].tsx
    }),
    prefetchPageSections(page, locale),
  ])

  return {
    props: {
      page,
      dehydratedState,
      general,
      navigationStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
