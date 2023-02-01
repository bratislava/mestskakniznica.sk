import { Enum_Page_Layout, GeneralQuery, PageEntity, PageEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { prefetchPageSections } from '@utils/prefetchPageSections'
import { isPresent } from '@utils/utils'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'
import { ReactNode } from 'react'
import { DehydratedState, Hydrate } from 'react-query'

import { navikronosGetStaticProps } from '../../../navikronos/navikronosGetStaticProps'
import { navikronosConfig } from '@utils/navikronosConfig'
import { wrapNavikronosProvider } from '../../../navikronos/wrapNavikronosProvider'
import SublistingPage from '@components/pages/sublistingPage'
import FullContentPage from '@components/pages/fullContentPage'
import PageWrapper from '@components/layouts/PageWrapper'
import ListingPage from '@components/pages/listingPage'
import SidebarContentPage from '@components/pages/sidebarContentPage'
import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import { isDefined } from '@utils/isDefined'
import { NavikronosStaticProps } from '../../../navikronos/types'

type PageProps = {
  page: PageEntityFragment
  general: GeneralQuery
  dehydratedState: DehydratedState
  navikronosStaticProps: NavikronosStaticProps
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
          <DefaultPageLayout title={page?.attributes?.title} Seo={page?.attributes?.Seo}>
            {pageComponentByLayout}
          </DefaultPageLayout>
        </PageWrapper>
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
    paths = entities
      .filter((page) => page.attributes?.slug)
      .map((page) => ({
        params: {
          id: page.id as string,
          locale: page?.attributes?.locale || '',
        },
      }))
  }

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async (ctx) => {
  console.log('here', ctx)
  const { params, locale = 'sk' } = ctx
  const id = params?.id
  if (!id) return { notFound: true } as const

  const navikronosStaticProps = await navikronosGetStaticProps(navikronosConfig, ctx, {
    type: 'page',
    id: Number(id),
  })
  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} page ${id ?? ''}`)

  const [{ pages }, general, translations] = await Promise.all([
    await client.PageById({
      id: id as string,
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
