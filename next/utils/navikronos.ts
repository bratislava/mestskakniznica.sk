import { Document, Maybe, Scalars } from '@services/graphql'

import { createUseNavikronosHook } from '../navikronos/NavikronosProvider'
import { ExtremTyp, NavikronosConfig, NavikronosStaticProps } from '../navikronos/types'

export const navikronosConfig = {
  strapiUrl: process.env.STRAPI_URL as string,
  cacheTtl: 10_000,
  rewritePrefix: 'navikronosRewrite',
  staticRoutes: {
    search: { rewrite: '/search' },
  },
  entryRoutes: {
    'api::page.page': {
      alias: 'page' as const,
      strapiTypename: 'PageEntity' as const,
      rewrite: (id) => `/page/${id}`,
    },
  },
  contentTypeRoutes: {
    'api::notice.notice': {
      alias: 'notice' as const,
      strapiTypename: 'NoticeEntity' as const,
      pathAttribute: 'noticeSlug' as const,
      rewrite: (slug) => `/notice/${slug}`,
    } as const,
    'api::branch.branch': {
      alias: 'branch' as const,
      strapiTypename: 'BranchEntity' as const,
      pathAttribute: 'branchSlug' as const,
      rewrite: (slug) => `/branch/${slug}`,
    } as const,
    'api::document.document': {
      alias: 'document' as const,
      strapiTypename: 'DocumentEntity' as const,
      pathAttribute: 'slug' as const,
      rewrite: (slug) => `/document/${slug}`,
    } as const,
    'api::disclosure.disclosure': {
      alias: 'disclosure' as const,
      strapiTypename: 'DisclosureEntity' as const,
      pathAttribute: 'slug' as const,
      rewrite: (slug) => `/disclosure/${slug}`,
    } as const,
    'api::event.event': {
      alias: 'event' as const,
      strapiTypename: 'EventEntity' as const,
      pathAttribute: 'slug' as const,
      rewrite: (slug) => `/event/${slug}`,
    } as const,
    'api::blog-post.blog-post': {
      alias: 'blog-post' as const,
      strapiTypename: 'BlogPostEntity' as const,
      pathAttribute: 'slug' as const,
      rewrite: (slug) => `/blog-post/${slug}`,
    } as const,
  },
} satisfies NavikronosConfig

export type CLNavikronosConfig = typeof navikronosConfig

export type CLNavikronosPageProps = {
  navikronosStaticProps: NavikronosStaticProps<CLNavikronosConfig>
}

export const abc = <S extends string>(x: ExtremTyp<typeof navikronosConfig, S>) => {
  return x
}

export type DocumentEntity = {
  __typename?: 'DocumentEntity'
  attributes?: Maybe<Document>
  id: Maybe<Scalars['ID']>
}

const x = {} as unknown as DocumentEntity

const g = abc(x)

export const useNavikronos = createUseNavikronosHook(navikronosConfig)
