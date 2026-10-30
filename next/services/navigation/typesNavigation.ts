/**
 * Content types that have detail pages. The names are used in the rewritten routes
 * (`pages/navigationRewrite/<type>/[slug].tsx`) and match the types in the search index.
 */
export const contentTypes = ['blog-post', 'event', 'notice', 'branch', 'asset', 'disclosure'] as const

export type ContentType = (typeof contentTypes)[number]

/**
 * Pages are keyed by their `newSlug`, which is unique within a locale. Paths don't contain the locale prefix.
 */
export type PagePathsMap = {
  [slug: string]:
    | {
        title: string
        path: string
        parentSlug: string | null
        childSlugs: string[]
      }
    | undefined
}

/** Path of the parent page of each content type's detail pages, `null` when it's not set in Navigation. */
export type ContentTypePathPrefixesMap = Record<ContentType, string | null>

export type LocaleNavigation = {
  pagePathsMap: PagePathsMap
  contentTypePathPrefixesMap: ContentTypePathPrefixesMap
}

export type NavigationObject = Record<string, LocaleNavigation | undefined>

/**
 * Pages are identified by their `newSlug`, detail pages by their `slug`.
 */
export type RouteEntity =
  | { type: 'page' | ContentType; slug: string | null | undefined }
  | { type: 'search' }

export type RouteEntityWithLocale = RouteEntity & { locale: string }

export type NavigationStaticProps = {
  navigation: NavigationObject
  locale: string
  currentEntity: RouteEntity | null
  /** Used for the language switcher, the search page gets them automatically. */
  currentEntityLocalizations: RouteEntityWithLocale[] | null
  /** Title of the last breadcrumb on detail pages. */
  breadcrumbsTitle: string | null
}

export type NavigationPageProps = {
  navigationStaticProps: NavigationStaticProps
}

export type NavigationConfig = {
  cacheTtl: number
  /** Internal routes the proxy rewrites to, they can't be opened directly. */
  rewritePrefix: string
  searchPaths: Record<string, string>
}
