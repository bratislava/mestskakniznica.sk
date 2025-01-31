import { client } from '@/services/graphql/gql'

export const documentCategoriesQueryKey = ['documentCategories']

export const documentCategoriesFetcher = () =>
  client.DocumentCategories().then(
    (data) =>
      data.documentCategories?.data.map((category) => ({
        label: category.attributes?.label,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: category.id!,
      })) ?? []
  )
