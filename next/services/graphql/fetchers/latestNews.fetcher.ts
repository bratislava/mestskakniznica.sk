import { client } from '@services/graphql/gql'

export const getLatestNewsQueryKey = (locale: string) => ['latestNews', locale]

export const latestNewsFetcher = (locale: string) => client.LatestNews({ locale })
