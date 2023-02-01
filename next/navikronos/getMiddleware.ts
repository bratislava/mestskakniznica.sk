import { NavikronosConfig } from './types'
import { NextRequest, NextResponse } from 'next/server'
import { fetchNavigation } from './fetchNavigation'

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

    console.log(request.nextUrl.locale)

    const rewrite = rewrites[request.nextUrl.pathname]
    if (rewrite) {
      return NextResponse.rewrite(new URL(rewrite, request.url))
    }
  }
}
