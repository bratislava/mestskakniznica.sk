import { client } from '@utils/gql'
import { arrayify } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const start = Number(req.query.start)
  const limit = Number(req.query.limit)
  const sort = req.query.sort.toString()
  const layout = req.query.layout.toString()
  const locale = req.query.locale || "sk"

  const variable = { layout, locale, sort, limit, start }  
  const result = await client.PagesByLayoutWithFieldPagination(variable)
  
  return res.json(result)
}

export default handler