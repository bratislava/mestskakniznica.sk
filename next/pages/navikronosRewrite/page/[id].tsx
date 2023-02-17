import DefaultPageLayout from '@components/layouts/DefaultPageLayout'

import FullContentPage from '@components/pages/fullContentPage'
import SidebarContentPage from '@components/pages/sidebarContentPage'
import { Enum_Page_Layout, GeneralQuery, PageEntity, PageEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { prefetchPageSections } from '@utils/prefetchPageSections'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'
import { ReactNode } from 'react'
import { DehydratedState, Hydrate } from 'react-query'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'
import { SSRConfig } from 'next-i18next'
import { extractLocalizationsWithId } from '@utils/extractLocalizations'

type PageProps = {
  page: PageEntityFragment
  general: GeneralQuery
  dehydratedState: DehydratedState
} & SSRConfig &
  CLNavikronosPageProps

const Page = ({ page, general, dehydratedState }: PageProps) => {
  let pageComponentByLayout: ReactNode = null

  // TODO replace PageEntity by PageEntityFragment
  // eslint-disable-next-line default-case
  switch (page?.attributes?.layout) {
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
        <DefaultPageLayout title={page?.attributes?.title} seo={page?.attributes?.seo}>
          {pageComponentByLayout}
        </DefaultPageLayout>
      </GeneralContextProvider>
    </Hydrate>
  )
}

interface StaticParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales }) => {
  let paths: GetStaticPathsResult<StaticParams>['paths'] = []

  const pathArraysForLocales = await Promise.all(
    (locales ?? []).map((locale) => client.PagesStaticPaths({ locale }))
  )

  const entities = pathArraysForLocales.flatMap(({ pages }) => pages?.data || []).filter(isDefined)

  if (entities.length > 0) {
    paths = entities.map((page) => ({
      params: {
        id: page.id!,
        locale: page?.attributes?.locale || '',
      },
    }))
  }

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  const { params, locale } = ctx
  const id = params?.id

  if (!id || !locale) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${id}`)

  const { pages } = await client.PageById({
    id,
    locale,
  })

  const page = pages?.data[0] ?? null

  if (!page) return { notFound: true } as const

  const localizations = extractLocalizationsWithId('page', page)

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale, ['common', 'forms', 'newsletter', 'homepage']),
    navikronosGetStaticProps(
      navikronosConfig,
      ctx,
      {
        type: 'page',
        id,
      },
      localizations
    ),
  ])

  const dehydratedState = await prefetchPageSections(page, locale)

  return {
    props: {
      page,
      dehydratedState,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Page)
