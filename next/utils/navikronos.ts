import { NavikronosConfig, NavikronosStaticProps } from '../navikronos/types'
import { createUseNavikronosHook } from '../navikronos/NavikronosProvider'

export const navikronosConfig = {
  strapiUrl: process.env.STRAPI_URL as string,
  cacheTtl: 10000,
  rewritePrefix: 'navikronosRewrite',
  staticRoutes: {
    search: { rewrite: '/search' },
  },
  entryRoutes: {
    'api::page.page': {
      alias: 'page' as const,
      rewrite: (id) => `/page/${id}`,
    },
  },
  contentTypeRoutes: {
    'api::notice.notice': {
      alias: 'notice' as const,
      rewrite: (slug) => `/notice/${slug}`,
    },
    'api::basic-document.basic-document': {
      alias: 'basic-document' as const,
      rewrite: (slug) => `/basic-document/${slug}`,
    },
    'api::branch.branch': {
      alias: 'branch' as const,
      rewrite: (slug) => `/branch/${slug}`,
    },
    'api::event.event': {
      alias: 'event' as const,
      rewrite: (slug) => `/event/${slug}`,
    },
    'api::blog-post.blog-post': {
      alias: 'blog-post' as const,
      rewrite: (slug) => `/blog-post/${slug}`,
    },
  },
} satisfies NavikronosConfig

export type CLNavikronosConfig = typeof navikronosConfig

export type CLNavikronosPageProps = {
  navikronosStaticProps: NavikronosStaticProps<CLNavikronosConfig>
}

export const useNavikronos = createUseNavikronosHook(navikronosConfig)