import { handleMethods } from '@bratislava/next-backend-api';
import { BlogPostFragment } from '@bratislava/strapi-sdk-city-library';
import { NextApiRequest, NextApiResponse } from 'next';
import OpacClient from '../../utils/opac-old';
import { arrayify } from '../../utils/utils';

export interface BlogPostResponse {
  posts: BlogPostFragment[];
  count: number;
}

export default handleMethods()
  .get()(async (req: NextApiRequest, res: NextApiResponse) => {
    const limit = Number(arrayify(req.query.limit)[0] ?? 10);
    const offset = Number(arrayify(req.query.offset)[0] ?? 0);

    const result = await OpacClient.getLoadedBookNews(limit, offset);

    return res.json({
      books: result?.books ?? null,
      count: result?.count ?? 0,
    });
  })
  .prepare();
