import { getSdk } from '@/services/graphql'
import { GraphQLClient } from 'graphql-request'

function isServer() {
  return typeof window === 'undefined'
}

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

const protocol =
  strapiUrl && (strapiUrl.startsWith('http://') || strapiUrl.startsWith('https://'))
    ? ''
    : 'http://'

const buildUrl = (path: string): string =>
  `${
    strapiUrl
      ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${protocol}${strapiUrl}`
      : isServer()
        ? ''
        : window.location.origin
  }${path}`

const gql = new GraphQLClient(buildUrl('/graphql'))

export const client = getSdk(gql)
