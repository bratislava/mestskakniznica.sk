import { NavikronosConfig } from '../navikronos/types'

export const navikronosConfig: NavikronosConfig = {
  strapiUrl: process.env.STRAPI_URL as string,
  cacheTtl: 10000,
  rewritePrefix: 'navikronosRewrite',
  staticRoutes: {
    search: { rewrite: '/search' },
  },
  entryRoutes: {
    'api::page.page': { alias: 'page', rewrite: (id) => `/page/${id}` },
  },
  contentTypeRoutes: {
    'api::notice.notice': { alias: 'notice', rewrite: (slug) => `/notice/${slug}` },
    'api::basic-document.basic-document': {
      alias: 'basic-document',
      rewrite: (slug) => `/basic-document/${slug}`,
    },
    'api::branch.branch': { alias: 'branch', rewrite: (slug) => `/branch/${slug}` },
    'api::event.event': { alias: 'event', rewrite: (slug) => `/event/${slug}` },
    'api::blog-post.blog-post': { alias: 'blog-post', rewrite: (slug) => `/blog-post/${slug}` },
  },
}
