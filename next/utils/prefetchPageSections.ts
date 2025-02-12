import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/services/graphql'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@/services/graphql/fetchers/blog-posts.fetcher'
import {
  documentCategoriesFetcher,
  documentCategoriesQueryKey,
} from '@/services/graphql/fetchers/document-categories.fetcher'
import {
  eventPropertiesFetcher,
  getEventPropertiesQueryKey,
} from '@/services/graphql/fetchers/event-properties.fetcher'
import {
  getLatestNewsQueryKey,
  latestNewsFetcher,
} from '@/services/graphql/fetchers/latestNews.fetcher'
import {
  getNoticesQueryKey,
  noticesDefaultFilters,
  noticesFetcher,
} from '@/services/graphql/fetchers/notices.fetcher'
import { getPartnersQueryKey, partnersFetcher } from '@/services/graphql/fetchers/partners.fetcher'
import {
  documentsDefaultFilters,
  documentsFetcher,
  getDocumentsQueryKey,
} from '@/services/meili/fetchers/documentsFetcher'
import {
  eventsArchivedDefaultFilters,
  eventsFetcher,
  eventsUpcomingDefaultFilters,
  getEventsDefaultSharedFilters,
  getEventsQueryKey,
} from '@/services/meili/fetchers/eventsFetcher'
import {
  getNewBooksQueryKey,
  newBooksDefaultFilters,
} from '@/services/opac/fetchers/new-books.fetcher'
import { newBookServerSideFetcher } from '@/services/opac/fetchers/new-books-server-side.fetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  if (sectionTypes.includes('ComponentSectionsPartners')) {
    await queryClient.prefetchQuery({
      queryKey: getPartnersQueryKey(locale),
      queryFn: () => partnersFetcher(locale),
    })
  }
  if (sectionTypes.includes('ComponentSectionsNewBooksListing')) {
    await queryClient.prefetchQuery({
      queryKey: getNewBooksQueryKey(newBooksDefaultFilters),
      queryFn: () => newBookServerSideFetcher(),
    })
  }
  if (sectionTypes.includes('ComponentSectionsBlogPostsListing')) {
    await queryClient.prefetchQuery({
      queryKey: getBlogPostsQueryKey(locale, blogPostsDefaultFilters),
      queryFn: () => blogPostsFetcher(locale, blogPostsDefaultFilters),
    })
  }
  if (sectionTypes.includes('ComponentSectionsDocumentsListing')) {
    await queryClient.prefetchQuery({
      queryKey: getDocumentsQueryKey(documentsDefaultFilters),
      queryFn: () => documentsFetcher(documentsDefaultFilters),
    })
    await queryClient.prefetchQuery({
      queryKey: documentCategoriesQueryKey,
      queryFn: () => documentCategoriesFetcher(),
    })
  }
  if (sectionTypes.includes('ComponentSectionsNewsListing')) {
    await queryClient.prefetchQuery({
      queryKey: getNoticesQueryKey(locale, noticesDefaultFilters),
      queryFn: () => noticesFetcher(locale, noticesDefaultFilters),
    })
  }

  if (sectionTypes.includes('ComponentSectionsEventsListing')) {
    await queryClient.prefetchQuery({
      queryKey: getEventsQueryKey(
        eventsUpcomingDefaultFilters,
        getEventsDefaultSharedFilters(locale),
      ),
      queryFn: () =>
        eventsFetcher(eventsUpcomingDefaultFilters, getEventsDefaultSharedFilters(locale)),
    })
    await queryClient.prefetchQuery({
      queryKey: getEventsQueryKey(
        eventsArchivedDefaultFilters,
        getEventsDefaultSharedFilters(locale),
      ),
      queryFn: () =>
        eventsFetcher(eventsArchivedDefaultFilters, getEventsDefaultSharedFilters(locale)),
    })
    await queryClient.prefetchQuery({
      queryKey: getEventPropertiesQueryKey(locale),
      queryFn: () => eventPropertiesFetcher(locale),
    })
  }

  if (sectionTypes.includes('ComponentSectionsChildrenListing')) {
    await queryClient.prefetchQuery({
      queryKey: getLatestNewsQueryKey(locale),
      queryFn: () => latestNewsFetcher(locale),
    })
  }

  return dehydrate(queryClient)
}
