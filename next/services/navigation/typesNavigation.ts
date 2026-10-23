import { ContentTypePathPrefixesMap } from '@/services/navigation/parseContentTypePathPrefixes'
import { PagePathsMap } from '@/services/navigation/parseTopLevelPages'

export type NavigationObject = {
  contentTypePathPrefixesMap: ContentTypePathPrefixesMap
  pagePathsMap: PagePathsMap
}

export type NavigationConfig = {
  cacheTtl: number
  host: string
}
