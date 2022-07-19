import {
  Enum_Page_Layout,
  EventCardFragment,
  EventCategoryEntity,
  EventEntity,
  EventLocalityEntity,
  EventTagEntity, FooterEntity,
  MenuEntity, PageEntity, Pagination, PartnerEntity, PartnerFragment, PremiseEntity
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
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'
import { getOpacBooks, OpacBook } from '../utils/opac'
import { sortPartners } from '../utils/page'
import { IEvent, ILocality } from '../utils/types'
import {
  arrayify,
  convertEventToPromotedType,
  convertPagesToEvents,
  convertPagesToLocalities,
  isPresent,
  shouldSkipStaticPaths
} from '../utils/utils'


interface IPageProps {
  error?: IDisplayError
  slug: string
  page: PageEntity
  partners: PartnerEntity[]
  promotedEvents: IEvent[]
  eventDetail: EventEntity
  allEvents: EventCardFragment[]
  eventListEvents: EventCardFragment[]
  latestEvents: EventCardFragment[]
  premises: PremiseEntity[]
  opacBookNews: OpacBook[]
  localities: ILocality[]
  news: IEvent[]
  eventCategories: EventCategoryEntity[]
  eventTags: EventTagEntity[]
  eventLocalities: EventLocalityEntity[]
  allNewsLink: string
  menus: MenuEntity[]
  footer: FooterEntity
  paginationFields: Pagination
}

function Page({
  error,
  page,
  partners,
  promotedEvents,
  eventDetail,
  allEvents,
  eventListEvents,
  latestEvents,
  opacBookNews,
  premises,
  localities,
  news,
  paginationFields,
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
          events={eventListEvents}
          eventCategories={eventCategories}
          eventTags={eventTags}
          eventLocalities={eventLocalities}
          paginationFields={paginationFields}
        />
      )
      break

    case Enum_Page_Layout.Premises:
      pageComponentByLayout = <Premises page={page} premises={premises} />
      break

    case Enum_Page_Layout.LocalitiesListing:
      pageComponentByLayout = <LocalitiesListingPage page={page} localities={localities} />
      break

    case Enum_Page_Layout.NewsListing:
      pageComponentByLayout = <NewsListingPage page={page} news={news} pagination={paginationFields} />
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

  if(!pageComponentByLayout && eventDetail) {
    pageComponentByLayout = <EventPage page={page} eventDetail={eventDetail} events={allEvents} allNewsLink={allNewsLink} />
  }

  return (
    <PageWrapper
      locale={page?.attributes?.locale ?? ''}
      slug={page?.attributes?.slug ?? ''}
      localizations={page?.attributes?.localizations?.data.filter(isPresent).map(localisation => ({locale: localisation.attributes?.locale, slug: localisation.attributes?.slug}))}
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
    let allEvents: EventCardFragment[] = []
    let eventListEvents: EventCardFragment[] = []
    let news: IEvent[] = []
    let latestEvents: EventCardFragment[] = []
    let premises: PremiseEntity[] = []
    let localities: ILocality[] = []
    let eventCategories: EventCategoryEntity[] = []
    let eventTags: EventTagEntity[] = []
    let eventLocalities: EventLocalityEntity[] = []
    let opacBookNews: OpacBook[] = []
    let allNewsLink = ''
    let paginationFields: Pagination | null = null

    const queryResponse = await client.PageBySlug({
      slug,
      locale,
    })
    // menus, footer
    const pageBySlug = queryResponse?.pages?.data[0];
    let eventDetail: EventEntity | null = null
    const { menus, footer } = queryResponse;
    
    if (!pageBySlug) {
      const eventDetailResponse = await client.EventBySlug({ slug })
      if(eventDetailResponse.events?.data[0]) {
        eventDetail = eventDetailResponse.events.data[0]
      } else {
        return { notFound: true } as { notFound: true }
      }
    }

    // For all page in header
    let allEventPages: EventCardFragment[] = []
    const today = new Date();
    const futureEvents = await client.EventList({
      locale,
      start: 0,
      limit: 10,
      filters: { dateFrom: { gte: today.toISOString() } },
      sort: "dateFrom:asc"
    })
    allEventPages = futureEvents.events?.data || []
    latestEvents = futureEvents.events?.data.slice(0, 4) || []

    // all partners for about us partners page
    const partners: { allPartners: PartnerFragment[] | null } = {
      allPartners: null,
    }

    if (pageBySlug && pageBySlug?.attributes?.layout === 'partners') {
      const partnerResponse = await client.AllPartners({ locale })
      partners.allPartners = partnerResponse.partners?.data || null
    }

    if (pageBySlug?.attributes?.layout === Enum_Page_Layout.BookNews) {
      opacBookNews = (await getOpacBooks()) || []
    }

    if (pageBySlug?.attributes?.layout === Enum_Page_Layout.EventsListing) {
      const [promotedPagesResponse, eventProperties] = await Promise.all([
        client.PromotedEvents({ locale, start: 0, limit: 4 }),
        client.EventProperties({ locale }),
      ])

      const eventPages = await client.EventList({
        locale,
        start: 0,
        limit: 10,
        filters: {},
        sort: "dateFrom:desc"
      })
      
      promotedEvents = convertEventToPromotedType(promotedPagesResponse.events?.data || [])
      eventListEvents = eventPages.events?.data || []
      paginationFields = eventPages.events?.meta.pagination || null

      eventCategories = eventProperties.eventCategories?.data || []
      eventTags = eventProperties.eventTags?.data || []
      eventLocalities = eventProperties.eventLocalities?.data || []
    }    
    if (
      pageBySlug?.attributes?.layout === Enum_Page_Layout.Event ||
      pageBySlug?.attributes?.layout === Enum_Page_Layout.Locality ||
      pageBySlug?.attributes?.layout === Enum_Page_Layout.Listing
    ) {
      allEvents = allEventPages

      const { pages }: any = await client.PagesByLayout({
        layout: 'eventsListing',
        locale,
      })
      allNewsLink = pages && pages[0]?.slug ? pages[0].slug : ''
    }

    if (
      pageBySlug?.attributes?.layout === Enum_Page_Layout.NewsListing ||
      pageBySlug?.attributes?.layout === Enum_Page_Layout.Listing
    ) {
      const newsPages: any = await client.PagesByLayoutWithFieldPagination({
        layout: 'news',
        locale,
        sort: "createdAt:desc"
      })
      news = convertPagesToEvents(newsPages?.pages?.data) || []
      paginationFields = newsPages.pages?.meta?.pagination;
    }

    if (pageBySlug?.attributes?.layout === Enum_Page_Layout.Premises) {
      const premisesPages : any = await client.Premises({ locale })
      premises = premisesPages?.premises?.data
    }

    if (pageBySlug?.attributes?.layout === Enum_Page_Layout.LocalitiesListing) {
      const localitiesPages: any = await client.PagesByLayout({
        layout: 'locality',
        locale,
      })
      localities = convertPagesToLocalities(localitiesPages?.pages?.data, true) || []
    }
    
    return {
      props: {
        slug,
        page: pageBySlug || null,
        partners: partners.allPartners ?? [],
        eventDetail,
        promotedEvents,
        allEvents,
        eventListEvents,
        latestEvents,
        allNewsLink,
        opacBookNews,
        eventCategories,
        eventTags,
        eventLocalities,
        premises,
        localities,
        news,
        paginationFields,
        menus: menus?.data ?? [],
        footer: footer?.data,
        ...translations,
      },
      revalidate: 86400,
    }
  } catch (iError) {
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
