/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO cleanup
// eslint-disable-next-line sonarjs/cognitive-complexity
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check tmp secret to confirm this is a valid request
  // TODO generate new secret and move it to envs
  if (req.query.secret !== 'Zg66syD2Jxii6fZr') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body

    const reqUrl = req.query.url
    // Check if url is provided
    if (reqUrl) {
      if (typeof reqUrl === 'string') {
        const urlToRevalidate = `${reqUrl.startsWith('/') ? '' : '/'}${reqUrl}`
        console.log(`Revalidating ${urlToRevalidate}`)
        await res.unstable_revalidate(urlToRevalidate)
      } else if (reqUrl[0]) {
        const urlToRevalidate = `/${reqUrl[0]}`
        console.log(`Revalidating ${urlToRevalidate}`)
        await res.unstable_revalidate(urlToRevalidate)
      }
    } else {
      // If no custom url provided, always revalidate homepage
      console.log(`Revalidating /`)
      await res.unstable_revalidate('/')
    }

    // Check model
    if (payload?.model === 'blog-post') {
      // TODO fix eslint
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const urlToRevalidate = `/blog/${payload?.entry?.slug}`
      const isEn = payload?.entry?.locale === 'en'

      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)

      if (isEn) {
        console.log(
          `Revalidating /en/services/education/articles due to change in ${urlToRevalidate}`
        )
        await res.unstable_revalidate('/en/services/education/articles')
      } else {
        console.log(`Revalidating /sluzby/vzdelavanie/clanky due to change in ${urlToRevalidate}`)
        await res.unstable_revalidate('/sluzby/vzdelavanie/clanky')
      }
    }

    if (payload?.model === 'basic-document') {
      // TODO fix eslint
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const urlToRevalidate = `/documents/${payload?.entry?.slug}`
      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)
    }

    if (payload?.model === 'event') {
      // TODO fix eslint
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const urlToRevalidate = `/${payload?.entry?.slug}`
      const isEn = payload?.entry?.locale === 'en'

      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)

      if (isEn) {
        console.log(
          `Revalidating /en/experience/events, /en/experience due to change in ${urlToRevalidate}`
        )
        await res.unstable_revalidate('/en/experience/events')
        await res.unstable_revalidate('/en/experience')
      } else {
        console.log(`Revalidating /zazite/podujatia, /zazite due to change in ${urlToRevalidate}`)
        await res.unstable_revalidate('/zazite/podujatia')
        await res.unstable_revalidate('/zazite')
      }
    }

    if (payload?.model === 'page') {
      // TODO fix eslint
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const urlToRevalidate = `/${payload?.entry?.slug}`
      const isEn = payload?.entry?.locale === 'en'
      const layout = payload?.entry?.layout as string

      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)

      if (layout === 'news') {
        if (isEn) {
          console.log(
            `Revalidating /en/experience/news, /en/experience due to change in ${urlToRevalidate}`
          )
          await res.unstable_revalidate('/en/experience/news')
          await res.unstable_revalidate('/en/experience')
        } else {
          console.log(`Revalidating /zazite/aktuality, /zazite due to change in ${urlToRevalidate}`)
          await res.unstable_revalidate('/zazite/aktuality')
          await res.unstable_revalidate('/zazite')
        }
      }

      if (layout === 'locality') {
        if (isEn) {
          console.log(
            `Revalidating /en/visit/our-locations, /en/visit due to change in ${urlToRevalidate}`
          )
          await res.unstable_revalidate('/en/visit/our-locations')
          await res.unstable_revalidate('/en/visit')
        } else {
          console.log(
            `Revalidating /navstivte/nase-lokality, /navstivte due to change in ${urlToRevalidate}`
          )
          await res.unstable_revalidate('/navstivte/nase-lokality')
          await res.unstable_revalidate('/navstivte')
        }
      }
    }

    return res.json({ revalidated: true })
  } catch (error) {
    console.log('Error while revalidating ==>', error)
    return res.status(500).send('Error revalidating')
  }
}
/* eslint-enable no-console */
