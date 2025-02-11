import { NextApiRequest, NextApiResponse } from 'next'

import { getNewBooks, NewBooksResponse } from '@/services/opac/newBooksService'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewBooksResponse>) => {
  const { page, pageSize } = req.query

  if (Number.isFinite(Number(page)) && Number.isFinite(Number(pageSize))) {
    res.send(await getNewBooks({ page: Number(page), pageSize: Number(pageSize) }))

    return
  }

  res.send(await getNewBooks({}))
}

export default handler
