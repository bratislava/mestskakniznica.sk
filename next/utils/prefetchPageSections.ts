import { Enum_Page_Layout, PageEntityFragment } from '@bratislava/strapi-sdk-city-library'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@utils/fetchers/blog-posts.fetcher'
import {
  eventPropertiesFetcher,
  getEventPropertiesQueryKey,
} from '@utils/fetchers/event-properties.fetcher'
import { getLatestNewsQueryKey, latestNewsFetcher } from '@utils/fetchers/latestNews.fetcher'
import { getNewBooksQueryKey, newBooksDefaultFilters } from '@utils/fetchers/new-books.fetcher'
import { newBookServerSideFetcher } from '@utils/fetchers/new-books-server-side.fetcher'
import {
  getNoticesQueryKey,
  noticesDefaultFilters,
  noticesFetcher,
} from '@utils/fetchers/notices.fetcher'
import { getPartnersQueryKey, partnersFetcher } from '@utils/fetchers/partners.fetcher'
import { dehydrate, QueryClient } from 'react-query'

import {
  documentsDefaultFilters,
  documentsFetcher,
  getDocumentsQueryKey,
} from '../backend/meili/fetchers/documentsFetcher'
import {
  eventsArchivedDefaultFilters,
  eventsDefaultSharedFilters,
  eventsFetcher,
  eventsUpcomingDefaultFilters,
  getEventsQueryKey,
} from '../backend/meili/fetchers/eventsFetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  if (sectionTypes.includes('ComponentSectionsPartners')) {
    await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  }
  if (sectionTypes.includes('ComponentSectionsNewBooksListing')) {
    await queryClient.prefetchQuery(getNewBooksQueryKey(newBooksDefaultFilters), () =>
      newBookServerSideFetcher()
    )
  }
  if (sectionTypes.includes('ComponentSectionsBlogPostsListing')) {
    await queryClient.prefetchQuery(getBlogPostsQueryKey(locale, blogPostsDefaultFilters), () =>
      blogPostsFetcher(locale, blogPostsDefaultFilters)
    )
  }
  if (sectionTypes.includes('ComponentSectionsDocumentsListing')) {
    await queryClient.prefetchQuery(getDocumentsQueryKey(documentsDefaultFilters), () =>
      documentsFetcher(documentsDefaultFilters)
    )
  }
  if (sectionTypes.includes('ComponentSectionsNewsListing')) {
    await queryClient.prefetchQuery(getNoticesQueryKey(locale, noticesDefaultFilters), () =>
      noticesFetcher(locale, noticesDefaultFilters)
    )
  }

  if (sectionTypes.includes('ComponentSectionsEventsListing')) {
    await queryClient.prefetchQuery(
      getEventsQueryKey(eventsUpcomingDefaultFilters, eventsDefaultSharedFilters),
      () => eventsFetcher(eventsUpcomingDefaultFilters, eventsDefaultSharedFilters)
    )
    await queryClient.prefetchQuery(
      getEventsQueryKey(eventsArchivedDefaultFilters, eventsDefaultSharedFilters),
      () => eventsFetcher(eventsArchivedDefaultFilters, eventsDefaultSharedFilters)
    )
    await queryClient.prefetchQuery(getEventPropertiesQueryKey(locale), () =>
      eventPropertiesFetcher(locale)
    )
  }

  if (page?.attributes?.layout === Enum_Page_Layout.Listing) {
    await queryClient.prefetchQuery(getLatestNewsQueryKey(locale), () => latestNewsFetcher(locale))
  }

  return dehydrate(queryClient)
}
