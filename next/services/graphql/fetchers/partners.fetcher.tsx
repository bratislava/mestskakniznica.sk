import { client } from '@/services/graphql/gql'

export const getPartnersQueryKey = (locale: string) => ['partners', locale]

export const partnersFetcher = (locale: string) => client.SortedPartners({ locale })
