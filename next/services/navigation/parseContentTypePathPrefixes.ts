import { NavigationQuery } from '@/services/graphql'
import { ContentTypePathPrefixesMap, PagePathsMap } from '@/services/navigation/typesNavigation'

type ParentPage = { data?: { attributes?: { newSlug?: string | null } | null } | null } | null

export const parseContentTypePathPrefixes = (
  navigation: NavigationQuery['navigation'],
  pagePathsMap: PagePathsMap,
) => {
  const {
    blogPostsParentPage,
    eventsParentPage,
    noticesParentPage,
    branchesParentPage,
    assetsParentPage,
    disclosuresParentPage,
  } = navigation?.data?.attributes ?? {}

  const getPath = (parentPage: ParentPage | undefined) => {
    const slug = parentPage?.data?.attributes?.newSlug

    // Using null to make the object serializable
    return (slug && pagePathsMap[slug]?.path) || null
  }

  const contentTypePathPrefixesMap: ContentTypePathPrefixesMap = {
    'blog-post': getPath(blogPostsParentPage),
    event: getPath(eventsParentPage),
    notice: getPath(noticesParentPage),
    branch: getPath(branchesParentPage),
    asset: getPath(assetsParentPage),
    disclosure: getPath(disclosuresParentPage),
  }

  return { contentTypePathPrefixesMap }
}
