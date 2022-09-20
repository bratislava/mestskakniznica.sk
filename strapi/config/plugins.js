module.exports = ({ env }) => ({
  graphql: {
    config: {
      defaultLimit: 100,
    },
  },
  meilisearch: {
    config: {
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_ADMIN_API_KEY,

      // example of how to set locale as filterable attribute on hooked collection
      event: {
        settings: {
          filterableAttributes: ['locale'],
        },
      },
    },
  },
})
