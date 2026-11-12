/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'

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
    if (payload?.model === 'blog-post') {
      const urlToRevalidate = `/blog/${payload?.entry?.slug}`
      const isEn = payload?.entry?.locale === 'en'

      console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
      await res.revalidate(urlToRevalidate)

      if (isEn) {
        console.log(
          `api/revalidate: Revalidating /en/services/education/articles due to change in ${urlToRevalidate}`,
        )
        await res.revalidate('/en/services/education/articles')
      } else {
        console.log(
          `api/revalidate: Revalidating /sluzby/vzdelavanie/clanky due to change in ${urlToRevalidate}`,
        )
        await res.revalidate('/sluzby/vzdelavanie/clanky')
      }
    }

    if (payload?.model === 'basic-document') {
      const urlToRevalidate = `/documents/${payload?.entry?.slug}`
      console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
      await res.revalidate(urlToRevalidate)
    }

    if (payload?.model === 'event') {
      const urlToRevalidate = `/${payload?.entry?.slug}`
      const isEn = payload?.entry?.locale === 'en'

      console.log(`api/revalidate: Revalidating ${urlToRevalidate}`)
      await res.revalidate(urlToRevalidate)

      if (isEn) {
        console.log(
          `api/revalidate: Revalidating /en/experience/events, /en/experience due to change in ${urlToRevalidate}`,
        )
        await res.revalidate('/en/experience/events')
        await res.revalidate('/en/experience')
      } else {
        console.log(
          `api/revalidate: Revalidating /zazite/podujatia, /zazite due to change in ${urlToRevalidate}`,
        )
        await res.revalidate('/zazite/podujatia')
        await res.revalidate('/zazite')
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
