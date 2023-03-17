import { NavikronosConfig } from '../navikronos/config-type'
import { NavikronosStaticProps } from '../navikronos/internal/internalTypes'
import { createUseNavikronosHook } from '../navikronos/NavikronosProvider'

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
    } as const,
  },
  contentTypeRoutes: {
    'api::notice.notice': {
      alias: 'notice' as const,
      strapiTypename: 'NoticeEntity' as const,
      pathAttribute: 'slug' as const,
      rewrite: (slug) => `/notice/${slug}`,
    } as const,
    'api::branch.branch': {
      alias: 'branch' as const,
      strapiTypename: 'BranchEntity' as const,
      pathAttribute: 'slug' as const,
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

export const useNavikronos = createUseNavikronosHook(navikronosConfig)
