import { client } from '@utils/gql'

export const documentCategoriesQueryKey = ['documentCategories']

export const documentCategoriesFetcher = () =>
  client.FileCategories().then(
    (data) =>
      data.fileCategories?.data.map((category) => ({
        label: category.attributes?.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: category.id!,
      })) ?? []
  )
