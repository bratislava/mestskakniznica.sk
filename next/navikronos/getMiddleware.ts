import last from 'lodash/last'
import { NextRequest, NextResponse } from 'next/server'

import { fetchNavigation } from './fetchNavigation'
import { NavikronosConfig } from './types'

// From https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
const PUBLIC_FILE = /\.(.*)$/

export const getMiddleware = (config: NavikronosConfig) => {
  return async (request: NextRequest) => {
    // From https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
    if (
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(request.nextUrl.pathname)
    ) {
      return
    }

    if (request.nextUrl.pathname.startsWith(`/${config.rewritePrefix}`)) {
      const url = request.nextUrl.clone()

      url.pathname = `/404`
      return NextResponse.rewrite(url)
    }

    const { rewrites } = await fetchNavigation(config)
    const { locale, pathname } = request.nextUrl
    const localeRewrites = rewrites.get(locale)

    if (!localeRewrites) {
      return
    }

    // TODO fix
    const splitPath = pathname.split('/')
    const pathWithoutSlug = splitPath
      .map((a, i) => (i === splitPath.length - 1 ? ':slug' : a))
      .join('/')
    // TODO fix

    if (localeRewrites.has(pathname)) {
      // TODO comment
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const slugRewrite = localeRewrites.get(pathname)!
      return NextResponse.rewrite(new URL(`/${locale}${slugRewrite}`, request.url))
    }
    // TODO fix

    if (localeRewrites.has(pathWithoutSlug)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const slugRewrite = localeRewrites.get(pathWithoutSlug)!

      return NextResponse.rewrite(
        new URL(`/${locale}${slugRewrite.replace(':slug', last(splitPath) as string)}`, request.url)
      )
    }
  }
}
