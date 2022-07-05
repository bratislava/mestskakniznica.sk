import { BasicDocumentEntity, FileCategoryEntity } from '@bratislava/strapi-sdk-city-library'
import { NextApiRequest, NextApiResponse } from 'next'

import { fetchDocuments, fetchFileCategories, getDocumentCount } from '../../utils/document'
import { arrayify } from '../../utils/utils'

export interface DocumentResponse {
  documents: BasicDocumentEntity[]
  fileCategories: FileCategoryEntity[]
  count: number
}

export const DOCUMENTS_LIMIT = 20

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const offset = Number(arrayify(req.query.offset)[0] ?? 0)
  const sort = arrayify(req.query.sort)[0] ?? 'desc'
  const categoryId = Number(req.query.categoryId) ?? null
  const query = arrayify(req.query.query)[0] ?? ''

  const documents = fetchDocuments(DOCUMENTS_LIMIT, offset, sort, categoryId, query)
  const documentsCount = getDocumentCount()
  const fetchFileCategoriesP = fetchFileCategories()

  const [{ allBasicDocuments }, { basicDocumentCount }, { fileCategories }] = await Promise.all([
    documents,
    documentsCount,
    fetchFileCategoriesP,
  ])

  return res.json({
    documents: allBasicDocuments,
    count: basicDocumentCount,
    fileCategories,
  })
}

export default handler
