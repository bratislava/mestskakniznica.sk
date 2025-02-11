import meilisearchConfig from './plugins.meilisearch.config'
import graphqlConfig from './plugins.graphql.config'

export default ({ env }) => ({
  graphql: {
    config: graphqlConfig,
  },
  navikronos: {
    enabled: true,
    resolve: './src/plugins/navikronos',
    config: {
      staticRouteIds: ['search'],
      contentTypeRoutes: [
        { contentTypeUid: 'api::notice.notice' },
        { contentTypeUid: 'api::branch.branch' },
        { contentTypeUid: 'api::document.document' },
        { contentTypeUid: 'api::disclosure.disclosure' },
        { contentTypeUid: 'api::event.event' },
        { contentTypeUid: 'api::blog-post.blog-post' },
      ],
      entryRoutes: [
        {
          contentTypeUid: 'api::page.page',
          titleAttribute: 'title',
          pathAttribute: 'newSlug',
        },
      ],
    },
  },
  meilisearch: {
    config: meilisearchConfig,
  },
})
