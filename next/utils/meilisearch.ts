import { MeiliSearch } from 'meilisearch'
console.log(process.env.NEXT_PUBLIC_MEILISEARCH_HOST)
export const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? '',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
})
