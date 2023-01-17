import {
  BasicDocument,
  Branch,
  Event,
  EventCategory,
  EventTag,
  FileCategory,
  UploadFile,
} from '@services/graphql'

export type BasicDocumentMeili = Omit<
  BasicDocument,
  '__typename' | 'file_category' | 'attachment'
> & {
  id: string
  file_category: Omit<FileCategory, '__typename' | 'page'>
  attachment: Omit<UploadFile, '__typename'>
}

/**
 * Only properties that are required to display listing are retrieved from Meilisearch.
 */
export type EventInListingMeili = Pick<
  Event,
  'title' | 'dateFrom' | 'dateTo' | 'locale' | 'slug'
> & {
  id: string
  listingImage: Omit<UploadFile, '__typename'>
  coverImage: Omit<UploadFile, '__typename'>
  eventTags: EventTag[]
  eventCategory: Pick<EventCategory, 'title'>
  branch: Pick<Branch, 'title'>
}
