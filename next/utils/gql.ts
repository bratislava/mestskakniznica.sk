import { getSdk } from '@bratislava/strapi-sdk-city-library'
import { GraphQLClient } from 'graphql-request'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

// URL becomes full url to strapi on server, but just /graphql (for proxy) on client

const protocol =
  serverRuntimeConfig?.strapiUrl &&
  (serverRuntimeConfig?.strapiUrl.startsWith('http://') || serverRuntimeConfig?.strapiUrl.startsWith('https://'))
    ? ''
    : 'http://'

export const buildUrl = (path: string): string =>
  `${serverRuntimeConfig?.strapiUrl ? `${protocol}${serverRuntimeConfig.strapiUrl}` : window.location.origin}${path}`

const gql = new GraphQLClient(buildUrl('/graphql'))

export const client = getSdk(gql)
