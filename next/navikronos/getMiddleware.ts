import { NavikronosConfig } from './types'
import { NextRequest, NextResponse } from 'next/server'
import { fetchNavigation } from './fetchNavigation'
import last from 'lodash/last'

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

    const { rewrites } = await fetchNavigation(config)
    const { locale } = request.nextUrl
    const localeRewrites = rewrites[locale]

    // TODO fix
    const splitted = request.nextUrl.pathname.split('/')
    const x = splitted.map((a, i) => (i === splitted.length - 1 ? ':slug' : a)).join('/')
    // TODO fix

    const rewrite = localeRewrites[request.nextUrl.pathname]
    if (rewrite) {
      // TODO comment
      return NextResponse.rewrite(new URL(`/${locale}${rewrite}`, request.url))
    }
    // TODO fix
    const slugRewrite = localeRewrites[x]
    if (slugRewrite) {
      return NextResponse.rewrite(
        new URL(`/${locale}${slugRewrite.replace(':slug', last(splitted) as string)}`, request.url)
      )
    }
  }
}
