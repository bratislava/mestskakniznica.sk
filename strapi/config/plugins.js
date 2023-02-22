/**
 * The indexes that are used in search are stored in one shared index. This wraps them to have a unified way for search
 * and easily unwrappable structure to be used separately.
 */
const wrapSearchIndexEntry = (type, data, commonAttributes) => {
  // Remove when https://github.com/meilisearch/strapi-plugin-meilisearch/pull/554 merged
  const newData = { ...data };
  delete newData.createdBy;
  delete newData.updatedBy;

  return {
    type,
    id: data.id, // must be present to work correctly
    locale: data.locale,
    // [type] is used instead of "data", to avoid  naming clashes of filterable / sortable / searchable attributes
    [type]: newData,
    commonAttributes,
  };
};

// Because a bug in Meilisearch shared index, only the last added entity's settings are used and the old ones are overwritten
// instead of merging. Therefore, for all entities we must provide shared settings.
// In order to take effect of this settings change you need to unhook and rehook index you are modifying.
const searchIndexSettings = {
  searchableAttributes: [
    // Page
    "page.title",
    "page.seo.keywords",
    "page.perex",
    // Basic documents
    "basic-document.title",
    "basic-document.seo.keywords",
    "basic-document.description",
    // Blog post
    "blog-post.title",
    "blog-post.seo.keywords",
    // Documents
    "document.title",
    "document.description",
    // Disclosures
    "disclosure.title",
    "disclosure.description",
    "disclosure.contractor",
    // Event
    "event.title",
    "event.seo.keywords",
    "event.description",
    // Notice
    "notice.title",
    "notice.seo.keywords",
    "notice.body",
  ],
  filterableAttributes: [
    // All
    "type",
    // Page + Event`
    "locale",
    // Basic document
    "basic-document.file_category.id",
    // Document
    "document.documentCategory.id",
    // Disclosure
    "disclosure.type",
    // Event
    "event.dateFromTimestamp",
    "event.dateToTimestamp",
    "event.eventTagsIds",
    "event.eventCategory.id",
    "event.branch.id",
    "event.locale",
  ],
  sortableAttributes: [
    // Basic document
    "basic-document.date_added",
    // Event
    "event.dateFromTimestamp",
    // Document, Disclosure
    "commonAttributes.addedAtTimestamp",
  ],
  pagination: {
    // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
    maxTotalHits: 100000,
  },
};

module.exports = ({ env }) => ({
  graphql: {
    config: {
      defaultLimit: 100,
      artifacts: {
        schema: true,
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
  meilisearch: {
    config: {
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_ADMIN_API_KEY,

      page: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("page", entry),
      },

      "blog-post": {
        indexName: "search_index",
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("blog-post", entry),
      },

      document: {
        indexName: "search_index",
        settings: searchIndexSettings,
        transformEntry: ({ entry }) =>
          wrapSearchIndexEntry(
            "document",
            {
              ...entry,
            },
            {
              // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
              // use (number) filters.
              // Transforming publishedAt to addedAtTimestamp to be able to use the same sort as for Disclosures.
              addedAtTimestamp: entry.publishedAt
                ? new Date(entry.publishedAt).getTime()
                : undefined,
            }
          ),
      },

      disclosure: {
        indexName: "search_index",
        settings: searchIndexSettings,
        transformEntry: ({ entry }) =>
          wrapSearchIndexEntry(
            "disclosure",
            {
              ...entry,
            },
            {
              // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
              // use (number) filters.
              addedAtTimestamp: entry.addedAt
                ? new Date(entry.addedAt).getTime()
                : undefined,
            }
          ),
      },

      event: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) =>
          wrapSearchIndexEntry("event", {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            dateFromTimestamp: entry.dateFrom
              ? new Date(entry.dateFrom).getTime()
              : undefined,
            dateToTimestamp: entry.dateTo
              ? new Date(entry.dateTo).getTime()
              : undefined,
            // It is not possible to filter nested object in arrays in Meilisearch, so we map it to a basic array with
            // string values.
            eventTagsIds: (entry.eventTags ?? []).map(({ id }) => id),
          }),
      },

      notice: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("notice", entry),
      },
    },
  },
});
