import { BlogPostFragment } from '@bratislava/strapi-sdk-city-library'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchBlogPosts, getBlogPostsCount } from '../../utils/blogpost'
import { arrayify } from '../../utils/utils'

export interface BlogPostResponse {
  posts: BlogPostFragment[]
  count: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = Number(arrayify(req.query.limit)[0] ?? 0)
  const id = Number(arrayify(req.query.id)[0] ?? 0)
  const offset = Number(arrayify(req.query.offset)[0] ?? 0)
  const posts = await fetchBlogPosts(id, limit, offset)
  const postsCount = await getBlogPostsCount()
  return res.json({
    posts: posts,
    count: postsCount,
  })
}

export default handler
