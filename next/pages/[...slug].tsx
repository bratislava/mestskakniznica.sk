import { generalFetcher } from '@utils/fetchers/general.fetcher'
import { GeneralContextProvider } from '@utils/generalContext'
import { prefetchPageSections } from '@utils/prefetchPageSections'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'
import { DehydratedState, Hydrate } from 'react-query'

import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'
import FullContentPage from '../components/pages/fullContentPage'
import ListingPage from '../components/pages/listingPage'
import SidebarContentPage from '../components/pages/sidebarContentPage'
import SublistingPage from '../components/pages/sublistingPage'
import { Enum_Page_Layout, GeneralQuery, PageEntity } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'
import { arrayify, isPresent, shouldSkipStaticPaths } from '../utils/utils'

interface IPageProps {
  locale: string
  page: PageEntity
  general: GeneralQuery
  error?: IDisplayError
  dehydratedState: DehydratedState
}

const Page = ({ page, general, error, dehydratedState }: IPageProps) => {
  if (error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={error} />
      </ErrorPage>
    )
  }

  let pageComponentByLayout: ReactNode = null

  // eslint-disable-next-line default-case
  switch (page?.attributes?.layout) {
    case Enum_Page_Layout.Listing:
      pageComponentByLayout = <ListingPage page={page} />
      break

    case Enum_Page_Layout.Sublisting:
      pageComponentByLayout = <SublistingPage page={page} />
      break

    case Enum_Page_Layout.FullContent:
      pageComponentByLayout = <FullContentPage page={page} />
      break

    case Enum_Page_Layout.ContentWithSidebar:
      pageComponentByLayout = <SidebarContentPage page={page} />
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

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  let paths: Array<{ params: { slug: string[]; locale: string } }> = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.PagesStaticPaths({ locale }))
  )
  const pages = pathArraysForLocales
    .flatMap(({ pages: pagesInner }) => pagesInner?.data || [])
    .filter(isDefined)
  if (pages.length > 0) {
    paths = pages
      .filter((page) => page.attributes?.slug)
      .map((page) => ({
        params: {
          slug: page?.attributes?.slug ? page.attributes?.slug.split('/') : [],
          locale: page?.attributes?.locale || '',
        },
      }))
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IPageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  const slug = arrayify(ctx?.params?.slug).join('/')

  console.log(`Static gen: ${locale} ${slug}`)
  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
    'homepage',
  ])) as any

  try {
    const [{ pages }, general] = await Promise.all([
      await client.PageBySlug({
        slug,
        locale,
      }),
      generalFetcher(locale),
    ])
    const pageBySlug = pages?.data[0]

    if (!pageBySlug) return { notFound: true } as { notFound: true }

    const dehydratedState = await prefetchPageSections(pageBySlug, locale)

    return {
      props: {
        slug,
        page: pageBySlug || null,
        locale,
        dehydratedState,
        general,
        ...translations,
      },
      revalidate: 10,
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 10,
    }
  }
}

export default Page
