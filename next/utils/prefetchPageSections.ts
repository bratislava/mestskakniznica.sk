import { Enum_Page_Layout, PageEntityFragment } from '@services/graphql'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@services/graphql/fetchers/blog-posts.fetcher'
import {
  documentCategoriesFetcher,
  documentCategoriesQueryKey,
} from '@services/graphql/fetchers/document-categories.fetcher'
import {
  eventPropertiesFetcher,
  getEventPropertiesQueryKey,
} from '@services/graphql/fetchers/event-properties.fetcher'
import {
  getLatestNewsQueryKey,
  latestNewsFetcher,
} from '@services/graphql/fetchers/latestNews.fetcher'
import {
  getNoticesQueryKey,
  noticesDefaultFilters,
  noticesFetcher,
} from '@services/graphql/fetchers/notices.fetcher'
import { getPartnersQueryKey, partnersFetcher } from '@services/graphql/fetchers/partners.fetcher'
import {
  documentsDefaultFilters,
  documentsFetcher,
  getDocumentsQueryKey,
} from '@services/meili/fetchers/documentsFetcher'
import {
  eventsArchivedDefaultFilters,
  eventsDefaultSharedFilters,
  eventsFetcher,
  eventsUpcomingDefaultFilters,
  getEventsQueryKey,
} from '@services/meili/fetchers/eventsFetcher'
import {
  getNewBooksQueryKey,
  newBooksDefaultFilters,
} from '@services/opac/fetchers/new-books.fetcher'
import { newBookServerSideFetcher } from '@services/opac/fetchers/new-books-server-side.fetcher'
import { dehydrate, QueryClient } from 'react-query'

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
    await queryClient.prefetchQuery(documentCategoriesQueryKey, documentCategoriesFetcher)
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
