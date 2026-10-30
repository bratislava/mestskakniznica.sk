import { NextRequest, NextResponse } from 'next/server'

import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import {
  contentTypes,
  LocaleNavigation,
  NavigationConfig,
} from '@/services/navigation/typesNavigation'

// Inspired by City Library - Navikronos custom plugin
// https://github.com/bratislava/mestskakniznica.sk/blob/dfef31c799e1a903af4fa30aa1be5c3f27ae5418/next/navikronos/getNavikronosMiddleware.ts

// From https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
const PUBLIC_FILE = /\.(.*)$/

/**
 * Returns the internal route for the search page and detail pages, `null` for everything else. Pages are served by
 * `pages/[...path].tsx` without a rewrite.
 */
const getRewriteDestination = (
  config: NavigationConfig,
  { pagePathsMap, contentTypePathPrefixesMap }: LocaleNavigation,
  locale: string,
  pathname: string,
) => {
  if (pathname === config.searchPaths[locale]) {
    return '/search'
  }

  const slug = pathname.split('/').at(-1)
  // A page takes precedence over a detail page with the same path.
  if (!slug || pagePathsMap[slug]?.path === pathname) {
    return null
  }

  const parentPath = pathname.slice(0, pathname.lastIndexOf('/'))
  const contentType = contentTypes.find((type) => contentTypePathPrefixesMap[type] === parentPath)

  return contentType ? `/${contentType}/${slug}` : null
}

/**
 * This proxy rewrites the search page and detail pages to their internal routes, based on the page tree and the
 * Strapi "Navigation" single type.
 *
 * @param config
 */
export const getNavigationMiddleware = (config: NavigationConfig) => {
  return async (request: NextRequest) => {
    const { locale, pathname } = request.nextUrl

    // From https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
    if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE.test(pathname)) {
      return NextResponse.next()
    }

    if (pathname.startsWith(`/${config.rewritePrefix}`)) {
      const url = request.nextUrl.clone()
      url.pathname = '/404'

      return NextResponse.rewrite(url)
    }

    const localeNavigation = (await fetchNavigation(config))[locale]
    const destination = localeNavigation
      ? getRewriteDestination(config, localeNavigation, locale, pathname)
      : null

    if (!destination) {
      return NextResponse.next()
    }

    return NextResponse.rewrite(
      new URL(`/${locale}/${config.rewritePrefix}${destination}`, request.url),
    )
  }
}
