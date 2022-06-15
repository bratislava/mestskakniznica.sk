import { client } from './gql'

export const getDocumentCount = () => {
  return client.BasicDocumentsCount()
}

export const fetchFileCategories = async () => {
  return client.FileCategories()
}

export const fetchDocuments = (limit: number, offset: number, sort: string, categoryId: number, query: string) => {
  return client.AllBasicDocuments({
    limit,
    offset,
    sort,
    categoryId,
    query,
  })
}
