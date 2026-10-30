import { PagePathsMap } from '@/services/navigation/typesNavigation'

// Inspired by Marianum - parsed navMap from Navigation Strapi Plugin
// https://github.com/bratislava/marianum.sk/blob/02b806f8d16fe435100b60b17d6d70107de744fb/next/utils/parseNavigation.ts

/** Structural type, so that every nesting level of `PageEntityChildPagesFragment` fits. */
type PageWithChildPages = {
  attributes?: {
    title: string
    newSlug?: string | null
    childPages?: { data: PageWithChildPages[] } | null
  } | null
}

/**
 * Strapi returns only published child pages, so unpublished pages drop out together with their subtree.
 */
export const parseTopLevelPages = (pages: PageWithChildPages[]) => {
  const pagePathsMap: PagePathsMap = {}

  const parsePages = (
    childPages: PageWithChildPages[],
    parent: { slug: string; path: string } | null,
  ): string[] =>
    childPages.flatMap((page) => {
      const { title, newSlug: slug, childPages: grandChildPages } = page.attributes ?? {}

      if (!slug || !title) {
        return []
      }

      const path = `${parent?.path ?? ''}/${slug}`
      pagePathsMap[slug] = {
        title,
        path,
        parentSlug: parent?.slug ?? null,
        childSlugs: parsePages(grandChildPages?.data ?? [], { slug, path }),
      }

      return [slug]
    })

  parsePages(pages, null)

  return { pagePathsMap }
}
