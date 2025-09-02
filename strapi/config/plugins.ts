import meilisearchConfig from "./plugins.meilisearch.config";
import graphqlConfig from "./plugins.graphql.config";

export default ({ env }) => ({
  graphql: {
    config: graphqlConfig,
  },
  meilisearch: {
    config: meilisearchConfig,
  },
  email: {
    config: {
      //  mailgun email provider https://www.npmjs.com/package/@strapi/provider-email-mailgun
      provider: "mailgun",
      providerOptions: {
        key: env("MAILGUN_API_KEY"), // Required
        domain: env("MAILGUN_DOMAIN"), // Required
        url: "https://api.eu.mailgun.net", //Optional. If domain region is Europe use 'https://api.eu.mailgun.net'
      },
      settings: {
        defaultFrom: env("MAILGUN_EMAIL"),
        defaultReplyTo: env("MAILGUN_EMAIL"),
      },
    },
  },
  navikronos: {
    enabled: true,
    resolve: "./src/plugins/navikronos",
    config: {
      staticRouteIds: ["search"],
      contentTypeRoutes: [
        { contentTypeUid: "api::notice.notice" },
        { contentTypeUid: "api::branch.branch" },
        { contentTypeUid: "api::document.document" },
        { contentTypeUid: "api::disclosure.disclosure" },
        { contentTypeUid: "api::event.event" },
        { contentTypeUid: "api::blog-post.blog-post" },
      ],
      entryRoutes: [
        {
          contentTypeUid: "api::page.page",
          titleAttribute: "title",
          pathAttribute: "newSlug",
        },
      ],
    },
  },
});
