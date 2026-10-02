import { client } from '@/services/graphql/gql'

export const assetCategoriesQueryKey = ['assetCategories']

export const assetCategoriesFetcher = () =>
  client.AssetCategories().then(
    (data) =>
      data.assetCategories?.data.map((category) => ({
        label: category.attributes?.label,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: category.id!,
      })) ?? [],
  )
