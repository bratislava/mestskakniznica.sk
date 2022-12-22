import { BasicDocument, FileCategory, UploadFile } from '@bratislava/strapi-sdk-city-library'

export type BasicDocumentMeili = Omit<
  BasicDocument,
  '__typename' | 'file_category' | 'attachment'
> & {
  id: string
  file_category: Omit<FileCategory, '__typename' | 'page'>
  attachment: Omit<UploadFile, '__typename'>
}
