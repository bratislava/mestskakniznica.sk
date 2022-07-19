import { client } from './gql'

export const getDocumentCount = () => client.BasicDocumentsCount()

export const fetchFileCategories = async () => client.FileCategories()

export const fetchDocuments = (limit: number, offset: number, sort: string, categoryId: any, query: string) => client.AllBasicDocuments({
    limit,
    offset,
    sort,
    categoryId,
    query,
  })
