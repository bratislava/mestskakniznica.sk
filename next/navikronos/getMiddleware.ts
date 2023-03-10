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

    const { navikronosObject } = await fetchNavigation(config)
    const { locale, pathname } = request.nextUrl
    const node = navikronosObject.getNodeByPath(pathname, locale)

    if (!node) {
      return
    }

    if (node.original.type === 'contentType') {
      const slug = last(pathname.split('/'))

      if (!slug) {
        return
      }

      return NextResponse.rewrite(new URL(`/${locale}${node.nextRewrite(slug)}`, request.url))
    }

    return NextResponse.rewrite(new URL(`/${locale}${node.nextRewrite()}`, request.url))
  }
}
