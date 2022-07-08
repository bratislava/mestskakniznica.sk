import {
  Enum_Page_Layout,
  EventCategoryEntity,
  EventLocalityEntity,
  EventTagEntity, FooterEntity,
  MenuEntity, PageEntity, PartnerFragment
} from '@bratislava/strapi-sdk-city-library'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import BlogPostsPage from '../components/pages/blogPostsPage'
import BookNewsPage from '../components/pages/bookNewsPage'
import DocumentsPage from '../components/pages/DocumentsPage'
import ErrorPage from '../components/pages/ErrorPage'
import EventPage from '../components/pages/eventPage'
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
import { buildUrl, client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'
import { getOpacBooks, OpacBook } from '../utils/opac'
import { sortPartners } from '../utils/page'
import { IEvent, ILocality, IPremises } from '../utils/types'
import {
  arrayify,
  convertPagesEventsToEvents,
  convertPagesToEvents,
  convertPagesToLocalities,
  isPresent,
  shouldSkipStaticPaths
} from '../utils/utils'


interface IPageProps {
  error?: IDisplayError
  slug: string
  page: PageEntity
  partners: PartnerFragment[]
  promotedEvents: IEvent[]
  allEvents: IEvent[]
  latestEvents: IEvent[]
  premises: IPremises[]
  opacBookNews: OpacBook[]
  localities: ILocality[]
  news: IEvent[]
  eventCategories: EventCategoryEntity[]
  eventTags: EventTagEntity[]
  eventLocalities: EventLocalityEntity[]
  allNewsLink: string
  menus: MenuEntity[]
  footer: FooterEntity
}

function Page({
  error,
  page,
  partners,
  promotedEvents,
  allEvents,
  latestEvents,
  opacBookNews,
  premises,
  localities,
  news,
  eventCategories,
  eventTags,
  eventLocalities,
  allNewsLink,
  menus,
  footer,
}: IPageProps) {
  if (error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={error} />
      </ErrorPage>
    )
  }

  const sortedPartners = sortPartners(partners)

  let pageComponentByLayout = null

  switch (page?.attributes?.layout) {
    case Enum_Page_Layout.Listing:
      pageComponentByLayout = <ListingPage allEvents={allEvents} page={page} news={news} />
      break

    case Enum_Page_Layout.Sublisting:
      pageComponentByLayout = <SublistingPage page={page} />
      break

    case Enum_Page_Layout.Announcement:
      break

    case Enum_Page_Layout.News:
    case Enum_Page_Layout.FullContent:
      pageComponentByLayout = <FullContentPage page={page} />
      break

    case Enum_Page_Layout.ContentWithSidebar:
      pageComponentByLayout = <SidebarContentPage page={page} />
      break

    case Enum_Page_Layout.Partners:
      pageComponentByLayout = <PartnersPage page={page} partners={sortedPartners} />
      break

    case Enum_Page_Layout.BlogPosts:
      pageComponentByLayout = <BlogPostsPage page={page} />
      break

    case Enum_Page_Layout.Documents:
      pageComponentByLayout = <DocumentsPage page={page} />
      break

    case Enum_Page_Layout.EventsListing:
      pageComponentByLayout = (
        <EventsListingPage
          page={page}
          promotedEvents={promotedEvents}
          events={allEvents}
          eventCategories={eventCategories}
          eventTags={eventTags}
          eventLocalities={eventLocalities}
        />
      )
      break

    case Enum_Page_Layout.Event:
      pageComponentByLayout = <EventPage page={page} events={allEvents} allNewsLink={allNewsLink} />
      break

    case Enum_Page_Layout.Premises:
      pageComponentByLayout = <Premises page={page} premises={premises} />
      break

    case Enum_Page_Layout.LocalitiesListing:
      pageComponentByLayout = <LocalitiesListingPage page={page} localities={localities} />
      break

    case Enum_Page_Layout.NewsListing:
      pageComponentByLayout = <NewsListingPage page={page} news={news} />
      break

    case Enum_Page_Layout.Locality:
      pageComponentByLayout = (
        <LocalityPage page={page} events={allEvents} eventsListingUrl={allNewsLink} />
      )
      break

    case Enum_Page_Layout.BookNews:
      pageComponentByLayout = <BookNewsPage books={opacBookNews} page={page} />
      break
  }

  return (
    <PageWrapper
      locale={page.attributes?.locale ?? 'sk'}
      slug={page.attributes?.slug ?? ''}
      localizations={page.attributes?.localizations?.data.filter(isPresent).map(ele => ({locale: ele.attributes?.locale, slug: ele.attributes?.slug}))}
    >
      <DefaultPageLayout
        title={page?.attributes?.title}
        Seo={page?.attributes?.Seo}
        menus={menus}
        footer={footer}
        latestEvents={latestEvents}
      >
        {pageComponentByLayout}
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  let paths: any = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.PagesStaticPaths({ locale }))
  )
  const pages = pathArraysForLocales.flatMap(({ pages }) => pages?.data || []).filter(isDefined)
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
    let promotedEvents: IEvent[] = []
    let allEvents: IEvent[] = []
    let news: IEvent[] = []
    let latestEvents: IEvent[] = []
    let premises: IPremises[] = []
    let localities: ILocality[] = []
    let eventCategories: EventCategoryEntity[] = []
    let eventTags: EventTagEntity[] = []
    let eventLocalities: EventLocalityEntity[] = []
    let opacBookNews: OpacBook[] = []
    let allNewsLink = ''

    const queryResponse = await client.PageBySlug({
      slug,
      locale,
    })
    // menus, footer
    const pageBySlug = queryResponse.pages?.data[0].attributes;
    const { menus, footer } = queryResponse;
    if (!pageBySlug) return { notFound: true } as { notFound: true }

    // all partners for about us partners page
    const partners: { allPartners: PartnerFragment[] | null } = {
      allPartners: null,
    }

    if (pageBySlug && pageBySlug.layout === 'partners') {
      const partnerResponse = await client.AllPartners({ locale })
      partners.allPartners = partnerResponse.partners?.data || null
    }

    if (pageBySlug?.layout === Enum_Page_Layout.BookNews) {
      opacBookNews = (await getOpacBooks()) || []
    }

    // TODO temp fix, collect all events when amountLimit is 250
    let allEventPages: any = []
    for (let i = 0; i <= 15; i++) {
      const eventPages = await client.PagesByLayout({
        layout: 'event',
        locale,
        start: i * 250,
        limit: 250,
      })
      const length = eventPages.pages?.data.length
      if (!length || length === 0) break
      allEventPages = allEventPages.concat(eventPages?.pages?.data)
    }

    interface eventProps {
      dateTo?: string | Date
      dateFrom?: string | Date
      date_added?: string | Date
    }

    latestEvents = convertPagesToEvents(allEventPages?.filter(isDefined) ?? [])
      .filter((event: eventProps) => event.dateTo && new Date(event.dateTo) >= new Date())
      .sort((a: eventProps, b: eventProps) => {
        if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) < new Date(b.dateFrom)) return 1
        if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) > new Date(b.dateFrom)) return -1
        return 0
      })
      .slice(0, 4)

    if (pageBySlug.layout === Enum_Page_Layout.EventsListing) {
      const [promotedPagesResponse, eventProperties]: any = await Promise.all([
        client.PromotedEvents({ locale }),
        client.EventProperties({ locale }),
      ])

      // TODO temp fix, collect all events when amountLimit is 250
      let eventListingPages: any = []
      for (let i = 0; i <= 15; i++) {
        const eventPages = await client.ListEvents({
          locale,
          start: i * 250,
          limit: 250,
        })
        const length = eventPages.pages?.data.length
        if (!length || length === 0) break
        eventListingPages = eventListingPages.concat(eventPages?.pages?.data)
      }

      promotedEvents = convertPagesEventsToEvents(promotedPagesResponse.pages.slice(0, 3)) || []
      convertPagesEventsToEvents(eventListingPages?.filter(isDefined) ?? [])
        .sort((a: eventProps, b: eventProps) => {
          if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) < new Date(b.dateFrom)) return 1
          if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) > new Date(b.dateFrom)) return -1
          return 0
        })
        .forEach((event) => {
          allEvents.push(event)
        })

      eventCategories = eventProperties.eventCategories || []
      eventTags = eventProperties.eventTags || []
      eventLocalities = eventProperties.eventLocalities || []
    }

    if (
      pageBySlug.layout === Enum_Page_Layout.Event ||
      pageBySlug.layout === Enum_Page_Layout.Locality ||
      pageBySlug.layout === Enum_Page_Layout.Listing
    ) {
      allEvents = convertPagesToEvents(allEventPages?.filter(isDefined) ?? [])
        .filter((event: eventProps) => event.dateTo && new Date(event.dateTo) >= new Date())
        .sort((a: eventProps, b: eventProps) => {
          if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) < new Date(b.dateFrom)) return 1
          if (a.dateFrom && b.dateFrom && new Date(a.dateFrom) > new Date(b.dateFrom)) return -1
          return 0
        })
        .slice(0, 4)

      const { pages }: any = await client.PagesByLayout({
        layout: 'eventsListing',
        locale,
      })
      allNewsLink = pages ? pages[0]?.slug ?? '' : ''
    }

    if (
      pageBySlug.layout === Enum_Page_Layout.NewsListing ||
      pageBySlug.layout === Enum_Page_Layout.Listing
    ) {
      const newsPages: any = await client.PagesByLayout({
        layout: 'news',
        locale,
      })
      news =
        convertPagesToEvents(newsPages?.pages?.data).sort((a: eventProps, b: eventProps) => {
          const a_date = a.date_added ?? a.dateFrom
          const b_date = b.date_added ?? b.dateFrom
          if (a_date && b_date && new Date(a_date) < new Date(b_date)) return 1
          if (a_date && b_date && new Date(a_date) > new Date(b_date)) return -1
          return 0
        }) || []
    }

    if (pageBySlug.layout === Enum_Page_Layout.Premises) {
      const premisesPages: any = await client.Premises({ locale })
      premises = premisesPages.premises || []
    }

    if (pageBySlug.layout === Enum_Page_Layout.LocalitiesListing) {
      const localitiesPages: any = await client.PagesByLayout({
        layout: 'locality',
        locale,
      })
      localities = convertPagesToLocalities(localitiesPages?.pages?.data, true) || []
    }
    return {
      props: {
        slug,
        page: pageBySlug,
        partners: partners.allPartners ?? [],
        promotedEvents,
        allEvents,
        latestEvents,
        allNewsLink,
        opacBookNews,
        eventCategories,
        eventTags,
        eventLocalities,
        premises,
        localities,
        news,
        menus: menus?.data ?? [],
        footer: footer?.data,
        ...translations,
      },
      revalidate: 86400,
    }
  } catch (iError) {
    console.log(buildUrl('/graphql'))
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 86400,
    }
  }
}

export default Page
