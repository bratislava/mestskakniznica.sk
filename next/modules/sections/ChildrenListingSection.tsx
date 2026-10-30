import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next/pages'
import { useMemo } from 'react'

import { Listing } from '@/components/ui'
import {
  ComponentSectionsChildrenListing,
  Enum_Componentsectionschildrenlisting_Depth,
} from '@/services/graphql'
import {
  getLatestNewsQueryKey,
  latestNewsFetcher,
} from '@/services/graphql/fetchers/latestNews.fetcher'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { useGeneralContext } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'

type ChildrenListingSectionProps = {
  section: ComponentSectionsChildrenListing
}

const ChildrenListingSection = ({ section }: ChildrenListingSectionProps) => {
  const { i18n } = useTranslation()
  const { children, getFullPath } = useNavigation()
  const { general, upcomingEvents } = useGeneralContext()

  const { data: latestNewsData } = useQuery({
    queryKey: getLatestNewsQueryKey(i18n.language),
    queryFn: () => latestNewsFetcher(i18n.language),
    staleTime: Infinity, // The data are static and don't need to be reloaded.
  })

  const mappedEvents = useMemo(
    () =>
      upcomingEvents?.data?.map((event) => ({
        title: event.attributes?.title ?? '',
        path: getFullPath(event),
      })) ?? [],
    [getFullPath, upcomingEvents],
  )

  const mappedLatestNews = useMemo(
    () =>
      latestNewsData?.latestNotices?.data.map((notice) => ({
        title: notice.attributes?.title ?? '',
        path: getFullPath(notice),
      })) ?? [],
    [getFullPath, latestNewsData],
  )

  if (section.depth === Enum_Componentsectionschildrenlisting_Depth.Depth_1) {
    return <Listing className="mt-8 md:mt-16" listingChildren={children?.filter(isDefined) ?? []} />
  }

  if (section.depth === Enum_Componentsectionschildrenlisting_Depth.Depth_2) {
    return (
      <>
        {children?.map((child, index) => {
          const isEventsPage =
            child.slug === general?.data?.attributes?.eventsPage?.data?.attributes?.newSlug

          const isNoticesPage =
            child.slug === general?.data?.attributes?.noticesPage?.data?.attributes?.newSlug

          const listingChildren = (() => {
            if (isEventsPage) {
              return mappedEvents
            }

            if (isNoticesPage) {
              return mappedLatestNews
            }

            return child.children ?? []
          })()

          return (
            <Listing
              className="mt-8 md:mt-16"
              key={index}
              title={child.title}
              url={child.path ?? '#'}
              listingChildren={listingChildren}
              hasDivider={children.length > 1 && index !== children.length - 1}
            />
          )
        })}
      </>
    )
  }

  return null
}

export default ChildrenListingSection
