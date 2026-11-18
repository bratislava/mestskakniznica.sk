/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import { getContentTypePathPrefixesMap } from '@/services/navigation/getContentTypePathPrefixesMap'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import { ContentType, contentTypes } from '@/services/navigation/typesNavigation'

const isContentType = (model: unknown): model is ContentType =>
  contentTypes.some((contentType) => contentType === model)

/** Assets and disclosures are not localized in Strapi, their detail pages are served in every locale. */
const nonLocalizedContentTypes: ContentType[] = ['asset', 'disclosure']

// TODO cleanup
// eslint-disable-next-line sonarjs/cognitive-complexity
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('api/revalidate: Started')
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    console.log('api/revalidate: Invalid token')

    res.status(401).json({ message: 'Invalid token' })

    return
  }

  try {
    const payload = req.body

    const reqUrl = req.query.url
    // Check if url is provided
    if (reqUrl) {
      if (typeof reqUrl === 'string') {
        const urlToRevalidate = `${reqUrl.startsWith('/') ? '' : '/'}${reqUrl}`
        console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
        await res.revalidate(urlToRevalidate)
      } else if (reqUrl[0]) {
        const urlToRevalidate = `/${reqUrl[0]}`
        console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
        await res.revalidate(urlToRevalidate)
      }
    } else {
      // If no custom url provided, always revalidate homepage
      console.log(`api/revalidate: Revalidating /`)
      await res.revalidate('/')
    }

    // Check model
    const model: unknown = payload?.model
    if (isContentType(model) && payload?.entry?.slug) {
      const locales: string[] = nonLocalizedContentTypes.includes(model)
        ? ['sk', 'en']
        : [payload?.entry?.locale]

      await Promise.all(
        locales.map(async (locale) => {
          // Detail pages are served under the path of their parent page (e.g. `/zazite/podujatia/:slug`) and rewritten
          // to `pages/<type>/[slug].tsx`.
          const localePrefix = locale === 'en' ? '/en' : ''
          const urlToRevalidate = `${localePrefix}/${model}/${payload?.entry?.slug}`

          console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
          await res.revalidate(urlToRevalidate)

          const { contentTypePathPrefixesMap } = getContentTypePathPrefixesMap(locale)
          const parentPagePath = `${localePrefix}${contentTypePathPrefixesMap[model]}`
          const grandparentPagePath = parentPagePath.slice(0, parentPagePath.lastIndexOf('/'))

          console.log(
            `api/revalidate: Revalidating ${parentPagePath}, ${grandparentPagePath} due to change in ${urlToRevalidate}`,
          )
          await res.revalidate(parentPagePath)
          if (grandparentPagePath) {
            await res.revalidate(grandparentPagePath)
          }
        }),
      )
    }

    if (payload?.model === 'page') {
      // Pages are nested, so their path comes from the page tree. It is fetched fresh, because the slug or the parent
      // page could have just changed. Drafts, unpublished pages and pages outside the tree have no path.
      const navigation = await fetchNavigation(navigationConfig, { force: true })
      const pagePath = navigation[payload?.entry?.locale]?.pagePathsMap[payload?.entry?.slug]?.path
      const isEn = payload?.entry?.locale === 'en'

      if (pagePath) {
        const urlToRevalidate = isEn ? `/en${pagePath}` : pagePath

        console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
        await res.revalidate(urlToRevalidate)
      }
    }

    res.json({ revalidated: true })
  } catch (error) {
    console.log('api/revalidate: Error while revalidating ==>', error)

    res.status(500).send('Error revalidating')
  }
}
/* eslint-enable no-console */

export default handler
