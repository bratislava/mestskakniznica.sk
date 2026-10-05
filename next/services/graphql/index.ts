import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BasicDocumentMetadataDynamicZoneInput: { input: any; output: any }
  BlogPostSectionsDynamicZoneInput: { input: any; output: any }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any }
  PageSectionsDynamicZoneInput: { input: any; output: any }
  /** A time string with format HH:mm:ss.SSS */
  Time: { input: any; output: any }
}

export type Asset = {
  __typename?: 'Asset'
  assetCategory?: Maybe<AssetCategory>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  file: Array<Maybe<UploadFile>>
  file_connection: UploadFileRelationResponseCollection
  originalSlug?: Maybe<Scalars['String']['output']>
  originalTitle?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AssetFileArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetFile_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategory = {
  __typename?: 'AssetCategory'
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  label: Scalars['String']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AssetCategoryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategoryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategoryEntity = {
  __typename?: 'AssetCategoryEntity'
  attributes?: Maybe<AssetCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type AssetCategoryEntityResponse = {
  __typename?: 'AssetCategoryEntityResponse'
  data?: Maybe<AssetCategory>
}

export type AssetCategoryEntityResponseCollection = {
  __typename?: 'AssetCategoryEntityResponseCollection'
  nodes: Array<AssetCategory>
  pageInfo: Pagination
}

export type AssetCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>
  assets?: InputMaybe<AssetFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<AssetCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AssetCategoryInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  label?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type AssetCategoryRelationResponseCollection = {
  __typename?: 'AssetCategoryRelationResponseCollection'
  nodes: Array<AssetCategory>
}

export type AssetEntity = {
  __typename?: 'AssetEntity'
  attributes?: Maybe<Asset>
  id?: Maybe<Scalars['ID']['output']>
}

export type AssetEntityResponse = {
  __typename?: 'AssetEntityResponse'
  data?: Maybe<Asset>
}

export type AssetEntityResponseCollection = {
  __typename?: 'AssetEntityResponseCollection'
  nodes: Array<Asset>
  pageInfo: Pagination
}

export type AssetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>
  assetCategory?: InputMaybe<AssetCategoryFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<AssetFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>
  originalSlug?: InputMaybe<StringFilterInput>
  originalTitle?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AssetInput = {
  assetCategory?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  file?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  originalSlug?: InputMaybe<Scalars['String']['input']>
  originalTitle?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type AssetRelationResponseCollection = {
  __typename?: 'AssetRelationResponseCollection'
  nodes: Array<Asset>
}

export type BasicDocument = {
  __typename?: 'BasicDocument'
  attachment?: Maybe<UploadFile>
  author?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  date_added?: Maybe<Scalars['Date']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  file_category?: Maybe<FileCategory>
  link?: Maybe<Scalars['String']['output']>
  metadata?: Maybe<Array<Maybe<BasicDocumentMetadataDynamicZone>>>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BasicDocumentEntity = {
  __typename?: 'BasicDocumentEntity'
  attributes?: Maybe<BasicDocument>
  id?: Maybe<Scalars['ID']['output']>
}

export type BasicDocumentEntityResponse = {
  __typename?: 'BasicDocumentEntityResponse'
  data?: Maybe<BasicDocument>
}

export type BasicDocumentEntityResponseCollection = {
  __typename?: 'BasicDocumentEntityResponseCollection'
  nodes: Array<BasicDocument>
  pageInfo: Pagination
}

export type BasicDocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>
  author?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date_added?: InputMaybe<DateFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  file_category?: InputMaybe<FileCategoryFiltersInput>
  link?: InputMaybe<StringFilterInput>
  not?: InputMaybe<BasicDocumentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BasicDocumentInput = {
  attachment?: InputMaybe<Scalars['ID']['input']>
  author?: InputMaybe<Scalars['String']['input']>
  date_added?: InputMaybe<Scalars['Date']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  file_category?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  metadata?: InputMaybe<Array<Scalars['BasicDocumentMetadataDynamicZoneInput']['input']>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type BasicDocumentMetadataDynamicZone =
  | ComponentMetadataFaktury
  | ComponentMetadataMetadata
  | ComponentMetadataObchodnaVerejnaSutaz
  | ComponentMetadataObjednavky
  | ComponentMetadataVerejneObstaravanie
  | ComponentMetadataZmluvy
  | Error

export type BasicDocumentRelationResponseCollection = {
  __typename?: 'BasicDocumentRelationResponseCollection'
  nodes: Array<BasicDocument>
}

export type BlogPost = {
  __typename?: 'BlogPost'
  coverMedia?: Maybe<UploadFile>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<BlogPost>>
  localizations_connection?: Maybe<BlogPostRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BlogPostLocalizationsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BlogPostLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BlogPostEntity = {
  __typename?: 'BlogPostEntity'
  attributes?: Maybe<BlogPost>
  id?: Maybe<Scalars['ID']['output']>
}

export type BlogPostEntityResponse = {
  __typename?: 'BlogPostEntityResponse'
  data?: Maybe<BlogPost>
}

export type BlogPostEntityResponseCollection = {
  __typename?: 'BlogPostEntityResponseCollection'
  nodes: Array<BlogPost>
  pageInfo: Pagination
}

export type BlogPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<BlogPostFiltersInput>
  not?: InputMaybe<BlogPostFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BlogPostInput = {
  coverMedia?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']['input']>>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type BlogPostRelationResponseCollection = {
  __typename?: 'BlogPostRelationResponseCollection'
  nodes: Array<BlogPost>
}

export type BlogPostSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsAssets
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsFaq
  | ComponentSectionsFlatText
  | ComponentSectionsGallery
  | ComponentSectionsSiteUsefullness
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Error

export type BookTag = {
  __typename?: 'BookTag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  displayName?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BookTagEntity = {
  __typename?: 'BookTagEntity'
  attributes?: Maybe<BookTag>
  id?: Maybe<Scalars['ID']['output']>
}

export type BookTagEntityResponse = {
  __typename?: 'BookTagEntityResponse'
  data?: Maybe<BookTag>
}

export type BookTagEntityResponseCollection = {
  __typename?: 'BookTagEntityResponseCollection'
  nodes: Array<BookTag>
  pageInfo: Pagination
}

export type BookTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  displayName?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<BookTagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BookTagInput = {
  displayName?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type BookTagRelationResponseCollection = {
  __typename?: 'BookTagRelationResponseCollection'
  nodes: Array<BookTag>
}

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  contains?: InputMaybe<Scalars['Boolean']['input']>
  containsi?: InputMaybe<Scalars['Boolean']['input']>
  endsWith?: InputMaybe<Scalars['Boolean']['input']>
  eq?: InputMaybe<Scalars['Boolean']['input']>
  eqi?: InputMaybe<Scalars['Boolean']['input']>
  gt?: InputMaybe<Scalars['Boolean']['input']>
  gte?: InputMaybe<Scalars['Boolean']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  lt?: InputMaybe<Scalars['Boolean']['input']>
  lte?: InputMaybe<Scalars['Boolean']['input']>
  ne?: InputMaybe<Scalars['Boolean']['input']>
  nei?: InputMaybe<Scalars['Boolean']['input']>
  not?: InputMaybe<BooleanFilterInput>
  notContains?: InputMaybe<Scalars['Boolean']['input']>
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  startsWith?: InputMaybe<Scalars['Boolean']['input']>
}

export type Branch = {
  __typename?: 'Branch'
  address?: Maybe<Scalars['String']['output']>
  barrierFreeInfo?: Maybe<Scalars['String']['output']>
  barrierFreeState?: Maybe<Enum_Branch_Barrierfreestate>
  body?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  email?: Maybe<Scalars['String']['output']>
  events: Array<Maybe<Event>>
  events_connection?: Maybe<EventRelationResponseCollection>
  latitude?: Maybe<Scalars['Float']['output']>
  listingImage?: Maybe<UploadFile>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Branch>>
  localizations_connection?: Maybe<BranchRelationResponseCollection>
  longitude?: Maybe<Scalars['Float']['output']>
  medias: Array<Maybe<UploadFile>>
  medias_connection?: Maybe<UploadFileRelationResponseCollection>
  openingHours?: Maybe<ComponentBlocksOpeningHours>
  phone?: Maybe<Scalars['String']['output']>
  publicTransportInfo?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  seo?: Maybe<ComponentCommonSeo>
  servicePages: Array<Maybe<Page>>
  servicePages_connection?: Maybe<PageRelationResponseCollection>
  slug: Scalars['String']['output']
  subBranches: Array<Maybe<Branch>>
  subBranches_connection?: Maybe<BranchRelationResponseCollection>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BranchEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchEvents_ConnectionArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchLocalizationsArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchServicePagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchServicePages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchSubBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchSubBranches_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BranchEntity = {
  __typename?: 'BranchEntity'
  attributes?: Maybe<Branch>
  id?: Maybe<Scalars['ID']['output']>
}

export type BranchEntityResponse = {
  __typename?: 'BranchEntityResponse'
  data?: Maybe<Branch>
}

export type BranchEntityResponseCollection = {
  __typename?: 'BranchEntityResponseCollection'
  nodes: Array<Branch>
  pageInfo: Pagination
}

export type BranchFiltersInput = {
  address?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>
  barrierFreeInfo?: InputMaybe<StringFilterInput>
  barrierFreeState?: InputMaybe<StringFilterInput>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  email?: InputMaybe<StringFilterInput>
  events?: InputMaybe<EventFiltersInput>
  latitude?: InputMaybe<FloatFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<BranchFiltersInput>
  longitude?: InputMaybe<FloatFilterInput>
  not?: InputMaybe<BranchFiltersInput>
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>
  phone?: InputMaybe<StringFilterInput>
  publicTransportInfo?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  servicePages?: InputMaybe<PageFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  subBranches?: InputMaybe<BranchFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BranchInput = {
  address?: InputMaybe<Scalars['String']['input']>
  barrierFreeInfo?: InputMaybe<Scalars['String']['input']>
  barrierFreeState?: InputMaybe<Enum_Branch_Barrierfreestate>
  body?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  latitude?: InputMaybe<Scalars['Float']['input']>
  listingImage?: InputMaybe<Scalars['ID']['input']>
  longitude?: InputMaybe<Scalars['Float']['input']>
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursInput>
  phone?: InputMaybe<Scalars['String']['input']>
  publicTransportInfo?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  servicePages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  slug?: InputMaybe<Scalars['String']['input']>
  subBranches?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection'
  nodes: Array<Branch>
}

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
}

export type ComponentAccordionItemsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
}

export type ComponentAccordionItemsFlatTextInput = {
  category?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentAccordionItemsForm = {
  __typename?: 'ComponentAccordionItemsForm'
  category?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  type?: Maybe<Enum_Componentaccordionitemsform_Type>
}

export type ComponentAccordionItemsFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFormFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsFormFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFormFiltersInput>>>
  type?: InputMaybe<StringFilterInput>
}

export type ComponentAccordionItemsFormInput = {
  category?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  type?: InputMaybe<Enum_Componentaccordionitemsform_Type>
}

export type ComponentAccordionItemsTableRow = {
  __typename?: 'ComponentAccordionItemsTableRow'
  accordionCategory?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  tableCategory?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
  valueAlign?: Maybe<Enum_Componentaccordionitemstablerow_Valuealign>
}

export type ComponentAccordionItemsTableRowFiltersInput = {
  accordionCategory?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowFiltersInput>>>
  tableCategory?: InputMaybe<StringFilterInput>
  value?: InputMaybe<StringFilterInput>
  valueAlign?: InputMaybe<StringFilterInput>
}

export type ComponentAccordionItemsTableRowInput = {
  accordionCategory?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  tableCategory?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['String']['input']>
  valueAlign?: InputMaybe<Enum_Componentaccordionitemstablerow_Valuealign>
}

export type ComponentAddressAddress = {
  __typename?: 'ComponentAddressAddress'
  id: Scalars['ID']['output']
  navigateTo?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentAddressAddressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAddressAddressFiltersInput>>>
  navigateTo?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAddressAddressFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAddressAddressFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentAddressAddressInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  navigateTo?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>
}

export type ComponentBlocksAccordionItemInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksBranchItem = {
  __typename?: 'ComponentBlocksBranchItem'
  branch?: Maybe<Branch>
  id: Scalars['ID']['output']
}

export type ComponentBlocksBranchItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>
  branch?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentBlocksBranchItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>
}

export type ComponentBlocksBranchItemInput = {
  branch?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentBlocksBranchItemWithPage = {
  __typename?: 'ComponentBlocksBranchItemWithPage'
  branch?: Maybe<Branch>
  id: Scalars['ID']['output']
  page?: Maybe<Page>
}

export type ComponentBlocksBranchItemWithPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>>>
  branch?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
}

export type ComponentBlocksBranchItemWithPageInput = {
  branch?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentBlocksFileItem = {
  __typename?: 'ComponentBlocksFileItem'
  attachment: UploadFile
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksFileItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
}

export type ComponentBlocksFileItemInput = {
  attachment?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksNoticeFiles = {
  __typename?: 'ComponentBlocksNoticeFiles'
  files?: Maybe<Array<Maybe<ComponentBlocksFileItem>>>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksNoticeFilesFilesArgs = {
  filters?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentBlocksNoticeFilesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksNoticeFilesFiltersInput>>>
  files?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  not?: InputMaybe<ComponentBlocksNoticeFilesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksNoticeFilesFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksNoticeFilesInput = {
  files?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksOpeningHours = {
  __typename?: 'ComponentBlocksOpeningHours'
  days: Array<Maybe<ComponentBlocksOpeningHoursItem>>
  id: Scalars['ID']['output']
}

export type ComponentBlocksOpeningHoursDaysArgs = {
  filters?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentBlocksOpeningHoursFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursFiltersInput>>>
  days?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  not?: InputMaybe<ComponentBlocksOpeningHoursFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursFiltersInput>>>
}

export type ComponentBlocksOpeningHoursInput = {
  days?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentBlocksOpeningHoursItem = {
  __typename?: 'ComponentBlocksOpeningHoursItem'
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  time: Scalars['String']['output']
}

export type ComponentBlocksOpeningHoursItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  time?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksOpeningHoursItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  time?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink'
  id: Scalars['ID']['output']
  page?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksPageLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  not?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksPageLinkInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  page?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksSubpageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageFiltersInput>>>
  description?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksSubpageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksSubpageInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksTableRow = {
  __typename?: 'ComponentBlocksTableRow'
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
  valueAlign?: Maybe<Enum_Componentblockstablerow_Valuealign>
}

export type ComponentBlocksTableRowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksTableRowFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksTableRowFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksTableRowFiltersInput>>>
  value?: InputMaybe<StringFilterInput>
  valueAlign?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksTableRowInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['String']['input']>
  valueAlign?: InputMaybe<Enum_Componentblockstablerow_Valuealign>
}

export type ComponentCommonSeo = {
  __typename?: 'ComponentCommonSeo'
  id: Scalars['ID']['output']
  keywords?: Maybe<Scalars['String']['output']>
  metaDescription?: Maybe<Scalars['String']['output']>
  metaTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentCommonSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCommonSeoFiltersInput>>>
  keywords?: InputMaybe<StringFilterInput>
  metaDescription?: InputMaybe<StringFilterInput>
  metaTitle?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentCommonSeoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentCommonSeoFiltersInput>>>
}

export type ComponentCommonSeoInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  keywords?: InputMaybe<Scalars['String']['input']>
  metaDescription?: InputMaybe<Scalars['String']['input']>
  metaTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentFooterFooterColumn = {
  __typename?: 'ComponentFooterFooterColumn'
  footerLink?: Maybe<Array<Maybe<ComponentFooterFooterLink>>>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentFooterFooterColumnFooterLinkArgs = {
  filters?: InputMaybe<ComponentFooterFooterLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentFooterFooterColumnFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnFiltersInput>>>
  footerLink?: InputMaybe<ComponentFooterFooterLinkFiltersInput>
  not?: InputMaybe<ComponentFooterFooterColumnFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentFooterFooterColumnInput = {
  footerLink?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentFooterFooterLink = {
  __typename?: 'ComponentFooterFooterLink'
  id: Scalars['ID']['output']
  otherSite?: Maybe<Scalars['String']['output']>
  redirectTo?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentFooterFooterLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkFiltersInput>>>
  not?: InputMaybe<ComponentFooterFooterLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkFiltersInput>>>
  otherSite?: InputMaybe<StringFilterInput>
  redirectTo?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentFooterFooterLinkInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  otherSite?: InputMaybe<Scalars['String']['input']>
  redirectTo?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentGuestsGuest = {
  __typename?: 'ComponentGuestsGuest'
  avatar?: Maybe<UploadFile>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  surname?: Maybe<Scalars['String']['output']>
}

export type ComponentGuestsGuestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentGuestsGuestFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>
  surname?: InputMaybe<StringFilterInput>
}

export type ComponentGuestsGuestInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  surname?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHomepageBenefits = {
  __typename?: 'ComponentHomepageBenefits'
  benefit?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
}

export type ComponentHomepageBenefitsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>
  benefit?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHomepageBenefitsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>
}

export type ComponentHomepageBenefitsInput = {
  benefit?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentHomepageCta = {
  __typename?: 'ComponentHomepageCta'
  ctaRedirectTo?: Maybe<Page>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentHomepageCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>
  ctaRedirectTo?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<ComponentHomepageCtaFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageCtaInput = {
  ctaRedirectTo?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHomepageFaqSection = {
  __typename?: 'ComponentHomepageFaqSection'
  ctas?: Maybe<Array<Maybe<ComponentHomepageCta>>>
  faqs?: Maybe<Array<Maybe<ComponentHomepageFaqs>>>
  id: Scalars['ID']['output']
  redirectTo?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentHomepageFaqSectionCtasArgs = {
  filters?: InputMaybe<ComponentHomepageCtaFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepageFaqSectionFaqsArgs = {
  filters?: InputMaybe<ComponentHomepageFaqsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepageFaqSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqSectionFiltersInput>>>
  ctas?: InputMaybe<ComponentHomepageCtaFiltersInput>
  faqs?: InputMaybe<ComponentHomepageFaqsFiltersInput>
  not?: InputMaybe<ComponentHomepageFaqSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqSectionFiltersInput>>>
  redirectTo?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageFaqSectionInput = {
  ctas?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaInput>>>
  faqs?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  redirectTo?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHomepageFaqs = {
  __typename?: 'ComponentHomepageFaqs'
  answer?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  question?: Maybe<Scalars['String']['output']>
}

export type ComponentHomepageFaqsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>
  answer?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHomepageFaqsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>
  question?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageFaqsInput = {
  answer?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  question?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHomepageNewsSection = {
  __typename?: 'ComponentHomepageNewsSection'
  id: Scalars['ID']['output']
  redirectTo?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentHomepageNewsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageNewsSectionFiltersInput>>>
  not?: InputMaybe<ComponentHomepageNewsSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageNewsSectionFiltersInput>>>
  redirectTo?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageNewsSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  redirectTo?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHomepagePromotedContent = {
  __typename?: 'ComponentHomepagePromotedContent'
  events: Array<Maybe<Event>>
  events_connection?: Maybe<EventRelationResponseCollection>
  id: Scalars['ID']['output']
  notices: Array<Maybe<Notice>>
  notices_connection?: Maybe<NoticeRelationResponseCollection>
}

export type ComponentHomepagePromotedContentEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepagePromotedContentEvents_ConnectionArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepagePromotedContentNoticesArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepagePromotedContentNotices_ConnectionArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepagePromotedContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepagePromotedContentFiltersInput>>>
  events?: InputMaybe<EventFiltersInput>
  not?: InputMaybe<ComponentHomepagePromotedContentFiltersInput>
  notices?: InputMaybe<NoticeFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepagePromotedContentFiltersInput>>>
}

export type ComponentHomepagePromotedContentInput = {
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  notices?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type ComponentHomepageRegistrationInfo = {
  __typename?: 'ComponentHomepageRegistrationInfo'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  redirectTo?: Maybe<Page>
  registrationBenefits?: Maybe<Array<Maybe<ComponentHomepageBenefits>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentHomepageRegistrationInfoRegistrationBenefitsArgs = {
  filters?: InputMaybe<ComponentHomepageBenefitsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHomepageRegistrationInfoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageRegistrationInfoFiltersInput>>>
  description?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHomepageRegistrationInfoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageRegistrationInfoFiltersInput>>>
  redirectTo?: InputMaybe<PageFiltersInput>
  registrationBenefits?: InputMaybe<ComponentHomepageBenefitsFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageRegistrationInfoInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  redirectTo?: InputMaybe<Scalars['ID']['input']>
  registrationBenefits?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentLocalityPartsGalleryParts = {
  __typename?: 'ComponentLocalityPartsGalleryParts'
  Description?: Maybe<Scalars['String']['output']>
  Photo?: Maybe<UploadFile>
  id: Scalars['ID']['output']
}

export type ComponentLocalityPartsGalleryPartsFiltersInput = {
  Description?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>
  not?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>
}

export type ComponentLocalityPartsGalleryPartsInput = {
  Description?: InputMaybe<Scalars['String']['input']>
  Photo?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentMenuSectionLinks = {
  __typename?: 'ComponentMenuSectionLinks'
  id: Scalars['ID']['output']
  sectionLinkBranch?: Maybe<Branch>
  sectionLinkPage?: Maybe<Page>
  sectionLinkTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuSectionLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksFiltersInput>>>
  not?: InputMaybe<ComponentMenuSectionLinksFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksFiltersInput>>>
  sectionLinkBranch?: InputMaybe<BranchFiltersInput>
  sectionLinkPage?: InputMaybe<PageFiltersInput>
  sectionLinkTitle?: InputMaybe<StringFilterInput>
}

export type ComponentMenuSectionLinksInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  sectionLinkBranch?: InputMaybe<Scalars['ID']['input']>
  sectionLinkPage?: InputMaybe<Scalars['ID']['input']>
  sectionLinkTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuSections = {
  __typename?: 'ComponentMenuSections'
  id: Scalars['ID']['output']
  sectionColumnSpan?: Maybe<Scalars['Int']['output']>
  sectionLinks?: Maybe<Array<Maybe<ComponentMenuSectionLinks>>>
  sectionPage?: Maybe<Page>
  sectionTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuSectionsSectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSectionLinksFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentMenuSectionsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsFiltersInput>>>
  not?: InputMaybe<ComponentMenuSectionsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsFiltersInput>>>
  sectionColumnSpan?: InputMaybe<IntFilterInput>
  sectionLinks?: InputMaybe<ComponentMenuSectionLinksFiltersInput>
  sectionPage?: InputMaybe<PageFiltersInput>
  sectionTitle?: InputMaybe<StringFilterInput>
}

export type ComponentMenuSectionsInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  sectionColumnSpan?: InputMaybe<Scalars['Int']['input']>
  sectionLinks?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksInput>>>
  sectionPage?: InputMaybe<Scalars['ID']['input']>
  sectionTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuSubsection = {
  __typename?: 'ComponentMenuSubsection'
  columnSpan?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  subsectionLinks?: Maybe<Array<Maybe<ComponentMenuSubsectionLinks>>>
  subsectionTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuSubsectionSubsectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentMenuSubsectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionFiltersInput>>>
  columnSpan?: InputMaybe<IntFilterInput>
  not?: InputMaybe<ComponentMenuSubsectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionFiltersInput>>>
  subsectionLinks?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>
  subsectionTitle?: InputMaybe<StringFilterInput>
}

export type ComponentMenuSubsectionInput = {
  columnSpan?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  subsectionLinks?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksInput>>>
  subsectionTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuSubsectionLinks = {
  __typename?: 'ComponentMenuSubsectionLinks'
  id: Scalars['ID']['output']
  page?: Maybe<Page>
  subsectionLinkTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuSubsectionLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>
  not?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subsectionLinkTitle?: InputMaybe<StringFilterInput>
}

export type ComponentMenuSubsectionLinksInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  subsectionLinkTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMetadataFaktury = {
  __typename?: 'ComponentMetadataFaktury'
  attachment?: Maybe<UploadFile>
  date?: Maybe<Scalars['Date']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
}

export type ComponentMetadataFakturyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataFakturyFiltersInput>>>
  date?: InputMaybe<DateFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMetadataFakturyFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataFakturyFiltersInput>>>
}

export type ComponentMetadataFakturyInput = {
  attachment?: InputMaybe<Scalars['ID']['input']>
  date?: InputMaybe<Scalars['Date']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMetadataMetadata = {
  __typename?: 'ComponentMetadataMetadata'
  amount?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  grant_name?: Maybe<Scalars['String']['output']>
  grant_number?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  provider?: Maybe<Scalars['String']['output']>
  year?: Maybe<Scalars['Int']['output']>
}

export type ComponentMetadataMetadataFiltersInput = {
  amount?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataMetadataFiltersInput>>>
  description?: InputMaybe<StringFilterInput>
  grant_name?: InputMaybe<StringFilterInput>
  grant_number?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMetadataMetadataFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataMetadataFiltersInput>>>
  provider?: InputMaybe<StringFilterInput>
  year?: InputMaybe<IntFilterInput>
}

export type ComponentMetadataMetadataInput = {
  amount?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  grant_name?: InputMaybe<Scalars['String']['input']>
  grant_number?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  year?: InputMaybe<Scalars['Int']['input']>
}

export type ComponentMetadataObchodnaVerejnaSutaz = {
  __typename?: 'ComponentMetadataObchodnaVerejnaSutaz'
  amount?: Maybe<Scalars['String']['output']>
  attachment?: Maybe<UploadFile>
  date_added?: Maybe<Scalars['Date']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  number?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
}

export type ComponentMetadataObchodnaVerejnaSutazFiltersInput = {
  amount?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataObchodnaVerejnaSutazFiltersInput>>>
  date_added?: InputMaybe<DateFilterInput>
  description?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMetadataObchodnaVerejnaSutazFiltersInput>
  number?: InputMaybe<StringFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataObchodnaVerejnaSutazFiltersInput>>>
  subject?: InputMaybe<StringFilterInput>
}

export type ComponentMetadataObchodnaVerejnaSutazInput = {
  amount?: InputMaybe<Scalars['String']['input']>
  attachment?: InputMaybe<Scalars['ID']['input']>
  date_added?: InputMaybe<Scalars['Date']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  subject?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMetadataObjednavky = {
  __typename?: 'ComponentMetadataObjednavky'
  attachment?: Maybe<UploadFile>
  date_added?: Maybe<Scalars['Date']['output']>
  date_period?: Maybe<Scalars['Date']['output']>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentMetadataObjednavkyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataObjednavkyFiltersInput>>>
  date_added?: InputMaybe<DateFilterInput>
  date_period?: InputMaybe<DateFilterInput>
  not?: InputMaybe<ComponentMetadataObjednavkyFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataObjednavkyFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentMetadataObjednavkyInput = {
  attachment?: InputMaybe<Scalars['ID']['input']>
  date_added?: InputMaybe<Scalars['Date']['input']>
  date_period?: InputMaybe<Scalars['Date']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMetadataVerejneObstaravanie = {
  __typename?: 'ComponentMetadataVerejneObstaravanie'
  amount?: Maybe<Scalars['String']['output']>
  attachment?: Maybe<UploadFile>
  date_added?: Maybe<Scalars['Date']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  number?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
}

export type ComponentMetadataVerejneObstaravanieFiltersInput = {
  amount?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataVerejneObstaravanieFiltersInput>>>
  date_added?: InputMaybe<DateFilterInput>
  description?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMetadataVerejneObstaravanieFiltersInput>
  number?: InputMaybe<StringFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataVerejneObstaravanieFiltersInput>>>
  subject?: InputMaybe<StringFilterInput>
}

export type ComponentMetadataVerejneObstaravanieInput = {
  amount?: InputMaybe<Scalars['String']['input']>
  attachment?: InputMaybe<Scalars['ID']['input']>
  date_added?: InputMaybe<Scalars['Date']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  subject?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMetadataZmluvy = {
  __typename?: 'ComponentMetadataZmluvy'
  amount?: Maybe<Scalars['String']['output']>
  date?: Maybe<Scalars['Date']['output']>
  id: Scalars['ID']['output']
  number?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
  supplier?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type ComponentMetadataZmluvyFiltersInput = {
  amount?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataZmluvyFiltersInput>>>
  date?: InputMaybe<DateFilterInput>
  not?: InputMaybe<ComponentMetadataZmluvyFiltersInput>
  number?: InputMaybe<StringFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataZmluvyFiltersInput>>>
  subject?: InputMaybe<StringFilterInput>
  supplier?: InputMaybe<StringFilterInput>
  type?: InputMaybe<StringFilterInput>
}

export type ComponentMetadataZmluvyInput = {
  amount?: InputMaybe<Scalars['String']['input']>
  date?: InputMaybe<Scalars['Date']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  subject?: InputMaybe<Scalars['String']['input']>
  supplier?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion'
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>
  forms?: Maybe<Array<Maybe<ComponentAccordionItemsForm>>>
  id: Scalars['ID']['output']
  tableRows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsAccordionFlatTextArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAccordionFormsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFormFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAccordionTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAccordionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionFiltersInput>>>
  flatText?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  forms?: InputMaybe<ComponentAccordionItemsFormFiltersInput>
  not?: InputMaybe<ComponentSectionsAccordionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionFiltersInput>>>
  tableRows?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAccordionInput = {
  flatText?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextInput>>>
  forms?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFormInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  tableRows?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsAssets = {
  __typename?: 'ComponentSectionsAssets'
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetRelationResponseCollection>
  basicDocuments: Array<Maybe<BasicDocument>>
  basicDocuments_connection?: Maybe<BasicDocumentRelationResponseCollection>
  disclosures: Array<Maybe<Disclosure>>
  disclosures_connection?: Maybe<DisclosureRelationResponseCollection>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsAssetsAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsBasicDocuments_ConnectionArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsDisclosuresArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsDisclosures_ConnectionArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsFiltersInput>>>
  assets?: InputMaybe<AssetFiltersInput>
  basicDocuments?: InputMaybe<BasicDocumentFiltersInput>
  disclosures?: InputMaybe<DisclosureFiltersInput>
  not?: InputMaybe<ComponentSectionsAssetsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAssetsInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  basicDocuments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  disclosures?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsAssetsListing = {
  __typename?: 'ComponentSectionsAssetsListing'
  id: Scalars['ID']['output']
}

export type ComponentSectionsAssetsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsAssetsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsListingFiltersInput>>>
}

export type ComponentSectionsAssetsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsBlogPostsListing = {
  __typename?: 'ComponentSectionsBlogPostsListing'
  id: Scalars['ID']['output']
}

export type ComponentSectionsBlogPostsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>>>
}

export type ComponentSectionsBlogPostsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsCherrypickSection = {
  __typename?: 'ComponentSectionsCherrypickSection'
  id: Scalars['ID']['output']
  pages: Array<Maybe<Page>>
  pages_connection?: Maybe<PageRelationResponseCollection>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsCherrypickSectionPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsCherrypickSectionPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsCherrypickSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCherrypickSectionFiltersInput>>>
  not?: InputMaybe<ComponentSectionsCherrypickSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCherrypickSectionFiltersInput>>>
  pages?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsCherrypickSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsChildrenListing = {
  __typename?: 'ComponentSectionsChildrenListing'
  depth: Enum_Componentsectionschildrenlisting_Depth
  id: Scalars['ID']['output']
}

export type ComponentSectionsChildrenListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsChildrenListingFiltersInput>>>
  depth?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsChildrenListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsChildrenListingFiltersInput>>>
}

export type ComponentSectionsChildrenListingInput = {
  depth?: InputMaybe<Enum_Componentsectionschildrenlisting_Depth>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsCta = {
  __typename?: 'ComponentSectionsCta'
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaFiltersInput>>>
  not?: InputMaybe<ComponentSectionsCtaFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsCtaInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider'
  id: Scalars['ID']['output']
}

export type ComponentSectionsDividerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
  not?: InputMaybe<ComponentSectionsDividerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
}

export type ComponentSectionsDividerInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsEventsListing = {
  __typename?: 'ComponentSectionsEventsListing'
  id: Scalars['ID']['output']
}

export type ComponentSectionsEventsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsEventsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsListingFiltersInput>>>
}

export type ComponentSectionsEventsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsFaq = {
  __typename?: 'ComponentSectionsFaq'
  ctaButton?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  questions?: Maybe<Array<Maybe<ComponentBlocksAccordionItem>>>
  redirectTo?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsFaqQuestionsArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqFiltersInput>>>
  ctaButton?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsFaqFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqFiltersInput>>>
  questions?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  redirectTo?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFaqInput = {
  ctaButton?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  questions?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemInput>>>
  redirectTo?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsFlatText = {
  __typename?: 'ComponentSectionsFlatText'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
}

export type ComponentSectionsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFlatTextFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFlatTextFiltersInput>>>
}

export type ComponentSectionsFlatTextInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsForm = {
  __typename?: 'ComponentSectionsForm'
  id: Scalars['ID']['output']
  type?: Maybe<Enum_Componentsectionsform_Type>
}

export type ComponentSectionsFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFormFiltersInput>>>
  not?: InputMaybe<ComponentSectionsFormFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFormFiltersInput>>>
  type?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFormInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  type?: InputMaybe<Enum_Componentsectionsform_Type>
}

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery'
  Gallery?: Maybe<Array<Maybe<ComponentLocalityPartsGalleryParts>>>
  id: Scalars['ID']['output']
}

export type ComponentSectionsGalleryGalleryArgs = {
  filters?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsGalleryFiltersInput = {
  Gallery?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
  not?: InputMaybe<ComponentSectionsGalleryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
}

export type ComponentSectionsGalleryInput = {
  Gallery?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsMap = {
  __typename?: 'ComponentSectionsMap'
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItem>>>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsMapBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsMapFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsMapFiltersInput>>>
  branches?: InputMaybe<ComponentBlocksBranchItemFiltersInput>
  not?: InputMaybe<ComponentSectionsMapFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsMapFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsMapInput = {
  branches?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsNewBooksListing = {
  __typename?: 'ComponentSectionsNewBooksListing'
  id: Scalars['ID']['output']
}

export type ComponentSectionsNewBooksListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewBooksListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsNewBooksListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewBooksListingFiltersInput>>>
}

export type ComponentSectionsNewBooksListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsNewsListing = {
  __typename?: 'ComponentSectionsNewsListing'
  id: Scalars['ID']['output']
}

export type ComponentSectionsNewsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsNewsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>
}

export type ComponentSectionsNewsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsOpeningHoursSection = {
  __typename?: 'ComponentSectionsOpeningHoursSection'
  branchList: Array<Maybe<Branch>>
  branchList_connection?: Maybe<BranchRelationResponseCollection>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsOpeningHoursSectionBranchListArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsOpeningHoursSectionBranchList_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsOpeningHoursSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>
  branchList?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsOpeningHoursSectionInput = {
  branchList?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsPartners = {
  __typename?: 'ComponentSectionsPartners'
  id: Scalars['ID']['output']
}

export type ComponentSectionsPartnersFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
  not?: InputMaybe<ComponentSectionsPartnersFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
}

export type ComponentSectionsPartnersInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsRental = {
  __typename?: 'ComponentSectionsRental'
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItemWithPage>>>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsRentalBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsRentalFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsRentalFiltersInput>>>
  branches?: InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>
  not?: InputMaybe<ComponentSectionsRentalFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsRentalFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsRentalInput = {
  branches?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemWithPageInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsSiteUsefullness = {
  __typename?: 'ComponentSectionsSiteUsefullness'
  id: Scalars['ID']['output']
  thankYouMessage?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsSiteUsefullnessFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>>>
  not?: InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>>>
  thankYouMessage?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsSiteUsefullnessInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  thankYouMessage?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsSubpages = {
  __typename?: 'ComponentSectionsSubpages'
  id: Scalars['ID']['output']
  subpages?: Maybe<Array<Maybe<ComponentBlocksSubpage>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsSubpagesSubpagesArgs = {
  filters?: InputMaybe<ComponentBlocksSubpageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsSubpagesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSubpagesFiltersInput>>>
  not?: InputMaybe<ComponentSectionsSubpagesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSubpagesFiltersInput>>>
  subpages?: InputMaybe<ComponentBlocksSubpageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsSubpagesInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  subpages?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsTable = {
  __typename?: 'ComponentSectionsTable'
  id: Scalars['ID']['output']
  primaryTitle?: Maybe<Scalars['String']['output']>
  rows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>
  secondaryTitle?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTableFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsTableFiltersInput>>>
  not?: InputMaybe<ComponentSectionsTableFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsTableFiltersInput>>>
  primaryTitle?: InputMaybe<StringFilterInput>
  rows?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  secondaryTitle?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsTableInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  primaryTitle?: InputMaybe<Scalars['String']['input']>
  rows?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowInput>>>
  secondaryTitle?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsVideo = {
  __typename?: 'ComponentSectionsVideo'
  id: Scalars['ID']['output']
  media?: Maybe<UploadFile>
  youtube_url?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsVideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsVideoFiltersInput>>>
  not?: InputMaybe<ComponentSectionsVideoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsVideoFiltersInput>>>
  youtube_url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsVideoInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  youtube_url?: InputMaybe<Scalars['String']['input']>
}

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  contains?: InputMaybe<Scalars['Date']['input']>
  containsi?: InputMaybe<Scalars['Date']['input']>
  endsWith?: InputMaybe<Scalars['Date']['input']>
  eq?: InputMaybe<Scalars['Date']['input']>
  eqi?: InputMaybe<Scalars['Date']['input']>
  gt?: InputMaybe<Scalars['Date']['input']>
  gte?: InputMaybe<Scalars['Date']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  lt?: InputMaybe<Scalars['Date']['input']>
  lte?: InputMaybe<Scalars['Date']['input']>
  ne?: InputMaybe<Scalars['Date']['input']>
  nei?: InputMaybe<Scalars['Date']['input']>
  not?: InputMaybe<DateFilterInput>
  notContains?: InputMaybe<Scalars['Date']['input']>
  notContainsi?: InputMaybe<Scalars['Date']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  startsWith?: InputMaybe<Scalars['Date']['input']>
}

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  contains?: InputMaybe<Scalars['DateTime']['input']>
  containsi?: InputMaybe<Scalars['DateTime']['input']>
  endsWith?: InputMaybe<Scalars['DateTime']['input']>
  eq?: InputMaybe<Scalars['DateTime']['input']>
  eqi?: InputMaybe<Scalars['DateTime']['input']>
  gt?: InputMaybe<Scalars['DateTime']['input']>
  gte?: InputMaybe<Scalars['DateTime']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  lt?: InputMaybe<Scalars['DateTime']['input']>
  lte?: InputMaybe<Scalars['DateTime']['input']>
  ne?: InputMaybe<Scalars['DateTime']['input']>
  nei?: InputMaybe<Scalars['DateTime']['input']>
  not?: InputMaybe<DateTimeFilterInput>
  notContains?: InputMaybe<Scalars['DateTime']['input']>
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  startsWith?: InputMaybe<Scalars['DateTime']['input']>
}

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse'
  documentId: Scalars['ID']['output']
}

export type Disclosure = {
  __typename?: 'Disclosure'
  addedAt: Scalars['DateTime']['output']
  amount?: Maybe<Scalars['Float']['output']>
  contractor?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  dateFrom?: Maybe<Scalars['Date']['output']>
  dateTo?: Maybe<Scalars['Date']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  file: Array<Maybe<UploadFile>>
  file_connection: UploadFileRelationResponseCollection
  grantProvider?: Maybe<Scalars['String']['output']>
  grantYear?: Maybe<Scalars['String']['output']>
  idNumber?: Maybe<Scalars['String']['output']>
  originalSlug?: Maybe<Scalars['String']['output']>
  originalTitle?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  type: Enum_Disclosure_Type
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DisclosureFileArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DisclosureFile_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DisclosureEntity = {
  __typename?: 'DisclosureEntity'
  attributes?: Maybe<Disclosure>
  id?: Maybe<Scalars['ID']['output']>
}

export type DisclosureEntityResponse = {
  __typename?: 'DisclosureEntityResponse'
  data?: Maybe<Disclosure>
}

export type DisclosureEntityResponseCollection = {
  __typename?: 'DisclosureEntityResponseCollection'
  nodes: Array<Disclosure>
  pageInfo: Pagination
}

export type DisclosureFiltersInput = {
  addedAt?: InputMaybe<DateTimeFilterInput>
  amount?: InputMaybe<FloatFilterInput>
  and?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>
  contractor?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  dateFrom?: InputMaybe<DateFilterInput>
  dateTo?: InputMaybe<DateFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  grantProvider?: InputMaybe<StringFilterInput>
  grantYear?: InputMaybe<StringFilterInput>
  idNumber?: InputMaybe<StringFilterInput>
  not?: InputMaybe<DisclosureFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>
  originalSlug?: InputMaybe<StringFilterInput>
  originalTitle?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DisclosureInput = {
  addedAt?: InputMaybe<Scalars['DateTime']['input']>
  amount?: InputMaybe<Scalars['Float']['input']>
  contractor?: InputMaybe<Scalars['String']['input']>
  dateFrom?: InputMaybe<Scalars['Date']['input']>
  dateTo?: InputMaybe<Scalars['Date']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  file?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  grantProvider?: InputMaybe<Scalars['String']['input']>
  grantYear?: InputMaybe<Scalars['String']['input']>
  idNumber?: InputMaybe<Scalars['String']['input']>
  originalSlug?: InputMaybe<Scalars['String']['input']>
  originalTitle?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Enum_Disclosure_Type>
}

export type DisclosureRelationResponseCollection = {
  __typename?: 'DisclosureRelationResponseCollection'
  nodes: Array<Disclosure>
}

export enum Enum_Branch_Barrierfreestate {
  CiastocnePristupny = 'ciastocne_pristupny',
  Nepristupny = 'nepristupny',
  Pristupny = 'pristupny',
}

export enum Enum_Componentaccordionitemsform_Type {
  AkaKnihaVamVKnizniciChyba = 'aka_kniha_vam_v_kniznici_chyba',
  AkoSaPrihlasitDoKniznice = 'ako_sa_prihlasit_do_kniznice',
  BibliografiaAResers = 'bibliografia_a_resers',
  Cyklodonaska = 'cyklodonaska',
  DarcekovaPoukazka = 'darcekova_poukazka',
  DetailPodujatia = 'detail_podujatia',
  DivadelnaTechnika = 'divadelna_technika',
  HraNaHudobneNastroje = 'hra_na_hudobne_nastroje',
  KniharskaDielna = 'kniharska_dielna',
  MedzikniznicnaVypozicnaSluzbaCitatel = 'medzikniznicna_vypozicna_sluzba_citatel',
  MedzikniznicnaVypozicnaSluzbaKniznica = 'medzikniznicna_vypozicna_sluzba_kniznica',
  NapisteNam = 'napiste_nam',
  PracujteVPriestorochKniznice = 'pracujte_v_priestoroch_kniznice',
  PreSkoly = 'pre_skoly',
  PrenajmiteSiPriestor = 'prenajmite_si_priestor',
  Tablety = 'tablety',
  TabletyACitacky = 'tablety_a_citacky',
}

export enum Enum_Componentaccordionitemstablerow_Valuealign {
  Center = 'center',
  Start = 'start',
}

export enum Enum_Componentblockstablerow_Valuealign {
  Center = 'center',
  Start = 'start',
}

export enum Enum_Componentsectionschildrenlisting_Depth {
  Depth_1 = 'depth_1',
  Depth_2 = 'depth_2',
}

export enum Enum_Componentsectionsform_Type {
  AkaKnihaVamVKnizniciChyba = 'aka_kniha_vam_v_kniznici_chyba',
  AkoSaPrihlasitDoKniznice = 'ako_sa_prihlasit_do_kniznice',
  BibliografiaAResers = 'bibliografia_a_resers',
  Cyklodonaska = 'cyklodonaska',
  DarcekovaPoukazka = 'darcekova_poukazka',
  DetailPodujatia = 'detail_podujatia',
  DivadelnaTechnika = 'divadelna_technika',
  HraNaHudobneNastroje = 'hra_na_hudobne_nastroje',
  KniharskaDielna = 'kniharska_dielna',
  MedzikniznicnaVypozicnaSluzbaCitatel = 'medzikniznicna_vypozicna_sluzba_citatel',
  MedzikniznicnaVypozicnaSluzbaKniznica = 'medzikniznicna_vypozicna_sluzba_kniznica',
  NapisteNam = 'napiste_nam',
  PracujteVPriestorochKniznice = 'pracujte_v_priestoroch_kniznice',
  PreSkoly = 'pre_skoly',
  PrenajmiteSiPriestor = 'prenajmite_si_priestor',
  Tablety = 'tablety',
  TabletyACitacky = 'tablety_a_citacky',
}

export enum Enum_Disclosure_Type {
  Faktury = 'Faktury',
  Granty = 'Granty',
  ObchodnaVerejnaSutaz = 'Obchodna_verejna_sutaz',
  Objednavky = 'Objednavky',
  Ostatne = 'Ostatne',
  VerejneObstaravanie = 'Verejne_obstaravanie',
  Zmluvy = 'Zmluvy',
}

export enum Enum_Page_Layout {
  ContentWithSidebar = 'content_with_sidebar',
  FullContent = 'full_content',
  Listing = 'listing',
  Sublisting = 'sublisting',
}

export type Error = {
  __typename?: 'Error'
  code: Scalars['String']['output']
  message?: Maybe<Scalars['String']['output']>
}

export type Event = {
  __typename?: 'Event'
  assets?: Maybe<ComponentSectionsAssets>
  branch?: Maybe<Branch>
  coverImage?: Maybe<UploadFile>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  dateFrom?: Maybe<Scalars['DateTime']['output']>
  dateTo?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  eventCategory?: Maybe<EventCategory>
  eventTags: Array<Maybe<EventTag>>
  eventTags_connection?: Maybe<EventTagRelationResponseCollection>
  gallery: Array<Maybe<UploadFile>>
  gallery_connection?: Maybe<UploadFileRelationResponseCollection>
  guests?: Maybe<Array<Maybe<ComponentGuestsGuest>>>
  listingImage?: Maybe<UploadFile>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Event>>
  localizations_connection?: Maybe<EventRelationResponseCollection>
  price?: Maybe<Scalars['Float']['output']>
  promoted?: Maybe<Scalars['Boolean']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  seo?: Maybe<ComponentCommonSeo>
  showForm?: Maybe<Scalars['Boolean']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type EventEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventEventTags_ConnectionArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventGallery_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventGuestsArgs = {
  filters?: InputMaybe<ComponentGuestsGuestFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventLocalizationsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventLocalizations_ConnectionArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventCategory = {
  __typename?: 'EventCategory'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<EventCategory>>
  localizations_connection?: Maybe<EventCategoryRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type EventCategoryLocalizationsArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventCategoryEntity = {
  __typename?: 'EventCategoryEntity'
  attributes?: Maybe<EventCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type EventCategoryEntityResponse = {
  __typename?: 'EventCategoryEntityResponse'
  data?: Maybe<EventCategory>
}

export type EventCategoryEntityResponseCollection = {
  __typename?: 'EventCategoryEntityResponseCollection'
  nodes: Array<EventCategory>
  pageInfo: Pagination
}

export type EventCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<EventCategoryFiltersInput>
  not?: InputMaybe<EventCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type EventCategoryInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type EventCategoryRelationResponseCollection = {
  __typename?: 'EventCategoryRelationResponseCollection'
  nodes: Array<EventCategory>
}

export type EventEntity = {
  __typename?: 'EventEntity'
  attributes?: Maybe<Event>
  id?: Maybe<Scalars['ID']['output']>
}

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse'
  data?: Maybe<Event>
}

export type EventEntityResponseCollection = {
  __typename?: 'EventEntityResponseCollection'
  nodes: Array<Event>
  pageInfo: Pagination
}

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>
  assets?: InputMaybe<ComponentSectionsAssetsFiltersInput>
  branch?: InputMaybe<BranchFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  dateFrom?: InputMaybe<DateTimeFilterInput>
  dateTo?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  eventCategory?: InputMaybe<EventCategoryFiltersInput>
  eventTags?: InputMaybe<EventTagFiltersInput>
  guests?: InputMaybe<ComponentGuestsGuestFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<EventFiltersInput>
  not?: InputMaybe<EventFiltersInput>
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>
  price?: InputMaybe<FloatFilterInput>
  promoted?: InputMaybe<BooleanFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  showForm?: InputMaybe<BooleanFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type EventInput = {
  assets?: InputMaybe<ComponentSectionsAssetsInput>
  branch?: InputMaybe<Scalars['ID']['input']>
  coverImage?: InputMaybe<Scalars['ID']['input']>
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>
  dateTo?: InputMaybe<Scalars['DateTime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  eventCategory?: InputMaybe<Scalars['ID']['input']>
  eventTags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  gallery?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  guests?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestInput>>>
  listingImage?: InputMaybe<Scalars['ID']['input']>
  price?: InputMaybe<Scalars['Float']['input']>
  promoted?: InputMaybe<Scalars['Boolean']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  showForm?: InputMaybe<Scalars['Boolean']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection'
  nodes: Array<Event>
}

export type EventTag = {
  __typename?: 'EventTag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<EventTag>>
  localizations_connection?: Maybe<EventTagRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type EventTagLocalizationsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventTagLocalizations_ConnectionArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type EventTagEntity = {
  __typename?: 'EventTagEntity'
  attributes?: Maybe<EventTag>
  id?: Maybe<Scalars['ID']['output']>
}

export type EventTagEntityResponse = {
  __typename?: 'EventTagEntityResponse'
  data?: Maybe<EventTag>
}

export type EventTagEntityResponseCollection = {
  __typename?: 'EventTagEntityResponseCollection'
  nodes: Array<EventTag>
  pageInfo: Pagination
}

export type EventTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<EventTagFiltersInput>
  not?: InputMaybe<EventTagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<EventTagFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type EventTagInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type EventTagRelationResponseCollection = {
  __typename?: 'EventTagRelationResponseCollection'
  nodes: Array<EventTag>
}

export type FileCategory = {
  __typename?: 'FileCategory'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  page?: Maybe<Page>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FileCategoryEntity = {
  __typename?: 'FileCategoryEntity'
  attributes?: Maybe<FileCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type FileCategoryEntityResponse = {
  __typename?: 'FileCategoryEntityResponse'
  data?: Maybe<FileCategory>
}

export type FileCategoryEntityResponseCollection = {
  __typename?: 'FileCategoryEntityResponseCollection'
  nodes: Array<FileCategory>
  pageInfo: Pagination
}

export type FileCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<FileCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FileCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type FileCategoryRelationResponseCollection = {
  __typename?: 'FileCategoryRelationResponseCollection'
  nodes: Array<FileCategory>
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>
  caption?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  contains?: InputMaybe<Scalars['Float']['input']>
  containsi?: InputMaybe<Scalars['Float']['input']>
  endsWith?: InputMaybe<Scalars['Float']['input']>
  eq?: InputMaybe<Scalars['Float']['input']>
  eqi?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  ne?: InputMaybe<Scalars['Float']['input']>
  nei?: InputMaybe<Scalars['Float']['input']>
  not?: InputMaybe<FloatFilterInput>
  notContains?: InputMaybe<Scalars['Float']['input']>
  notContainsi?: InputMaybe<Scalars['Float']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  startsWith?: InputMaybe<Scalars['Float']['input']>
}

export type Footer = {
  __typename?: 'Footer'
  copyrightText?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  footerColumns?: Maybe<Array<Maybe<ComponentFooterFooterColumn>>>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Footer>>
  localizations_connection?: Maybe<FooterRelationResponseCollection>
  privacyLink?: Maybe<Page>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  siteMapLink?: Maybe<Page>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FooterFooterColumnsArgs = {
  filters?: InputMaybe<ComponentFooterFooterColumnFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooterEntity = {
  __typename?: 'FooterEntity'
  attributes?: Maybe<Footer>
  id?: Maybe<Scalars['ID']['output']>
}

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse'
  data?: Maybe<Footer>
}

export type FooterEntityResponseCollection = {
  __typename?: 'FooterEntityResponseCollection'
  nodes: Array<Footer>
  pageInfo: Pagination
}

export type FooterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>
  copyrightText?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  footerColumns?: InputMaybe<ComponentFooterFooterColumnFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<FooterFiltersInput>
  not?: InputMaybe<FooterFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>
  privacyLink?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  siteMapLink?: InputMaybe<PageFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FooterInput = {
  copyrightText?: InputMaybe<Scalars['String']['input']>
  footerColumns?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnInput>>>
  privacyLink?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  siteMapLink?: InputMaybe<Scalars['ID']['input']>
}

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection'
  nodes: Array<Footer>
}

export type General = {
  __typename?: 'General'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  eventsPage?: Maybe<Page>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<General>>
  localizations_connection?: Maybe<GeneralRelationResponseCollection>
  newBooksPage?: Maybe<Page>
  noticesPage?: Maybe<Page>
  openingHoursPage?: Maybe<Page>
  privacyTermsAndConditionsPage?: Maybe<Page>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type GeneralEntity = {
  __typename?: 'GeneralEntity'
  attributes?: Maybe<General>
  id?: Maybe<Scalars['ID']['output']>
}

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse'
  data?: Maybe<General>
}

export type GeneralEntityResponseCollection = {
  __typename?: 'GeneralEntityResponseCollection'
  nodes: Array<General>
  pageInfo: Pagination
}

export type GeneralFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  eventsPage?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<GeneralFiltersInput>
  newBooksPage?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<GeneralFiltersInput>
  noticesPage?: InputMaybe<PageFiltersInput>
  openingHoursPage?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>
  privacyTermsAndConditionsPage?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type GeneralInput = {
  eventsPage?: InputMaybe<Scalars['ID']['input']>
  newBooksPage?: InputMaybe<Scalars['ID']['input']>
  noticesPage?: InputMaybe<Scalars['ID']['input']>
  openingHoursPage?: InputMaybe<Scalars['ID']['input']>
  privacyTermsAndConditionsPage?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection'
  nodes: Array<General>
}

export type GenericMorph =
  | Asset
  | AssetCategory
  | BasicDocument
  | BlogPost
  | BookTag
  | Branch
  | ComponentAccordionItemsFlatText
  | ComponentAccordionItemsForm
  | ComponentAccordionItemsTableRow
  | ComponentAddressAddress
  | ComponentBlocksAccordionItem
  | ComponentBlocksBranchItem
  | ComponentBlocksBranchItemWithPage
  | ComponentBlocksFileItem
  | ComponentBlocksNoticeFiles
  | ComponentBlocksOpeningHours
  | ComponentBlocksOpeningHoursItem
  | ComponentBlocksPageLink
  | ComponentBlocksSubpage
  | ComponentBlocksTableRow
  | ComponentCommonSeo
  | ComponentFooterFooterColumn
  | ComponentFooterFooterLink
  | ComponentGuestsGuest
  | ComponentHomepageBenefits
  | ComponentHomepageCta
  | ComponentHomepageFaqSection
  | ComponentHomepageFaqs
  | ComponentHomepageNewsSection
  | ComponentHomepagePromotedContent
  | ComponentHomepageRegistrationInfo
  | ComponentLocalityPartsGalleryParts
  | ComponentMenuSectionLinks
  | ComponentMenuSections
  | ComponentMenuSubsection
  | ComponentMenuSubsectionLinks
  | ComponentMetadataFaktury
  | ComponentMetadataMetadata
  | ComponentMetadataObchodnaVerejnaSutaz
  | ComponentMetadataObjednavky
  | ComponentMetadataVerejneObstaravanie
  | ComponentMetadataZmluvy
  | ComponentSectionsAccordion
  | ComponentSectionsAssets
  | ComponentSectionsAssetsListing
  | ComponentSectionsBlogPostsListing
  | ComponentSectionsCherrypickSection
  | ComponentSectionsChildrenListing
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsEventsListing
  | ComponentSectionsFaq
  | ComponentSectionsFlatText
  | ComponentSectionsForm
  | ComponentSectionsGallery
  | ComponentSectionsMap
  | ComponentSectionsNewBooksListing
  | ComponentSectionsNewsListing
  | ComponentSectionsOpeningHoursSection
  | ComponentSectionsPartners
  | ComponentSectionsRental
  | ComponentSectionsSiteUsefullness
  | ComponentSectionsSubpages
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Disclosure
  | Event
  | EventCategory
  | EventTag
  | FileCategory
  | Footer
  | General
  | HomePage
  | I18NLocale
  | Menu
  | NavikronosNavikronosStorage
  | Notice
  | Page
  | Partner
  | ReviewWorkflowsWorkflow
  | ReviewWorkflowsWorkflowStage
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser

export type HomePage = {
  __typename?: 'HomePage'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  faqSection?: Maybe<ComponentHomepageFaqSection>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<HomePage>>
  localizations_connection?: Maybe<HomePageRelationResponseCollection>
  mapSection?: Maybe<ComponentSectionsMap>
  newsSection?: Maybe<ComponentHomepageNewsSection>
  promotedContent?: Maybe<ComponentHomepagePromotedContent>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  registrationInfoSection?: Maybe<ComponentHomepageRegistrationInfo>
  seo?: Maybe<ComponentCommonSeo>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type HomePageEntity = {
  __typename?: 'HomePageEntity'
  attributes?: Maybe<HomePage>
  id?: Maybe<Scalars['ID']['output']>
}

export type HomePageEntityResponse = {
  __typename?: 'HomePageEntityResponse'
  data?: Maybe<HomePage>
}

export type HomePageEntityResponseCollection = {
  __typename?: 'HomePageEntityResponseCollection'
  nodes: Array<HomePage>
  pageInfo: Pagination
}

export type HomePageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HomePageFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  faqSection?: InputMaybe<ComponentHomepageFaqSectionFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<HomePageFiltersInput>
  mapSection?: InputMaybe<ComponentSectionsMapFiltersInput>
  newsSection?: InputMaybe<ComponentHomepageNewsSectionFiltersInput>
  not?: InputMaybe<HomePageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<HomePageFiltersInput>>>
  promotedContent?: InputMaybe<ComponentHomepagePromotedContentFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  registrationInfoSection?: InputMaybe<ComponentHomepageRegistrationInfoFiltersInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type HomePageInput = {
  faqSection?: InputMaybe<ComponentHomepageFaqSectionInput>
  mapSection?: InputMaybe<ComponentSectionsMapInput>
  newsSection?: InputMaybe<ComponentHomepageNewsSectionInput>
  promotedContent?: InputMaybe<ComponentHomepagePromotedContentInput>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  registrationInfoSection?: InputMaybe<ComponentHomepageRegistrationInfoInput>
  seo?: InputMaybe<ComponentCommonSeoInput>
}

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection'
  nodes: Array<HomePage>
}

export type I18NLocale = {
  __typename?: 'I18NLocale'
  code?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity'
  attributes?: Maybe<I18NLocale>
  id?: Maybe<Scalars['ID']['output']>
}

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse'
  data?: Maybe<I18NLocale>
}

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection'
  nodes: Array<I18NLocale>
  pageInfo: Pagination
}

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  code?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<I18NLocaleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type I18NLocaleInput = {
  code?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type I18NLocaleRelationResponseCollection = {
  __typename?: 'I18NLocaleRelationResponseCollection'
  nodes: Array<I18NLocale>
}

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  contains?: InputMaybe<Scalars['ID']['input']>
  containsi?: InputMaybe<Scalars['ID']['input']>
  endsWith?: InputMaybe<Scalars['ID']['input']>
  eq?: InputMaybe<Scalars['ID']['input']>
  eqi?: InputMaybe<Scalars['ID']['input']>
  gt?: InputMaybe<Scalars['ID']['input']>
  gte?: InputMaybe<Scalars['ID']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  lt?: InputMaybe<Scalars['ID']['input']>
  lte?: InputMaybe<Scalars['ID']['input']>
  ne?: InputMaybe<Scalars['ID']['input']>
  nei?: InputMaybe<Scalars['ID']['input']>
  not?: InputMaybe<IdFilterInput>
  notContains?: InputMaybe<Scalars['ID']['input']>
  notContainsi?: InputMaybe<Scalars['ID']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  startsWith?: InputMaybe<Scalars['ID']['input']>
}

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  contains?: InputMaybe<Scalars['Int']['input']>
  containsi?: InputMaybe<Scalars['Int']['input']>
  endsWith?: InputMaybe<Scalars['Int']['input']>
  eq?: InputMaybe<Scalars['Int']['input']>
  eqi?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  ne?: InputMaybe<Scalars['Int']['input']>
  nei?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntFilterInput>
  notContains?: InputMaybe<Scalars['Int']['input']>
  notContainsi?: InputMaybe<Scalars['Int']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  startsWith?: InputMaybe<Scalars['Int']['input']>
}

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  contains?: InputMaybe<Scalars['JSON']['input']>
  containsi?: InputMaybe<Scalars['JSON']['input']>
  endsWith?: InputMaybe<Scalars['JSON']['input']>
  eq?: InputMaybe<Scalars['JSON']['input']>
  eqi?: InputMaybe<Scalars['JSON']['input']>
  gt?: InputMaybe<Scalars['JSON']['input']>
  gte?: InputMaybe<Scalars['JSON']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  lt?: InputMaybe<Scalars['JSON']['input']>
  lte?: InputMaybe<Scalars['JSON']['input']>
  ne?: InputMaybe<Scalars['JSON']['input']>
  nei?: InputMaybe<Scalars['JSON']['input']>
  not?: InputMaybe<JsonFilterInput>
  notContains?: InputMaybe<Scalars['JSON']['input']>
  notContainsi?: InputMaybe<Scalars['JSON']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  startsWith?: InputMaybe<Scalars['JSON']['input']>
}

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  contains?: InputMaybe<Scalars['Long']['input']>
  containsi?: InputMaybe<Scalars['Long']['input']>
  endsWith?: InputMaybe<Scalars['Long']['input']>
  eq?: InputMaybe<Scalars['Long']['input']>
  eqi?: InputMaybe<Scalars['Long']['input']>
  gt?: InputMaybe<Scalars['Long']['input']>
  gte?: InputMaybe<Scalars['Long']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  lt?: InputMaybe<Scalars['Long']['input']>
  lte?: InputMaybe<Scalars['Long']['input']>
  ne?: InputMaybe<Scalars['Long']['input']>
  nei?: InputMaybe<Scalars['Long']['input']>
  not?: InputMaybe<LongFilterInput>
  notContains?: InputMaybe<Scalars['Long']['input']>
  notContainsi?: InputMaybe<Scalars['Long']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  startsWith?: InputMaybe<Scalars['Long']['input']>
}

export type Menu = {
  __typename?: 'Menu'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Menu>>
  localizations_connection?: Maybe<MenuRelationResponseCollection>
  menuSections?: Maybe<Array<Maybe<ComponentMenuSections>>>
  menuTitle?: Maybe<Scalars['String']['output']>
  menuTotalColumns?: Maybe<Scalars['Int']['output']>
  order?: Maybe<Scalars['Int']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type MenuLocalizationsArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type MenuLocalizations_ConnectionArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type MenuMenuSectionsArgs = {
  filters?: InputMaybe<ComponentMenuSectionsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type MenuEntity = {
  __typename?: 'MenuEntity'
  attributes?: Maybe<Menu>
  id?: Maybe<Scalars['ID']['output']>
}

export type MenuEntityResponse = {
  __typename?: 'MenuEntityResponse'
  data?: Maybe<Menu>
}

export type MenuEntityResponseCollection = {
  __typename?: 'MenuEntityResponseCollection'
  nodes: Array<Menu>
  pageInfo: Pagination
}

export type MenuFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<MenuFiltersInput>
  menuSections?: InputMaybe<ComponentMenuSectionsFiltersInput>
  menuTitle?: InputMaybe<StringFilterInput>
  menuTotalColumns?: InputMaybe<IntFilterInput>
  not?: InputMaybe<MenuFiltersInput>
  or?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>
  order?: InputMaybe<IntFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type MenuInput = {
  menuSections?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsInput>>>
  menuTitle?: InputMaybe<Scalars['String']['input']>
  menuTotalColumns?: InputMaybe<Scalars['Int']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection'
  nodes: Array<Menu>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>
  createAsset?: Maybe<Asset>
  createAssetCategory?: Maybe<AssetCategory>
  createBasicDocument?: Maybe<BasicDocument>
  createBlogPost?: Maybe<BlogPost>
  createBookTag?: Maybe<BookTag>
  createBranch?: Maybe<Branch>
  createDisclosure?: Maybe<Disclosure>
  createEvent?: Maybe<Event>
  createEventCategory?: Maybe<EventCategory>
  createEventTag?: Maybe<EventTag>
  createFileCategory?: Maybe<FileCategory>
  createMenu?: Maybe<Menu>
  createNotice?: Maybe<Notice>
  createPage?: Maybe<Page>
  createPartner?: Maybe<Partner>
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse
  deleteAsset?: Maybe<DeleteMutationResponse>
  deleteAssetCategory?: Maybe<DeleteMutationResponse>
  deleteBasicDocument?: Maybe<DeleteMutationResponse>
  deleteBlogPost?: Maybe<DeleteMutationResponse>
  deleteBookTag?: Maybe<DeleteMutationResponse>
  deleteBranch?: Maybe<DeleteMutationResponse>
  deleteDisclosure?: Maybe<DeleteMutationResponse>
  deleteEvent?: Maybe<DeleteMutationResponse>
  deleteEventCategory?: Maybe<DeleteMutationResponse>
  deleteEventTag?: Maybe<DeleteMutationResponse>
  deleteFileCategory?: Maybe<DeleteMutationResponse>
  deleteFooter?: Maybe<DeleteMutationResponse>
  deleteGeneral?: Maybe<DeleteMutationResponse>
  deleteHomePage?: Maybe<DeleteMutationResponse>
  deleteMenu?: Maybe<DeleteMutationResponse>
  deleteNavikronosNavikronosStorage?: Maybe<DeleteMutationResponse>
  deleteNotice?: Maybe<DeleteMutationResponse>
  deletePage?: Maybe<DeleteMutationResponse>
  deletePartner?: Maybe<DeleteMutationResponse>
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>
  deleteUploadFile?: Maybe<UploadFile>
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  /** Register a user */
  register: UsersPermissionsLoginPayload
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateAsset?: Maybe<Asset>
  updateAssetCategory?: Maybe<AssetCategory>
  updateBasicDocument?: Maybe<BasicDocument>
  updateBlogPost?: Maybe<BlogPost>
  updateBookTag?: Maybe<BookTag>
  updateBranch?: Maybe<Branch>
  updateDisclosure?: Maybe<Disclosure>
  updateEvent?: Maybe<Event>
  updateEventCategory?: Maybe<EventCategory>
  updateEventTag?: Maybe<EventTag>
  updateFileCategory?: Maybe<FileCategory>
  updateFooter?: Maybe<Footer>
  updateGeneral?: Maybe<General>
  updateHomePage?: Maybe<HomePage>
  updateMenu?: Maybe<Menu>
  updateNavikronosNavikronosStorage?: Maybe<NavikronosNavikronosStorage>
  updateNotice?: Maybe<Notice>
  updatePage?: Maybe<Page>
  updatePartner?: Maybe<Partner>
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  updateUploadFile: UploadFile
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
}

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationCreateAssetArgs = {
  data: AssetInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateAssetCategoryArgs = {
  data: AssetCategoryInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateBasicDocumentArgs = {
  data: BasicDocumentInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateBookTagArgs = {
  data: BookTagInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateBranchArgs = {
  data: BranchInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateDisclosureArgs = {
  data: DisclosureInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateEventArgs = {
  data: EventInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateEventCategoryArgs = {
  data: EventCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateEventTagArgs = {
  data: EventTagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateFileCategoryArgs = {
  data: FileCategoryInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateMenuArgs = {
  data: MenuInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateNoticeArgs = {
  data: NoticeInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreatePageArgs = {
  data: PageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreatePartnerArgs = {
  data: PartnerInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
}

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
}

export type MutationDeleteAssetArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteAssetCategoryArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteBasicDocumentArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteBlogPostArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteBookTagArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteBranchArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteDisclosureArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteEventArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteEventCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteEventTagArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteFileCategoryArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteMenuArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteNoticeArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePageArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePartnerArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input']
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationResetPasswordArgs = {
  code: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationUpdateAssetArgs = {
  data: AssetInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateAssetCategoryArgs = {
  data: AssetCategoryInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateBasicDocumentArgs = {
  data: BasicDocumentInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateBookTagArgs = {
  data: BookTagInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateBranchArgs = {
  data: BranchInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateDisclosureArgs = {
  data: DisclosureInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateEventArgs = {
  data: EventInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateEventCategoryArgs = {
  data: EventCategoryInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateEventTagArgs = {
  data: EventTagInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateFileCategoryArgs = {
  data: FileCategoryInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateFooterArgs = {
  data: FooterInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateGeneralArgs = {
  data: GeneralInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateHomePageArgs = {
  data: HomePageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateMenuArgs = {
  data: MenuInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateNavikronosNavikronosStorageArgs = {
  data: NavikronosNavikronosStorageInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateNoticeArgs = {
  data: NoticeInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdatePageArgs = {
  data: PageInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdatePartnerArgs = {
  data: PartnerInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input']
  info?: InputMaybe<FileInfoInput>
}

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
  id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
  id: Scalars['ID']['input']
}

export type NavikronosNavikronosStorage = {
  __typename?: 'NavikronosNavikronosStorage'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  data?: Maybe<Scalars['JSON']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NavikronosNavikronosStorageEntity = {
  __typename?: 'NavikronosNavikronosStorageEntity'
  attributes?: Maybe<NavikronosNavikronosStorage>
  id?: Maybe<Scalars['ID']['output']>
}

export type NavikronosNavikronosStorageEntityResponse = {
  __typename?: 'NavikronosNavikronosStorageEntityResponse'
  data?: Maybe<NavikronosNavikronosStorage>
}

export type NavikronosNavikronosStorageEntityResponseCollection = {
  __typename?: 'NavikronosNavikronosStorageEntityResponseCollection'
  nodes: Array<NavikronosNavikronosStorage>
  pageInfo: Pagination
}

export type NavikronosNavikronosStorageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NavikronosNavikronosStorageFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  data?: InputMaybe<JsonFilterInput>
  not?: InputMaybe<NavikronosNavikronosStorageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<NavikronosNavikronosStorageFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type NavikronosNavikronosStorageInput = {
  data?: InputMaybe<Scalars['JSON']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type NavikronosNavikronosStorageRelationResponseCollection = {
  __typename?: 'NavikronosNavikronosStorageRelationResponseCollection'
  nodes: Array<NavikronosNavikronosStorage>
}

export type Notice = {
  __typename?: 'Notice'
  assets?: Maybe<ComponentSectionsAssets>
  body?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  dateAdded?: Maybe<Scalars['Date']['output']>
  documentId: Scalars['ID']['output']
  isCurrentChangeInOpeningHours?: Maybe<Scalars['Boolean']['output']>
  listingImage?: Maybe<UploadFile>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Notice>>
  localizations_connection?: Maybe<NoticeRelationResponseCollection>
  promoted?: Maybe<Scalars['Boolean']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type NoticeLocalizationsArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type NoticeLocalizations_ConnectionArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type NoticeEntity = {
  __typename?: 'NoticeEntity'
  attributes?: Maybe<Notice>
  id?: Maybe<Scalars['ID']['output']>
}

export type NoticeEntityResponse = {
  __typename?: 'NoticeEntityResponse'
  data?: Maybe<Notice>
}

export type NoticeEntityResponseCollection = {
  __typename?: 'NoticeEntityResponseCollection'
  nodes: Array<Notice>
  pageInfo: Pagination
}

export type NoticeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NoticeFiltersInput>>>
  assets?: InputMaybe<ComponentSectionsAssetsFiltersInput>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  dateAdded?: InputMaybe<DateFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  isCurrentChangeInOpeningHours?: InputMaybe<BooleanFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<NoticeFiltersInput>
  not?: InputMaybe<NoticeFiltersInput>
  or?: InputMaybe<Array<InputMaybe<NoticeFiltersInput>>>
  promoted?: InputMaybe<BooleanFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type NoticeInput = {
  assets?: InputMaybe<ComponentSectionsAssetsInput>
  body?: InputMaybe<Scalars['String']['input']>
  dateAdded?: InputMaybe<Scalars['Date']['input']>
  isCurrentChangeInOpeningHours?: InputMaybe<Scalars['Boolean']['input']>
  listingImage?: InputMaybe<Scalars['ID']['input']>
  promoted?: InputMaybe<Scalars['Boolean']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type NoticeRelationResponseCollection = {
  __typename?: 'NoticeRelationResponseCollection'
  nodes: Array<Notice>
}

export type Page = {
  __typename?: 'Page'
  branchesServicesTo: Array<Maybe<Branch>>
  branchesServicesTo_connection?: Maybe<BranchRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  layout?: Maybe<Enum_Page_Layout>
  listingImage?: Maybe<UploadFile>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Page>>
  localizations_connection?: Maybe<PageRelationResponseCollection>
  newSlug: Scalars['String']['output']
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageBranchesServicesToArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageBranchesServicesTo_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageEntity = {
  __typename?: 'PageEntity'
  attributes?: Maybe<Page>
  id?: Maybe<Scalars['ID']['output']>
}

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse'
  data?: Maybe<Page>
}

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection'
  nodes: Array<Page>
  pageInfo: Pagination
}

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  branchesServicesTo?: InputMaybe<BranchFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  layout?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PageFiltersInput>
  newSlug?: InputMaybe<StringFilterInput>
  not?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageInput = {
  branchesServicesTo?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  layout?: InputMaybe<Enum_Page_Layout>
  listingImage?: InputMaybe<Scalars['ID']['input']>
  newSlug?: InputMaybe<Scalars['String']['input']>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']['input']>>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection'
  nodes: Array<Page>
}

export type PageSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsAssets
  | ComponentSectionsAssetsListing
  | ComponentSectionsBlogPostsListing
  | ComponentSectionsCherrypickSection
  | ComponentSectionsChildrenListing
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsEventsListing
  | ComponentSectionsFaq
  | ComponentSectionsFlatText
  | ComponentSectionsForm
  | ComponentSectionsGallery
  | ComponentSectionsMap
  | ComponentSectionsNewBooksListing
  | ComponentSectionsNewsListing
  | ComponentSectionsOpeningHoursSection
  | ComponentSectionsPartners
  | ComponentSectionsRental
  | ComponentSectionsSiteUsefullness
  | ComponentSectionsSubpages
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Error

export type Pagination = {
  __typename?: 'Pagination'
  page: Scalars['Int']['output']
  pageCount: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
}

export type Partner = {
  __typename?: 'Partner'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  featured?: Maybe<Scalars['Boolean']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Partner>>
  localizations_connection?: Maybe<PartnerRelationResponseCollection>
  logo?: Maybe<UploadFile>
  priority?: Maybe<Scalars['Float']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type PartnerLocalizationsArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PartnerLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PartnerEntity = {
  __typename?: 'PartnerEntity'
  attributes?: Maybe<Partner>
  id?: Maybe<Scalars['ID']['output']>
}

export type PartnerEntityResponse = {
  __typename?: 'PartnerEntityResponse'
  data?: Maybe<Partner>
}

export type PartnerEntityResponseCollection = {
  __typename?: 'PartnerEntityResponseCollection'
  nodes: Array<Partner>
  pageInfo: Pagination
}

export type PartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  featured?: InputMaybe<BooleanFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PartnerFiltersInput>
  not?: InputMaybe<PartnerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>
  priority?: InputMaybe<FloatFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type PartnerInput = {
  featured?: InputMaybe<Scalars['Boolean']['input']>
  logo?: InputMaybe<Scalars['ID']['input']>
  priority?: InputMaybe<Scalars['Float']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type PartnerRelationResponseCollection = {
  __typename?: 'PartnerRelationResponseCollection'
  nodes: Array<Partner>
}

export enum PublicationFilter {
  HasPublishedVersion = 'HAS_PUBLISHED_VERSION',
  HasPublishedVersionDocument = 'HAS_PUBLISHED_VERSION_DOCUMENT',
  Modified = 'MODIFIED',
  NeverPublished = 'NEVER_PUBLISHED',
  NeverPublishedDocument = 'NEVER_PUBLISHED_DOCUMENT',
  PublishedWithoutDraft = 'PUBLISHED_WITHOUT_DRAFT',
  PublishedWithDraft = 'PUBLISHED_WITH_DRAFT',
  Unmodified = 'UNMODIFIED',
}

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type Query = {
  __typename?: 'Query'
  asset?: Maybe<Asset>
  assetCategories: Array<Maybe<AssetCategory>>
  assetCategories_connection?: Maybe<AssetCategoryEntityResponseCollection>
  assetCategory?: Maybe<AssetCategory>
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetEntityResponseCollection>
  basicDocument?: Maybe<BasicDocument>
  basicDocuments: Array<Maybe<BasicDocument>>
  basicDocuments_connection?: Maybe<BasicDocumentEntityResponseCollection>
  blogPost?: Maybe<BlogPost>
  blogPosts: Array<Maybe<BlogPost>>
  blogPosts_connection?: Maybe<BlogPostEntityResponseCollection>
  bookTag?: Maybe<BookTag>
  bookTags: Array<Maybe<BookTag>>
  bookTags_connection?: Maybe<BookTagEntityResponseCollection>
  branch?: Maybe<Branch>
  branches: Array<Maybe<Branch>>
  branches_connection?: Maybe<BranchEntityResponseCollection>
  disclosure?: Maybe<Disclosure>
  disclosures: Array<Maybe<Disclosure>>
  disclosures_connection?: Maybe<DisclosureEntityResponseCollection>
  event?: Maybe<Event>
  eventCategories: Array<Maybe<EventCategory>>
  eventCategories_connection?: Maybe<EventCategoryEntityResponseCollection>
  eventCategory?: Maybe<EventCategory>
  eventTag?: Maybe<EventTag>
  eventTags: Array<Maybe<EventTag>>
  eventTags_connection?: Maybe<EventTagEntityResponseCollection>
  events: Array<Maybe<Event>>
  events_connection?: Maybe<EventEntityResponseCollection>
  fileCategories: Array<Maybe<FileCategory>>
  fileCategories_connection?: Maybe<FileCategoryEntityResponseCollection>
  fileCategory?: Maybe<FileCategory>
  footer?: Maybe<Footer>
  general?: Maybe<General>
  homePage?: Maybe<HomePage>
  i18NLocale?: Maybe<I18NLocale>
  i18NLocales: Array<Maybe<I18NLocale>>
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>
  me?: Maybe<UsersPermissionsMe>
  menu?: Maybe<Menu>
  menus: Array<Maybe<Menu>>
  menus_connection?: Maybe<MenuEntityResponseCollection>
  navikronosNavikronosStorage?: Maybe<NavikronosNavikronosStorage>
  notice?: Maybe<Notice>
  notices: Array<Maybe<Notice>>
  notices_connection?: Maybe<NoticeEntityResponseCollection>
  page?: Maybe<Page>
  pages: Array<Maybe<Page>>
  pages_connection?: Maybe<PageEntityResponseCollection>
  partner?: Maybe<Partner>
  partners: Array<Maybe<Partner>>
  partners_connection?: Maybe<PartnerEntityResponseCollection>
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>
  uploadFile?: Maybe<UploadFile>
  uploadFiles: Array<Maybe<UploadFile>>
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>
  usersPermissionsRole?: Maybe<UsersPermissionsRole>
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>
  usersPermissionsUser?: Maybe<UsersPermissionsUser>
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>
}

export type QueryAssetArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategoriesArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategories_ConnectionArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategoryArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBasicDocumentArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBasicDocuments_ConnectionArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBlogPostArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBlogPosts_ConnectionArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBookTagArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBookTagsArgs = {
  filters?: InputMaybe<BookTagFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBookTags_ConnectionArgs = {
  filters?: InputMaybe<BookTagFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBranchArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryBranches_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDisclosureArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDisclosuresArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDisclosures_ConnectionArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventCategoriesArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventCategories_ConnectionArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventCategoryArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventTagArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventTags_ConnectionArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryEvents_ConnectionArgs = {
  filters?: InputMaybe<EventFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFileCategoriesArgs = {
  filters?: InputMaybe<FileCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFileCategories_ConnectionArgs = {
  filters?: InputMaybe<FileCategoryFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFileCategoryArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFooterArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryGeneralArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryHomePageArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryMenuArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryMenusArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryMenus_ConnectionArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryNavikronosNavikronosStorageArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryNoticeArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryNoticesArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryNotices_ConnectionArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPageArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPartnerArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPartners_ConnectionArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input']
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  publicationFilter?: InputMaybe<PublicationFilter>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationFilter?: InputMaybe<PublicationFilter>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta'
  pagination: Pagination
}

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow'
  contentTypes: Scalars['JSON']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name: Scalars['String']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ReviewWorkflowsWorkflowEntity = {
  __typename?: 'ReviewWorkflowsWorkflowEntity'
  attributes?: Maybe<ReviewWorkflowsWorkflow>
  id?: Maybe<Scalars['ID']['output']>
}

export type ReviewWorkflowsWorkflowEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponse'
  data?: Maybe<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflow>
  pageInfo: Pagination
}

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>
  contentTypes?: InputMaybe<JsonFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type ReviewWorkflowsWorkflowRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowRelationResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage'
  color?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  workflow?: Maybe<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowStageEntity = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntity'
  attributes?: Maybe<ReviewWorkflowsWorkflowStage>
  id?: Maybe<Scalars['ID']['output']>
}

export type ReviewWorkflowsWorkflowStageEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponse'
  data?: Maybe<ReviewWorkflowsWorkflowStage>
}

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflowStage>
  pageInfo: Pagination
}

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>
  color?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
}

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  workflow?: InputMaybe<Scalars['ID']['input']>
}

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflowStage>
}

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contains?: InputMaybe<Scalars['String']['input']>
  containsi?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  eq?: InputMaybe<Scalars['String']['input']>
  eqi?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  ne?: InputMaybe<Scalars['String']['input']>
  nei?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<StringFilterInput>
  notContains?: InputMaybe<Scalars['String']['input']>
  notContainsi?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  contains?: InputMaybe<Scalars['Time']['input']>
  containsi?: InputMaybe<Scalars['Time']['input']>
  endsWith?: InputMaybe<Scalars['Time']['input']>
  eq?: InputMaybe<Scalars['Time']['input']>
  eqi?: InputMaybe<Scalars['Time']['input']>
  gt?: InputMaybe<Scalars['Time']['input']>
  gte?: InputMaybe<Scalars['Time']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  lt?: InputMaybe<Scalars['Time']['input']>
  lte?: InputMaybe<Scalars['Time']['input']>
  ne?: InputMaybe<Scalars['Time']['input']>
  nei?: InputMaybe<Scalars['Time']['input']>
  not?: InputMaybe<TimeFilterInput>
  notContains?: InputMaybe<Scalars['Time']['input']>
  notContainsi?: InputMaybe<Scalars['Time']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  startsWith?: InputMaybe<Scalars['Time']['input']>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  alternativeText?: Maybe<Scalars['String']['output']>
  caption?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  ext?: Maybe<Scalars['String']['output']>
  focalPoint?: Maybe<Scalars['JSON']['output']>
  formats?: Maybe<Scalars['JSON']['output']>
  hash: Scalars['String']['output']
  height?: Maybe<Scalars['Int']['output']>
  mime: Scalars['String']['output']
  name: Scalars['String']['output']
  previewUrl?: Maybe<Scalars['String']['output']>
  provider: Scalars['String']['output']
  provider_metadata?: Maybe<Scalars['JSON']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  related?: Maybe<Array<Maybe<GenericMorph>>>
  size: Scalars['Float']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url: Scalars['String']['output']
  width?: Maybe<Scalars['Int']['output']>
}

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity'
  attributes?: Maybe<UploadFile>
  id?: Maybe<Scalars['ID']['output']>
}

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse'
  data?: Maybe<UploadFile>
}

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection'
  nodes: Array<UploadFile>
  pageInfo: Pagination
}

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  caption?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  ext?: InputMaybe<StringFilterInput>
  focalPoint?: InputMaybe<JsonFilterInput>
  formats?: InputMaybe<JsonFilterInput>
  hash?: InputMaybe<StringFilterInput>
  height?: InputMaybe<IntFilterInput>
  mime?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  previewUrl?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  provider_metadata?: InputMaybe<JsonFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  size?: InputMaybe<FloatFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
  width?: InputMaybe<IntFilterInput>
}

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>
  caption?: InputMaybe<Scalars['String']['input']>
  ext?: InputMaybe<Scalars['String']['input']>
  focalPoint?: InputMaybe<Scalars['JSON']['input']>
  formats?: InputMaybe<Scalars['JSON']['input']>
  hash?: InputMaybe<Scalars['String']['input']>
  height?: InputMaybe<Scalars['Int']['input']>
  mime?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  previewUrl?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  size?: InputMaybe<Scalars['Float']['input']>
  url?: InputMaybe<Scalars['String']['input']>
  width?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection'
  nodes: Array<UploadFile>
}

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input']
  password: Scalars['String']['input']
  provider?: Scalars['String']['input']
}

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']['output']>
  user: UsersPermissionsMe
}

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  blocked?: Maybe<Scalars['Boolean']['output']>
  confirmed?: Maybe<Scalars['Boolean']['output']>
  documentId: Scalars['ID']['output']
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  role?: Maybe<UsersPermissionsMeRole>
  username: Scalars['String']['output']
}

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  type?: Maybe<Scalars['String']['output']>
}

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  action: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  role?: Maybe<UsersPermissionsRole>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity'
  attributes?: Maybe<UsersPermissionsPermission>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsPermissionEntityResponse = {
  __typename?: 'UsersPermissionsPermissionEntityResponse'
  data?: Maybe<UsersPermissionsPermission>
}

export type UsersPermissionsPermissionEntityResponseCollection = {
  __typename?: 'UsersPermissionsPermissionEntityResponseCollection'
  nodes: Array<UsersPermissionsPermission>
  pageInfo: Pagination
}

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UsersPermissionsPermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  role?: InputMaybe<Scalars['ID']['input']>
}

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection'
  nodes: Array<UsersPermissionsPermission>
}

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  name: Scalars['String']['output']
  permissions: Array<Maybe<UsersPermissionsPermission>>
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  users: Array<Maybe<UsersPermissionsUser>>
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity'
  attributes?: Maybe<UsersPermissionsRole>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse'
  data?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection'
  nodes: Array<UsersPermissionsRole>
  pageInfo: Pagination
}

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type UsersPermissionsRoleRelationResponseCollection = {
  __typename?: 'UsersPermissionsRoleRelationResponseCollection'
  nodes: Array<UsersPermissionsRole>
}

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  blocked?: Maybe<Scalars['Boolean']['output']>
  confirmed?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  email: Scalars['String']['output']
  provider?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  role?: Maybe<UsersPermissionsRole>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username: Scalars['String']['output']
}

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity'
  attributes?: Maybe<UsersPermissionsUser>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse'
  data?: Maybe<UsersPermissionsUser>
}

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection'
  nodes: Array<UsersPermissionsUser>
  pageInfo: Pagination
}

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  blocked?: InputMaybe<BooleanFilterInput>
  confirmed?: InputMaybe<BooleanFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  email?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsUserFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  provider?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
}

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>
  confirmed?: InputMaybe<Scalars['Boolean']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  role?: InputMaybe<Scalars['ID']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection'
  nodes: Array<UsersPermissionsUser>
}

export type AssetCategoryEntityFragment = {
  __typename?: 'AssetCategory'
  documentId: string
  label: string
  slug: string
}

export type AssetEntityFragment = {
  __typename: 'Asset'
  documentId: string
  title: string
  slug: string
  description?: string | null
  publishedAt?: any | null
  assetCategory?: {
    __typename?: 'AssetCategory'
    documentId: string
    label: string
    slug: string
  } | null
  file: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null>
}

export type AssetCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type AssetCategoriesQuery = {
  __typename?: 'Query'
  assetCategories: Array<{
    __typename?: 'AssetCategory'
    documentId: string
    label: string
    slug: string
  } | null>
}

export type AssetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type AssetBySlugQuery = {
  __typename?: 'Query'
  assets: Array<{
    __typename: 'Asset'
    documentId: string
    title: string
    slug: string
    description?: string | null
    publishedAt?: any | null
    assetCategory?: {
      __typename?: 'AssetCategory'
      documentId: string
      label: string
      slug: string
    } | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
}

export type BasicDocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type BasicDocumentBySlugQuery = {
  __typename?: 'Query'
  basicDocuments: Array<{
    __typename?: 'BasicDocument'
    documentId: string
    slug: string
    title: string
    description?: string | null
    date_added?: any | null
    author?: string | null
    link?: string | null
    file_category?: {
      __typename?: 'FileCategory'
      documentId: string
      name?: string | null
      slug?: string | null
    } | null
    metadata?: Array<
      | {
          __typename: 'ComponentMetadataFaktury'
          id: string
          name?: string | null
          date?: any | null
          attachment?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null
        }
      | {
          __typename: 'ComponentMetadataMetadata'
          id: string
          provider?: string | null
          year?: number | null
          grant_name?: string | null
          grant_number?: string | null
          amount?: string | null
          description?: string | null
        }
      | {
          __typename: 'ComponentMetadataObchodnaVerejnaSutaz'
          id: string
          subject?: string | null
          description?: string | null
          number?: string | null
          date_added?: any | null
          amount?: string | null
          attachment?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null
        }
      | {
          __typename: 'ComponentMetadataObjednavky'
          id: string
          title?: string | null
          date_period?: any | null
          date_added?: any | null
          attachment?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null
        }
      | {
          __typename: 'ComponentMetadataVerejneObstaravanie'
          id: string
          subject?: string | null
          description?: string | null
          number?: string | null
          date_added?: any | null
          amount?: string | null
          attachment?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null
        }
      | {
          __typename: 'ComponentMetadataZmluvy'
          id: string
          date?: any | null
          number?: string | null
          amount?: string | null
          supplier?: string | null
          subject?: string | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    attachment?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null
  } | null>
}

export type FileCategoryEntityFragment = {
  __typename?: 'FileCategory'
  documentId: string
  name?: string | null
  slug?: string | null
}

export type FileCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type FileCategoriesQuery = {
  __typename?: 'Query'
  fileCategories: Array<{
    __typename?: 'FileCategory'
    documentId: string
    name?: string | null
    slug?: string | null
  } | null>
}

export type BasicDocumentFileFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
  name: string
  ext?: string | null
  size: number
}

export type BasicDocumentEntityFragment = {
  __typename?: 'BasicDocument'
  documentId: string
  slug: string
  title: string
  description?: string | null
  date_added?: any | null
  author?: string | null
  link?: string | null
  file_category?: {
    __typename?: 'FileCategory'
    documentId: string
    name?: string | null
    slug?: string | null
  } | null
  metadata?: Array<
    | {
        __typename: 'ComponentMetadataFaktury'
        id: string
        name?: string | null
        date?: any | null
        attachment?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      }
    | {
        __typename: 'ComponentMetadataMetadata'
        id: string
        provider?: string | null
        year?: number | null
        grant_name?: string | null
        grant_number?: string | null
        amount?: string | null
        description?: string | null
      }
    | {
        __typename: 'ComponentMetadataObchodnaVerejnaSutaz'
        id: string
        subject?: string | null
        description?: string | null
        number?: string | null
        date_added?: any | null
        amount?: string | null
        attachment?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      }
    | {
        __typename: 'ComponentMetadataObjednavky'
        id: string
        title?: string | null
        date_period?: any | null
        date_added?: any | null
        attachment?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      }
    | {
        __typename: 'ComponentMetadataVerejneObstaravanie'
        id: string
        subject?: string | null
        description?: string | null
        number?: string | null
        date_added?: any | null
        amount?: string | null
        attachment?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      }
    | {
        __typename: 'ComponentMetadataZmluvy'
        id: string
        date?: any | null
        number?: string | null
        amount?: string | null
        supplier?: string | null
        subject?: string | null
      }
    | { __typename: 'Error' }
    | null
  > | null
  attachment?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

type Metadata_ComponentMetadataFaktury_Fragment = {
  __typename: 'ComponentMetadataFaktury'
  id: string
  name?: string | null
  date?: any | null
  attachment?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

type Metadata_ComponentMetadataMetadata_Fragment = {
  __typename: 'ComponentMetadataMetadata'
  id: string
  provider?: string | null
  year?: number | null
  grant_name?: string | null
  grant_number?: string | null
  amount?: string | null
  description?: string | null
}

type Metadata_ComponentMetadataObchodnaVerejnaSutaz_Fragment = {
  __typename: 'ComponentMetadataObchodnaVerejnaSutaz'
  id: string
  subject?: string | null
  description?: string | null
  number?: string | null
  date_added?: any | null
  amount?: string | null
  attachment?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

type Metadata_ComponentMetadataObjednavky_Fragment = {
  __typename: 'ComponentMetadataObjednavky'
  id: string
  title?: string | null
  date_period?: any | null
  date_added?: any | null
  attachment?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

type Metadata_ComponentMetadataVerejneObstaravanie_Fragment = {
  __typename: 'ComponentMetadataVerejneObstaravanie'
  id: string
  subject?: string | null
  description?: string | null
  number?: string | null
  date_added?: any | null
  amount?: string | null
  attachment?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

type Metadata_ComponentMetadataZmluvy_Fragment = {
  __typename: 'ComponentMetadataZmluvy'
  id: string
  date?: any | null
  number?: string | null
  amount?: string | null
  supplier?: string | null
  subject?: string | null
}

type Metadata_Error_Fragment = { __typename: 'Error' }

export type MetadataFragment =
  | Metadata_ComponentMetadataFaktury_Fragment
  | Metadata_ComponentMetadataMetadata_Fragment
  | Metadata_ComponentMetadataObchodnaVerejnaSutaz_Fragment
  | Metadata_ComponentMetadataObjednavky_Fragment
  | Metadata_ComponentMetadataVerejneObstaravanie_Fragment
  | Metadata_ComponentMetadataZmluvy_Fragment
  | Metadata_Error_Fragment

type BlogPostSections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion'
  id: string
  title?: string | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
  } | null> | null
  tableRows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    accordionCategory?: string | null
    tableCategory?: string | null
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
  forms?: Array<{
    __typename?: 'ComponentAccordionItemsForm'
    category?: string | null
    type?: Enum_Componentaccordionitemsform_Type | null
  } | null> | null
}

type BlogPostSections_ComponentSectionsAssets_Fragment = {
  __typename: 'ComponentSectionsAssets'
  id: string
  title?: string | null
  assets: Array<{
    __typename: 'Asset'
    documentId: string
    title: string
    slug: string
    description?: string | null
    publishedAt?: any | null
    assetCategory?: {
      __typename?: 'AssetCategory'
      documentId: string
      label: string
      slug: string
    } | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
  disclosures: Array<{
    __typename: 'Disclosure'
    documentId: string
    slug: string
    title: string
    description?: string | null
    addedAt: any
    type: Enum_Disclosure_Type
    dateFrom?: any | null
    dateTo?: any | null
    idNumber?: string | null
    amount?: number | null
    contractor?: string | null
    grantProvider?: string | null
    grantYear?: string | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
}

type BlogPostSections_ComponentSectionsCta_Fragment = {
  __typename: 'ComponentSectionsCta'
  id: string
  title?: string | null
  url?: string | null
}

type BlogPostSections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider'
  id: string
}

type BlogPostSections_ComponentSectionsFaq_Fragment = {
  __typename: 'ComponentSectionsFaq'
  id: string
  title?: string | null
  ctaButton?: string | null
  questions?: Array<{
    __typename?: 'ComponentBlocksAccordionItem'
    id: string
    label?: string | null
    content?: string | null
  } | null> | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

type BlogPostSections_ComponentSectionsFlatText_Fragment = {
  __typename: 'ComponentSectionsFlatText'
  id: string
  content?: string | null
}

type BlogPostSections_ComponentSectionsGallery_Fragment = {
  __typename: 'ComponentSectionsGallery'
  id: string
  Gallery?: Array<{
    __typename?: 'ComponentLocalityPartsGalleryParts'
    id: string
    Description?: string | null
    Photo?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null> | null
}

type BlogPostSections_ComponentSectionsSiteUsefullness_Fragment = {
  __typename: 'ComponentSectionsSiteUsefullness'
  id: string
  title?: string | null
  thankYouMessage?: string | null
}

type BlogPostSections_ComponentSectionsTable_Fragment = {
  __typename: 'ComponentSectionsTable'
  id: string
  primaryTitle?: string | null
  secondaryTitle?: string | null
  rows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
}

type BlogPostSections_ComponentSectionsVideo_Fragment = {
  __typename: 'ComponentSectionsVideo'
  id: string
  youtube_url?: string | null
  media?: { __typename?: 'UploadFile'; url: string } | null
}

type BlogPostSections_Error_Fragment = { __typename: 'Error' }

export type BlogPostSectionsFragment =
  | BlogPostSections_ComponentSectionsAccordion_Fragment
  | BlogPostSections_ComponentSectionsAssets_Fragment
  | BlogPostSections_ComponentSectionsCta_Fragment
  | BlogPostSections_ComponentSectionsDivider_Fragment
  | BlogPostSections_ComponentSectionsFaq_Fragment
  | BlogPostSections_ComponentSectionsFlatText_Fragment
  | BlogPostSections_ComponentSectionsGallery_Fragment
  | BlogPostSections_ComponentSectionsSiteUsefullness_Fragment
  | BlogPostSections_ComponentSectionsTable_Fragment
  | BlogPostSections_ComponentSectionsVideo_Fragment
  | BlogPostSections_Error_Fragment

export type BlogPostEntityFragment = {
  __typename: 'BlogPost'
  documentId: string
  slug: string
  title: string
  publishedAt?: any | null
  coverMedia?: {
    __typename?: 'UploadFile'
    url: string
    mime: string
    alternativeText?: string | null
    width?: number | null
    height?: number | null
  } | null
  sections?: Array<
    | {
        __typename: 'ComponentSectionsAccordion'
        id: string
        title?: string | null
        flatText?: Array<{
          __typename?: 'ComponentAccordionItemsFlatText'
          category?: string | null
          content?: string | null
        } | null> | null
        tableRows?: Array<{
          __typename?: 'ComponentAccordionItemsTableRow'
          id: string
          accordionCategory?: string | null
          tableCategory?: string | null
          label?: string | null
          value?: string | null
          valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
        } | null> | null
        forms?: Array<{
          __typename?: 'ComponentAccordionItemsForm'
          category?: string | null
          type?: Enum_Componentaccordionitemsform_Type | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsAssets'
        id: string
        title?: string | null
        assets: Array<{
          __typename: 'Asset'
          documentId: string
          title: string
          slug: string
          description?: string | null
          publishedAt?: any | null
          assetCategory?: {
            __typename?: 'AssetCategory'
            documentId: string
            label: string
            slug: string
          } | null
          file: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null>
        } | null>
        disclosures: Array<{
          __typename: 'Disclosure'
          documentId: string
          slug: string
          title: string
          description?: string | null
          addedAt: any
          type: Enum_Disclosure_Type
          dateFrom?: any | null
          dateTo?: any | null
          idNumber?: string | null
          amount?: number | null
          contractor?: string | null
          grantProvider?: string | null
          grantYear?: string | null
          file: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null>
        } | null>
      }
    | { __typename: 'ComponentSectionsCta'; id: string; title?: string | null; url?: string | null }
    | { __typename: 'ComponentSectionsDivider'; id: string }
    | {
        __typename: 'ComponentSectionsFaq'
        id: string
        title?: string | null
        ctaButton?: string | null
        questions?: Array<{
          __typename?: 'ComponentBlocksAccordionItem'
          id: string
          label?: string | null
          content?: string | null
        } | null> | null
        redirectTo?: {
          __typename: 'Page'
          documentId: string
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      }
    | { __typename: 'ComponentSectionsFlatText'; id: string; content?: string | null }
    | {
        __typename: 'ComponentSectionsGallery'
        id: string
        Gallery?: Array<{
          __typename?: 'ComponentLocalityPartsGalleryParts'
          id: string
          Description?: string | null
          Photo?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            alternativeText?: string | null
            caption?: string | null
            size: number
            width?: number | null
            height?: number | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsSiteUsefullness'
        id: string
        title?: string | null
        thankYouMessage?: string | null
      }
    | {
        __typename: 'ComponentSectionsTable'
        id: string
        primaryTitle?: string | null
        secondaryTitle?: string | null
        rows?: Array<{
          __typename?: 'ComponentAccordionItemsTableRow'
          id: string
          label?: string | null
          value?: string | null
          valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsVideo'
        id: string
        youtube_url?: string | null
        media?: { __typename?: 'UploadFile'; url: string } | null
      }
    | { __typename: 'Error' }
    | null
  > | null
  localizations: Array<{ __typename?: 'BlogPost'; slug: string; locale?: string | null } | null>
  seo?: {
    __typename?: 'ComponentCommonSeo'
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
  } | null
}

export type BlogPostStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BlogPostStaticPathsQuery = {
  __typename?: 'Query'
  blogPosts: Array<{
    __typename?: 'BlogPost'
    documentId: string
    slug: string
    locale?: string | null
  } | null>
}

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BlogPostBySlugQuery = {
  __typename?: 'Query'
  blogPosts: Array<{
    __typename: 'BlogPost'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    coverMedia?: {
      __typename?: 'UploadFile'
      url: string
      mime: string
      alternativeText?: string | null
      width?: number | null
      height?: number | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          id: string
          title?: string | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
          } | null> | null
          tableRows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            id: string
            accordionCategory?: string | null
            tableCategory?: string | null
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
          forms?: Array<{
            __typename?: 'ComponentAccordionItemsForm'
            category?: string | null
            type?: Enum_Componentaccordionitemsform_Type | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsAssets'
          id: string
          title?: string | null
          assets: Array<{
            __typename: 'Asset'
            documentId: string
            title: string
            slug: string
            description?: string | null
            publishedAt?: any | null
            assetCategory?: {
              __typename?: 'AssetCategory'
              documentId: string
              label: string
              slug: string
            } | null
            file: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              size: number
              ext?: string | null
            } | null>
          } | null>
          disclosures: Array<{
            __typename: 'Disclosure'
            documentId: string
            slug: string
            title: string
            description?: string | null
            addedAt: any
            type: Enum_Disclosure_Type
            dateFrom?: any | null
            dateTo?: any | null
            idNumber?: string | null
            amount?: number | null
            contractor?: string | null
            grantProvider?: string | null
            grantYear?: string | null
            file: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              size: number
              ext?: string | null
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsCta'
          id: string
          title?: string | null
          url?: string | null
        }
      | { __typename: 'ComponentSectionsDivider'; id: string }
      | {
          __typename: 'ComponentSectionsFaq'
          id: string
          title?: string | null
          ctaButton?: string | null
          questions?: Array<{
            __typename?: 'ComponentBlocksAccordionItem'
            id: string
            label?: string | null
            content?: string | null
          } | null> | null
          redirectTo?: {
            __typename: 'Page'
            documentId: string
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        }
      | { __typename: 'ComponentSectionsFlatText'; id: string; content?: string | null }
      | {
          __typename: 'ComponentSectionsGallery'
          id: string
          Gallery?: Array<{
            __typename?: 'ComponentLocalityPartsGalleryParts'
            id: string
            Description?: string | null
            Photo?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsSiteUsefullness'
          id: string
          title?: string | null
          thankYouMessage?: string | null
        }
      | {
          __typename: 'ComponentSectionsTable'
          id: string
          primaryTitle?: string | null
          secondaryTitle?: string | null
          rows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            id: string
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsVideo'
          id: string
          youtube_url?: string | null
          media?: { __typename?: 'UploadFile'; url: string } | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    localizations: Array<{ __typename?: 'BlogPost'; slug: string; locale?: string | null } | null>
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
  } | null>
}

export type BlogPostsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Scalars['String']['input']>
}>

export type BlogPostsQuery = {
  __typename?: 'Query'
  blogPosts_connection?: {
    __typename?: 'BlogPostEntityResponseCollection'
    nodes: Array<{
      __typename: 'BlogPost'
      documentId: string
      slug: string
      title: string
      publishedAt?: any | null
      coverMedia?: {
        __typename?: 'UploadFile'
        url: string
        mime: string
        alternativeText?: string | null
        width?: number | null
        height?: number | null
      } | null
      sections?: Array<
        | {
            __typename: 'ComponentSectionsAccordion'
            id: string
            title?: string | null
            flatText?: Array<{
              __typename?: 'ComponentAccordionItemsFlatText'
              category?: string | null
              content?: string | null
            } | null> | null
            tableRows?: Array<{
              __typename?: 'ComponentAccordionItemsTableRow'
              id: string
              accordionCategory?: string | null
              tableCategory?: string | null
              label?: string | null
              value?: string | null
              valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
            } | null> | null
            forms?: Array<{
              __typename?: 'ComponentAccordionItemsForm'
              category?: string | null
              type?: Enum_Componentaccordionitemsform_Type | null
            } | null> | null
          }
        | {
            __typename: 'ComponentSectionsAssets'
            id: string
            title?: string | null
            assets: Array<{
              __typename: 'Asset'
              documentId: string
              title: string
              slug: string
              description?: string | null
              publishedAt?: any | null
              assetCategory?: {
                __typename?: 'AssetCategory'
                documentId: string
                label: string
                slug: string
              } | null
              file: Array<{
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                size: number
                ext?: string | null
              } | null>
            } | null>
            disclosures: Array<{
              __typename: 'Disclosure'
              documentId: string
              slug: string
              title: string
              description?: string | null
              addedAt: any
              type: Enum_Disclosure_Type
              dateFrom?: any | null
              dateTo?: any | null
              idNumber?: string | null
              amount?: number | null
              contractor?: string | null
              grantProvider?: string | null
              grantYear?: string | null
              file: Array<{
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                size: number
                ext?: string | null
              } | null>
            } | null>
          }
        | {
            __typename: 'ComponentSectionsCta'
            id: string
            title?: string | null
            url?: string | null
          }
        | { __typename: 'ComponentSectionsDivider'; id: string }
        | {
            __typename: 'ComponentSectionsFaq'
            id: string
            title?: string | null
            ctaButton?: string | null
            questions?: Array<{
              __typename?: 'ComponentBlocksAccordionItem'
              id: string
              label?: string | null
              content?: string | null
            } | null> | null
            redirectTo?: {
              __typename: 'Page'
              documentId: string
              title: string
              slug: string
              newSlug: string
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }
        | { __typename: 'ComponentSectionsFlatText'; id: string; content?: string | null }
        | {
            __typename: 'ComponentSectionsGallery'
            id: string
            Gallery?: Array<{
              __typename?: 'ComponentLocalityPartsGalleryParts'
              id: string
              Description?: string | null
              Photo?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
            } | null> | null
          }
        | {
            __typename: 'ComponentSectionsSiteUsefullness'
            id: string
            title?: string | null
            thankYouMessage?: string | null
          }
        | {
            __typename: 'ComponentSectionsTable'
            id: string
            primaryTitle?: string | null
            secondaryTitle?: string | null
            rows?: Array<{
              __typename?: 'ComponentAccordionItemsTableRow'
              id: string
              label?: string | null
              value?: string | null
              valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
            } | null> | null
          }
        | {
            __typename: 'ComponentSectionsVideo'
            id: string
            youtube_url?: string | null
            media?: { __typename?: 'UploadFile'; url: string } | null
          }
        | { __typename: 'Error' }
        | null
      > | null
      localizations: Array<{ __typename?: 'BlogPost'; slug: string; locale?: string | null } | null>
      seo?: {
        __typename?: 'ComponentCommonSeo'
        metaTitle?: string | null
        metaDescription?: string | null
        keywords?: string | null
      } | null
    }>
    pageInfo: { __typename?: 'Pagination'; total: number }
  } | null
}

export type EventBranchPlaceEntityFragment = {
  __typename?: 'Branch'
  documentId: string
  title: string
  address?: string | null
}

export type BranchPlaceEntityFragment = {
  __typename?: 'Branch'
  documentId: string
  body?: string | null
  title: string
  address?: string | null
  phone?: string | null
  email?: string | null
  openingHours?: {
    __typename?: 'ComponentBlocksOpeningHours'
    days: Array<{
      __typename?: 'ComponentBlocksOpeningHoursItem'
      label?: string | null
      time: string
    } | null>
  } | null
}

export type BranchCardEntityFragment = {
  __typename: 'Branch'
  documentId: string
  title: string
  address?: string | null
  slug: string
  latitude?: number | null
  longitude?: number | null
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
  subBranches: Array<{
    __typename?: 'Branch'
    documentId: string
    body?: string | null
    title: string
    address?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
  } | null>
}

export type BranchEntityFragment = {
  __typename: 'Branch'
  body?: string | null
  publicTransportInfo?: string | null
  barrierFreeInfo?: string | null
  barrierFreeState?: Enum_Branch_Barrierfreestate | null
  phone?: string | null
  email?: string | null
  locale?: string | null
  documentId: string
  title: string
  address?: string | null
  slug: string
  latitude?: number | null
  longitude?: number | null
  medias: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null>
  openingHours?: {
    __typename?: 'ComponentBlocksOpeningHours'
    days: Array<{
      __typename?: 'ComponentBlocksOpeningHoursItem'
      label?: string | null
      time: string
    } | null>
  } | null
  servicePages: Array<{ __typename: 'Page'; documentId: string; title: string } | null>
  localizations: Array<{
    __typename?: 'Branch'
    documentId: string
    title: string
    slug: string
    locale?: string | null
  } | null>
  seo?: {
    __typename?: 'ComponentCommonSeo'
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
  } | null
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
  subBranches: Array<{
    __typename?: 'Branch'
    documentId: string
    body?: string | null
    title: string
    address?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
  } | null>
}

export type BranchStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BranchStaticPathsQuery = {
  __typename?: 'Query'
  branches: Array<{ __typename?: 'Branch'; slug: string; locale?: string | null } | null>
}

export type BranchBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BranchBySlugQuery = {
  __typename?: 'Query'
  branches: Array<{
    __typename: 'Branch'
    body?: string | null
    publicTransportInfo?: string | null
    barrierFreeInfo?: string | null
    barrierFreeState?: Enum_Branch_Barrierfreestate | null
    phone?: string | null
    email?: string | null
    locale?: string | null
    documentId: string
    title: string
    address?: string | null
    slug: string
    latitude?: number | null
    longitude?: number | null
    medias: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null>
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
    servicePages: Array<{ __typename: 'Page'; documentId: string; title: string } | null>
    localizations: Array<{
      __typename?: 'Branch'
      documentId: string
      title: string
      slug: string
      locale?: string | null
    } | null>
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    subBranches: Array<{
      __typename?: 'Branch'
      documentId: string
      body?: string | null
      title: string
      address?: string | null
      phone?: string | null
      email?: string | null
      openingHours?: {
        __typename?: 'ComponentBlocksOpeningHours'
        days: Array<{
          __typename?: 'ComponentBlocksOpeningHoursItem'
          label?: string | null
          time: string
        } | null>
      } | null
    } | null>
  } | null>
}

export type DisclosureEntityFragment = {
  __typename: 'Disclosure'
  documentId: string
  slug: string
  title: string
  description?: string | null
  addedAt: any
  type: Enum_Disclosure_Type
  dateFrom?: any | null
  dateTo?: any | null
  idNumber?: string | null
  amount?: number | null
  contractor?: string | null
  grantProvider?: string | null
  grantYear?: string | null
  file: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    size: number
    ext?: string | null
  } | null>
}

export type DisclosureBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type DisclosureBySlugQuery = {
  __typename?: 'Query'
  disclosures: Array<{
    __typename: 'Disclosure'
    documentId: string
    slug: string
    title: string
    description?: string | null
    addedAt: any
    type: Enum_Disclosure_Type
    dateFrom?: any | null
    dateTo?: any | null
    idNumber?: string | null
    amount?: number | null
    contractor?: string | null
    grantProvider?: string | null
    grantYear?: string | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
}

export type EventCardEntityFragment = {
  __typename: 'Event'
  documentId: string
  slug: string
  title: string
  description?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  publishedAt?: any | null
  locale?: string | null
  dateFrom?: any | null
  dateTo?: any | null
  price?: number | null
  eventCategory?: {
    __typename?: 'EventCategory'
    documentId: string
    title?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  branch?: {
    __typename?: 'Branch'
    documentId: string
    title: string
    address?: string | null
  } | null
  eventTags: Array<{
    __typename?: 'EventTag'
    documentId: string
    title?: string | null
    slug?: string | null
    createdAt?: any | null
    publishedAt?: any | null
    updatedAt?: any | null
  } | null>
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
  coverImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
}

export type EventEntityFragment = {
  __typename: 'Event'
  promoted?: boolean | null
  showForm?: boolean | null
  documentId: string
  slug: string
  title: string
  description?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  publishedAt?: any | null
  locale?: string | null
  dateFrom?: any | null
  dateTo?: any | null
  price?: number | null
  guests?: Array<{
    __typename?: 'ComponentGuestsGuest'
    id: string
    name?: string | null
    surname?: string | null
    avatar?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null> | null
  assets?: {
    __typename?: 'ComponentSectionsAssets'
    id: string
    title?: string | null
    assets: Array<{
      __typename: 'Asset'
      documentId: string
      title: string
      slug: string
      description?: string | null
      publishedAt?: any | null
      assetCategory?: {
        __typename?: 'AssetCategory'
        documentId: string
        label: string
        slug: string
      } | null
      file: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        size: number
        ext?: string | null
      } | null>
    } | null>
    disclosures: Array<{
      __typename: 'Disclosure'
      documentId: string
      slug: string
      title: string
      description?: string | null
      addedAt: any
      type: Enum_Disclosure_Type
      dateFrom?: any | null
      dateTo?: any | null
      idNumber?: string | null
      amount?: number | null
      contractor?: string | null
      grantProvider?: string | null
      grantYear?: string | null
      file: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        size: number
        ext?: string | null
      } | null>
    } | null>
  } | null
  gallery: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null>
  localizations: Array<{ __typename?: 'Event'; slug: string; locale?: string | null } | null>
  seo?: {
    __typename?: 'ComponentCommonSeo'
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
  } | null
  eventCategory?: {
    __typename?: 'EventCategory'
    documentId: string
    title?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  branch?: {
    __typename?: 'Branch'
    documentId: string
    title: string
    address?: string | null
  } | null
  eventTags: Array<{
    __typename?: 'EventTag'
    documentId: string
    title?: string | null
    slug?: string | null
    createdAt?: any | null
    publishedAt?: any | null
    updatedAt?: any | null
  } | null>
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
  coverImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
}

export type EventPropertiesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type EventPropertiesQuery = {
  __typename?: 'Query'
  eventCategories: Array<{
    __typename?: 'EventCategory'
    documentId: string
    title?: string | null
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
  branches: Array<{
    __typename?: 'Branch'
    documentId: string
    body?: string | null
    title: string
    address?: string | null
    phone?: string | null
    email?: string | null
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
  } | null>
  eventTags: Array<{
    __typename?: 'EventTag'
    documentId: string
    title?: string | null
    slug?: string | null
    createdAt?: any | null
    publishedAt?: any | null
    updatedAt?: any | null
  } | null>
}

export type EventBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type EventBySlugQuery = {
  __typename?: 'Query'
  events: Array<{
    __typename: 'Event'
    promoted?: boolean | null
    showForm?: boolean | null
    documentId: string
    slug: string
    title: string
    description?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    locale?: string | null
    dateFrom?: any | null
    dateTo?: any | null
    price?: number | null
    guests?: Array<{
      __typename?: 'ComponentGuestsGuest'
      id: string
      name?: string | null
      surname?: string | null
      avatar?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
    } | null> | null
    assets?: {
      __typename?: 'ComponentSectionsAssets'
      id: string
      title?: string | null
      assets: Array<{
        __typename: 'Asset'
        documentId: string
        title: string
        slug: string
        description?: string | null
        publishedAt?: any | null
        assetCategory?: {
          __typename?: 'AssetCategory'
          documentId: string
          label: string
          slug: string
        } | null
        file: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null>
      } | null>
      disclosures: Array<{
        __typename: 'Disclosure'
        documentId: string
        slug: string
        title: string
        description?: string | null
        addedAt: any
        type: Enum_Disclosure_Type
        dateFrom?: any | null
        dateTo?: any | null
        idNumber?: string | null
        amount?: number | null
        contractor?: string | null
        grantProvider?: string | null
        grantYear?: string | null
        file: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null>
      } | null>
    } | null
    gallery: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null>
    localizations: Array<{ __typename?: 'Event'; slug: string; locale?: string | null } | null>
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    eventCategory?: {
      __typename?: 'EventCategory'
      documentId: string
      title?: string | null
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    branch?: {
      __typename?: 'Branch'
      documentId: string
      title: string
      address?: string | null
    } | null
    eventTags: Array<{
      __typename?: 'EventTag'
      documentId: string
      title?: string | null
      slug?: string | null
      createdAt?: any | null
      publishedAt?: any | null
      updatedAt?: any | null
    } | null>
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
}

export type EventStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type EventStaticPathsQuery = {
  __typename?: 'Query'
  events: Array<{ __typename?: 'Event'; slug: string; locale?: string | null } | null>
}

export type SectionLinkPageEntityFragment = {
  __typename?: 'Page'
  documentId: string
  title: string
}

export type SectionLinkBranchEntityFragment = {
  __typename?: 'Branch'
  documentId: string
  slug: string
  title: string
}

export type MenuSectionFragment = {
  __typename?: 'ComponentMenuSections'
  id: string
  sectionTitle?: string | null
  sectionColumnSpan?: number | null
  sectionPage?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  sectionLinks?: Array<{
    __typename?: 'ComponentMenuSectionLinks'
    id: string
    sectionLinkTitle?: string | null
    sectionLinkPage?: { __typename?: 'Page'; documentId: string; title: string } | null
    sectionLinkBranch?: {
      __typename?: 'Branch'
      documentId: string
      slug: string
      title: string
    } | null
  } | null> | null
}

export type MenuEntityFragment = {
  __typename?: 'Menu'
  documentId: string
  menuTitle?: string | null
  menuTotalColumns?: number | null
  order?: number | null
  createdAt?: any | null
  updatedAt?: any | null
  menuSections?: Array<{
    __typename?: 'ComponentMenuSections'
    id: string
    sectionTitle?: string | null
    sectionColumnSpan?: number | null
    sectionPage?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    sectionLinks?: Array<{
      __typename?: 'ComponentMenuSectionLinks'
      id: string
      sectionLinkTitle?: string | null
      sectionLinkPage?: { __typename?: 'Page'; documentId: string; title: string } | null
      sectionLinkBranch?: {
        __typename?: 'Branch'
        documentId: string
        slug: string
        title: string
      } | null
    } | null> | null
  } | null> | null
}

export type ComponentFooterFooterColumnFragment = {
  __typename?: 'ComponentFooterFooterColumn'
  id: string
  title?: string | null
  footerLink?: Array<{
    __typename?: 'ComponentFooterFooterLink'
    id: string
    title?: string | null
    otherSite?: string | null
    redirectTo?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

export type FooterEntityFragment = {
  __typename?: 'Footer'
  documentId: string
  footerColumns?: Array<{
    __typename?: 'ComponentFooterFooterColumn'
    id: string
    title?: string | null
    footerLink?: Array<{
      __typename?: 'ComponentFooterFooterLink'
      id: string
      title?: string | null
      otherSite?: string | null
      redirectTo?: {
        __typename: 'Page'
        documentId: string
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null> | null
  } | null> | null
  siteMapLink?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  privacyLink?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type GeneralEntityFragment = {
  __typename?: 'General'
  eventsPage?: { __typename: 'Page'; documentId: string } | null
  newBooksPage?: { __typename: 'Page'; documentId: string } | null
  privacyTermsAndConditionsPage?: { __typename: 'Page'; documentId: string } | null
  openingHoursPage?: { __typename: 'Page'; documentId: string } | null
  noticesPage?: { __typename: 'Page'; documentId: string } | null
}

export type GeneralQueryVariables = Exact<{
  eventsFrom: Scalars['DateTime']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type GeneralQuery = {
  __typename?: 'Query'
  menus: Array<{
    __typename?: 'Menu'
    documentId: string
    menuTitle?: string | null
    menuTotalColumns?: number | null
    order?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    menuSections?: Array<{
      __typename?: 'ComponentMenuSections'
      id: string
      sectionTitle?: string | null
      sectionColumnSpan?: number | null
      sectionPage?: {
        __typename: 'Page'
        documentId: string
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
      sectionLinks?: Array<{
        __typename?: 'ComponentMenuSectionLinks'
        id: string
        sectionLinkTitle?: string | null
        sectionLinkPage?: { __typename?: 'Page'; documentId: string; title: string } | null
        sectionLinkBranch?: {
          __typename?: 'Branch'
          documentId: string
          slug: string
          title: string
        } | null
      } | null> | null
    } | null> | null
  } | null>
  upcomingEvents: Array<{
    __typename: 'Event'
    documentId: string
    slug: string
    title: string
    description?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    locale?: string | null
    dateFrom?: any | null
    dateTo?: any | null
    price?: number | null
    eventCategory?: {
      __typename?: 'EventCategory'
      documentId: string
      title?: string | null
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    branch?: {
      __typename?: 'Branch'
      documentId: string
      title: string
      address?: string | null
    } | null
    eventTags: Array<{
      __typename?: 'EventTag'
      documentId: string
      title?: string | null
      slug?: string | null
      createdAt?: any | null
      publishedAt?: any | null
      updatedAt?: any | null
    } | null>
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
  footer?: {
    __typename?: 'Footer'
    documentId: string
    footerColumns?: Array<{
      __typename?: 'ComponentFooterFooterColumn'
      id: string
      title?: string | null
      footerLink?: Array<{
        __typename?: 'ComponentFooterFooterLink'
        id: string
        title?: string | null
        otherSite?: string | null
        redirectTo?: {
          __typename: 'Page'
          documentId: string
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null> | null
    } | null> | null
    siteMapLink?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    privacyLink?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null
  general?: {
    __typename?: 'General'
    eventsPage?: { __typename: 'Page'; documentId: string } | null
    newBooksPage?: { __typename: 'Page'; documentId: string } | null
    privacyTermsAndConditionsPage?: { __typename: 'Page'; documentId: string } | null
    openingHoursPage?: { __typename: 'Page'; documentId: string } | null
    noticesPage?: { __typename: 'Page'; documentId: string } | null
  } | null
}

export type HomepageFaqSectionFragment = {
  __typename?: 'ComponentHomepageFaqSection'
  id: string
  title?: string | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  faqs?: Array<{
    __typename?: 'ComponentHomepageFaqs'
    id: string
    question?: string | null
    answer?: string | null
  } | null> | null
  ctas?: Array<{
    __typename?: 'ComponentHomepageCta'
    id: string
    title?: string | null
    ctaRedirectTo?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

export type HomepageMapSectionFragment = {
  __typename?: 'ComponentSectionsMap'
  id: string
  title?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItem'
    branch?: {
      __typename: 'Branch'
      documentId: string
      title: string
      address?: string | null
      slug: string
      latitude?: number | null
      longitude?: number | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
      subBranches: Array<{
        __typename?: 'Branch'
        documentId: string
        body?: string | null
        title: string
        address?: string | null
        phone?: string | null
        email?: string | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null>
    } | null
  } | null> | null
}

export type HomepageRegistrationInfoFragment = {
  __typename?: 'ComponentHomepageRegistrationInfo'
  id: string
  title?: string | null
  description?: string | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
  registrationBenefits?: Array<{
    __typename?: 'ComponentHomepageBenefits'
    id: string
    benefit?: string | null
  } | null> | null
}

export type HomepageNewsSectionFragment = {
  __typename?: 'ComponentHomepageNewsSection'
  id: string
  title?: string | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type HomepagePromotedContentSectionFragment = {
  __typename?: 'ComponentHomepagePromotedContent'
  id: string
  events: Array<{
    __typename: 'Event'
    documentId: string
    slug: string
    title: string
    description?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    locale?: string | null
    dateFrom?: any | null
    dateTo?: any | null
    price?: number | null
    eventCategory?: {
      __typename?: 'EventCategory'
      documentId: string
      title?: string | null
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    branch?: {
      __typename?: 'Branch'
      documentId: string
      title: string
      address?: string | null
    } | null
    eventTags: Array<{
      __typename?: 'EventTag'
      documentId: string
      title?: string | null
      slug?: string | null
      createdAt?: any | null
      publishedAt?: any | null
      updatedAt?: any | null
    } | null>
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
  notices: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
}

export type HomePageQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type HomePageQuery = {
  __typename?: 'Query'
  homePage?: {
    __typename?: 'HomePage'
    faqSection?: {
      __typename?: 'ComponentHomepageFaqSection'
      id: string
      title?: string | null
      redirectTo?: {
        __typename: 'Page'
        documentId: string
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
      faqs?: Array<{
        __typename?: 'ComponentHomepageFaqs'
        id: string
        question?: string | null
        answer?: string | null
      } | null> | null
      ctas?: Array<{
        __typename?: 'ComponentHomepageCta'
        id: string
        title?: string | null
        ctaRedirectTo?: {
          __typename: 'Page'
          documentId: string
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null> | null
    } | null
    registrationInfoSection?: {
      __typename?: 'ComponentHomepageRegistrationInfo'
      id: string
      title?: string | null
      description?: string | null
      redirectTo?: {
        __typename: 'Page'
        documentId: string
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
      registrationBenefits?: Array<{
        __typename?: 'ComponentHomepageBenefits'
        id: string
        benefit?: string | null
      } | null> | null
    } | null
    newsSection?: {
      __typename?: 'ComponentHomepageNewsSection'
      id: string
      title?: string | null
      redirectTo?: {
        __typename: 'Page'
        documentId: string
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null
    mapSection?: {
      __typename?: 'ComponentSectionsMap'
      id: string
      title?: string | null
      branches?: Array<{
        __typename?: 'ComponentBlocksBranchItem'
        branch?: {
          __typename: 'Branch'
          documentId: string
          title: string
          address?: string | null
          slug: string
          latitude?: number | null
          longitude?: number | null
          listingImage?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            alternativeText?: string | null
            caption?: string | null
            size: number
            width?: number | null
            height?: number | null
          } | null
          subBranches: Array<{
            __typename?: 'Branch'
            documentId: string
            body?: string | null
            title: string
            address?: string | null
            phone?: string | null
            email?: string | null
            openingHours?: {
              __typename?: 'ComponentBlocksOpeningHours'
              days: Array<{
                __typename?: 'ComponentBlocksOpeningHoursItem'
                label?: string | null
                time: string
              } | null>
            } | null
          } | null>
        } | null
      } | null> | null
    } | null
    promotedContent?: {
      __typename?: 'ComponentHomepagePromotedContent'
      id: string
      events: Array<{
        __typename: 'Event'
        documentId: string
        slug: string
        title: string
        description?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        publishedAt?: any | null
        locale?: string | null
        dateFrom?: any | null
        dateTo?: any | null
        price?: number | null
        eventCategory?: {
          __typename?: 'EventCategory'
          documentId: string
          title?: string | null
          createdAt?: any | null
          updatedAt?: any | null
        } | null
        branch?: {
          __typename?: 'Branch'
          documentId: string
          title: string
          address?: string | null
        } | null
        eventTags: Array<{
          __typename?: 'EventTag'
          documentId: string
          title?: string | null
          slug?: string | null
          createdAt?: any | null
          publishedAt?: any | null
          updatedAt?: any | null
        } | null>
        listingImage?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
        coverImage?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null>
      notices: Array<{
        __typename: 'Notice'
        documentId: string
        slug: string
        title: string
        publishedAt?: any | null
        listingImage?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null>
    } | null
    localizations: Array<{ __typename?: 'HomePage'; locale?: string | null } | null>
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
  } | null
  promotedNews: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
  promotedEvents: Array<{
    __typename: 'Event'
    documentId: string
    slug: string
    title: string
    description?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    locale?: string | null
    dateFrom?: any | null
    dateTo?: any | null
    price?: number | null
    eventCategory?: {
      __typename?: 'EventCategory'
      documentId: string
      title?: string | null
      createdAt?: any | null
      updatedAt?: any | null
    } | null
    branch?: {
      __typename?: 'Branch'
      documentId: string
      title: string
      address?: string | null
    } | null
    eventTags: Array<{
      __typename?: 'EventTag'
      documentId: string
      title?: string | null
      slug?: string | null
      createdAt?: any | null
      publishedAt?: any | null
      updatedAt?: any | null
    } | null>
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
  bookTags: Array<{
    __typename?: 'BookTag'
    documentId: string
    displayName?: string | null
    slug?: string | null
  } | null>
  latestNotices: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
}

export type NoticeEntityFragment = {
  __typename: 'Notice'
  documentId: string
  publishedAt?: any | null
  slug: string
  title: string
  body?: string | null
  promoted?: boolean | null
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
  assets?: {
    __typename?: 'ComponentSectionsAssets'
    id: string
    title?: string | null
    assets: Array<{
      __typename: 'Asset'
      documentId: string
      title: string
      slug: string
      description?: string | null
      publishedAt?: any | null
      assetCategory?: {
        __typename?: 'AssetCategory'
        documentId: string
        label: string
        slug: string
      } | null
      file: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        size: number
        ext?: string | null
      } | null>
    } | null>
    disclosures: Array<{
      __typename: 'Disclosure'
      documentId: string
      slug: string
      title: string
      description?: string | null
      addedAt: any
      type: Enum_Disclosure_Type
      dateFrom?: any | null
      dateTo?: any | null
      idNumber?: string | null
      amount?: number | null
      contractor?: string | null
      grantProvider?: string | null
      grantYear?: string | null
      file: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        size: number
        ext?: string | null
      } | null>
    } | null>
  } | null
  seo?: {
    __typename?: 'ComponentCommonSeo'
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
  } | null
  localizations: Array<{ __typename?: 'Notice'; slug: string; locale?: string | null } | null>
}

export type NoticeListingEntityFragment = {
  __typename: 'Notice'
  documentId: string
  slug: string
  title: string
  publishedAt?: any | null
  listingImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
}

export type LatestNoticesQueryFragment = {
  __typename?: 'Query'
  latestNotices: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
}

export type LatestNoticesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type LatestNoticesQuery = {
  __typename?: 'Query'
  latestNotices: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null>
}

export type NoticesStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type NoticesStaticPathsQuery = {
  __typename?: 'Query'
  notices: Array<{
    __typename?: 'Notice'
    documentId: string
    slug: string
    locale?: string | null
  } | null>
}

export type NoticesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
}>

export type NoticesQuery = {
  __typename?: 'Query'
  notices_connection?: {
    __typename?: 'NoticeEntityResponseCollection'
    nodes: Array<{
      __typename: 'Notice'
      documentId: string
      slug: string
      title: string
      publishedAt?: any | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
    }>
    pageInfo: { __typename?: 'Pagination'; total: number }
  } | null
}

export type NoticeBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type NoticeBySlugQuery = {
  __typename?: 'Query'
  notices: Array<{
    __typename: 'Notice'
    documentId: string
    publishedAt?: any | null
    slug: string
    title: string
    body?: string | null
    promoted?: boolean | null
    listingImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
    assets?: {
      __typename?: 'ComponentSectionsAssets'
      id: string
      title?: string | null
      assets: Array<{
        __typename: 'Asset'
        documentId: string
        title: string
        slug: string
        description?: string | null
        publishedAt?: any | null
        assetCategory?: {
          __typename?: 'AssetCategory'
          documentId: string
          label: string
          slug: string
        } | null
        file: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null>
      } | null>
      disclosures: Array<{
        __typename: 'Disclosure'
        documentId: string
        slug: string
        title: string
        description?: string | null
        addedAt: any
        type: Enum_Disclosure_Type
        dateFrom?: any | null
        dateTo?: any | null
        idNumber?: string | null
        amount?: number | null
        contractor?: string | null
        grantProvider?: string | null
        grantYear?: string | null
        file: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          name: string
          size: number
          ext?: string | null
        } | null>
      } | null>
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    localizations: Array<{ __typename?: 'Notice'; slug: string; locale?: string | null } | null>
  } | null>
}

export type OpeningHoursChangeNoticesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type OpeningHoursChangeNoticesQuery = {
  __typename?: 'Query'
  notices: Array<{
    __typename: 'Notice'
    documentId: string
    slug: string
    locale?: string | null
    title: string
  } | null>
}

type PageSections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion'
  id: string
  title?: string | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
  } | null> | null
  tableRows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    accordionCategory?: string | null
    tableCategory?: string | null
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
  forms?: Array<{
    __typename?: 'ComponentAccordionItemsForm'
    category?: string | null
    type?: Enum_Componentaccordionitemsform_Type | null
  } | null> | null
}

type PageSections_ComponentSectionsAssets_Fragment = {
  __typename: 'ComponentSectionsAssets'
  id: string
  title?: string | null
  assets: Array<{
    __typename: 'Asset'
    documentId: string
    title: string
    slug: string
    description?: string | null
    publishedAt?: any | null
    assetCategory?: {
      __typename?: 'AssetCategory'
      documentId: string
      label: string
      slug: string
    } | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
  disclosures: Array<{
    __typename: 'Disclosure'
    documentId: string
    slug: string
    title: string
    description?: string | null
    addedAt: any
    type: Enum_Disclosure_Type
    dateFrom?: any | null
    dateTo?: any | null
    idNumber?: string | null
    amount?: number | null
    contractor?: string | null
    grantProvider?: string | null
    grantYear?: string | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
}

type PageSections_ComponentSectionsAssetsListing_Fragment = {
  __typename: 'ComponentSectionsAssetsListing'
}

type PageSections_ComponentSectionsBlogPostsListing_Fragment = {
  __typename: 'ComponentSectionsBlogPostsListing'
}

type PageSections_ComponentSectionsCherrypickSection_Fragment = {
  __typename: 'ComponentSectionsCherrypickSection'
  id: string
  title?: string | null
  pages: Array<{
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
}

type PageSections_ComponentSectionsChildrenListing_Fragment = {
  __typename: 'ComponentSectionsChildrenListing'
  id: string
  depth: Enum_Componentsectionschildrenlisting_Depth
}

type PageSections_ComponentSectionsCta_Fragment = {
  __typename: 'ComponentSectionsCta'
  id: string
  title?: string | null
  url?: string | null
}

type PageSections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider'
  id: string
}

type PageSections_ComponentSectionsEventsListing_Fragment = {
  __typename: 'ComponentSectionsEventsListing'
}

type PageSections_ComponentSectionsFaq_Fragment = {
  __typename: 'ComponentSectionsFaq'
  id: string
  title?: string | null
  ctaButton?: string | null
  questions?: Array<{
    __typename?: 'ComponentBlocksAccordionItem'
    id: string
    label?: string | null
    content?: string | null
  } | null> | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

type PageSections_ComponentSectionsFlatText_Fragment = {
  __typename: 'ComponentSectionsFlatText'
  id: string
  content?: string | null
}

type PageSections_ComponentSectionsForm_Fragment = {
  __typename: 'ComponentSectionsForm'
  id: string
  type?: Enum_Componentsectionsform_Type | null
}

type PageSections_ComponentSectionsGallery_Fragment = {
  __typename: 'ComponentSectionsGallery'
  id: string
  Gallery?: Array<{
    __typename?: 'ComponentLocalityPartsGalleryParts'
    id: string
    Description?: string | null
    Photo?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null> | null
}

type PageSections_ComponentSectionsMap_Fragment = {
  __typename: 'ComponentSectionsMap'
  id: string
  title?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItem'
    branch?: {
      __typename: 'Branch'
      documentId: string
      title: string
      address?: string | null
      slug: string
      latitude?: number | null
      longitude?: number | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
      subBranches: Array<{
        __typename?: 'Branch'
        documentId: string
        body?: string | null
        title: string
        address?: string | null
        phone?: string | null
        email?: string | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null>
    } | null
  } | null> | null
}

type PageSections_ComponentSectionsNewBooksListing_Fragment = {
  __typename: 'ComponentSectionsNewBooksListing'
}

type PageSections_ComponentSectionsNewsListing_Fragment = {
  __typename: 'ComponentSectionsNewsListing'
}

type PageSections_ComponentSectionsOpeningHoursSection_Fragment = {
  __typename: 'ComponentSectionsOpeningHoursSection'
  id: string
  title?: string | null
  branchList: Array<{
    __typename?: 'Branch'
    documentId: string
    title: string
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
  } | null>
}

type PageSections_ComponentSectionsPartners_Fragment = { __typename: 'ComponentSectionsPartners' }

type PageSections_ComponentSectionsRental_Fragment = {
  __typename: 'ComponentSectionsRental'
  id: string
  title?: string | null
  text?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItemWithPage'
    branch?: {
      __typename: 'Branch'
      documentId: string
      title: string
      address?: string | null
      slug: string
      latitude?: number | null
      longitude?: number | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
      subBranches: Array<{
        __typename?: 'Branch'
        documentId: string
        body?: string | null
        title: string
        address?: string | null
        phone?: string | null
        email?: string | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null>
    } | null
    page?: { __typename?: 'Page'; documentId: string; slug: string } | null
  } | null> | null
}

type PageSections_ComponentSectionsSiteUsefullness_Fragment = {
  __typename: 'ComponentSectionsSiteUsefullness'
  id: string
  title?: string | null
  thankYouMessage?: string | null
}

type PageSections_ComponentSectionsSubpages_Fragment = {
  __typename: 'ComponentSectionsSubpages'
  id: string
  title?: string | null
  subpages?: Array<{
    __typename?: 'ComponentBlocksSubpage'
    id: string
    title?: string | null
    description?: string | null
    url?: string | null
    page?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

type PageSections_ComponentSectionsTable_Fragment = {
  __typename: 'ComponentSectionsTable'
  id: string
  primaryTitle?: string | null
  secondaryTitle?: string | null
  rows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
}

type PageSections_ComponentSectionsVideo_Fragment = {
  __typename: 'ComponentSectionsVideo'
  id: string
  youtube_url?: string | null
  media?: { __typename?: 'UploadFile'; url: string } | null
}

type PageSections_Error_Fragment = { __typename: 'Error' }

export type PageSectionsFragment =
  | PageSections_ComponentSectionsAccordion_Fragment
  | PageSections_ComponentSectionsAssets_Fragment
  | PageSections_ComponentSectionsAssetsListing_Fragment
  | PageSections_ComponentSectionsBlogPostsListing_Fragment
  | PageSections_ComponentSectionsCherrypickSection_Fragment
  | PageSections_ComponentSectionsChildrenListing_Fragment
  | PageSections_ComponentSectionsCta_Fragment
  | PageSections_ComponentSectionsDivider_Fragment
  | PageSections_ComponentSectionsEventsListing_Fragment
  | PageSections_ComponentSectionsFaq_Fragment
  | PageSections_ComponentSectionsFlatText_Fragment
  | PageSections_ComponentSectionsForm_Fragment
  | PageSections_ComponentSectionsGallery_Fragment
  | PageSections_ComponentSectionsMap_Fragment
  | PageSections_ComponentSectionsNewBooksListing_Fragment
  | PageSections_ComponentSectionsNewsListing_Fragment
  | PageSections_ComponentSectionsOpeningHoursSection_Fragment
  | PageSections_ComponentSectionsPartners_Fragment
  | PageSections_ComponentSectionsRental_Fragment
  | PageSections_ComponentSectionsSiteUsefullness_Fragment
  | PageSections_ComponentSectionsSubpages_Fragment
  | PageSections_ComponentSectionsTable_Fragment
  | PageSections_ComponentSectionsVideo_Fragment
  | PageSections_Error_Fragment

export type PageEntityFragment = {
  __typename: 'Page'
  documentId: string
  slug: string
  title: string
  createdAt?: any | null
  updatedAt?: any | null
  publishedAt?: any | null
  layout?: Enum_Page_Layout | null
  perex?: string | null
  locale?: string | null
  listingImage?: {
    __typename?: 'UploadFile'
    name: string
    width?: number | null
    height?: number | null
    url: string
    createdAt?: any | null
    hash: string
    mime: string
    provider: string
    size: number
    alternativeText?: string | null
    updatedAt?: any | null
  } | null
  sections?: Array<
    | {
        __typename: 'ComponentSectionsAccordion'
        id: string
        title?: string | null
        flatText?: Array<{
          __typename?: 'ComponentAccordionItemsFlatText'
          category?: string | null
          content?: string | null
        } | null> | null
        tableRows?: Array<{
          __typename?: 'ComponentAccordionItemsTableRow'
          id: string
          accordionCategory?: string | null
          tableCategory?: string | null
          label?: string | null
          value?: string | null
          valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
        } | null> | null
        forms?: Array<{
          __typename?: 'ComponentAccordionItemsForm'
          category?: string | null
          type?: Enum_Componentaccordionitemsform_Type | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsAssets'
        id: string
        title?: string | null
        assets: Array<{
          __typename: 'Asset'
          documentId: string
          title: string
          slug: string
          description?: string | null
          publishedAt?: any | null
          assetCategory?: {
            __typename?: 'AssetCategory'
            documentId: string
            label: string
            slug: string
          } | null
          file: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null>
        } | null>
        disclosures: Array<{
          __typename: 'Disclosure'
          documentId: string
          slug: string
          title: string
          description?: string | null
          addedAt: any
          type: Enum_Disclosure_Type
          dateFrom?: any | null
          dateTo?: any | null
          idNumber?: string | null
          amount?: number | null
          contractor?: string | null
          grantProvider?: string | null
          grantYear?: string | null
          file: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            size: number
            ext?: string | null
          } | null>
        } | null>
      }
    | { __typename: 'ComponentSectionsAssetsListing' }
    | { __typename: 'ComponentSectionsBlogPostsListing' }
    | {
        __typename: 'ComponentSectionsCherrypickSection'
        id: string
        title?: string | null
        pages: Array<{
          __typename: 'Page'
          documentId: string
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsChildrenListing'
        id: string
        depth: Enum_Componentsectionschildrenlisting_Depth
      }
    | { __typename: 'ComponentSectionsCta'; id: string; title?: string | null; url?: string | null }
    | { __typename: 'ComponentSectionsDivider'; id: string }
    | { __typename: 'ComponentSectionsEventsListing' }
    | {
        __typename: 'ComponentSectionsFaq'
        id: string
        title?: string | null
        ctaButton?: string | null
        questions?: Array<{
          __typename?: 'ComponentBlocksAccordionItem'
          id: string
          label?: string | null
          content?: string | null
        } | null> | null
        redirectTo?: {
          __typename: 'Page'
          documentId: string
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      }
    | { __typename: 'ComponentSectionsFlatText'; id: string; content?: string | null }
    | {
        __typename: 'ComponentSectionsForm'
        id: string
        type?: Enum_Componentsectionsform_Type | null
      }
    | {
        __typename: 'ComponentSectionsGallery'
        id: string
        Gallery?: Array<{
          __typename?: 'ComponentLocalityPartsGalleryParts'
          id: string
          Description?: string | null
          Photo?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            alternativeText?: string | null
            caption?: string | null
            size: number
            width?: number | null
            height?: number | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsMap'
        id: string
        title?: string | null
        branches?: Array<{
          __typename?: 'ComponentBlocksBranchItem'
          branch?: {
            __typename: 'Branch'
            documentId: string
            title: string
            address?: string | null
            slug: string
            latitude?: number | null
            longitude?: number | null
            listingImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
            subBranches: Array<{
              __typename?: 'Branch'
              documentId: string
              body?: string | null
              title: string
              address?: string | null
              phone?: string | null
              email?: string | null
              openingHours?: {
                __typename?: 'ComponentBlocksOpeningHours'
                days: Array<{
                  __typename?: 'ComponentBlocksOpeningHoursItem'
                  label?: string | null
                  time: string
                } | null>
              } | null
            } | null>
          } | null
        } | null> | null
      }
    | { __typename: 'ComponentSectionsNewBooksListing' }
    | { __typename: 'ComponentSectionsNewsListing' }
    | {
        __typename: 'ComponentSectionsOpeningHoursSection'
        id: string
        title?: string | null
        branchList: Array<{
          __typename?: 'Branch'
          documentId: string
          title: string
          openingHours?: {
            __typename?: 'ComponentBlocksOpeningHours'
            days: Array<{
              __typename?: 'ComponentBlocksOpeningHoursItem'
              label?: string | null
              time: string
            } | null>
          } | null
        } | null>
      }
    | { __typename: 'ComponentSectionsPartners' }
    | {
        __typename: 'ComponentSectionsRental'
        id: string
        title?: string | null
        text?: string | null
        branches?: Array<{
          __typename?: 'ComponentBlocksBranchItemWithPage'
          branch?: {
            __typename: 'Branch'
            documentId: string
            title: string
            address?: string | null
            slug: string
            latitude?: number | null
            longitude?: number | null
            listingImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
            subBranches: Array<{
              __typename?: 'Branch'
              documentId: string
              body?: string | null
              title: string
              address?: string | null
              phone?: string | null
              email?: string | null
              openingHours?: {
                __typename?: 'ComponentBlocksOpeningHours'
                days: Array<{
                  __typename?: 'ComponentBlocksOpeningHoursItem'
                  label?: string | null
                  time: string
                } | null>
              } | null
            } | null>
          } | null
          page?: { __typename?: 'Page'; documentId: string; slug: string } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsSiteUsefullness'
        id: string
        title?: string | null
        thankYouMessage?: string | null
      }
    | {
        __typename: 'ComponentSectionsSubpages'
        id: string
        title?: string | null
        subpages?: Array<{
          __typename?: 'ComponentBlocksSubpage'
          id: string
          title?: string | null
          description?: string | null
          url?: string | null
          page?: {
            __typename: 'Page'
            documentId: string
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsTable'
        id: string
        primaryTitle?: string | null
        secondaryTitle?: string | null
        rows?: Array<{
          __typename?: 'ComponentAccordionItemsTableRow'
          id: string
          label?: string | null
          value?: string | null
          valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsVideo'
        id: string
        youtube_url?: string | null
        media?: { __typename?: 'UploadFile'; url: string } | null
      }
    | { __typename: 'Error' }
    | null
  > | null
  localizations: Array<{
    __typename: 'Page'
    documentId: string
    slug: string
    locale?: string | null
  } | null>
  seo?: {
    __typename?: 'ComponentCommonSeo'
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
  } | null
}

export type PageWithBaseFieldsEntityFragment = {
  __typename: 'Page'
  documentId: string
  title: string
  slug: string
  newSlug: string
  createdAt?: any | null
  updatedAt?: any | null
}

export type PageLocalizationEntityFragment = {
  __typename: 'Page'
  documentId: string
  slug: string
  locale?: string | null
}

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type PagesStaticPathsQuery = {
  __typename?: 'Query'
  pages: Array<{ __typename?: 'Page'; documentId: string; locale?: string | null } | null>
}

export type PageByDocumentIdQueryVariables = Exact<{
  documentId: Scalars['ID']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type PageByDocumentIdQuery = {
  __typename?: 'Query'
  page?: {
    __typename: 'Page'
    documentId: string
    slug: string
    title: string
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    layout?: Enum_Page_Layout | null
    perex?: string | null
    locale?: string | null
    listingImage?: {
      __typename?: 'UploadFile'
      name: string
      width?: number | null
      height?: number | null
      url: string
      createdAt?: any | null
      hash: string
      mime: string
      provider: string
      size: number
      alternativeText?: string | null
      updatedAt?: any | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          id: string
          title?: string | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
          } | null> | null
          tableRows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            id: string
            accordionCategory?: string | null
            tableCategory?: string | null
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
          forms?: Array<{
            __typename?: 'ComponentAccordionItemsForm'
            category?: string | null
            type?: Enum_Componentaccordionitemsform_Type | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsAssets'
          id: string
          title?: string | null
          assets: Array<{
            __typename: 'Asset'
            documentId: string
            title: string
            slug: string
            description?: string | null
            publishedAt?: any | null
            assetCategory?: {
              __typename?: 'AssetCategory'
              documentId: string
              label: string
              slug: string
            } | null
            file: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              size: number
              ext?: string | null
            } | null>
          } | null>
          disclosures: Array<{
            __typename: 'Disclosure'
            documentId: string
            slug: string
            title: string
            description?: string | null
            addedAt: any
            type: Enum_Disclosure_Type
            dateFrom?: any | null
            dateTo?: any | null
            idNumber?: string | null
            amount?: number | null
            contractor?: string | null
            grantProvider?: string | null
            grantYear?: string | null
            file: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              size: number
              ext?: string | null
            } | null>
          } | null>
        }
      | { __typename: 'ComponentSectionsAssetsListing' }
      | { __typename: 'ComponentSectionsBlogPostsListing' }
      | {
          __typename: 'ComponentSectionsCherrypickSection'
          id: string
          title?: string | null
          pages: Array<{
            __typename: 'Page'
            documentId: string
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsChildrenListing'
          id: string
          depth: Enum_Componentsectionschildrenlisting_Depth
        }
      | {
          __typename: 'ComponentSectionsCta'
          id: string
          title?: string | null
          url?: string | null
        }
      | { __typename: 'ComponentSectionsDivider'; id: string }
      | { __typename: 'ComponentSectionsEventsListing' }
      | {
          __typename: 'ComponentSectionsFaq'
          id: string
          title?: string | null
          ctaButton?: string | null
          questions?: Array<{
            __typename?: 'ComponentBlocksAccordionItem'
            id: string
            label?: string | null
            content?: string | null
          } | null> | null
          redirectTo?: {
            __typename: 'Page'
            documentId: string
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        }
      | { __typename: 'ComponentSectionsFlatText'; id: string; content?: string | null }
      | {
          __typename: 'ComponentSectionsForm'
          id: string
          type?: Enum_Componentsectionsform_Type | null
        }
      | {
          __typename: 'ComponentSectionsGallery'
          id: string
          Gallery?: Array<{
            __typename?: 'ComponentLocalityPartsGalleryParts'
            id: string
            Description?: string | null
            Photo?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsMap'
          id: string
          title?: string | null
          branches?: Array<{
            __typename?: 'ComponentBlocksBranchItem'
            branch?: {
              __typename: 'Branch'
              documentId: string
              title: string
              address?: string | null
              slug: string
              latitude?: number | null
              longitude?: number | null
              listingImage?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
              subBranches: Array<{
                __typename?: 'Branch'
                documentId: string
                body?: string | null
                title: string
                address?: string | null
                phone?: string | null
                email?: string | null
                openingHours?: {
                  __typename?: 'ComponentBlocksOpeningHours'
                  days: Array<{
                    __typename?: 'ComponentBlocksOpeningHoursItem'
                    label?: string | null
                    time: string
                  } | null>
                } | null
              } | null>
            } | null
          } | null> | null
        }
      | { __typename: 'ComponentSectionsNewBooksListing' }
      | { __typename: 'ComponentSectionsNewsListing' }
      | {
          __typename: 'ComponentSectionsOpeningHoursSection'
          id: string
          title?: string | null
          branchList: Array<{
            __typename?: 'Branch'
            documentId: string
            title: string
            openingHours?: {
              __typename?: 'ComponentBlocksOpeningHours'
              days: Array<{
                __typename?: 'ComponentBlocksOpeningHoursItem'
                label?: string | null
                time: string
              } | null>
            } | null
          } | null>
        }
      | { __typename: 'ComponentSectionsPartners' }
      | {
          __typename: 'ComponentSectionsRental'
          id: string
          title?: string | null
          text?: string | null
          branches?: Array<{
            __typename?: 'ComponentBlocksBranchItemWithPage'
            branch?: {
              __typename: 'Branch'
              documentId: string
              title: string
              address?: string | null
              slug: string
              latitude?: number | null
              longitude?: number | null
              listingImage?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
              subBranches: Array<{
                __typename?: 'Branch'
                documentId: string
                body?: string | null
                title: string
                address?: string | null
                phone?: string | null
                email?: string | null
                openingHours?: {
                  __typename?: 'ComponentBlocksOpeningHours'
                  days: Array<{
                    __typename?: 'ComponentBlocksOpeningHoursItem'
                    label?: string | null
                    time: string
                  } | null>
                } | null
              } | null>
            } | null
            page?: { __typename?: 'Page'; documentId: string; slug: string } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsSiteUsefullness'
          id: string
          title?: string | null
          thankYouMessage?: string | null
        }
      | {
          __typename: 'ComponentSectionsSubpages'
          id: string
          title?: string | null
          subpages?: Array<{
            __typename?: 'ComponentBlocksSubpage'
            id: string
            title?: string | null
            description?: string | null
            url?: string | null
            page?: {
              __typename: 'Page'
              documentId: string
              title: string
              slug: string
              newSlug: string
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTable'
          id: string
          primaryTitle?: string | null
          secondaryTitle?: string | null
          rows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            id: string
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsVideo'
          id: string
          youtube_url?: string | null
          media?: { __typename?: 'UploadFile'; url: string } | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    localizations: Array<{
      __typename: 'Page'
      documentId: string
      slug: string
      locale?: string | null
    } | null>
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
  } | null
}

export type SortedPartnersQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type SortedPartnersQuery = {
  __typename?: 'Query'
  featuredPartners: Array<{
    __typename?: 'Partner'
    documentId: string
    title?: string | null
    url?: string | null
    priority?: number | null
    featured?: boolean | null
    logo?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      alternativeText?: string | null
    } | null
  } | null>
  notFeaturedPartners: Array<{
    __typename?: 'Partner'
    documentId: string
    title?: string | null
    url?: string | null
    priority?: number | null
    featured?: boolean | null
    logo?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      alternativeText?: string | null
    } | null
  } | null>
}

export type PartnerEntityFragment = {
  __typename?: 'Partner'
  documentId: string
  title?: string | null
  url?: string | null
  priority?: number | null
  featured?: boolean | null
  logo?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    alternativeText?: string | null
  } | null
}

export type SeoFragment = {
  __typename?: 'ComponentCommonSeo'
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
}

export type UploadFileEntityFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
  name: string
  size: number
  ext?: string | null
}

export type UploadImageEntityFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
  name: string
  alternativeText?: string | null
  caption?: string | null
  size: number
  width?: number | null
  height?: number | null
}

export type UploadImageFragment = {
  __typename?: 'UploadFile'
  url: string
  name: string
  alternativeText?: string | null
  caption?: string | null
  size: number
  width?: number | null
  height?: number | null
}

export type EventTagsFragment = {
  __typename?: 'EventTag'
  title?: string | null
  slug?: string | null
  createdAt?: any | null
  publishedAt?: any | null
  updatedAt?: any | null
}

export type EventCategoryFragment = {
  __typename?: 'EventCategory'
  title?: string | null
  createdAt?: any | null
  updatedAt?: any | null
}

export type EventBranchFragment = { __typename?: 'Branch'; title: string; address?: string | null }

export type BranchFragment = {
  __typename?: 'Branch'
  body?: string | null
  title: string
  address?: string | null
  phone?: string | null
  email?: string | null
  openingHours?: {
    __typename?: 'ComponentBlocksOpeningHours'
    days: Array<{
      __typename?: 'ComponentBlocksOpeningHoursItem'
      label?: string | null
      time: string
    } | null>
  } | null
}

export type BookTagEntityFragment = {
  __typename?: 'BookTag'
  documentId: string
  displayName?: string | null
  slug?: string | null
}

export type OpeningHoursDaysFragment = {
  __typename?: 'ComponentBlocksOpeningHours'
  days: Array<{
    __typename?: 'ComponentBlocksOpeningHoursItem'
    label?: string | null
    time: string
  } | null>
}

export type FlatTextFragment = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: string | null
  content?: string | null
}

export type TableRowFragment = {
  __typename?: 'ComponentAccordionItemsTableRow'
  accordionCategory?: string | null
  tableCategory?: string | null
  label?: string | null
  value?: string | null
  valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
}

export type TableRowWithIdFragment = {
  __typename?: 'ComponentAccordionItemsTableRow'
  id: string
  accordionCategory?: string | null
  tableCategory?: string | null
  label?: string | null
  value?: string | null
  valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
}

export type AccordionItemFragment = {
  __typename?: 'ComponentBlocksAccordionItem'
  id: string
  label?: string | null
  content?: string | null
}

export type PaginationFragment = {
  __typename?: 'Pagination'
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export type AssetsSectionFragment = {
  __typename?: 'ComponentSectionsAssets'
  id: string
  title?: string | null
  assets: Array<{
    __typename: 'Asset'
    documentId: string
    title: string
    slug: string
    description?: string | null
    publishedAt?: any | null
    assetCategory?: {
      __typename?: 'AssetCategory'
      documentId: string
      label: string
      slug: string
    } | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
  disclosures: Array<{
    __typename: 'Disclosure'
    documentId: string
    slug: string
    title: string
    description?: string | null
    addedAt: any
    type: Enum_Disclosure_Type
    dateFrom?: any | null
    dateTo?: any | null
    idNumber?: string | null
    amount?: number | null
    contractor?: string | null
    grantProvider?: string | null
    grantYear?: string | null
    file: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      size: number
      ext?: string | null
    } | null>
  } | null>
}

export type GallerySectionFragment = {
  __typename?: 'ComponentSectionsGallery'
  id: string
  Gallery?: Array<{
    __typename?: 'ComponentLocalityPartsGalleryParts'
    id: string
    Description?: string | null
    Photo?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      alternativeText?: string | null
      caption?: string | null
      size: number
      width?: number | null
      height?: number | null
    } | null
  } | null> | null
}

export type RentalSectionFragment = {
  __typename?: 'ComponentSectionsRental'
  id: string
  title?: string | null
  text?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItemWithPage'
    branch?: {
      __typename: 'Branch'
      documentId: string
      title: string
      address?: string | null
      slug: string
      latitude?: number | null
      longitude?: number | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
      subBranches: Array<{
        __typename?: 'Branch'
        documentId: string
        body?: string | null
        title: string
        address?: string | null
        phone?: string | null
        email?: string | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null>
    } | null
    page?: { __typename?: 'Page'; documentId: string; slug: string } | null
  } | null> | null
}

export type MapSectionFragment = {
  __typename?: 'ComponentSectionsMap'
  id: string
  title?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItem'
    branch?: {
      __typename: 'Branch'
      documentId: string
      title: string
      address?: string | null
      slug: string
      latitude?: number | null
      longitude?: number | null
      listingImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        alternativeText?: string | null
        caption?: string | null
        size: number
        width?: number | null
        height?: number | null
      } | null
      subBranches: Array<{
        __typename?: 'Branch'
        documentId: string
        body?: string | null
        title: string
        address?: string | null
        phone?: string | null
        email?: string | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null>
    } | null
  } | null> | null
}

export type VideoSectionFragment = {
  __typename?: 'ComponentSectionsVideo'
  id: string
  youtube_url?: string | null
  media?: { __typename?: 'UploadFile'; url: string } | null
}

export type CtaSectionFragment = {
  __typename?: 'ComponentSectionsCta'
  id: string
  title?: string | null
  url?: string | null
}

export type AccordionSectionFragment = {
  __typename?: 'ComponentSectionsAccordion'
  id: string
  title?: string | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
  } | null> | null
  tableRows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    accordionCategory?: string | null
    tableCategory?: string | null
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
  forms?: Array<{
    __typename?: 'ComponentAccordionItemsForm'
    category?: string | null
    type?: Enum_Componentaccordionitemsform_Type | null
  } | null> | null
}

export type TableSectionFragment = {
  __typename?: 'ComponentSectionsTable'
  id: string
  primaryTitle?: string | null
  secondaryTitle?: string | null
  rows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    id: string
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
}

export type SubpagesSectionFragment = {
  __typename?: 'ComponentSectionsSubpages'
  id: string
  title?: string | null
  subpages?: Array<{
    __typename?: 'ComponentBlocksSubpage'
    id: string
    title?: string | null
    description?: string | null
    url?: string | null
    page?: {
      __typename: 'Page'
      documentId: string
      title: string
      slug: string
      newSlug: string
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

export type FormSectionFragment = {
  __typename?: 'ComponentSectionsForm'
  id: string
  type?: Enum_Componentsectionsform_Type | null
}

export type SiteUsefulnessSectionFragment = {
  __typename?: 'ComponentSectionsSiteUsefullness'
  id: string
  title?: string | null
  thankYouMessage?: string | null
}

export type FlatTextSectionFragment = {
  __typename?: 'ComponentSectionsFlatText'
  id: string
  content?: string | null
}

export type FaqSectionFragment = {
  __typename?: 'ComponentSectionsFaq'
  id: string
  title?: string | null
  ctaButton?: string | null
  questions?: Array<{
    __typename?: 'ComponentBlocksAccordionItem'
    id: string
    label?: string | null
    content?: string | null
  } | null> | null
  redirectTo?: {
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type OpeningHoursSectionFragment = {
  __typename?: 'ComponentSectionsOpeningHoursSection'
  id: string
  title?: string | null
  branchList: Array<{
    __typename?: 'Branch'
    documentId: string
    title: string
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
  } | null>
}

export type ChildrenListingSectionFragment = {
  __typename?: 'ComponentSectionsChildrenListing'
  id: string
  depth: Enum_Componentsectionschildrenlisting_Depth
}

export type CherrypickSectionFragment = {
  __typename?: 'ComponentSectionsCherrypickSection'
  id: string
  title?: string | null
  pages: Array<{
    __typename: 'Page'
    documentId: string
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
}

export const FileCategoryEntityFragmentDoc = gql`
  fragment FileCategoryEntity on FileCategory {
    documentId
    name
    slug
  }
`
export const BasicDocumentFileFragmentDoc = gql`
  fragment BasicDocumentFile on UploadFile {
    documentId
    url
    name
    ext
    size
  }
`
export const UploadFileEntityFragmentDoc = gql`
  fragment UploadFileEntity on UploadFile {
    documentId
    url
    name
    size
    ext
  }
`
export const MetadataFragmentDoc = gql`
  fragment Metadata on BasicDocumentMetadataDynamicZone {
    __typename
    ... on ComponentMetadataFaktury {
      id
      name
      date
      attachment {
        ...UploadFileEntity
      }
    }
    ... on ComponentMetadataMetadata {
      id
      provider
      year
      grant_name
      grant_number
      amount
      description
    }
    ... on ComponentMetadataZmluvy {
      id
      date
      number
      amount
      supplier
      subject
    }
    ... on ComponentMetadataObchodnaVerejnaSutaz {
      id
      subject
      description
      number
      date_added
      amount
      attachment {
        ...UploadFileEntity
      }
    }
    ... on ComponentMetadataObjednavky {
      id
      title
      date_period
      date_added
      attachment {
        ...UploadFileEntity
      }
    }
    ... on ComponentMetadataVerejneObstaravanie {
      id
      subject
      description
      number
      date_added
      amount
      attachment {
        ...UploadFileEntity
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const BasicDocumentEntityFragmentDoc = gql`
  fragment BasicDocumentEntity on BasicDocument {
    documentId
    slug
    title
    description
    date_added
    author
    link
    file_category {
      documentId
      name
      slug
    }
    metadata {
      ...Metadata
    }
    attachment {
      ...UploadFileEntity
    }
  }
  ${MetadataFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const AccordionItemFragmentDoc = gql`
  fragment AccordionItem on ComponentBlocksAccordionItem {
    id
    label
    content
  }
`
export const PageWithBaseFieldsEntityFragmentDoc = gql`
  fragment PageWithBaseFieldsEntity on Page {
    __typename
    documentId
    title
    slug
    newSlug
    createdAt
    updatedAt
  }
`
export const FaqSectionFragmentDoc = gql`
  fragment FaqSection on ComponentSectionsFaq {
    id
    title
    questions {
      ...AccordionItem
    }
    ctaButton
    redirectTo {
      ...PageWithBaseFieldsEntity
    }
  }
  ${AccordionItemFragmentDoc}
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const FlatTextSectionFragmentDoc = gql`
  fragment FlatTextSection on ComponentSectionsFlatText {
    id
    content
  }
`
export const SiteUsefulnessSectionFragmentDoc = gql`
  fragment SiteUsefulnessSection on ComponentSectionsSiteUsefullness {
    id
    title
    thankYouMessage
  }
`
export const TableSectionFragmentDoc = gql`
  fragment TableSection on ComponentSectionsTable {
    id
    primaryTitle
    secondaryTitle
    rows {
      id
      label
      value
      valueAlign
    }
  }
`
export const FlatTextFragmentDoc = gql`
  fragment FlatText on ComponentAccordionItemsFlatText {
    category
    content
  }
`
export const TableRowWithIdFragmentDoc = gql`
  fragment TableRowWithId on ComponentAccordionItemsTableRow {
    id
    accordionCategory
    tableCategory
    label
    value
    valueAlign
  }
`
export const AccordionSectionFragmentDoc = gql`
  fragment AccordionSection on ComponentSectionsAccordion {
    id
    title
    flatText {
      ...FlatText
    }
    tableRows(pagination: { limit: -1 }) {
      ...TableRowWithId
    }
    forms {
      category
      type
    }
  }
  ${FlatTextFragmentDoc}
  ${TableRowWithIdFragmentDoc}
`
export const CtaSectionFragmentDoc = gql`
  fragment CtaSection on ComponentSectionsCta {
    id
    title
    url
  }
`
export const VideoSectionFragmentDoc = gql`
  fragment VideoSection on ComponentSectionsVideo {
    id
    youtube_url
    media {
      url
    }
  }
`
export const AssetCategoryEntityFragmentDoc = gql`
  fragment AssetCategoryEntity on AssetCategory {
    documentId
    label
    slug
  }
`
export const AssetEntityFragmentDoc = gql`
  fragment AssetEntity on Asset {
    documentId
    __typename
    title
    slug
    description
    publishedAt
    assetCategory {
      ...AssetCategoryEntity
    }
    file {
      ...UploadFileEntity
    }
  }
  ${AssetCategoryEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const DisclosureEntityFragmentDoc = gql`
  fragment DisclosureEntity on Disclosure {
    documentId
    __typename
    slug
    title
    description
    addedAt
    type
    file {
      ...UploadFileEntity
    }
    dateFrom
    dateTo
    idNumber
    amount
    contractor
    grantProvider
    grantYear
  }
  ${UploadFileEntityFragmentDoc}
`
export const AssetsSectionFragmentDoc = gql`
  fragment AssetsSection on ComponentSectionsAssets {
    id
    title
    assets {
      ...AssetEntity
    }
    disclosures {
      ...DisclosureEntity
    }
  }
  ${AssetEntityFragmentDoc}
  ${DisclosureEntityFragmentDoc}
`
export const UploadImageFragmentDoc = gql`
  fragment UploadImage on UploadFile {
    url
    name
    alternativeText
    caption
    size
    width
    height
  }
`
export const UploadImageEntityFragmentDoc = gql`
  fragment UploadImageEntity on UploadFile {
    documentId
    ...UploadImage
  }
  ${UploadImageFragmentDoc}
`
export const GallerySectionFragmentDoc = gql`
  fragment GallerySection on ComponentSectionsGallery {
    id
    Gallery {
      id
      Description
      Photo {
        ...UploadImageEntity
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const BlogPostSectionsFragmentDoc = gql`
  fragment BlogPostSections on BlogPostSectionsDynamicZone {
    __typename
    ... on ComponentSectionsFaq {
      ...FaqSection
    }
    ... on ComponentSectionsFlatText {
      ...FlatTextSection
    }
    ... on ComponentSectionsSiteUsefullness {
      ...SiteUsefulnessSection
    }
    ... on ComponentSectionsTable {
      ...TableSection
    }
    ... on ComponentSectionsAccordion {
      ...AccordionSection
    }
    ... on ComponentSectionsDivider {
      id
    }
    ... on ComponentSectionsCta {
      ...CtaSection
    }
    ... on ComponentSectionsVideo {
      ...VideoSection
    }
    ... on ComponentSectionsAssets {
      ...AssetsSection
    }
    ... on ComponentSectionsGallery {
      ...GallerySection
    }
  }
  ${FaqSectionFragmentDoc}
  ${FlatTextSectionFragmentDoc}
  ${SiteUsefulnessSectionFragmentDoc}
  ${TableSectionFragmentDoc}
  ${AccordionSectionFragmentDoc}
  ${CtaSectionFragmentDoc}
  ${VideoSectionFragmentDoc}
  ${AssetsSectionFragmentDoc}
  ${GallerySectionFragmentDoc}
`
export const SeoFragmentDoc = gql`
  fragment Seo on ComponentCommonSeo {
    metaTitle
    metaDescription
    keywords
  }
`
export const BlogPostEntityFragmentDoc = gql`
  fragment BlogPostEntity on BlogPost {
    __typename
    documentId
    slug
    title
    publishedAt
    coverMedia {
      url
      mime
      alternativeText
      width
      height
    }
    sections {
      ...BlogPostSections
    }
    localizations {
      slug
      locale
    }
    seo {
      ...Seo
    }
  }
  ${BlogPostSectionsFragmentDoc}
  ${SeoFragmentDoc}
`
export const BranchFragmentDoc = gql`
  fragment Branch on Branch {
    body
    title
    address
    phone
    email
    openingHours {
      days {
        label
        time
      }
    }
  }
`
export const BranchPlaceEntityFragmentDoc = gql`
  fragment BranchPlaceEntity on Branch {
    documentId
    ...Branch
  }
  ${BranchFragmentDoc}
`
export const BranchCardEntityFragmentDoc = gql`
  fragment BranchCardEntity on Branch {
    __typename
    documentId
    title
    address
    slug
    latitude
    longitude
    listingImage {
      ...UploadImageEntity
    }
    subBranches {
      ...BranchPlaceEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${BranchPlaceEntityFragmentDoc}
`
export const BranchEntityFragmentDoc = gql`
  fragment BranchEntity on Branch {
    __typename
    ...BranchCardEntity
    medias {
      ...UploadImageEntity
    }
    body
    publicTransportInfo
    barrierFreeInfo
    barrierFreeState
    phone
    email
    openingHours {
      days {
        label
        time
      }
    }
    servicePages {
      __typename
      documentId
      title
    }
    locale
    localizations {
      documentId
      title
      slug
      locale
    }
    seo {
      ...Seo
    }
  }
  ${BranchCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${SeoFragmentDoc}
`
export const EventCategoryFragmentDoc = gql`
  fragment EventCategory on EventCategory {
    title
    createdAt
    updatedAt
  }
`
export const EventBranchFragmentDoc = gql`
  fragment EventBranch on Branch {
    title
    address
  }
`
export const EventBranchPlaceEntityFragmentDoc = gql`
  fragment EventBranchPlaceEntity on Branch {
    documentId
    ...EventBranch
  }
  ${EventBranchFragmentDoc}
`
export const EventTagsFragmentDoc = gql`
  fragment EventTags on EventTag {
    title
    slug
    createdAt
    publishedAt
    updatedAt
  }
`
export const EventCardEntityFragmentDoc = gql`
  fragment EventCardEntity on Event {
    documentId
    __typename
    slug
    title
    description
    createdAt
    updatedAt
    publishedAt
    locale
    dateFrom
    dateTo
    price
    eventCategory {
      documentId
      ...EventCategory
    }
    branch {
      ...EventBranchPlaceEntity
    }
    eventTags {
      documentId
      ...EventTags
    }
    listingImage {
      ...UploadImageEntity
    }
    coverImage {
      ...UploadImageEntity
    }
  }
  ${EventCategoryFragmentDoc}
  ${EventBranchPlaceEntityFragmentDoc}
  ${EventTagsFragmentDoc}
  ${UploadImageEntityFragmentDoc}
`
export const EventEntityFragmentDoc = gql`
  fragment EventEntity on Event {
    ...EventCardEntity
<<<<<<< HEAD
    promoted
    showForm
    guests {
      id
      name
      surname
      avatar {
        ...UploadImageEntity
=======
    attributes {
      promoted
      showForm
      guests {
        id
        name
        surname
        avatar {
          data {
            ...UploadImageEntity
          }
        }
      }
      assets {
        ...AssetsSection
      }
      gallery {
        data {
          ...UploadImageEntity
        }
      }
      localizations {
        data {
          attributes {
            slug
            locale
          }
        }
      }
      seo {
        ...Seo
>>>>>>> 531-v2-migrating-documents-to-assets
      }
    }
    assets {
      ...AssetsSection
    }
    gallery {
      ...UploadImageEntity
    }
    localizations {
      slug
      locale
    }
    seo {
      ...Seo
    }
  }
  ${EventCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${AssetsSectionFragmentDoc}
  ${SeoFragmentDoc}
`
export const SectionLinkPageEntityFragmentDoc = gql`
  fragment SectionLinkPageEntity on Page {
    documentId
    title
  }
`
export const SectionLinkBranchEntityFragmentDoc = gql`
  fragment SectionLinkBranchEntity on Branch {
    documentId
    slug
    title
  }
`
export const MenuSectionFragmentDoc = gql`
  fragment MenuSection on ComponentMenuSections {
    id
    sectionTitle
    sectionColumnSpan
    sectionPage {
      ...PageWithBaseFieldsEntity
    }
    sectionLinks(pagination: { limit: -1 }) {
      id
      sectionLinkTitle
      sectionLinkPage {
        ...SectionLinkPageEntity
      }
      sectionLinkBranch {
        ...SectionLinkBranchEntity
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
  ${SectionLinkPageEntityFragmentDoc}
  ${SectionLinkBranchEntityFragmentDoc}
`
export const MenuEntityFragmentDoc = gql`
  fragment MenuEntity on Menu {
    documentId
    menuTitle
    menuTotalColumns
    order
    menuSections {
      ...MenuSection
    }
    createdAt
    updatedAt
  }
  ${MenuSectionFragmentDoc}
`
export const ComponentFooterFooterColumnFragmentDoc = gql`
  fragment ComponentFooterFooterColumn on ComponentFooterFooterColumn {
    id
    title
    footerLink {
      id
      redirectTo {
        ...PageWithBaseFieldsEntity
      }
      title
      otherSite
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const FooterEntityFragmentDoc = gql`
  fragment FooterEntity on Footer {
    documentId
    footerColumns {
      ...ComponentFooterFooterColumn
    }
    siteMapLink {
      ...PageWithBaseFieldsEntity
    }
    privacyLink {
      ...PageWithBaseFieldsEntity
    }
  }
  ${ComponentFooterFooterColumnFragmentDoc}
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const GeneralEntityFragmentDoc = gql`
  fragment GeneralEntity on General {
    eventsPage {
      __typename
      documentId
    }
    newBooksPage {
      __typename
      documentId
    }
    privacyTermsAndConditionsPage {
      __typename
      documentId
    }
    openingHoursPage {
      __typename
      documentId
    }
    noticesPage {
      __typename
      documentId
    }
  }
`
export const HomepageFaqSectionFragmentDoc = gql`
  fragment HomepageFaqSection on ComponentHomepageFaqSection {
    id
    title
    redirectTo {
      ...PageWithBaseFieldsEntity
    }
    faqs(pagination: { limit: -1 }) {
      id
      question
      answer
    }
    ctas(pagination: { limit: -1 }) {
      id
      title
      ctaRedirectTo {
        ...PageWithBaseFieldsEntity
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const HomepageMapSectionFragmentDoc = gql`
  fragment HomepageMapSection on ComponentSectionsMap {
    id
    title
    branches {
      branch {
        ...BranchCardEntity
      }
    }
  }
  ${BranchCardEntityFragmentDoc}
`
export const HomepageRegistrationInfoFragmentDoc = gql`
  fragment HomepageRegistrationInfo on ComponentHomepageRegistrationInfo {
    id
    title
    description
    redirectTo {
      ...PageWithBaseFieldsEntity
    }
    registrationBenefits {
      id
      benefit
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const HomepageNewsSectionFragmentDoc = gql`
  fragment HomepageNewsSection on ComponentHomepageNewsSection {
    id
    title
    redirectTo {
      ...PageWithBaseFieldsEntity
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const NoticeListingEntityFragmentDoc = gql`
  fragment NoticeListingEntity on Notice {
    __typename
    documentId
    slug
    title
    publishedAt
    listingImage {
      ...UploadImageEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const HomepagePromotedContentSectionFragmentDoc = gql`
  fragment HomepagePromotedContentSection on ComponentHomepagePromotedContent {
    id
    events {
      ...EventCardEntity
    }
    notices {
      ...NoticeListingEntity
    }
  }
  ${EventCardEntityFragmentDoc}
  ${NoticeListingEntityFragmentDoc}
`
export const NoticeEntityFragmentDoc = gql`
  fragment NoticeEntity on Notice {
    __typename
    documentId
    publishedAt
    slug
    title
    body
    listingImage {
      ...UploadImageEntity
    }
    promoted
    assets {
      ...AssetsSection
    }
    seo {
      ...Seo
    }
    localizations {
      slug
<<<<<<< HEAD
      locale
=======
      title
      body
      listingImage {
        data {
          ...UploadImageEntity
        }
      }
      promoted
      assets {
        ...AssetsSection
      }
      seo {
        ...Seo
      }
      localizations {
        data {
          attributes {
            slug
            locale
          }
        }
      }
>>>>>>> 531-v2-migrating-documents-to-assets
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${AssetsSectionFragmentDoc}
  ${SeoFragmentDoc}
`
export const LatestNoticesQueryFragmentDoc = gql`
  fragment LatestNoticesQuery on Query {
    latestNotices: notices(
      locale: $locale
      pagination: { limit: 4, start: 0 }
      sort: "publishedAt:desc"
    ) {
      ...NoticeListingEntity
    }
  }
  ${NoticeListingEntityFragmentDoc}
`
export const FormSectionFragmentDoc = gql`
  fragment FormSection on ComponentSectionsForm {
    id
    type
  }
`
export const SubpagesSectionFragmentDoc = gql`
  fragment SubpagesSection on ComponentSectionsSubpages {
    id
    title
    subpages {
      id
      title
      description
      url
      page {
        ...PageWithBaseFieldsEntity
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const MapSectionFragmentDoc = gql`
  fragment MapSection on ComponentSectionsMap {
    id
    title
    branches {
      branch {
        ...BranchCardEntity
      }
    }
  }
  ${BranchCardEntityFragmentDoc}
`
export const RentalSectionFragmentDoc = gql`
  fragment RentalSection on ComponentSectionsRental {
    id
    title
    text
    branches {
      branch {
        ...BranchCardEntity
      }
      page {
        documentId
        slug
      }
    }
  }
  ${BranchCardEntityFragmentDoc}
`
export const OpeningHoursDaysFragmentDoc = gql`
  fragment OpeningHoursDays on ComponentBlocksOpeningHours {
    days {
      label
      time
    }
  }
`
export const OpeningHoursSectionFragmentDoc = gql`
  fragment OpeningHoursSection on ComponentSectionsOpeningHoursSection {
    id
    title
    branchList {
      documentId
      title
      openingHours {
        ...OpeningHoursDays
      }
    }
  }
  ${OpeningHoursDaysFragmentDoc}
`
export const ChildrenListingSectionFragmentDoc = gql`
  fragment ChildrenListingSection on ComponentSectionsChildrenListing {
    id
    depth
  }
`
export const CherrypickSectionFragmentDoc = gql`
  fragment CherrypickSection on ComponentSectionsCherrypickSection {
    id
    title
    pages {
      ...PageWithBaseFieldsEntity
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const PageSectionsFragmentDoc = gql`
  fragment PageSections on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsFaq {
      ...FaqSection
    }
    ... on ComponentSectionsFlatText {
      ...FlatTextSection
    }
    ... on ComponentSectionsSiteUsefullness {
      ...SiteUsefulnessSection
    }
    ... on ComponentSectionsForm {
      ...FormSection
    }
    ... on ComponentSectionsSubpages {
      id
      ...SubpagesSection
    }
    ... on ComponentSectionsTable {
      ...TableSection
    }
    ... on ComponentSectionsAccordion {
      ...AccordionSection
    }
    ... on ComponentSectionsDivider {
      id
    }
    ... on ComponentSectionsCta {
      ...CtaSection
    }
    ... on ComponentSectionsVideo {
      ...VideoSection
    }
    ... on ComponentSectionsAssets {
      id
      ...AssetsSection
    }
    ... on ComponentSectionsMap {
      ...MapSection
    }
    ... on ComponentSectionsRental {
      ...RentalSection
    }
    ... on ComponentSectionsGallery {
      ...GallerySection
    }
    ... on ComponentSectionsOpeningHoursSection {
      ...OpeningHoursSection
    }
    ... on ComponentSectionsChildrenListing {
      ...ChildrenListingSection
    }
    ... on ComponentSectionsCherrypickSection {
      ...CherrypickSection
    }
  }
  ${FaqSectionFragmentDoc}
  ${FlatTextSectionFragmentDoc}
  ${SiteUsefulnessSectionFragmentDoc}
  ${FormSectionFragmentDoc}
  ${SubpagesSectionFragmentDoc}
  ${TableSectionFragmentDoc}
  ${AccordionSectionFragmentDoc}
  ${CtaSectionFragmentDoc}
  ${VideoSectionFragmentDoc}
  ${AssetsSectionFragmentDoc}
  ${MapSectionFragmentDoc}
  ${RentalSectionFragmentDoc}
  ${GallerySectionFragmentDoc}
  ${OpeningHoursSectionFragmentDoc}
  ${ChildrenListingSectionFragmentDoc}
  ${CherrypickSectionFragmentDoc}
`
export const PageLocalizationEntityFragmentDoc = gql`
  fragment PageLocalizationEntity on Page {
    __typename
    documentId
    slug
    locale
  }
`
export const PageEntityFragmentDoc = gql`
  fragment PageEntity on Page {
    __typename
    documentId
    slug
    title
    createdAt
    updatedAt
    publishedAt
    listingImage {
      name
      width
      height
      url
      createdAt
      hash
      mime
      provider
      size
      alternativeText
      updatedAt
    }
    layout
    perex
    sections {
      ...PageSections
    }
    locale
    localizations {
      ...PageLocalizationEntity
    }
    seo {
      ...Seo
    }
  }
  ${PageSectionsFragmentDoc}
  ${PageLocalizationEntityFragmentDoc}
  ${SeoFragmentDoc}
`
export const PartnerEntityFragmentDoc = gql`
  fragment PartnerEntity on Partner {
    documentId
    title
    url
    logo {
      documentId
      url
      alternativeText
    }
    priority
    featured
  }
`
export const BookTagEntityFragmentDoc = gql`
  fragment BookTagEntity on BookTag {
    documentId
    displayName
    slug
  }
`
export const TableRowFragmentDoc = gql`
  fragment TableRow on ComponentAccordionItemsTableRow {
    accordionCategory
    tableCategory
    label
    value
    valueAlign
  }
`
export const PaginationFragmentDoc = gql`
  fragment Pagination on Pagination {
    total
    page
    pageSize
    pageCount
  }
`
export const AssetCategoriesDocument = gql`
  query AssetCategories {
    assetCategories {
      ...AssetCategoryEntity
    }
  }
  ${AssetCategoryEntityFragmentDoc}
`
export const AssetBySlugDocument = gql`
  query AssetBySlug($slug: String!) {
    assets(filters: { slug: { eq: $slug } }) {
      ...AssetEntity
    }
  }
  ${AssetEntityFragmentDoc}
`
export const BasicDocumentBySlugDocument = gql`
  query BasicDocumentBySlug($slug: String!) {
    basicDocuments(filters: { slug: { eq: $slug } }) {
      ...BasicDocumentEntity
    }
  }
  ${BasicDocumentEntityFragmentDoc}
`
export const FileCategoriesDocument = gql`
  query FileCategories {
    fileCategories {
      ...FileCategoryEntity
    }
  }
  ${FileCategoryEntityFragmentDoc}
`
export const BlogPostStaticPathsDocument = gql`
  query BlogPostStaticPaths($locale: I18NLocaleCode!) {
    blogPosts(locale: $locale, pagination: { limit: -1 }) {
      documentId
      slug
      locale
    }
  }
`
export const BlogPostBySlugDocument = gql`
  query BlogPostBySlug($slug: String!, $locale: I18NLocaleCode!) {
    blogPosts(locale: $locale, filters: { slug: { eq: $slug } }) {
      ...BlogPostEntity
    }
  }
  ${BlogPostEntityFragmentDoc}
`
export const BlogPostsDocument = gql`
  query BlogPosts(
    $locale: I18NLocaleCode!
    $limit: Int
    $start: Int
    $sort: String = "publishedAt:desc"
  ) {
    blogPosts_connection(
      locale: $locale
      pagination: { limit: $limit, start: $start }
      sort: [$sort]
    ) {
      nodes {
        ...BlogPostEntity
      }
      pageInfo {
        total
      }
    }
  }
  ${BlogPostEntityFragmentDoc}
`
export const BranchStaticPathsDocument = gql`
  query BranchStaticPaths($locale: I18NLocaleCode!) {
    branches(locale: $locale, pagination: { limit: -1 }) {
      slug
      locale
    }
  }
`
export const BranchBySlugDocument = gql`
  query BranchBySlug($slug: String!, $locale: I18NLocaleCode!) {
    branches(locale: $locale, filters: { slug: { eq: $slug } }) {
      ...BranchEntity
    }
  }
  ${BranchEntityFragmentDoc}
`
export const DisclosureBySlugDocument = gql`
  query DisclosureBySlug($slug: String!) {
    disclosures(filters: { slug: { eq: $slug } }) {
      ...DisclosureEntity
    }
  }
  ${DisclosureEntityFragmentDoc}
`
export const EventPropertiesDocument = gql`
  query EventProperties($locale: I18NLocaleCode!) {
    eventCategories(locale: $locale) {
      documentId
      title
      createdAt
      updatedAt
    }
    branches(locale: $locale) {
      ...BranchPlaceEntity
    }
    eventTags(locale: $locale) {
      documentId
      title
      slug
      createdAt
      publishedAt
      updatedAt
    }
  }
  ${BranchPlaceEntityFragmentDoc}
`
export const EventBySlugDocument = gql`
  query EventBySlug($slug: String!, $locale: I18NLocaleCode!) {
    events(locale: $locale, filters: { slug: { eq: $slug } }) {
      ...EventEntity
    }
  }
  ${EventEntityFragmentDoc}
`
export const EventStaticPathsDocument = gql`
  query EventStaticPaths($locale: I18NLocaleCode!) {
    events(locale: $locale, pagination: { limit: 32 }, sort: "dateFrom:desc") {
      slug
      locale
    }
  }
`
export const GeneralDocument = gql`
  query General($eventsFrom: DateTime!, $locale: I18NLocaleCode!) {
    menus(locale: $locale, sort: ["order:asc"]) {
      ...MenuEntity
    }
    upcomingEvents: events(
      locale: $locale
      sort: "dateFrom:asc"
      pagination: { start: 0, limit: 4 }
      filters: { dateTo: { gte: $eventsFrom } }
    ) {
      ...EventCardEntity
    }
    footer(locale: $locale) {
      ...FooterEntity
    }
    general(locale: $locale) {
      ...GeneralEntity
    }
  }
  ${MenuEntityFragmentDoc}
  ${EventCardEntityFragmentDoc}
  ${FooterEntityFragmentDoc}
  ${GeneralEntityFragmentDoc}
`
export const HomePageDocument = gql`
  query HomePage($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
      faqSection {
        ...HomepageFaqSection
      }
      registrationInfoSection {
        ...HomepageRegistrationInfo
      }
      newsSection {
        ...HomepageNewsSection
      }
      mapSection {
        ...HomepageMapSection
      }
      promotedContent {
        ...HomepagePromotedContentSection
      }
      localizations {
        locale
      }
      seo {
        ...Seo
      }
    }
    promotedNews: notices(
      locale: $locale
      sort: "publishedAt:desc"
      filters: { promoted: { eq: true } }
    ) {
      ...NoticeListingEntity
    }
    promotedEvents: events(
      locale: $locale
      sort: "dateFrom:asc"
      filters: { promoted: { eq: true } }
    ) {
      ...EventCardEntity
    }
    ...LatestNoticesQuery
    bookTags(pagination: { limit: -1 }) {
      ...BookTagEntity
    }
  }
  ${HomepageFaqSectionFragmentDoc}
  ${HomepageRegistrationInfoFragmentDoc}
  ${HomepageNewsSectionFragmentDoc}
  ${HomepageMapSectionFragmentDoc}
  ${HomepagePromotedContentSectionFragmentDoc}
  ${SeoFragmentDoc}
  ${NoticeListingEntityFragmentDoc}
  ${EventCardEntityFragmentDoc}
  ${LatestNoticesQueryFragmentDoc}
  ${BookTagEntityFragmentDoc}
`
export const LatestNoticesDocument = gql`
  query LatestNotices($locale: I18NLocaleCode!) {
    ...LatestNoticesQuery
  }
  ${LatestNoticesQueryFragmentDoc}
`
export const NoticesStaticPathsDocument = gql`
  query NoticesStaticPaths($locale: I18NLocaleCode!) {
    notices(locale: $locale, pagination: { limit: -1 }) {
      documentId
      slug
      locale
    }
  }
`
export const NoticesDocument = gql`
  query Notices($locale: I18NLocaleCode!, $limit: Int, $start: Int) {
    notices_connection(
      locale: $locale
      pagination: { limit: $limit, start: $start }
      sort: "publishedAt:desc"
    ) {
      nodes {
        ...NoticeListingEntity
      }
      pageInfo {
        total
      }
    }
  }
  ${NoticeListingEntityFragmentDoc}
`
export const NoticeBySlugDocument = gql`
  query NoticeBySlug($slug: String!, $locale: I18NLocaleCode!) {
    notices(locale: $locale, filters: { slug: { eq: $slug } }) {
      ...NoticeEntity
    }
  }
  ${NoticeEntityFragmentDoc}
`
export const OpeningHoursChangeNoticesDocument = gql`
  query OpeningHoursChangeNotices($locale: I18NLocaleCode!) {
    notices(
      filters: { isCurrentChangeInOpeningHours: { eq: true } }
      sort: "publishedAt:desc"
      pagination: { limit: -1 }
      locale: $locale
    ) {
      __typename
      documentId
      slug
      locale
      title
    }
  }
`
export const PagesStaticPathsDocument = gql`
  query PagesStaticPaths($locale: I18NLocaleCode) {
    pages(locale: $locale) {
      documentId
      locale
    }
  }
`
export const PageByDocumentIdDocument = gql`
  query PageByDocumentId($documentId: ID!, $locale: I18NLocaleCode!) {
    page(documentId: $documentId, locale: $locale) {
      ...PageEntity
    }
  }
  ${PageEntityFragmentDoc}
`
export const SortedPartnersDocument = gql`
  query SortedPartners($locale: I18NLocaleCode!) {
    featuredPartners: partners(
      locale: $locale
      pagination: { limit: -1 }
      filters: { featured: { eq: true } }
      sort: "priority:asc"
    ) {
      ...PartnerEntity
    }
    notFeaturedPartners: partners(
      locale: $locale
      pagination: { limit: -1 }
      filters: { featured: { eq: false } }
      sort: "priority:asc"
    ) {
      ...PartnerEntity
    }
  }
  ${PartnerEntityFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) =>
  action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AssetCategories(
      variables?: AssetCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AssetCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssetCategoriesQuery>(AssetCategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AssetCategories',
        'query',
        variables,
      )
    },
    AssetBySlug(
      variables: AssetBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AssetBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssetBySlugQuery>(AssetBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AssetBySlug',
        'query',
        variables,
      )
    },
    BasicDocumentBySlug(
      variables: BasicDocumentBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BasicDocumentBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BasicDocumentBySlugQuery>(BasicDocumentBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BasicDocumentBySlug',
        'query',
        variables,
      )
    },
    FileCategories(
      variables?: FileCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<FileCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FileCategoriesQuery>(FileCategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FileCategories',
        'query',
        variables,
      )
    },
    BlogPostStaticPaths(
      variables: BlogPostStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostStaticPathsQuery>(BlogPostStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostStaticPaths',
        'query',
        variables,
      )
    },
    BlogPostBySlug(
      variables: BlogPostBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostBySlugQuery>(BlogPostBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostBySlug',
        'query',
        variables,
      )
    },
    BlogPosts(
      variables: BlogPostsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsQuery>(BlogPostsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPosts',
        'query',
        variables,
      )
    },
    BranchStaticPaths(
      variables: BranchStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BranchStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BranchStaticPathsQuery>(BranchStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BranchStaticPaths',
        'query',
        variables,
      )
    },
    BranchBySlug(
      variables: BranchBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BranchBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BranchBySlugQuery>(BranchBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BranchBySlug',
        'query',
        variables,
      )
    },
    DisclosureBySlug(
      variables: DisclosureBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DisclosureBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DisclosureBySlugQuery>(DisclosureBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DisclosureBySlug',
        'query',
        variables,
      )
    },
    EventProperties(
      variables: EventPropertiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<EventPropertiesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventPropertiesQuery>(EventPropertiesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventProperties',
        'query',
        variables,
      )
    },
    EventBySlug(
      variables: EventBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<EventBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventBySlugQuery>(EventBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventBySlug',
        'query',
        variables,
      )
    },
    EventStaticPaths(
      variables: EventStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<EventStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventStaticPathsQuery>(EventStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventStaticPaths',
        'query',
        variables,
      )
    },
    General(
      variables: GeneralQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GeneralQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GeneralQuery>(GeneralDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'General',
        'query',
        variables,
      )
    },
    HomePage(
      variables: HomePageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<HomePageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomePageQuery>(HomePageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'HomePage',
        'query',
        variables,
      )
    },
    LatestNotices(
      variables: LatestNoticesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<LatestNoticesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestNoticesQuery>(LatestNoticesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'LatestNotices',
        'query',
        variables,
      )
    },
    NoticesStaticPaths(
      variables: NoticesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<NoticesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticesStaticPathsQuery>(NoticesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'NoticesStaticPaths',
        'query',
        variables,
      )
    },
    Notices(
      variables: NoticesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<NoticesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticesQuery>(NoticesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Notices',
        'query',
        variables,
      )
    },
    NoticeBySlug(
      variables: NoticeBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<NoticeBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticeBySlugQuery>(NoticeBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'NoticeBySlug',
        'query',
        variables,
      )
    },
    OpeningHoursChangeNotices(
      variables: OpeningHoursChangeNoticesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<OpeningHoursChangeNoticesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OpeningHoursChangeNoticesQuery>(
            OpeningHoursChangeNoticesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'OpeningHoursChangeNotices',
        'query',
        variables,
      )
    },
    PagesStaticPaths(
      variables?: PagesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PagesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PagesStaticPaths',
        'query',
        variables,
      )
    },
    PageByDocumentId(
      variables: PageByDocumentIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PageByDocumentIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageByDocumentIdQuery>(PageByDocumentIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PageByDocumentId',
        'query',
        variables,
      )
    },
    SortedPartners(
      variables: SortedPartnersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<SortedPartnersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SortedPartnersQuery>(SortedPartnersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SortedPartners',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
