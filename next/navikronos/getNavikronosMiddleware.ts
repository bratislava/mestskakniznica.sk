import last from 'lodash/last'
import { NextRequest, NextResponse } from 'next/server'

import { NavikronosConfig } from './config-type'
import { fetchNavikronos } from './internal/fetch'

// From https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
const PUBLIC_FILE = /\.(.*)$/

export const getNavikronosMiddleware = (config: NavikronosConfig) => {
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

      // eslint-disable-next-line consistent-return
      return NextResponse.rewrite(url)
    }

    const { navikronosObject } = await fetchNavikronos(config)
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

      // eslint-disable-next-line consistent-return
      return NextResponse.rewrite(new URL(`/${locale}${node.nextRewrite(slug)}`, request.url))
    }

    // eslint-disable-next-line consistent-return
    return NextResponse.rewrite(new URL(`/${locale}${node.nextRewrite()}`, request.url))
  }
}
