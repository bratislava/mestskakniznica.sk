import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check tmp secret to confirm this is a valid request
  // TODO generate new secret and move it to envs
  if (req.query.secret !== 'Zg66syD2Jxii6fZr') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body

    // Check if url is provided
    if (req.query.url) {
      if (typeof req.query.url === 'string') {
        const urlToRevalidate = `/${req.query.url}`
        console.log(`Revalidating ${urlToRevalidate}`)
        await res.unstable_revalidate(urlToRevalidate)
      } else if (req.query.url[0]) {
        const urlToRevalidate = `/${req.query.url[0]}`
        console.log(`Revalidating ${urlToRevalidate}`)
        await res.unstable_revalidate(urlToRevalidate)
      }
    } else {
      // If not, always revalidate homepage
      console.log(`Revalidating /`)

      await res.unstable_revalidate('/')
    }

    // Check model
    if (payload?.model === 'blog-post') {
      const urlToRevalidate = `/blog/${payload?.entry?.slug}`
      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)
    }

    if (payload?.model === 'basic-document') {
      const urlToRevalidate = `/documents/${payload?.entry?.slug}`
      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)
    }

    if (payload?.model === 'page') {
      const urlToRevalidate = `/${payload?.entry?.slug}`
      console.log(`Revalidating ${urlToRevalidate}`)
      await res.unstable_revalidate(urlToRevalidate)
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.log('Error while revalidating ==>', err)
    return res.status(500).send('Error revalidating')
  }
}
