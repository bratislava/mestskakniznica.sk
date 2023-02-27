import { Listing } from '@components/ui'
import {
  ComponentSectionsChildrenListing,
  Enum_Componentsectionschildrenlisting_Depth,
} from '@services/graphql'
import {
  getLatestNewsQueryKey,
  latestNewsFetcher,
} from '@services/graphql/fetchers/latestNews.fetcher'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'

type ChildrenListingSectionProps = {
  section: ComponentSectionsChildrenListing
}

const ChildrenListingSection = ({ section }: ChildrenListingSectionProps) => {
  const { t, i18n } = useTranslation()
  const { children, getPathForEntity } = useNavikronos()
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
        path: getPathForEntity({ type: 'event', slug: event.attributes?.slug }) ?? '#',
      })) ?? [],
    [upcomingEvents]
  )

  const mappedLatestNews = useMemo(
    () =>
      latestNewsData?.latestNotices?.data.map((notice) => ({
        title: notice.attributes?.title ?? '',
        path: getPathForEntity({ type: 'notice', slug: notice.attributes?.slug }) ?? '#',
      })) ?? [],
    [latestNewsData]
  )

  if (section.depth === Enum_Componentsectionschildrenlisting_Depth.Depth_1) {
    return <Listing className="mt-8 md:mt-16" listingChildren={children} />
  }

  if (section.depth === Enum_Componentsectionschildrenlisting_Depth.Depth_2) {
    return (
      <>
        {children.map((child, index) => {
          const isEventsPage =
            isDefined(child.path) &&
            child.path ===
              getPathForEntity({
                type: 'page',
                id: general?.data?.attributes?.eventsPage?.data?.id,
              })

          const isNoticesPage =
            isDefined(child.path) &&
            child.path ===
              getPathForEntity({
                type: 'page',
                id: general?.data?.attributes?.noticesPage?.data?.id,
              })

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
              hasDivider={children.length > 1 && index != children.length - 1}
            />
          )
        })}
      </>
    )
  }

  return null
}

export default ChildrenListingSection
