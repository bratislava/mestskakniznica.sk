import { NextApiRequest, NextApiResponse } from 'next'

import OpacClient from '../../utils/opac-old'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const books = await OpacClient.fetchOpacBookNews()
    return res.json({ books })
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message ?? 'Could not load fetchOpacBookNews',
    })
  }
}

export default handler
