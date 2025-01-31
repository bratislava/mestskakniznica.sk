import { client } from '@/services/graphql/gql'

export const getEventPropertiesQueryKey = (locale: string) => ['eventProperties', locale]

export const eventPropertiesFetcher = (locale: string) => client.EventProperties({ locale })
