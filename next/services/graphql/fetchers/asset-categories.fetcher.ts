import { client } from '@/services/graphql/gql'
import { isDefined } from '@/utils/isDefined'

export const assetCategoriesQueryKey = ['assetCategories']

export const assetCategoriesFetcher = () =>
  client.AssetCategories().then(
    (data) =>
      data.assetCategories.filter(isDefined).map((category) => ({
        label: category.label,
        key: category.documentId,
      })) ?? [],
  )
