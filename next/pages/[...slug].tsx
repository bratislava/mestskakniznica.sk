import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'

import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import BlogPostsPage from '../components/pages/blogPostsPage'
import BookNewsPage from '../components/pages/bookNewsPage'
import DocumentsPage from '../components/pages/DocumentsPage'
import ErrorPage from '../components/pages/ErrorPage'
import EventsListingPage from '../components/pages/eventsListingPage'
import FullContentPage from '../components/pages/fullContentPage'
import ListingPage from '../components/pages/listingPage'
import LocalitiesListingPage from '../components/pages/localitiesListingPage'
import LocalityPage from '../components/pages/localityPage'
import NewsListingPage from '../components/pages/newsListingPage'
import PartnersPage from '../components/pages/partnersPage'
import Premises from '../components/pages/premises'
import SidebarContentPage from '../components/pages/sidebarContentPage'
import SublistingPage from '../components/pages/sublistingPage'
import {
  Enum_Page_Layout,
  EventCardEntityFragment,
  FooterEntity,
  MenuEntity,
  PageEntity,
  PageEntityFragment,
} from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'
import { arrayify, isPresent, shouldSkipStaticPaths } from '../utils/utils'

interface IPageProps {
  locale: string
  page: PageEntity
  upcomingEvents: EventCardEntityFragment[]
  menus: MenuEntity[]
  footer: FooterEntity
  error?: IDisplayError
}

const Page = ({ page, upcomingEvents, menus, footer, error }: IPageProps) => {
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

    case Enum_Page_Layout.News:
    case Enum_Page_Layout.FullContent:
      pageComponentByLayout = <FullContentPage page={page} />
      break

    case Enum_Page_Layout.ContentWithSidebar:
      pageComponentByLayout = <SidebarContentPage page={page} />
      break

    case Enum_Page_Layout.Partners:
      pageComponentByLayout = <PartnersPage page={page} />
      break

    case Enum_Page_Layout.BlogPosts:
      pageComponentByLayout = <BlogPostsPage page={page as PageEntityFragment} />
      break

    case Enum_Page_Layout.Documents:
      pageComponentByLayout = <DocumentsPage page={page} />
      break

    case Enum_Page_Layout.EventsListing:
      pageComponentByLayout = <EventsListingPage page={page} />
      break

    case Enum_Page_Layout.Premises:
      pageComponentByLayout = <Premises page={page} />
      break

    case Enum_Page_Layout.LocalitiesListing:
      pageComponentByLayout = <LocalitiesListingPage page={page} />
      break

    case Enum_Page_Layout.NewsListing:
      pageComponentByLayout = <NewsListingPage page={page} />
      break

    case Enum_Page_Layout.Locality:
      pageComponentByLayout = <LocalityPage page={page} />
      break

    case Enum_Page_Layout.BookNews:
      pageComponentByLayout = <BookNewsPage page={page} />
      break
  }

  return (
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
      <DefaultPageLayout
        title={page?.attributes?.title}
        Seo={page?.attributes?.Seo}
        menus={menus}
        footer={footer}
        upcomingEvents={upcomingEvents ?? []}
      >
        {pageComponentByLayout}
      </DefaultPageLayout>
    </PageWrapper>
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
    const { menus, footer, pages, upcomingEvents } = await client.PageBySlug({
      slug,
      locale,
      date: new Date().toISOString(),
    })
    const pageBySlug = pages?.data[0]

    if (!pageBySlug) return { notFound: true } as { notFound: true }

    return {
      props: {
        slug,
        page: pageBySlug || null,
        upcomingEvents: upcomingEvents?.data,
        locale,
        menus: menus?.data ?? [],
        footer: footer?.data,
        ...translations,
      },
      revalidate: 86_400,
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 86_400,
    }
  }
}

export default Page
