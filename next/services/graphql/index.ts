import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BasicDocumentMetadataDynamicZoneInput: any
  BlogPostSectionsDynamicZoneInput: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any
  PageSectionsDynamicZoneInput: any
  /** A time string with format HH:mm:ss.SSS */
  Time: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type BasicDocument = {
  __typename?: 'BasicDocument'
  attachment?: Maybe<UploadFileEntityResponse>
  author?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  date_added?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  file_category?: Maybe<FileCategoryEntityResponse>
  link?: Maybe<Scalars['String']>
  metadata?: Maybe<Array<Maybe<BasicDocumentMetadataDynamicZone>>>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type BasicDocumentEntity = {
  __typename?: 'BasicDocumentEntity'
  attributes?: Maybe<BasicDocument>
  id?: Maybe<Scalars['ID']>
}

export type BasicDocumentEntityResponse = {
  __typename?: 'BasicDocumentEntityResponse'
  data?: Maybe<BasicDocumentEntity>
}

export type BasicDocumentEntityResponseCollection = {
  __typename?: 'BasicDocumentEntityResponseCollection'
  data: Array<BasicDocumentEntity>
  meta: ResponseCollectionMeta
}

export type BasicDocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>
  author?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date_added?: InputMaybe<DateFilterInput>
  description?: InputMaybe<StringFilterInput>
  file_category?: InputMaybe<FileCategoryFiltersInput>
  id?: InputMaybe<IdFilterInput>
  link?: InputMaybe<StringFilterInput>
  not?: InputMaybe<BasicDocumentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BasicDocumentInput = {
  attachment?: InputMaybe<Scalars['ID']>
  author?: InputMaybe<Scalars['String']>
  date_added?: InputMaybe<Scalars['Date']>
  description?: InputMaybe<Scalars['String']>
  file_category?: InputMaybe<Scalars['ID']>
  link?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Array<Scalars['BasicDocumentMetadataDynamicZoneInput']>>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
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
  data: Array<BasicDocumentEntity>
}

export type BlogPost = {
  __typename?: 'BlogPost'
  coverMedia?: Maybe<UploadFileEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<BlogPostRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type BlogPostLocalizationsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BlogPostEntity = {
  __typename?: 'BlogPostEntity'
  attributes?: Maybe<BlogPost>
  id?: Maybe<Scalars['ID']>
}

export type BlogPostEntityResponse = {
  __typename?: 'BlogPostEntityResponse'
  data?: Maybe<BlogPostEntity>
}

export type BlogPostEntityResponseCollection = {
  __typename?: 'BlogPostEntityResponseCollection'
  data: Array<BlogPostEntity>
  meta: ResponseCollectionMeta
}

export type BlogPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
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
  coverMedia?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']>>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type BlogPostRelationResponseCollection = {
  __typename?: 'BlogPostRelationResponseCollection'
  data: Array<BlogPostEntity>
}

export type BlogPostSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsDocuments
  | ComponentSectionsFaq
  | ComponentSectionsFlatText
  | ComponentSectionsForm
  | ComponentSectionsGallery
  | ComponentSectionsMap
  | ComponentSectionsRental
  | ComponentSectionsSiteUsefullness
  | ComponentSectionsSubListing
  | ComponentSectionsSubpages
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Error

export type BookTag = {
  __typename?: 'BookTag'
  createdAt?: Maybe<Scalars['DateTime']>
  displayName?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type BookTagEntity = {
  __typename?: 'BookTagEntity'
  attributes?: Maybe<BookTag>
  id?: Maybe<Scalars['ID']>
}

export type BookTagEntityResponse = {
  __typename?: 'BookTagEntityResponse'
  data?: Maybe<BookTagEntity>
}

export type BookTagEntityResponseCollection = {
  __typename?: 'BookTagEntityResponseCollection'
  data: Array<BookTagEntity>
  meta: ResponseCollectionMeta
}

export type BookTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  displayName?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<BookTagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BookTagInput = {
  displayName?: InputMaybe<Scalars['String']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
}

export type BookTagRelationResponseCollection = {
  __typename?: 'BookTagRelationResponseCollection'
  data: Array<BookTagEntity>
}

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  contains?: InputMaybe<Scalars['Boolean']>
  containsi?: InputMaybe<Scalars['Boolean']>
  endsWith?: InputMaybe<Scalars['Boolean']>
  eq?: InputMaybe<Scalars['Boolean']>
  eqi?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['Boolean']>
  gte?: InputMaybe<Scalars['Boolean']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  lt?: InputMaybe<Scalars['Boolean']>
  lte?: InputMaybe<Scalars['Boolean']>
  ne?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<BooleanFilterInput>
  notContains?: InputMaybe<Scalars['Boolean']>
  notContainsi?: InputMaybe<Scalars['Boolean']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  startsWith?: InputMaybe<Scalars['Boolean']>
}

export type Branch = {
  __typename?: 'Branch'
  address?: Maybe<Scalars['String']>
  barrierFreeInfo?: Maybe<Scalars['String']>
  barrierFreeState?: Maybe<Enum_Branch_Barrierfreestate>
  body?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  email?: Maybe<Scalars['String']>
  events?: Maybe<EventRelationResponseCollection>
  latitude?: Maybe<Scalars['Float']>
  listingImage?: Maybe<UploadFileEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<BranchRelationResponseCollection>
  longitude?: Maybe<Scalars['Float']>
  medias?: Maybe<UploadFileRelationResponseCollection>
  openingHours?: Maybe<ComponentBlocksOpeningHours>
  phone?: Maybe<Scalars['String']>
  publicTransportInfo?: Maybe<Scalars['String']>
  seo?: Maybe<ComponentCommonSeo>
  servicePages?: Maybe<PageRelationResponseCollection>
  slug: Scalars['String']
  subBranches?: Maybe<BranchRelationResponseCollection>
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type BranchEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BranchLocalizationsArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BranchMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BranchServicePagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BranchSubBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type BranchEntity = {
  __typename?: 'BranchEntity'
  attributes?: Maybe<Branch>
  id?: Maybe<Scalars['ID']>
}

export type BranchEntityResponse = {
  __typename?: 'BranchEntityResponse'
  data?: Maybe<BranchEntity>
}

export type BranchEntityResponseCollection = {
  __typename?: 'BranchEntityResponseCollection'
  data: Array<BranchEntity>
  meta: ResponseCollectionMeta
}

export type BranchFiltersInput = {
  address?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>
  barrierFreeInfo?: InputMaybe<StringFilterInput>
  barrierFreeState?: InputMaybe<StringFilterInput>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  email?: InputMaybe<StringFilterInput>
  events?: InputMaybe<EventFiltersInput>
  id?: InputMaybe<IdFilterInput>
  latitude?: InputMaybe<FloatFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<BranchFiltersInput>
  longitude?: InputMaybe<FloatFilterInput>
  not?: InputMaybe<BranchFiltersInput>
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>
  phone?: InputMaybe<StringFilterInput>
  publicTransportInfo?: InputMaybe<StringFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  servicePages?: InputMaybe<PageFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  subBranches?: InputMaybe<BranchFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BranchInput = {
  address?: InputMaybe<Scalars['String']>
  barrierFreeInfo?: InputMaybe<Scalars['String']>
  barrierFreeState?: InputMaybe<Enum_Branch_Barrierfreestate>
  body?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  latitude?: InputMaybe<Scalars['Float']>
  listingImage?: InputMaybe<Scalars['ID']>
  longitude?: InputMaybe<Scalars['Float']>
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursInput>
  phone?: InputMaybe<Scalars['String']>
  publicTransportInfo?: InputMaybe<Scalars['String']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  servicePages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  slug?: InputMaybe<Scalars['String']>
  subBranches?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  title?: InputMaybe<Scalars['String']>
}

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection'
  data: Array<BranchEntity>
}

export type Category = {
  __typename?: 'Category'
  createdAt?: Maybe<Scalars['DateTime']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<CategoryRelationResponseCollection>
  pageLink?: Maybe<ComponentBlocksPageLink>
  pages?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>
  parentCategory?: Maybe<CategoryEntityResponse>
  priority?: Maybe<Scalars['Int']>
  publishedAt?: Maybe<Scalars['DateTime']>
  subCategories?: Maybe<CategoryRelationResponseCollection>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type CategoryPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type CategorySubCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type CategoryEntity = {
  __typename?: 'CategoryEntity'
  attributes?: Maybe<Category>
  id?: Maybe<Scalars['ID']>
}

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse'
  data?: Maybe<CategoryEntity>
}

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection'
  data: Array<CategoryEntity>
  meta: ResponseCollectionMeta
}

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<CategoryFiltersInput>
  not?: InputMaybe<CategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>
  pageLink?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pages?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  parentCategory?: InputMaybe<CategoryFiltersInput>
  priority?: InputMaybe<IntFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  subCategories?: InputMaybe<CategoryFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type CategoryInput = {
  pageLink?: InputMaybe<ComponentBlocksPageLinkInput>
  pages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>
  parentCategory?: InputMaybe<Scalars['ID']>
  priority?: InputMaybe<Scalars['Int']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  subCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  title?: InputMaybe<Scalars['String']>
}

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection'
  data: Array<CategoryEntity>
}

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type ComponentAccordionItemsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
}

export type ComponentAccordionItemsFlatTextInput = {
  category?: InputMaybe<Scalars['String']>
  content?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentAccordionItemsForm = {
  __typename?: 'ComponentAccordionItemsForm'
  category?: Maybe<Scalars['String']>
  id: Scalars['ID']
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
  category?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  type?: InputMaybe<Enum_Componentaccordionitemsform_Type>
}

export type ComponentAccordionItemsTableRow = {
  __typename?: 'ComponentAccordionItemsTableRow'
  accordionCategory?: Maybe<Scalars['String']>
  id: Scalars['ID']
  label?: Maybe<Scalars['String']>
  tableCategory?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
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
  accordionCategory?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  label?: InputMaybe<Scalars['String']>
  tableCategory?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
  valueAlign?: InputMaybe<Enum_Componentaccordionitemstablerow_Valuealign>
}

export type ComponentAddressAddress = {
  __typename?: 'ComponentAddressAddress'
  id: Scalars['ID']
  navigateTo?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type ComponentAddressAddressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAddressAddressFiltersInput>>>
  navigateTo?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAddressAddressFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAddressAddressFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentAddressAddressInput = {
  id?: InputMaybe<Scalars['ID']>
  navigateTo?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem'
  content?: Maybe<Scalars['String']>
  id: Scalars['ID']
  label?: Maybe<Scalars['String']>
}

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>
}

export type ComponentBlocksAccordionItemInput = {
  content?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  label?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksBranchItem = {
  __typename?: 'ComponentBlocksBranchItem'
  branch?: Maybe<BranchEntityResponse>
  id: Scalars['ID']
}

export type ComponentBlocksBranchItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>
  branch?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentBlocksBranchItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>
}

export type ComponentBlocksBranchItemInput = {
  branch?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentBlocksBranchItemWithPage = {
  __typename?: 'ComponentBlocksBranchItemWithPage'
  branch?: Maybe<BranchEntityResponse>
  id: Scalars['ID']
  page?: Maybe<PageEntityResponse>
}

export type ComponentBlocksBranchItemWithPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>>>
  branch?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
}

export type ComponentBlocksBranchItemWithPageInput = {
  branch?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
  page?: InputMaybe<Scalars['ID']>
}

export type ComponentBlocksExternalLink = {
  __typename?: 'ComponentBlocksExternalLink'
  category?: Maybe<Scalars['String']>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type ComponentBlocksExternalLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksExternalLinkFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksExternalLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksExternalLinkFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksExternalLinkInput = {
  category?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksFileItem = {
  __typename?: 'ComponentBlocksFileItem'
  attachment: UploadFileEntityResponse
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type ComponentBlocksFileItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
}

export type ComponentBlocksFileItemInput = {
  attachment?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksNoticeFiles = {
  __typename?: 'ComponentBlocksNoticeFiles'
  files?: Maybe<Array<Maybe<ComponentBlocksFileItem>>>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentBlocksNoticeFilesFilesArgs = {
  filters?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksOpeningHours = {
  __typename?: 'ComponentBlocksOpeningHours'
  days: Array<Maybe<ComponentBlocksOpeningHoursItem>>
  id: Scalars['ID']
}

export type ComponentBlocksOpeningHoursDaysArgs = {
  filters?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentBlocksOpeningHoursFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursFiltersInput>>>
  days?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  not?: InputMaybe<ComponentBlocksOpeningHoursFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursFiltersInput>>>
}

export type ComponentBlocksOpeningHoursInput = {
  days?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemInput>>>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentBlocksOpeningHoursItem = {
  __typename?: 'ComponentBlocksOpeningHoursItem'
  id: Scalars['ID']
  label?: Maybe<Scalars['String']>
  time: Scalars['String']
}

export type ComponentBlocksOpeningHoursItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  time?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksOpeningHoursItemInput = {
  id?: InputMaybe<Scalars['ID']>
  label?: InputMaybe<Scalars['String']>
  time?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink'
  id: Scalars['ID']
  page?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
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
  id?: InputMaybe<Scalars['ID']>
  page?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  page?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
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
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  page?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type ComponentBlocksTableRow = {
  __typename?: 'ComponentBlocksTableRow'
  id: Scalars['ID']
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
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
  id?: InputMaybe<Scalars['ID']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
  valueAlign?: InputMaybe<Enum_Componentblockstablerow_Valuealign>
}

export type ComponentCommonSeo = {
  __typename?: 'ComponentCommonSeo'
  id: Scalars['ID']
  keywords?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
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
  id?: InputMaybe<Scalars['ID']>
  keywords?: InputMaybe<Scalars['String']>
  metaDescription?: InputMaybe<Scalars['String']>
  metaTitle?: InputMaybe<Scalars['String']>
}

export type ComponentFooterFooterColumn = {
  __typename?: 'ComponentFooterFooterColumn'
  footerLink?: Maybe<Array<Maybe<ComponentFooterFooterLink>>>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentFooterFooterColumnFooterLinkArgs = {
  filters?: InputMaybe<ComponentFooterFooterLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentFooterFooterLink = {
  __typename?: 'ComponentFooterFooterLink'
  id: Scalars['ID']
  otherSite?: Maybe<Scalars['String']>
  redirectTo?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']>
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
  id?: InputMaybe<Scalars['ID']>
  otherSite?: InputMaybe<Scalars['String']>
  redirectTo?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentGuestsGuest = {
  __typename?: 'ComponentGuestsGuest'
  avatar?: Maybe<UploadFileEntityResponse>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  surname?: Maybe<Scalars['String']>
}

export type ComponentGuestsGuestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentGuestsGuestFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>
  surname?: InputMaybe<StringFilterInput>
}

export type ComponentGuestsGuestInput = {
  avatar?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  surname?: InputMaybe<Scalars['String']>
}

export type ComponentHomepageBenefits = {
  __typename?: 'ComponentHomepageBenefits'
  benefit?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type ComponentHomepageBenefitsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>
  benefit?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHomepageBenefitsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>
}

export type ComponentHomepageBenefitsInput = {
  benefit?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentHomepageCta = {
  __typename?: 'ComponentHomepageCta'
  ctaRedirectTo?: Maybe<PageEntityResponse>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentHomepageCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>
  ctaRedirectTo?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<ComponentHomepageCtaFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageCtaInput = {
  ctaRedirectTo?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentHomepageFaqSection = {
  __typename?: 'ComponentHomepageFaqSection'
  ctas?: Maybe<Array<Maybe<ComponentHomepageCta>>>
  faqs?: Maybe<Array<Maybe<ComponentHomepageFaqs>>>
  id: Scalars['ID']
  redirectTo?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']>
}

export type ComponentHomepageFaqSectionCtasArgs = {
  filters?: InputMaybe<ComponentHomepageCtaFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentHomepageFaqSectionFaqsArgs = {
  filters?: InputMaybe<ComponentHomepageFaqsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  redirectTo?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentHomepageFaqs = {
  __typename?: 'ComponentHomepageFaqs'
  answer?: Maybe<Scalars['String']>
  id: Scalars['ID']
  question?: Maybe<Scalars['String']>
}

export type ComponentHomepageFaqsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>
  answer?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHomepageFaqsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>
  question?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageFaqsInput = {
  answer?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  question?: InputMaybe<Scalars['String']>
}

export type ComponentHomepageNewsSection = {
  __typename?: 'ComponentHomepageNewsSection'
  id: Scalars['ID']
  redirectTo?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']>
}

export type ComponentHomepageNewsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageNewsSectionFiltersInput>>>
  not?: InputMaybe<ComponentHomepageNewsSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageNewsSectionFiltersInput>>>
  redirectTo?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentHomepageNewsSectionInput = {
  id?: InputMaybe<Scalars['ID']>
  redirectTo?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentHomepageRegistrationInfo = {
  __typename?: 'ComponentHomepageRegistrationInfo'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  redirectTo?: Maybe<PageEntityResponse>
  registrationBenefits?: Maybe<Array<Maybe<ComponentHomepageBenefits>>>
  title?: Maybe<Scalars['String']>
}

export type ComponentHomepageRegistrationInfoRegistrationBenefitsArgs = {
  filters?: InputMaybe<ComponentHomepageBenefitsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  redirectTo?: InputMaybe<Scalars['ID']>
  registrationBenefits?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsInput>>>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentLocalityPartsGalleryParts = {
  __typename?: 'ComponentLocalityPartsGalleryParts'
  Description?: Maybe<Scalars['String']>
  Photo?: Maybe<UploadFileEntityResponse>
  id: Scalars['ID']
}

export type ComponentLocalityPartsGalleryPartsFiltersInput = {
  Description?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>
  not?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>
}

export type ComponentLocalityPartsGalleryPartsInput = {
  Description?: InputMaybe<Scalars['String']>
  Photo?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentLocalityPartsLocalitySection = {
  __typename?: 'ComponentLocalityPartsLocalitySection'
  id: Scalars['ID']
  isMainSection?: Maybe<Scalars['Boolean']>
  localitySectionDescription?: Maybe<Scalars['String']>
  localitySectionEmail?: Maybe<Scalars['String']>
  localitySectionPhone?: Maybe<Scalars['String']>
  localitySectionTitle?: Maybe<Scalars['String']>
  openingHoursFridayFrom?: Maybe<Scalars['Time']>
  openingHoursFridayTo?: Maybe<Scalars['Time']>
  openingHoursMondayFrom?: Maybe<Scalars['Time']>
  openingHoursMondayTo?: Maybe<Scalars['Time']>
  openingHoursSaturdayFrom?: Maybe<Scalars['Time']>
  openingHoursSaturdayTo?: Maybe<Scalars['Time']>
  openingHoursSundayFrom?: Maybe<Scalars['Time']>
  openingHoursSundayTo?: Maybe<Scalars['Time']>
  openingHoursThursdayFrom?: Maybe<Scalars['Time']>
  openingHoursThursdayTo?: Maybe<Scalars['Time']>
  openingHoursTuesdayFrom?: Maybe<Scalars['Time']>
  openingHoursTuesdayTo?: Maybe<Scalars['Time']>
  openingHoursWednesdayFrom?: Maybe<Scalars['Time']>
  openingHoursWednesdayTo?: Maybe<Scalars['Time']>
}

export type ComponentLocalityPartsLocalitySectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>>>
  isMainSection?: InputMaybe<BooleanFilterInput>
  localitySectionDescription?: InputMaybe<StringFilterInput>
  localitySectionEmail?: InputMaybe<StringFilterInput>
  localitySectionPhone?: InputMaybe<StringFilterInput>
  localitySectionTitle?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>
  openingHoursFridayFrom?: InputMaybe<TimeFilterInput>
  openingHoursFridayTo?: InputMaybe<TimeFilterInput>
  openingHoursMondayFrom?: InputMaybe<TimeFilterInput>
  openingHoursMondayTo?: InputMaybe<TimeFilterInput>
  openingHoursSaturdayFrom?: InputMaybe<TimeFilterInput>
  openingHoursSaturdayTo?: InputMaybe<TimeFilterInput>
  openingHoursSundayFrom?: InputMaybe<TimeFilterInput>
  openingHoursSundayTo?: InputMaybe<TimeFilterInput>
  openingHoursThursdayFrom?: InputMaybe<TimeFilterInput>
  openingHoursThursdayTo?: InputMaybe<TimeFilterInput>
  openingHoursTuesdayFrom?: InputMaybe<TimeFilterInput>
  openingHoursTuesdayTo?: InputMaybe<TimeFilterInput>
  openingHoursWednesdayFrom?: InputMaybe<TimeFilterInput>
  openingHoursWednesdayTo?: InputMaybe<TimeFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>>>
}

export type ComponentLocalityPartsLocalitySectionInput = {
  id?: InputMaybe<Scalars['ID']>
  isMainSection?: InputMaybe<Scalars['Boolean']>
  localitySectionDescription?: InputMaybe<Scalars['String']>
  localitySectionEmail?: InputMaybe<Scalars['String']>
  localitySectionPhone?: InputMaybe<Scalars['String']>
  localitySectionTitle?: InputMaybe<Scalars['String']>
  openingHoursFridayFrom?: InputMaybe<Scalars['Time']>
  openingHoursFridayTo?: InputMaybe<Scalars['Time']>
  openingHoursMondayFrom?: InputMaybe<Scalars['Time']>
  openingHoursMondayTo?: InputMaybe<Scalars['Time']>
  openingHoursSaturdayFrom?: InputMaybe<Scalars['Time']>
  openingHoursSaturdayTo?: InputMaybe<Scalars['Time']>
  openingHoursSundayFrom?: InputMaybe<Scalars['Time']>
  openingHoursSundayTo?: InputMaybe<Scalars['Time']>
  openingHoursThursdayFrom?: InputMaybe<Scalars['Time']>
  openingHoursThursdayTo?: InputMaybe<Scalars['Time']>
  openingHoursTuesdayFrom?: InputMaybe<Scalars['Time']>
  openingHoursTuesdayTo?: InputMaybe<Scalars['Time']>
  openingHoursWednesdayFrom?: InputMaybe<Scalars['Time']>
  openingHoursWednesdayTo?: InputMaybe<Scalars['Time']>
}

export type ComponentLocalityPartsLocalityServices = {
  __typename?: 'ComponentLocalityPartsLocalityServices'
  id: Scalars['ID']
  page?: Maybe<PageEntityResponse>
}

export type ComponentLocalityPartsLocalityServicesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>>>
  not?: InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
}

export type ComponentLocalityPartsLocalityServicesInput = {
  id?: InputMaybe<Scalars['ID']>
  page?: InputMaybe<Scalars['ID']>
}

export type ComponentMenuSectionLinks = {
  __typename?: 'ComponentMenuSectionLinks'
  id: Scalars['ID']
  sectionLinkBranch?: Maybe<BranchEntityResponse>
  sectionLinkPage?: Maybe<PageEntityResponse>
  sectionLinkTitle?: Maybe<Scalars['String']>
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
  id?: InputMaybe<Scalars['ID']>
  sectionLinkBranch?: InputMaybe<Scalars['ID']>
  sectionLinkPage?: InputMaybe<Scalars['ID']>
  sectionLinkTitle?: InputMaybe<Scalars['String']>
}

export type ComponentMenuSections = {
  __typename?: 'ComponentMenuSections'
  id: Scalars['ID']
  sectionColumnSpan?: Maybe<Scalars['Int']>
  sectionLinks?: Maybe<Array<Maybe<ComponentMenuSectionLinks>>>
  sectionPage?: Maybe<PageEntityResponse>
  sectionTitle?: Maybe<Scalars['String']>
}

export type ComponentMenuSectionsSectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSectionLinksFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  sectionColumnSpan?: InputMaybe<Scalars['Int']>
  sectionLinks?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksInput>>>
  sectionPage?: InputMaybe<Scalars['ID']>
  sectionTitle?: InputMaybe<Scalars['String']>
}

export type ComponentMenuSubsection = {
  __typename?: 'ComponentMenuSubsection'
  columnSpan?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  subsectionLinks?: Maybe<Array<Maybe<ComponentMenuSubsectionLinks>>>
  subsectionTitle?: Maybe<Scalars['String']>
}

export type ComponentMenuSubsectionSubsectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  columnSpan?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['ID']>
  subsectionLinks?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksInput>>>
  subsectionTitle?: InputMaybe<Scalars['String']>
}

export type ComponentMenuSubsectionLinks = {
  __typename?: 'ComponentMenuSubsectionLinks'
  id: Scalars['ID']
  page?: Maybe<PageEntityResponse>
  subsectionLinkTitle?: Maybe<Scalars['String']>
}

export type ComponentMenuSubsectionLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>
  not?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subsectionLinkTitle?: InputMaybe<StringFilterInput>
}

export type ComponentMenuSubsectionLinksInput = {
  id?: InputMaybe<Scalars['ID']>
  page?: InputMaybe<Scalars['ID']>
  subsectionLinkTitle?: InputMaybe<Scalars['String']>
}

export type ComponentMetadataFaktury = {
  __typename?: 'ComponentMetadataFaktury'
  attachment?: Maybe<UploadFileEntityResponse>
  date?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type ComponentMetadataFakturyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMetadataFakturyFiltersInput>>>
  date?: InputMaybe<DateFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMetadataFakturyFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMetadataFakturyFiltersInput>>>
}

export type ComponentMetadataFakturyInput = {
  attachment?: InputMaybe<Scalars['ID']>
  date?: InputMaybe<Scalars['Date']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type ComponentMetadataMetadata = {
  __typename?: 'ComponentMetadataMetadata'
  amount?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  grant_name?: Maybe<Scalars['String']>
  grant_number?: Maybe<Scalars['String']>
  id: Scalars['ID']
  provider?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
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
  amount?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  grant_name?: InputMaybe<Scalars['String']>
  grant_number?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  provider?: InputMaybe<Scalars['String']>
  year?: InputMaybe<Scalars['Int']>
}

export type ComponentMetadataObchodnaVerejnaSutaz = {
  __typename?: 'ComponentMetadataObchodnaVerejnaSutaz'
  amount?: Maybe<Scalars['String']>
  attachment?: Maybe<UploadFileEntityResponse>
  date_added?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  number?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
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
  amount?: InputMaybe<Scalars['String']>
  attachment?: InputMaybe<Scalars['ID']>
  date_added?: InputMaybe<Scalars['Date']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  number?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
}

export type ComponentMetadataObjednavky = {
  __typename?: 'ComponentMetadataObjednavky'
  attachment?: Maybe<UploadFileEntityResponse>
  date_added?: Maybe<Scalars['Date']>
  date_period?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
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
  attachment?: InputMaybe<Scalars['ID']>
  date_added?: InputMaybe<Scalars['Date']>
  date_period?: InputMaybe<Scalars['Date']>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentMetadataVerejneObstaravanie = {
  __typename?: 'ComponentMetadataVerejneObstaravanie'
  amount?: Maybe<Scalars['String']>
  attachment?: Maybe<UploadFileEntityResponse>
  date_added?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  number?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
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
  amount?: InputMaybe<Scalars['String']>
  attachment?: InputMaybe<Scalars['ID']>
  date_added?: InputMaybe<Scalars['Date']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  number?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
}

export type ComponentMetadataZmluvy = {
  __typename?: 'ComponentMetadataZmluvy'
  amount?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  number?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  supplier?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
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
  amount?: InputMaybe<Scalars['String']>
  date?: InputMaybe<Scalars['Date']>
  id?: InputMaybe<Scalars['ID']>
  number?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  supplier?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion'
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>
  forms?: Maybe<Array<Maybe<ComponentAccordionItemsForm>>>
  id: Scalars['ID']
  tableRows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsAccordionFlatTextArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsAccordionFormsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFormFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsAccordionTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  tableRows?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowInput>>>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsBlogPostsListing = {
  __typename?: 'ComponentSectionsBlogPostsListing'
  id: Scalars['ID']
}

export type ComponentSectionsBlogPostsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBlogPostsListingFiltersInput>>>
}

export type ComponentSectionsBlogPostsListingInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsChildrenListing = {
  __typename?: 'ComponentSectionsChildrenListing'
  depth: Enum_Componentsectionschildrenlisting_Depth
  id: Scalars['ID']
}

export type ComponentSectionsChildrenListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsChildrenListingFiltersInput>>>
  depth?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsChildrenListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsChildrenListingFiltersInput>>>
}

export type ComponentSectionsChildrenListingInput = {
  depth?: InputMaybe<Enum_Componentsectionschildrenlisting_Depth>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsCta = {
  __typename?: 'ComponentSectionsCta'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type ComponentSectionsCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaFiltersInput>>>
  not?: InputMaybe<ComponentSectionsCtaFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsCtaInput = {
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider'
  id: Scalars['ID']
}

export type ComponentSectionsDividerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
  not?: InputMaybe<ComponentSectionsDividerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
}

export type ComponentSectionsDividerInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsDocuments = {
  __typename?: 'ComponentSectionsDocuments'
  basicDocuments?: Maybe<BasicDocumentRelationResponseCollection>
  documents?: Maybe<DocumentRelationResponseCollection>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsDocumentsBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsDocumentsDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsDocumentsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsFiltersInput>>>
  basicDocuments?: InputMaybe<BasicDocumentFiltersInput>
  documents?: InputMaybe<DocumentFiltersInput>
  not?: InputMaybe<ComponentSectionsDocumentsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsDocumentsInput = {
  basicDocuments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsDocumentsListing = {
  __typename?: 'ComponentSectionsDocumentsListing'
  id: Scalars['ID']
}

export type ComponentSectionsDocumentsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsDocumentsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsListingFiltersInput>>>
}

export type ComponentSectionsDocumentsListingInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsEventsListing = {
  __typename?: 'ComponentSectionsEventsListing'
  id: Scalars['ID']
}

export type ComponentSectionsEventsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsEventsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsListingFiltersInput>>>
}

export type ComponentSectionsEventsListingInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsFaq = {
  __typename?: 'ComponentSectionsFaq'
  id: Scalars['ID']
  questions?: Maybe<Array<Maybe<ComponentBlocksAccordionItem>>>
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsFaqQuestionsArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsFaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqFiltersInput>>>
  not?: InputMaybe<ComponentSectionsFaqFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqFiltersInput>>>
  questions?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFaqInput = {
  id?: InputMaybe<Scalars['ID']>
  questions?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemInput>>>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsFlatText = {
  __typename?: 'ComponentSectionsFlatText'
  content?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type ComponentSectionsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFlatTextFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFlatTextFiltersInput>>>
}

export type ComponentSectionsFlatTextInput = {
  content?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsForm = {
  __typename?: 'ComponentSectionsForm'
  id: Scalars['ID']
  type?: Maybe<Enum_Componentsectionsform_Type>
}

export type ComponentSectionsFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFormFiltersInput>>>
  not?: InputMaybe<ComponentSectionsFormFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFormFiltersInput>>>
  type?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFormInput = {
  id?: InputMaybe<Scalars['ID']>
  type?: InputMaybe<Enum_Componentsectionsform_Type>
}

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery'
  Gallery?: Maybe<Array<Maybe<ComponentLocalityPartsGalleryParts>>>
  id: Scalars['ID']
}

export type ComponentSectionsGalleryGalleryArgs = {
  filters?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsGalleryFiltersInput = {
  Gallery?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
  not?: InputMaybe<ComponentSectionsGalleryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
}

export type ComponentSectionsGalleryInput = {
  Gallery?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsInput>>>
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsMap = {
  __typename?: 'ComponentSectionsMap'
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItem>>>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsMapBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsNewBooksListing = {
  __typename?: 'ComponentSectionsNewBooksListing'
  id: Scalars['ID']
}

export type ComponentSectionsNewBooksListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewBooksListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsNewBooksListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewBooksListingFiltersInput>>>
}

export type ComponentSectionsNewBooksListingInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsNewsListing = {
  __typename?: 'ComponentSectionsNewsListing'
  id: Scalars['ID']
}

export type ComponentSectionsNewsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsNewsListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>
}

export type ComponentSectionsNewsListingInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsOpeningHoursSection = {
  __typename?: 'ComponentSectionsOpeningHoursSection'
  branchList?: Maybe<BranchRelationResponseCollection>
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsOpeningHoursSectionBranchListArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsOpeningHoursSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>
  branchList?: InputMaybe<BranchFiltersInput>
  not?: InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsOpeningHoursSectionInput = {
  branchList?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsPartners = {
  __typename?: 'ComponentSectionsPartners'
  id: Scalars['ID']
}

export type ComponentSectionsPartnersFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
  not?: InputMaybe<ComponentSectionsPartnersFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
}

export type ComponentSectionsPartnersInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ComponentSectionsRental = {
  __typename?: 'ComponentSectionsRental'
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItemWithPage>>>
  id: Scalars['ID']
  text?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsRentalBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemWithPageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  text?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsSiteUsefullness = {
  __typename?: 'ComponentSectionsSiteUsefullness'
  id: Scalars['ID']
  thankYouMessage?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsSiteUsefullnessFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>>>
  not?: InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSiteUsefullnessFiltersInput>>>
  thankYouMessage?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsSiteUsefullnessInput = {
  id?: InputMaybe<Scalars['ID']>
  thankYouMessage?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsSubListing = {
  __typename?: 'ComponentSectionsSubListing'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type ComponentSectionsSubListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSubListingFiltersInput>>>
  not?: InputMaybe<ComponentSectionsSubListingFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSubListingFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsSubListingInput = {
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsSubpages = {
  __typename?: 'ComponentSectionsSubpages'
  id: Scalars['ID']
  subpages?: Maybe<Array<Maybe<ComponentBlocksSubpage>>>
  title?: Maybe<Scalars['String']>
}

export type ComponentSectionsSubpagesSubpagesArgs = {
  filters?: InputMaybe<ComponentBlocksSubpageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ComponentSectionsSubpagesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSubpagesFiltersInput>>>
  not?: InputMaybe<ComponentSectionsSubpagesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSubpagesFiltersInput>>>
  subpages?: InputMaybe<ComponentBlocksSubpageFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsSubpagesInput = {
  id?: InputMaybe<Scalars['ID']>
  subpages?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageInput>>>
  title?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsTable = {
  __typename?: 'ComponentSectionsTable'
  id: Scalars['ID']
  primaryTitle?: Maybe<Scalars['String']>
  rows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>
  secondaryTitle?: Maybe<Scalars['String']>
}

export type ComponentSectionsTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  id?: InputMaybe<Scalars['ID']>
  primaryTitle?: InputMaybe<Scalars['String']>
  rows?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowInput>>>
  secondaryTitle?: InputMaybe<Scalars['String']>
}

export type ComponentSectionsVideo = {
  __typename?: 'ComponentSectionsVideo'
  id: Scalars['ID']
  media?: Maybe<UploadFileEntityResponse>
  youtube_url?: Maybe<Scalars['String']>
}

export type ComponentSectionsVideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsVideoFiltersInput>>>
  not?: InputMaybe<ComponentSectionsVideoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsVideoFiltersInput>>>
  youtube_url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsVideoInput = {
  id?: InputMaybe<Scalars['ID']>
  media?: InputMaybe<Scalars['ID']>
  youtube_url?: InputMaybe<Scalars['String']>
}

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  contains?: InputMaybe<Scalars['Date']>
  containsi?: InputMaybe<Scalars['Date']>
  endsWith?: InputMaybe<Scalars['Date']>
  eq?: InputMaybe<Scalars['Date']>
  eqi?: InputMaybe<Scalars['Date']>
  gt?: InputMaybe<Scalars['Date']>
  gte?: InputMaybe<Scalars['Date']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  lt?: InputMaybe<Scalars['Date']>
  lte?: InputMaybe<Scalars['Date']>
  ne?: InputMaybe<Scalars['Date']>
  not?: InputMaybe<DateFilterInput>
  notContains?: InputMaybe<Scalars['Date']>
  notContainsi?: InputMaybe<Scalars['Date']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>
  startsWith?: InputMaybe<Scalars['Date']>
}

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  contains?: InputMaybe<Scalars['DateTime']>
  containsi?: InputMaybe<Scalars['DateTime']>
  endsWith?: InputMaybe<Scalars['DateTime']>
  eq?: InputMaybe<Scalars['DateTime']>
  eqi?: InputMaybe<Scalars['DateTime']>
  gt?: InputMaybe<Scalars['DateTime']>
  gte?: InputMaybe<Scalars['DateTime']>
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  lt?: InputMaybe<Scalars['DateTime']>
  lte?: InputMaybe<Scalars['DateTime']>
  ne?: InputMaybe<Scalars['DateTime']>
  not?: InputMaybe<DateTimeFilterInput>
  notContains?: InputMaybe<Scalars['DateTime']>
  notContainsi?: InputMaybe<Scalars['DateTime']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  startsWith?: InputMaybe<Scalars['DateTime']>
}

export type Disclosure = {
  __typename?: 'Disclosure'
  addedAt: Scalars['DateTime']
  amount?: Maybe<Scalars['Float']>
  contractor?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  dateFrom?: Maybe<Scalars['Date']>
  dateTo?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  file: UploadFileEntityResponse
  grantProvider?: Maybe<Scalars['String']>
  grantYear?: Maybe<Scalars['String']>
  idNumber?: Maybe<Scalars['String']>
  originalSlug?: Maybe<Scalars['String']>
  originalTitle?: Maybe<Scalars['String']>
  slug: Scalars['String']
  title: Scalars['String']
  type: Enum_Disclosure_Type
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type DisclosureEntity = {
  __typename?: 'DisclosureEntity'
  attributes?: Maybe<Disclosure>
  id?: Maybe<Scalars['ID']>
}

export type DisclosureEntityResponse = {
  __typename?: 'DisclosureEntityResponse'
  data?: Maybe<DisclosureEntity>
}

export type DisclosureEntityResponseCollection = {
  __typename?: 'DisclosureEntityResponseCollection'
  data: Array<DisclosureEntity>
  meta: ResponseCollectionMeta
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
  grantProvider?: InputMaybe<StringFilterInput>
  grantYear?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  idNumber?: InputMaybe<StringFilterInput>
  not?: InputMaybe<DisclosureFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>
  originalSlug?: InputMaybe<StringFilterInput>
  originalTitle?: InputMaybe<StringFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DisclosureInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>
  amount?: InputMaybe<Scalars['Float']>
  contractor?: InputMaybe<Scalars['String']>
  dateFrom?: InputMaybe<Scalars['Date']>
  dateTo?: InputMaybe<Scalars['Date']>
  description?: InputMaybe<Scalars['String']>
  file?: InputMaybe<Scalars['ID']>
  grantProvider?: InputMaybe<Scalars['String']>
  grantYear?: InputMaybe<Scalars['String']>
  idNumber?: InputMaybe<Scalars['String']>
  originalSlug?: InputMaybe<Scalars['String']>
  originalTitle?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Enum_Disclosure_Type>
}

export type DisclosureRelationResponseCollection = {
  __typename?: 'DisclosureRelationResponseCollection'
  data: Array<DisclosureEntity>
}

export type Document = {
  __typename?: 'Document'
  createdAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  documentCategory?: Maybe<DocumentCategoryEntityResponse>
  file: UploadFileEntityResponse
  originalSlug?: Maybe<Scalars['String']>
  originalTitle?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type DocumentCategory = {
  __typename?: 'DocumentCategory'
  createdAt?: Maybe<Scalars['DateTime']>
  documents?: Maybe<DocumentRelationResponseCollection>
  label: Scalars['String']
  slug: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type DocumentCategoryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type DocumentCategoryEntity = {
  __typename?: 'DocumentCategoryEntity'
  attributes?: Maybe<DocumentCategory>
  id?: Maybe<Scalars['ID']>
}

export type DocumentCategoryEntityResponse = {
  __typename?: 'DocumentCategoryEntityResponse'
  data?: Maybe<DocumentCategoryEntity>
}

export type DocumentCategoryEntityResponseCollection = {
  __typename?: 'DocumentCategoryEntityResponseCollection'
  data: Array<DocumentCategoryEntity>
  meta: ResponseCollectionMeta
}

export type DocumentCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documents?: InputMaybe<DocumentFiltersInput>
  id?: InputMaybe<IdFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<DocumentCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DocumentCategoryInput = {
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  label?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

export type DocumentCategoryRelationResponseCollection = {
  __typename?: 'DocumentCategoryRelationResponseCollection'
  data: Array<DocumentCategoryEntity>
}

export type DocumentEntity = {
  __typename?: 'DocumentEntity'
  attributes?: Maybe<Document>
  id?: Maybe<Scalars['ID']>
}

export type DocumentEntityResponse = {
  __typename?: 'DocumentEntityResponse'
  data?: Maybe<DocumentEntity>
}

export type DocumentEntityResponseCollection = {
  __typename?: 'DocumentEntityResponseCollection'
  data: Array<DocumentEntity>
  meta: ResponseCollectionMeta
}

export type DocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentCategory?: InputMaybe<DocumentCategoryFiltersInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<DocumentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>
  originalSlug?: InputMaybe<StringFilterInput>
  originalTitle?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DocumentInput = {
  description?: InputMaybe<Scalars['String']>
  documentCategory?: InputMaybe<Scalars['ID']>
  file?: InputMaybe<Scalars['ID']>
  originalSlug?: InputMaybe<Scalars['String']>
  originalTitle?: InputMaybe<Scalars['String']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type DocumentRelationResponseCollection = {
  __typename?: 'DocumentRelationResponseCollection'
  data: Array<DocumentEntity>
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
  Grant = 'Grant',
  ObchodnaVerejnaSutaz = 'Obchodna_verejna_sutaz',
  Objednavky = 'Objednavky',
  Ostatne = 'Ostatne',
  VerejneObstaravanie = 'Verejne_obstaravanie',
  Zmluva = 'Zmluva',
}

export enum Enum_Page_Layout {
  ContentWithSidebar = 'content_with_sidebar',
  FullContent = 'full_content',
  Listing = 'listing',
  Sublisting = 'sublisting',
}

export type Error = {
  __typename?: 'Error'
  code: Scalars['String']
  message?: Maybe<Scalars['String']>
}

export type Event = {
  __typename?: 'Event'
  branch?: Maybe<BranchEntityResponse>
  coverImage?: Maybe<UploadFileEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']>
  dateFrom?: Maybe<Scalars['DateTime']>
  dateTo?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  documents?: Maybe<ComponentSectionsDocuments>
  eventCategory?: Maybe<EventCategoryEntityResponse>
  eventTags?: Maybe<EventTagRelationResponseCollection>
  gallery?: Maybe<UploadFileRelationResponseCollection>
  guests?: Maybe<Array<Maybe<ComponentGuestsGuest>>>
  listingImage?: Maybe<UploadFileEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<EventRelationResponseCollection>
  price?: Maybe<Scalars['Float']>
  promoted?: Maybe<Scalars['Boolean']>
  publishedAt?: Maybe<Scalars['DateTime']>
  seo?: Maybe<ComponentCommonSeo>
  showForm?: Maybe<Scalars['Boolean']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type EventEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventGuestsArgs = {
  filters?: InputMaybe<ComponentGuestsGuestFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventLocalizationsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventCategory = {
  __typename?: 'EventCategory'
  createdAt?: Maybe<Scalars['DateTime']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<EventCategoryRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type EventCategoryLocalizationsArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventCategoryEntity = {
  __typename?: 'EventCategoryEntity'
  attributes?: Maybe<EventCategory>
  id?: Maybe<Scalars['ID']>
}

export type EventCategoryEntityResponse = {
  __typename?: 'EventCategoryEntityResponse'
  data?: Maybe<EventCategoryEntity>
}

export type EventCategoryEntityResponseCollection = {
  __typename?: 'EventCategoryEntityResponseCollection'
  data: Array<EventCategoryEntity>
  meta: ResponseCollectionMeta
}

export type EventCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<EventCategoryFiltersInput>
  not?: InputMaybe<EventCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type EventCategoryInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>
  title?: InputMaybe<Scalars['String']>
}

export type EventCategoryRelationResponseCollection = {
  __typename?: 'EventCategoryRelationResponseCollection'
  data: Array<EventCategoryEntity>
}

export type EventEntity = {
  __typename?: 'EventEntity'
  attributes?: Maybe<Event>
  id?: Maybe<Scalars['ID']>
}

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse'
  data?: Maybe<EventEntity>
}

export type EventEntityResponseCollection = {
  __typename?: 'EventEntityResponseCollection'
  data: Array<EventEntity>
  meta: ResponseCollectionMeta
}

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>
  branch?: InputMaybe<BranchFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  dateFrom?: InputMaybe<DateTimeFilterInput>
  dateTo?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documents?: InputMaybe<ComponentSectionsDocumentsFiltersInput>
  eventCategory?: InputMaybe<EventCategoryFiltersInput>
  eventTags?: InputMaybe<EventTagFiltersInput>
  guests?: InputMaybe<ComponentGuestsGuestFiltersInput>
  id?: InputMaybe<IdFilterInput>
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
  branch?: InputMaybe<Scalars['ID']>
  coverImage?: InputMaybe<Scalars['ID']>
  dateFrom?: InputMaybe<Scalars['DateTime']>
  dateTo?: InputMaybe<Scalars['DateTime']>
  description?: InputMaybe<Scalars['String']>
  documents?: InputMaybe<ComponentSectionsDocumentsInput>
  eventCategory?: InputMaybe<Scalars['ID']>
  eventTags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  gallery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  guests?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestInput>>>
  listingImage?: InputMaybe<Scalars['ID']>
  price?: InputMaybe<Scalars['Float']>
  promoted?: InputMaybe<Scalars['Boolean']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  showForm?: InputMaybe<Scalars['Boolean']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection'
  data: Array<EventEntity>
}

export type EventTag = {
  __typename?: 'EventTag'
  createdAt?: Maybe<Scalars['DateTime']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<EventTagRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type EventTagLocalizationsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type EventTagEntity = {
  __typename?: 'EventTagEntity'
  attributes?: Maybe<EventTag>
  id?: Maybe<Scalars['ID']>
}

export type EventTagEntityResponse = {
  __typename?: 'EventTagEntityResponse'
  data?: Maybe<EventTagEntity>
}

export type EventTagEntityResponseCollection = {
  __typename?: 'EventTagEntityResponseCollection'
  data: Array<EventTagEntity>
  meta: ResponseCollectionMeta
}

export type EventTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
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
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type EventTagRelationResponseCollection = {
  __typename?: 'EventTagRelationResponseCollection'
  data: Array<EventTagEntity>
}

export type FileCategory = {
  __typename?: 'FileCategory'
  createdAt?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  page?: Maybe<PageEntityResponse>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type FileCategoryEntity = {
  __typename?: 'FileCategoryEntity'
  attributes?: Maybe<FileCategory>
  id?: Maybe<Scalars['ID']>
}

export type FileCategoryEntityResponse = {
  __typename?: 'FileCategoryEntityResponse'
  data?: Maybe<FileCategoryEntity>
}

export type FileCategoryEntityResponseCollection = {
  __typename?: 'FileCategoryEntityResponseCollection'
  data: Array<FileCategoryEntity>
  meta: ResponseCollectionMeta
}

export type FileCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<FileCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FileCategoryInput = {
  name?: InputMaybe<Scalars['String']>
  page?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
}

export type FileCategoryRelationResponseCollection = {
  __typename?: 'FileCategoryRelationResponseCollection'
  data: Array<FileCategoryEntity>
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>
  caption?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  contains?: InputMaybe<Scalars['Float']>
  containsi?: InputMaybe<Scalars['Float']>
  endsWith?: InputMaybe<Scalars['Float']>
  eq?: InputMaybe<Scalars['Float']>
  eqi?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  ne?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<FloatFilterInput>
  notContains?: InputMaybe<Scalars['Float']>
  notContainsi?: InputMaybe<Scalars['Float']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  startsWith?: InputMaybe<Scalars['Float']>
}

export type Footer = {
  __typename?: 'Footer'
  copyrightText?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  footerColumns?: Maybe<Array<Maybe<ComponentFooterFooterColumn>>>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<FooterRelationResponseCollection>
  privacyLink?: Maybe<PageEntityResponse>
  publishedAt?: Maybe<Scalars['DateTime']>
  siteMapLink?: Maybe<PageEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type FooterFooterColumnsArgs = {
  filters?: InputMaybe<ComponentFooterFooterColumnFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type FooterLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>
}

export type FooterEntity = {
  __typename?: 'FooterEntity'
  attributes?: Maybe<Footer>
  id?: Maybe<Scalars['ID']>
}

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse'
  data?: Maybe<FooterEntity>
}

export type FooterEntityResponseCollection = {
  __typename?: 'FooterEntityResponseCollection'
  data: Array<FooterEntity>
  meta: ResponseCollectionMeta
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
  copyrightText?: InputMaybe<Scalars['String']>
  footerColumns?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnInput>>>
  privacyLink?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  siteMapLink?: InputMaybe<Scalars['ID']>
}

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection'
  data: Array<FooterEntity>
}

export type General = {
  __typename?: 'General'
  createdAt?: Maybe<Scalars['DateTime']>
  eventsPage?: Maybe<PageEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<GeneralRelationResponseCollection>
  newBooksPage?: Maybe<PageEntityResponse>
  noticesPage?: Maybe<PageEntityResponse>
  openingHoursPage?: Maybe<PageEntityResponse>
  privacyTermsAndConditionsPage?: Maybe<PageEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GeneralEntity = {
  __typename?: 'GeneralEntity'
  attributes?: Maybe<General>
  id?: Maybe<Scalars['ID']>
}

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse'
  data?: Maybe<GeneralEntity>
}

export type GeneralEntityResponseCollection = {
  __typename?: 'GeneralEntityResponseCollection'
  data: Array<GeneralEntity>
  meta: ResponseCollectionMeta
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
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type GeneralInput = {
  eventsPage?: InputMaybe<Scalars['ID']>
  newBooksPage?: InputMaybe<Scalars['ID']>
  noticesPage?: InputMaybe<Scalars['ID']>
  openingHoursPage?: InputMaybe<Scalars['ID']>
  privacyTermsAndConditionsPage?: InputMaybe<Scalars['ID']>
}

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection'
  data: Array<GeneralEntity>
}

export type GenericMorph =
  | BasicDocument
  | BlogPost
  | BookTag
  | Branch
  | Category
  | ComponentAccordionItemsFlatText
  | ComponentAccordionItemsForm
  | ComponentAccordionItemsTableRow
  | ComponentAddressAddress
  | ComponentBlocksAccordionItem
  | ComponentBlocksBranchItem
  | ComponentBlocksBranchItemWithPage
  | ComponentBlocksExternalLink
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
  | ComponentHomepageRegistrationInfo
  | ComponentLocalityPartsGalleryParts
  | ComponentLocalityPartsLocalitySection
  | ComponentLocalityPartsLocalityServices
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
  | ComponentSectionsBlogPostsListing
  | ComponentSectionsChildrenListing
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsDocuments
  | ComponentSectionsDocumentsListing
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
  | ComponentSectionsSubListing
  | ComponentSectionsSubpages
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Disclosure
  | Document
  | DocumentCategory
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
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser

export type HomePage = {
  __typename?: 'HomePage'
  createdAt?: Maybe<Scalars['DateTime']>
  faqSection?: Maybe<ComponentHomepageFaqSection>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<HomePageRelationResponseCollection>
  mapSection?: Maybe<ComponentSectionsMap>
  newsSection?: Maybe<ComponentHomepageNewsSection>
  registrationInfoSection?: Maybe<ComponentHomepageRegistrationInfo>
  seo?: Maybe<ComponentCommonSeo>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type HomePageEntity = {
  __typename?: 'HomePageEntity'
  attributes?: Maybe<HomePage>
  id?: Maybe<Scalars['ID']>
}

export type HomePageEntityResponse = {
  __typename?: 'HomePageEntityResponse'
  data?: Maybe<HomePageEntity>
}

export type HomePageEntityResponseCollection = {
  __typename?: 'HomePageEntityResponseCollection'
  data: Array<HomePageEntity>
  meta: ResponseCollectionMeta
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
  registrationInfoSection?: InputMaybe<ComponentHomepageRegistrationInfoFiltersInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type HomePageInput = {
  faqSection?: InputMaybe<ComponentHomepageFaqSectionInput>
  mapSection?: InputMaybe<ComponentSectionsMapInput>
  newsSection?: InputMaybe<ComponentHomepageNewsSectionInput>
  registrationInfoSection?: InputMaybe<ComponentHomepageRegistrationInfoInput>
  seo?: InputMaybe<ComponentCommonSeoInput>
}

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection'
  data: Array<HomePageEntity>
}

export type I18NLocale = {
  __typename?: 'I18NLocale'
  code?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity'
  attributes?: Maybe<I18NLocale>
  id?: Maybe<Scalars['ID']>
}

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse'
  data?: Maybe<I18NLocaleEntity>
}

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection'
  data: Array<I18NLocaleEntity>
  meta: ResponseCollectionMeta
}

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  code?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<I18NLocaleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type I18NLocaleInput = {
  code?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type I18NLocaleRelationResponseCollection = {
  __typename?: 'I18NLocaleRelationResponseCollection'
  data: Array<I18NLocaleEntity>
}

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  contains?: InputMaybe<Scalars['ID']>
  containsi?: InputMaybe<Scalars['ID']>
  endsWith?: InputMaybe<Scalars['ID']>
  eq?: InputMaybe<Scalars['ID']>
  eqi?: InputMaybe<Scalars['ID']>
  gt?: InputMaybe<Scalars['ID']>
  gte?: InputMaybe<Scalars['ID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  lt?: InputMaybe<Scalars['ID']>
  lte?: InputMaybe<Scalars['ID']>
  ne?: InputMaybe<Scalars['ID']>
  not?: InputMaybe<IdFilterInput>
  notContains?: InputMaybe<Scalars['ID']>
  notContainsi?: InputMaybe<Scalars['ID']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  startsWith?: InputMaybe<Scalars['ID']>
}

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  contains?: InputMaybe<Scalars['Int']>
  containsi?: InputMaybe<Scalars['Int']>
  endsWith?: InputMaybe<Scalars['Int']>
  eq?: InputMaybe<Scalars['Int']>
  eqi?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  ne?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<IntFilterInput>
  notContains?: InputMaybe<Scalars['Int']>
  notContainsi?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  startsWith?: InputMaybe<Scalars['Int']>
}

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  contains?: InputMaybe<Scalars['JSON']>
  containsi?: InputMaybe<Scalars['JSON']>
  endsWith?: InputMaybe<Scalars['JSON']>
  eq?: InputMaybe<Scalars['JSON']>
  eqi?: InputMaybe<Scalars['JSON']>
  gt?: InputMaybe<Scalars['JSON']>
  gte?: InputMaybe<Scalars['JSON']>
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  lt?: InputMaybe<Scalars['JSON']>
  lte?: InputMaybe<Scalars['JSON']>
  ne?: InputMaybe<Scalars['JSON']>
  not?: InputMaybe<JsonFilterInput>
  notContains?: InputMaybe<Scalars['JSON']>
  notContainsi?: InputMaybe<Scalars['JSON']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  startsWith?: InputMaybe<Scalars['JSON']>
}

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>
  contains?: InputMaybe<Scalars['Long']>
  containsi?: InputMaybe<Scalars['Long']>
  endsWith?: InputMaybe<Scalars['Long']>
  eq?: InputMaybe<Scalars['Long']>
  eqi?: InputMaybe<Scalars['Long']>
  gt?: InputMaybe<Scalars['Long']>
  gte?: InputMaybe<Scalars['Long']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>
  lt?: InputMaybe<Scalars['Long']>
  lte?: InputMaybe<Scalars['Long']>
  ne?: InputMaybe<Scalars['Long']>
  not?: InputMaybe<LongFilterInput>
  notContains?: InputMaybe<Scalars['Long']>
  notContainsi?: InputMaybe<Scalars['Long']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>
  startsWith?: InputMaybe<Scalars['Long']>
}

export type Menu = {
  __typename?: 'Menu'
  createdAt?: Maybe<Scalars['DateTime']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<MenuRelationResponseCollection>
  menuSections?: Maybe<Array<Maybe<ComponentMenuSections>>>
  menuSlug?: Maybe<Scalars['String']>
  menuTitle?: Maybe<Scalars['String']>
  menuTotalColumns?: Maybe<Scalars['Int']>
  order?: Maybe<Scalars['Int']>
  publishedAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type MenuLocalizationsArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MenuMenuSectionsArgs = {
  filters?: InputMaybe<ComponentMenuSectionsFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MenuEntity = {
  __typename?: 'MenuEntity'
  attributes?: Maybe<Menu>
  id?: Maybe<Scalars['ID']>
}

export type MenuEntityResponse = {
  __typename?: 'MenuEntityResponse'
  data?: Maybe<MenuEntity>
}

export type MenuEntityResponseCollection = {
  __typename?: 'MenuEntityResponseCollection'
  data: Array<MenuEntity>
  meta: ResponseCollectionMeta
}

export type MenuFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<MenuFiltersInput>
  menuSections?: InputMaybe<ComponentMenuSectionsFiltersInput>
  menuSlug?: InputMaybe<StringFilterInput>
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
  menuSlug?: InputMaybe<Scalars['String']>
  menuTitle?: InputMaybe<Scalars['String']>
  menuTotalColumns?: InputMaybe<Scalars['Int']>
  order?: InputMaybe<Scalars['Int']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
}

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection'
  data: Array<MenuEntity>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>
  createBasicDocument?: Maybe<BasicDocumentEntityResponse>
  createBlogPost?: Maybe<BlogPostEntityResponse>
  createBlogPostLocalization?: Maybe<BlogPostEntityResponse>
  createBookTag?: Maybe<BookTagEntityResponse>
  createBranch?: Maybe<BranchEntityResponse>
  createBranchLocalization?: Maybe<BranchEntityResponse>
  createCategory?: Maybe<CategoryEntityResponse>
  createCategoryLocalization?: Maybe<CategoryEntityResponse>
  createDisclosure?: Maybe<DisclosureEntityResponse>
  createDocument?: Maybe<DocumentEntityResponse>
  createDocumentCategory?: Maybe<DocumentCategoryEntityResponse>
  createEvent?: Maybe<EventEntityResponse>
  createEventCategory?: Maybe<EventCategoryEntityResponse>
  createEventCategoryLocalization?: Maybe<EventCategoryEntityResponse>
  createEventLocalization?: Maybe<EventEntityResponse>
  createEventTag?: Maybe<EventTagEntityResponse>
  createEventTagLocalization?: Maybe<EventTagEntityResponse>
  createFileCategory?: Maybe<FileCategoryEntityResponse>
  createFooterLocalization?: Maybe<FooterEntityResponse>
  createGeneralLocalization?: Maybe<GeneralEntityResponse>
  createHomePageLocalization?: Maybe<HomePageEntityResponse>
  createMenu?: Maybe<MenuEntityResponse>
  createMenuLocalization?: Maybe<MenuEntityResponse>
  createNotice?: Maybe<NoticeEntityResponse>
  createNoticeLocalization?: Maybe<NoticeEntityResponse>
  createPage?: Maybe<PageEntityResponse>
  createPageLocalization?: Maybe<PageEntityResponse>
  createPartner?: Maybe<PartnerEntityResponse>
  createPartnerLocalization?: Maybe<PartnerEntityResponse>
  createUploadFile?: Maybe<UploadFileEntityResponse>
  createUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse
  deleteBasicDocument?: Maybe<BasicDocumentEntityResponse>
  deleteBlogPost?: Maybe<BlogPostEntityResponse>
  deleteBookTag?: Maybe<BookTagEntityResponse>
  deleteBranch?: Maybe<BranchEntityResponse>
  deleteCategory?: Maybe<CategoryEntityResponse>
  deleteDisclosure?: Maybe<DisclosureEntityResponse>
  deleteDocument?: Maybe<DocumentEntityResponse>
  deleteDocumentCategory?: Maybe<DocumentCategoryEntityResponse>
  deleteEvent?: Maybe<EventEntityResponse>
  deleteEventCategory?: Maybe<EventCategoryEntityResponse>
  deleteEventTag?: Maybe<EventTagEntityResponse>
  deleteFileCategory?: Maybe<FileCategoryEntityResponse>
  deleteFooter?: Maybe<FooterEntityResponse>
  deleteGeneral?: Maybe<GeneralEntityResponse>
  deleteHomePage?: Maybe<HomePageEntityResponse>
  deleteMenu?: Maybe<MenuEntityResponse>
  deleteNavikronosNavikronosStorage?: Maybe<NavikronosNavikronosStorageEntityResponse>
  deleteNotice?: Maybe<NoticeEntityResponse>
  deletePage?: Maybe<PageEntityResponse>
  deletePartner?: Maybe<PartnerEntityResponse>
  deleteUploadFile?: Maybe<UploadFileEntityResponse>
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>
  /** Register a user */
  register: UsersPermissionsLoginPayload
  removeFile?: Maybe<UploadFileEntityResponse>
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateBasicDocument?: Maybe<BasicDocumentEntityResponse>
  updateBlogPost?: Maybe<BlogPostEntityResponse>
  updateBookTag?: Maybe<BookTagEntityResponse>
  updateBranch?: Maybe<BranchEntityResponse>
  updateCategory?: Maybe<CategoryEntityResponse>
  updateDisclosure?: Maybe<DisclosureEntityResponse>
  updateDocument?: Maybe<DocumentEntityResponse>
  updateDocumentCategory?: Maybe<DocumentCategoryEntityResponse>
  updateEvent?: Maybe<EventEntityResponse>
  updateEventCategory?: Maybe<EventCategoryEntityResponse>
  updateEventTag?: Maybe<EventTagEntityResponse>
  updateFileCategory?: Maybe<FileCategoryEntityResponse>
  updateFileInfo: UploadFileEntityResponse
  updateFooter?: Maybe<FooterEntityResponse>
  updateGeneral?: Maybe<GeneralEntityResponse>
  updateHomePage?: Maybe<HomePageEntityResponse>
  updateMenu?: Maybe<MenuEntityResponse>
  updateNavikronosNavikronosStorage?: Maybe<NavikronosNavikronosStorageEntityResponse>
  updateNotice?: Maybe<NoticeEntityResponse>
  updatePage?: Maybe<PageEntityResponse>
  updatePartner?: Maybe<PartnerEntityResponse>
  updateUploadFile?: Maybe<UploadFileEntityResponse>
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
  upload: UploadFileEntityResponse
}

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
}

export type MutationCreateBasicDocumentArgs = {
  data: BasicDocumentInput
}

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateBlogPostLocalizationArgs = {
  data?: InputMaybe<BlogPostInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateBookTagArgs = {
  data: BookTagInput
}

export type MutationCreateBranchArgs = {
  data: BranchInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateBranchLocalizationArgs = {
  data?: InputMaybe<BranchInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateCategoryArgs = {
  data: CategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateDisclosureArgs = {
  data: DisclosureInput
}

export type MutationCreateDocumentArgs = {
  data: DocumentInput
}

export type MutationCreateDocumentCategoryArgs = {
  data: DocumentCategoryInput
}

export type MutationCreateEventArgs = {
  data: EventInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateEventCategoryArgs = {
  data: EventCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateEventCategoryLocalizationArgs = {
  data?: InputMaybe<EventCategoryInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateEventLocalizationArgs = {
  data?: InputMaybe<EventInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateEventTagArgs = {
  data: EventTagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateEventTagLocalizationArgs = {
  data?: InputMaybe<EventTagInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateFileCategoryArgs = {
  data: FileCategoryInput
}

export type MutationCreateFooterLocalizationArgs = {
  data?: InputMaybe<FooterInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateGeneralLocalizationArgs = {
  data?: InputMaybe<GeneralInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateHomePageLocalizationArgs = {
  data?: InputMaybe<HomePageInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateMenuArgs = {
  data: MenuInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateMenuLocalizationArgs = {
  data?: InputMaybe<MenuInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateNoticeArgs = {
  data: NoticeInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateNoticeLocalizationArgs = {
  data?: InputMaybe<NoticeInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreatePageArgs = {
  data: PageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreatePartnerArgs = {
  data: PartnerInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreatePartnerLocalizationArgs = {
  data?: InputMaybe<PartnerInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput
}

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput
}

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
}

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
}

export type MutationDeleteBasicDocumentArgs = {
  id: Scalars['ID']
}

export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteBookTagArgs = {
  id: Scalars['ID']
}

export type MutationDeleteBranchArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteDisclosureArgs = {
  id: Scalars['ID']
}

export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']
}

export type MutationDeleteDocumentCategoryArgs = {
  id: Scalars['ID']
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteEventCategoryArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteEventTagArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteFileCategoryArgs = {
  id: Scalars['ID']
}

export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteMenuArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteNoticeArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeletePageArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeletePartnerArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>
  files: Array<InputMaybe<Scalars['Upload']>>
  ref?: InputMaybe<Scalars['String']>
  refId?: InputMaybe<Scalars['ID']>
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationRemoveFileArgs = {
  id: Scalars['ID']
}

export type MutationResetPasswordArgs = {
  code: Scalars['String']
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
}

export type MutationUpdateBasicDocumentArgs = {
  data: BasicDocumentInput
  id: Scalars['ID']
}

export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateBookTagArgs = {
  data: BookTagInput
  id: Scalars['ID']
}

export type MutationUpdateBranchArgs = {
  data: BranchInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateCategoryArgs = {
  data: CategoryInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateDisclosureArgs = {
  data: DisclosureInput
  id: Scalars['ID']
}

export type MutationUpdateDocumentArgs = {
  data: DocumentInput
  id: Scalars['ID']
}

export type MutationUpdateDocumentCategoryArgs = {
  data: DocumentCategoryInput
  id: Scalars['ID']
}

export type MutationUpdateEventArgs = {
  data: EventInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateEventCategoryArgs = {
  data: EventCategoryInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateEventTagArgs = {
  data: EventTagInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateFileCategoryArgs = {
  data: FileCategoryInput
  id: Scalars['ID']
}

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']
  info?: InputMaybe<FileInfoInput>
}

export type MutationUpdateFooterArgs = {
  data: FooterInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateGeneralArgs = {
  data: GeneralInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateHomePageArgs = {
  data: HomePageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateMenuArgs = {
  data: MenuInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateNavikronosNavikronosStorageArgs = {
  data: NavikronosNavikronosStorageInput
}

export type MutationUpdateNoticeArgs = {
  data: NoticeInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdatePageArgs = {
  data: PageInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdatePartnerArgs = {
  data: PartnerInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput
  id: Scalars['ID']
}

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput
  id: Scalars['ID']
}

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
  id: Scalars['ID']
}

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
  id: Scalars['ID']
}

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>
  file: Scalars['Upload']
  info?: InputMaybe<FileInfoInput>
  ref?: InputMaybe<Scalars['String']>
  refId?: InputMaybe<Scalars['ID']>
}

export type NavikronosNavikronosStorage = {
  __typename?: 'NavikronosNavikronosStorage'
  createdAt?: Maybe<Scalars['DateTime']>
  data?: Maybe<Scalars['JSON']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type NavikronosNavikronosStorageEntity = {
  __typename?: 'NavikronosNavikronosStorageEntity'
  attributes?: Maybe<NavikronosNavikronosStorage>
  id?: Maybe<Scalars['ID']>
}

export type NavikronosNavikronosStorageEntityResponse = {
  __typename?: 'NavikronosNavikronosStorageEntityResponse'
  data?: Maybe<NavikronosNavikronosStorageEntity>
}

export type NavikronosNavikronosStorageEntityResponseCollection = {
  __typename?: 'NavikronosNavikronosStorageEntityResponseCollection'
  data: Array<NavikronosNavikronosStorageEntity>
  meta: ResponseCollectionMeta
}

export type NavikronosNavikronosStorageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NavikronosNavikronosStorageFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  data?: InputMaybe<JsonFilterInput>
  not?: InputMaybe<NavikronosNavikronosStorageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<NavikronosNavikronosStorageFiltersInput>>>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type NavikronosNavikronosStorageInput = {
  data?: InputMaybe<Scalars['JSON']>
}

export type NavikronosNavikronosStorageRelationResponseCollection = {
  __typename?: 'NavikronosNavikronosStorageRelationResponseCollection'
  data: Array<NavikronosNavikronosStorageEntity>
}

export type Notice = {
  __typename?: 'Notice'
  body?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  dateAdded?: Maybe<Scalars['Date']>
  documents?: Maybe<ComponentSectionsDocuments>
  listingImage?: Maybe<UploadFileRelationResponseCollection>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<NoticeRelationResponseCollection>
  promoted?: Maybe<Scalars['Boolean']>
  publishedAt?: Maybe<Scalars['DateTime']>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type NoticeListingImageArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type NoticeLocalizationsArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type NoticeEntity = {
  __typename?: 'NoticeEntity'
  attributes?: Maybe<Notice>
  id?: Maybe<Scalars['ID']>
}

export type NoticeEntityResponse = {
  __typename?: 'NoticeEntityResponse'
  data?: Maybe<NoticeEntity>
}

export type NoticeEntityResponseCollection = {
  __typename?: 'NoticeEntityResponseCollection'
  data: Array<NoticeEntity>
  meta: ResponseCollectionMeta
}

export type NoticeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NoticeFiltersInput>>>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  dateAdded?: InputMaybe<DateFilterInput>
  documents?: InputMaybe<ComponentSectionsDocumentsFiltersInput>
  id?: InputMaybe<IdFilterInput>
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
  body?: InputMaybe<Scalars['String']>
  dateAdded?: InputMaybe<Scalars['Date']>
  documents?: InputMaybe<ComponentSectionsDocumentsInput>
  listingImage?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  promoted?: InputMaybe<Scalars['Boolean']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type NoticeRelationResponseCollection = {
  __typename?: 'NoticeRelationResponseCollection'
  data: Array<NoticeEntity>
}

export type Page = {
  __typename?: 'Page'
  branchesServicesTo?: Maybe<BranchRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']>
  layout?: Maybe<Enum_Page_Layout>
  listingImage?: Maybe<UploadFileEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<PageRelationResponseCollection>
  newSlug: Scalars['String']
  pageCategory?: Maybe<CategoryEntityResponse>
  perex?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>
  seo?: Maybe<ComponentCommonSeo>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type PageBranchesServicesToArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type PageEntity = {
  __typename?: 'PageEntity'
  attributes?: Maybe<Page>
  id?: Maybe<Scalars['ID']>
}

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse'
  data?: Maybe<PageEntity>
}

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection'
  data: Array<PageEntity>
  meta: ResponseCollectionMeta
}

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  branchesServicesTo?: InputMaybe<BranchFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  layout?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PageFiltersInput>
  newSlug?: InputMaybe<StringFilterInput>
  not?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  pageCategory?: InputMaybe<CategoryFiltersInput>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  seo?: InputMaybe<ComponentCommonSeoFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageInput = {
  branchesServicesTo?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  layout?: InputMaybe<Enum_Page_Layout>
  listingImage?: InputMaybe<Scalars['ID']>
  newSlug?: InputMaybe<Scalars['String']>
  pageCategory?: InputMaybe<Scalars['ID']>
  perex?: InputMaybe<Scalars['String']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>
  seo?: InputMaybe<ComponentCommonSeoInput>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection'
  data: Array<PageEntity>
}

export type PageSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsBlogPostsListing
  | ComponentSectionsChildrenListing
  | ComponentSectionsCta
  | ComponentSectionsDivider
  | ComponentSectionsDocuments
  | ComponentSectionsDocumentsListing
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
  | ComponentSectionsSubListing
  | ComponentSectionsSubpages
  | ComponentSectionsTable
  | ComponentSectionsVideo
  | Error

export type Pagination = {
  __typename?: 'Pagination'
  page: Scalars['Int']
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  total: Scalars['Int']
}

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  pageSize?: InputMaybe<Scalars['Int']>
  start?: InputMaybe<Scalars['Int']>
}

export type Partner = {
  __typename?: 'Partner'
  createdAt?: Maybe<Scalars['DateTime']>
  featured?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<PartnerRelationResponseCollection>
  logo?: Maybe<UploadFileEntityResponse>
  priority?: Maybe<Scalars['Float']>
  publishedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
}

export type PartnerLocalizationsArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type PartnerEntity = {
  __typename?: 'PartnerEntity'
  attributes?: Maybe<Partner>
  id?: Maybe<Scalars['ID']>
}

export type PartnerEntityResponse = {
  __typename?: 'PartnerEntityResponse'
  data?: Maybe<PartnerEntity>
}

export type PartnerEntityResponseCollection = {
  __typename?: 'PartnerEntityResponseCollection'
  data: Array<PartnerEntity>
  meta: ResponseCollectionMeta
}

export type PartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  featured?: InputMaybe<BooleanFilterInput>
  id?: InputMaybe<IdFilterInput>
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
  featured?: InputMaybe<Scalars['Boolean']>
  logo?: InputMaybe<Scalars['ID']>
  priority?: InputMaybe<Scalars['Float']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type PartnerRelationResponseCollection = {
  __typename?: 'PartnerRelationResponseCollection'
  data: Array<PartnerEntity>
}

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type Query = {
  __typename?: 'Query'
  basicDocument?: Maybe<BasicDocumentEntityResponse>
  basicDocuments?: Maybe<BasicDocumentEntityResponseCollection>
  blogPost?: Maybe<BlogPostEntityResponse>
  blogPosts?: Maybe<BlogPostEntityResponseCollection>
  bookTag?: Maybe<BookTagEntityResponse>
  bookTags?: Maybe<BookTagEntityResponseCollection>
  branch?: Maybe<BranchEntityResponse>
  branches?: Maybe<BranchEntityResponseCollection>
  categories?: Maybe<CategoryEntityResponseCollection>
  category?: Maybe<CategoryEntityResponse>
  disclosure?: Maybe<DisclosureEntityResponse>
  disclosures?: Maybe<DisclosureEntityResponseCollection>
  document?: Maybe<DocumentEntityResponse>
  documentCategories?: Maybe<DocumentCategoryEntityResponseCollection>
  documentCategory?: Maybe<DocumentCategoryEntityResponse>
  documents?: Maybe<DocumentEntityResponseCollection>
  event?: Maybe<EventEntityResponse>
  eventCategories?: Maybe<EventCategoryEntityResponseCollection>
  eventCategory?: Maybe<EventCategoryEntityResponse>
  eventTag?: Maybe<EventTagEntityResponse>
  eventTags?: Maybe<EventTagEntityResponseCollection>
  events?: Maybe<EventEntityResponseCollection>
  fileCategories?: Maybe<FileCategoryEntityResponseCollection>
  fileCategory?: Maybe<FileCategoryEntityResponse>
  footer?: Maybe<FooterEntityResponse>
  general?: Maybe<GeneralEntityResponse>
  homePage?: Maybe<HomePageEntityResponse>
  i18NLocale?: Maybe<I18NLocaleEntityResponse>
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>
  me?: Maybe<UsersPermissionsMe>
  menu?: Maybe<MenuEntityResponse>
  menus?: Maybe<MenuEntityResponseCollection>
  navikronosNavikronosStorage?: Maybe<NavikronosNavikronosStorageEntityResponse>
  notice?: Maybe<NoticeEntityResponse>
  notices?: Maybe<NoticeEntityResponseCollection>
  page?: Maybe<PageEntityResponse>
  pages?: Maybe<PageEntityResponseCollection>
  partner?: Maybe<PartnerEntityResponse>
  partners?: Maybe<PartnerEntityResponseCollection>
  uploadFile?: Maybe<UploadFileEntityResponse>
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>
  uploadFolder?: Maybe<UploadFolderEntityResponse>
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>
}

export type QueryBasicDocumentArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryBookTagArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryBookTagsArgs = {
  filters?: InputMaybe<BookTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryBranchArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryDisclosureArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryDisclosuresArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryDocumentCategoriesArgs = {
  filters?: InputMaybe<DocumentCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryDocumentCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryEventCategoriesArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryEventCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryEventTagArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryFileCategoriesArgs = {
  filters?: InputMaybe<FileCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryFileCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  publicationState?: InputMaybe<PublicationState>
}

export type QueryGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryMenuArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryMenusArgs = {
  filters?: InputMaybe<MenuFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryNoticeArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryNoticesArgs = {
  filters?: InputMaybe<NoticeFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryPartnerArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta'
  pagination: Pagination
}

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  contains?: InputMaybe<Scalars['String']>
  containsi?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  eq?: InputMaybe<Scalars['String']>
  eqi?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  not?: InputMaybe<StringFilterInput>
  notContains?: InputMaybe<Scalars['String']>
  notContainsi?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>
  contains?: InputMaybe<Scalars['Time']>
  containsi?: InputMaybe<Scalars['Time']>
  endsWith?: InputMaybe<Scalars['Time']>
  eq?: InputMaybe<Scalars['Time']>
  eqi?: InputMaybe<Scalars['Time']>
  gt?: InputMaybe<Scalars['Time']>
  gte?: InputMaybe<Scalars['Time']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>
  lt?: InputMaybe<Scalars['Time']>
  lte?: InputMaybe<Scalars['Time']>
  ne?: InputMaybe<Scalars['Time']>
  not?: InputMaybe<TimeFilterInput>
  notContains?: InputMaybe<Scalars['Time']>
  notContainsi?: InputMaybe<Scalars['Time']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>
  startsWith?: InputMaybe<Scalars['Time']>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  ext?: Maybe<Scalars['String']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  height?: Maybe<Scalars['Int']>
  mime: Scalars['String']
  name: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<GenericMorph>>>
  size: Scalars['Float']
  updatedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  width?: Maybe<Scalars['Int']>
}

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity'
  attributes?: Maybe<UploadFile>
  id?: Maybe<Scalars['ID']>
}

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse'
  data?: Maybe<UploadFileEntity>
}

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection'
  data: Array<UploadFileEntity>
  meta: ResponseCollectionMeta
}

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  caption?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  ext?: InputMaybe<StringFilterInput>
  folder?: InputMaybe<UploadFolderFiltersInput>
  folderPath?: InputMaybe<StringFilterInput>
  formats?: InputMaybe<JsonFilterInput>
  hash?: InputMaybe<StringFilterInput>
  height?: InputMaybe<IntFilterInput>
  id?: InputMaybe<IdFilterInput>
  mime?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  previewUrl?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  provider_metadata?: InputMaybe<JsonFilterInput>
  size?: InputMaybe<FloatFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
  width?: InputMaybe<IntFilterInput>
}

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>
  caption?: InputMaybe<Scalars['String']>
  ext?: InputMaybe<Scalars['String']>
  folder?: InputMaybe<Scalars['ID']>
  folderPath?: InputMaybe<Scalars['String']>
  formats?: InputMaybe<Scalars['JSON']>
  hash?: InputMaybe<Scalars['String']>
  height?: InputMaybe<Scalars['Int']>
  mime?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  previewUrl?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<Scalars['String']>
  provider_metadata?: InputMaybe<Scalars['JSON']>
  size?: InputMaybe<Scalars['Float']>
  url?: InputMaybe<Scalars['String']>
  width?: InputMaybe<Scalars['Int']>
}

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection'
  data: Array<UploadFileEntity>
}

export type UploadFolder = {
  __typename?: 'UploadFolder'
  children?: Maybe<UploadFolderRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']>
  files?: Maybe<UploadFileRelationResponseCollection>
  name: Scalars['String']
  parent?: Maybe<UploadFolderEntityResponse>
  path: Scalars['String']
  pathId: Scalars['Int']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity'
  attributes?: Maybe<UploadFolder>
  id?: Maybe<Scalars['ID']>
}

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse'
  data?: Maybe<UploadFolderEntity>
}

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection'
  data: Array<UploadFolderEntity>
  meta: ResponseCollectionMeta
}

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
  children?: InputMaybe<UploadFolderFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  files?: InputMaybe<UploadFileFiltersInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFolderFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
  parent?: InputMaybe<UploadFolderFiltersInput>
  path?: InputMaybe<StringFilterInput>
  pathId?: InputMaybe<IntFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
  parent?: InputMaybe<Scalars['ID']>
  path?: InputMaybe<Scalars['String']>
  pathId?: InputMaybe<Scalars['Int']>
}

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection'
  data: Array<UploadFolderEntity>
}

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload'
  ok: Scalars['Boolean']
}

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload'
  ok: Scalars['Boolean']
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']
  password: Scalars['String']
  provider?: Scalars['String']
}

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']>
  user: UsersPermissionsMe
}

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  blocked?: Maybe<Scalars['Boolean']>
  confirmed?: Maybe<Scalars['Boolean']>
  email?: Maybe<Scalars['String']>
  id: Scalars['ID']
  role?: Maybe<UsersPermissionsMeRole>
  username: Scalars['String']
}

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
}

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload'
  ok: Scalars['Boolean']
}

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  action: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  role?: Maybe<UsersPermissionsRoleEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity'
  attributes?: Maybe<UsersPermissionsPermission>
  id?: Maybe<Scalars['ID']>
}

export type UsersPermissionsPermissionEntityResponse = {
  __typename?: 'UsersPermissionsPermissionEntityResponse'
  data?: Maybe<UsersPermissionsPermissionEntity>
}

export type UsersPermissionsPermissionEntityResponseCollection = {
  __typename?: 'UsersPermissionsPermissionEntityResponseCollection'
  data: Array<UsersPermissionsPermissionEntity>
  meta: ResponseCollectionMeta
}

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UsersPermissionsPermissionInput = {
  action?: InputMaybe<Scalars['String']>
  role?: InputMaybe<Scalars['ID']>
}

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection'
  data: Array<UsersPermissionsPermissionEntity>
}

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  createdAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
  type?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity'
  attributes?: Maybe<UsersPermissionsRole>
  id?: Maybe<Scalars['ID']>
}

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse'
  data?: Maybe<UsersPermissionsRoleEntity>
}

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection'
  data: Array<UsersPermissionsRoleEntity>
  meta: ResponseCollectionMeta
}

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  type?: InputMaybe<Scalars['String']>
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type UsersPermissionsRoleRelationResponseCollection = {
  __typename?: 'UsersPermissionsRoleRelationResponseCollection'
  data: Array<UsersPermissionsRoleEntity>
}

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload'
  ok: Scalars['Boolean']
}

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  blocked?: Maybe<Scalars['Boolean']>
  confirmed?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  provider?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRoleEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
}

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity'
  attributes?: Maybe<UsersPermissionsUser>
  id?: Maybe<Scalars['ID']>
}

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse'
  data?: Maybe<UsersPermissionsUserEntity>
}

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection'
  data: Array<UsersPermissionsUserEntity>
  meta: ResponseCollectionMeta
}

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  blocked?: InputMaybe<BooleanFilterInput>
  confirmationToken?: InputMaybe<StringFilterInput>
  confirmed?: InputMaybe<BooleanFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  email?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsUserFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  password?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  resetPasswordToken?: InputMaybe<StringFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
}

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>
  confirmationToken?: InputMaybe<Scalars['String']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<Scalars['String']>
  resetPasswordToken?: InputMaybe<Scalars['String']>
  role?: InputMaybe<Scalars['ID']>
  username?: InputMaybe<Scalars['String']>
}

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection'
  data: Array<UsersPermissionsUserEntity>
}

export type BasicDocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type BasicDocumentBySlugQuery = {
  __typename?: 'Query'
  basicDocuments?: {
    __typename?: 'BasicDocumentEntityResponseCollection'
    data: Array<{
      __typename?: 'BasicDocumentEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BasicDocument'
        slug: string
        title: string
        description?: string | null
        date_added?: any | null
        author?: string | null
        link?: string | null
        file_category?: {
          __typename?: 'FileCategoryEntityResponse'
          data?: {
            __typename?: 'FileCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'FileCategory'
              name?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
        metadata?: Array<
          | {
              __typename: 'ComponentMetadataFaktury'
              id: string
              name?: string | null
              date?: any | null
              attachment?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    size: number
                    ext?: string | null
                  } | null
                } | null
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
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    size: number
                    ext?: string | null
                  } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentMetadataObjednavky'
              id: string
              title?: string | null
              date_period?: any | null
              date_added?: any | null
              attachment?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    size: number
                    ext?: string | null
                  } | null
                } | null
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
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    size: number
                    ext?: string | null
                  } | null
                } | null
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
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              size: number
              ext?: string | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type FileCategoryEntityFragment = {
  __typename?: 'FileCategoryEntity'
  id?: string | null
  attributes?: { __typename?: 'FileCategory'; name?: string | null; slug?: string | null } | null
}

export type FileCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type FileCategoriesQuery = {
  __typename?: 'Query'
  fileCategories?: {
    __typename?: 'FileCategoryEntityResponseCollection'
    data: Array<{
      __typename?: 'FileCategoryEntity'
      id?: string | null
      attributes?: {
        __typename?: 'FileCategory'
        name?: string | null
        slug?: string | null
      } | null
    }>
  } | null
}

export type BasicDocumentFileFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: {
    __typename?: 'UploadFile'
    url: string
    name: string
    ext?: string | null
    size: number
  } | null
}

export type BasicDocumentEntityFragment = {
  __typename?: 'BasicDocumentEntity'
  id?: string | null
  attributes?: {
    __typename?: 'BasicDocument'
    slug: string
    title: string
    description?: string | null
    date_added?: any | null
    author?: string | null
    link?: string | null
    file_category?: {
      __typename?: 'FileCategoryEntityResponse'
      data?: {
        __typename?: 'FileCategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'FileCategory'
          name?: string | null
          slug?: string | null
        } | null
      } | null
    } | null
    metadata?: Array<
      | {
          __typename: 'ComponentMetadataFaktury'
          id: string
          name?: string | null
          date?: any | null
          attachment?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                size: number
                ext?: string | null
              } | null
            } | null
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
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                size: number
                ext?: string | null
              } | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentMetadataObjednavky'
          id: string
          title?: string | null
          date_period?: any | null
          date_added?: any | null
          attachment?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                size: number
                ext?: string | null
              } | null
            } | null
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
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                size: number
                ext?: string | null
              } | null
            } | null
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
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      } | null
    } | null
  } | null
}

type Metadata_ComponentMetadataFaktury_Fragment = {
  __typename: 'ComponentMetadataFaktury'
  id: string
  name?: string | null
  date?: any | null
  attachment?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        size: number
        ext?: string | null
      } | null
    } | null
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
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        size: number
        ext?: string | null
      } | null
    } | null
  } | null
}

type Metadata_ComponentMetadataObjednavky_Fragment = {
  __typename: 'ComponentMetadataObjednavky'
  id: string
  title?: string | null
  date_period?: any | null
  date_added?: any | null
  attachment?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        size: number
        ext?: string | null
      } | null
    } | null
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
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        size: number
        ext?: string | null
      } | null
    } | null
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

export type BlogPostEntityFragment = {
  __typename?: 'BlogPostEntity'
  id?: string | null
  attributes?: {
    __typename?: 'BlogPost'
    slug: string
    title: string
    publishedAt?: any | null
    coverMedia?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          mime: string
          alternativeText?: string | null
        } | null
      } | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          title?: string | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
          } | null> | null
          tableRows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
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
      | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
      | { __typename: 'ComponentSectionsDivider'; id: string }
      | {
          __typename: 'ComponentSectionsDocuments'
          id: string
          title?: string | null
          documents?: {
            __typename?: 'DocumentRelationResponseCollection'
            data: Array<{
              __typename: 'DocumentEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Document'
                title: string
                slug: string
                description?: string | null
                publishedAt?: any | null
                documentCategory?: {
                  __typename?: 'DocumentCategoryEntityResponse'
                  data?: {
                    __typename?: 'DocumentCategoryEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'DocumentCategory'
                      label: string
                      slug: string
                    } | null
                  } | null
                } | null
                file: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      size: number
                      ext?: string | null
                    } | null
                  } | null
                }
              } | null
            }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsFaq'
          id: string
          title?: string | null
          questions?: Array<{
            __typename?: 'ComponentBlocksAccordionItem'
            id: string
            label?: string | null
            content?: string | null
          } | null> | null
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
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  alternativeText?: string | null
                  caption?: string | null
                  size: number
                  width?: number | null
                  height?: number | null
                } | null
              } | null
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
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Branch'
                  title: string
                  address?: string | null
                  slug: string
                  latitude?: number | null
                  longitude?: number | null
                  listingImage?: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        alternativeText?: string | null
                        caption?: string | null
                        size: number
                        width?: number | null
                        height?: number | null
                      } | null
                    } | null
                  } | null
                  subBranches?: {
                    __typename?: 'BranchRelationResponseCollection'
                    data: Array<{
                      __typename?: 'BranchEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Branch'
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
                      } | null
                    }>
                  } | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsRental'
          id: string
          title?: string | null
          text?: string | null
          branches?: Array<{
            __typename?: 'ComponentBlocksBranchItemWithPage'
            branch?: {
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Branch'
                  title: string
                  address?: string | null
                  slug: string
                  latitude?: number | null
                  longitude?: number | null
                  listingImage?: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        alternativeText?: string | null
                        caption?: string | null
                        size: number
                        width?: number | null
                        height?: number | null
                      } | null
                    } | null
                  } | null
                  subBranches?: {
                    __typename?: 'BranchRelationResponseCollection'
                    data: Array<{
                      __typename?: 'BranchEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Branch'
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
                      } | null
                    }>
                  } | null
                } | null
              } | null
            } | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                attributes?: { __typename?: 'Page'; slug: string } | null
              } | null
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
          __typename: 'ComponentSectionsSubListing'
          id: string
          title?: string | null
          url?: string | null
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
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTable'
          primaryTitle?: string | null
          secondaryTitle?: string | null
          rows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsVideo'
          id: string
          youtube_url?: string | null
          media?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          } | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    localizations?: {
      __typename?: 'BlogPostRelationResponseCollection'
      data: Array<{
        __typename?: 'BlogPostEntity'
        attributes?: { __typename?: 'BlogPost'; slug: string; locale?: string | null } | null
      }>
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
  } | null
}

export type BlogPostStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type BlogPostStaticPathsQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: { __typename?: 'BlogPost'; slug: string; locale?: string | null } | null
    }>
  } | null
}

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String']
  locale: Scalars['I18NLocaleCode']
}>

export type BlogPostBySlugQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug: string
        title: string
        publishedAt?: any | null
        coverMedia?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              mime: string
              alternativeText?: string | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
              flatText?: Array<{
                __typename?: 'ComponentAccordionItemsFlatText'
                category?: string | null
                content?: string | null
              } | null> | null
              tableRows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
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
          | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
          | { __typename: 'ComponentSectionsDivider'; id: string }
          | {
              __typename: 'ComponentSectionsDocuments'
              id: string
              title?: string | null
              documents?: {
                __typename?: 'DocumentRelationResponseCollection'
                data: Array<{
                  __typename: 'DocumentEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Document'
                    title: string
                    slug: string
                    description?: string | null
                    publishedAt?: any | null
                    documentCategory?: {
                      __typename?: 'DocumentCategoryEntityResponse'
                      data?: {
                        __typename?: 'DocumentCategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'DocumentCategory'
                          label: string
                          slug: string
                        } | null
                      } | null
                    } | null
                    file: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          size: number
                          ext?: string | null
                        } | null
                      } | null
                    }
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsFaq'
              id: string
              title?: string | null
              questions?: Array<{
                __typename?: 'ComponentBlocksAccordionItem'
                id: string
                label?: string | null
                content?: string | null
              } | null> | null
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
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      alternativeText?: string | null
                      caption?: string | null
                      size: number
                      width?: number | null
                      height?: number | null
                    } | null
                  } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsRental'
              id: string
              title?: string | null
              text?: string | null
              branches?: Array<{
                __typename?: 'ComponentBlocksBranchItemWithPage'
                branch?: {
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: { __typename?: 'Page'; slug: string } | null
                  } | null
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
              __typename: 'ComponentSectionsSubListing'
              id: string
              title?: string | null
              url?: string | null
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
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsTable'
              primaryTitle?: string | null
              secondaryTitle?: string | null
              rows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
                label?: string | null
                value?: string | null
                valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsVideo'
              id: string
              youtube_url?: string | null
              media?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        localizations?: {
          __typename?: 'BlogPostRelationResponseCollection'
          data: Array<{
            __typename?: 'BlogPostEntity'
            attributes?: { __typename?: 'BlogPost'; slug: string; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
      } | null
    }>
  } | null
}

export type BlogPostsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
  limit?: InputMaybe<Scalars['Int']>
  start?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<Scalars['String']>
}>

export type BlogPostsQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug: string
        title: string
        publishedAt?: any | null
        coverMedia?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              mime: string
              alternativeText?: string | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
              flatText?: Array<{
                __typename?: 'ComponentAccordionItemsFlatText'
                category?: string | null
                content?: string | null
              } | null> | null
              tableRows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
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
          | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
          | { __typename: 'ComponentSectionsDivider'; id: string }
          | {
              __typename: 'ComponentSectionsDocuments'
              id: string
              title?: string | null
              documents?: {
                __typename?: 'DocumentRelationResponseCollection'
                data: Array<{
                  __typename: 'DocumentEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Document'
                    title: string
                    slug: string
                    description?: string | null
                    publishedAt?: any | null
                    documentCategory?: {
                      __typename?: 'DocumentCategoryEntityResponse'
                      data?: {
                        __typename?: 'DocumentCategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'DocumentCategory'
                          label: string
                          slug: string
                        } | null
                      } | null
                    } | null
                    file: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          size: number
                          ext?: string | null
                        } | null
                      } | null
                    }
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsFaq'
              id: string
              title?: string | null
              questions?: Array<{
                __typename?: 'ComponentBlocksAccordionItem'
                id: string
                label?: string | null
                content?: string | null
              } | null> | null
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
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      alternativeText?: string | null
                      caption?: string | null
                      size: number
                      width?: number | null
                      height?: number | null
                    } | null
                  } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsRental'
              id: string
              title?: string | null
              text?: string | null
              branches?: Array<{
                __typename?: 'ComponentBlocksBranchItemWithPage'
                branch?: {
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: { __typename?: 'Page'; slug: string } | null
                  } | null
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
              __typename: 'ComponentSectionsSubListing'
              id: string
              title?: string | null
              url?: string | null
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
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsTable'
              primaryTitle?: string | null
              secondaryTitle?: string | null
              rows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
                label?: string | null
                value?: string | null
                valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsVideo'
              id: string
              youtube_url?: string | null
              media?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        localizations?: {
          __typename?: 'BlogPostRelationResponseCollection'
          data: Array<{
            __typename?: 'BlogPostEntity'
            attributes?: { __typename?: 'BlogPost'; slug: string; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
      } | null
    }>
    meta: {
      __typename?: 'ResponseCollectionMeta'
      pagination: { __typename?: 'Pagination'; total: number }
    }
  } | null
}

export type BranchPlaceEntityFragment = {
  __typename?: 'BranchEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Branch'
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
  } | null
}

export type BranchCardEntityFragment = {
  __typename?: 'BranchEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Branch'
    title: string
    address?: string | null
    slug: string
    latitude?: number | null
    longitude?: number | null
    listingImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
    subBranches?: {
      __typename?: 'BranchRelationResponseCollection'
      data: Array<{
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
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
        } | null
      }>
    } | null
  } | null
}

export type BranchEntityFragment = {
  __typename?: 'BranchEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Branch'
    body?: string | null
    publicTransportInfo?: string | null
    barrierFreeInfo?: string | null
    barrierFreeState?: Enum_Branch_Barrierfreestate | null
    phone?: string | null
    email?: string | null
    locale?: string | null
    title: string
    address?: string | null
    slug: string
    latitude?: number | null
    longitude?: number | null
    medias?: {
      __typename?: 'UploadFileRelationResponseCollection'
      data: Array<{
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      }>
    } | null
    openingHours?: {
      __typename?: 'ComponentBlocksOpeningHours'
      days: Array<{
        __typename?: 'ComponentBlocksOpeningHoursItem'
        label?: string | null
        time: string
      } | null>
    } | null
    servicePages?: {
      __typename?: 'PageRelationResponseCollection'
      data: Array<{
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title: string; slug: string } | null
      }>
    } | null
    localizations?: {
      __typename?: 'BranchRelationResponseCollection'
      data: Array<{
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
          title: string
          slug: string
          locale?: string | null
        } | null
      }>
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    listingImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
    subBranches?: {
      __typename?: 'BranchRelationResponseCollection'
      data: Array<{
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
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
        } | null
      }>
    } | null
  } | null
}

export type BranchStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type BranchStaticPathsQuery = {
  __typename?: 'Query'
  branches?: {
    __typename?: 'BranchEntityResponseCollection'
    data: Array<{
      __typename?: 'BranchEntity'
      attributes?: { __typename?: 'Branch'; slug: string; locale?: string | null } | null
    }>
  } | null
}

export type BranchBySlugQueryVariables = Exact<{
  slug: Scalars['String']
  locale: Scalars['I18NLocaleCode']
}>

export type BranchBySlugQuery = {
  __typename?: 'Query'
  branches?: {
    __typename?: 'BranchEntityResponseCollection'
    data: Array<{
      __typename?: 'BranchEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Branch'
        body?: string | null
        publicTransportInfo?: string | null
        barrierFreeInfo?: string | null
        barrierFreeState?: Enum_Branch_Barrierfreestate | null
        phone?: string | null
        email?: string | null
        locale?: string | null
        title: string
        address?: string | null
        slug: string
        latitude?: number | null
        longitude?: number | null
        medias?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
        servicePages?: {
          __typename?: 'PageRelationResponseCollection'
          data: Array<{
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title: string; slug: string } | null
          }>
        } | null
        localizations?: {
          __typename?: 'BranchRelationResponseCollection'
          data: Array<{
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Branch'
              title: string
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
        subBranches?: {
          __typename?: 'BranchRelationResponseCollection'
          data: Array<{
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Branch'
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
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type DisclosureEntityFragment = {
  __typename: 'DisclosureEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Disclosure'
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
    file: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      } | null
    }
  } | null
}

export type DisclosureBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type DisclosureBySlugQuery = {
  __typename?: 'Query'
  disclosures?: {
    __typename?: 'DisclosureEntityResponseCollection'
    data: Array<{
      __typename: 'DisclosureEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Disclosure'
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
        file: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              size: number
              ext?: string | null
            } | null
          } | null
        }
      } | null
    }>
  } | null
}

export type DocumentCategoryEntityFragment = {
  __typename?: 'DocumentCategoryEntity'
  id?: string | null
  attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
}

export type DocumentEntityFragment = {
  __typename: 'DocumentEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Document'
    title: string
    slug: string
    description?: string | null
    publishedAt?: any | null
    documentCategory?: {
      __typename?: 'DocumentCategoryEntityResponse'
      data?: {
        __typename?: 'DocumentCategoryEntity'
        id?: string | null
        attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
      } | null
    } | null
    file: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          size: number
          ext?: string | null
        } | null
      } | null
    }
  } | null
}

export type DocumentCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type DocumentCategoriesQuery = {
  __typename?: 'Query'
  documentCategories?: {
    __typename?: 'DocumentCategoryEntityResponseCollection'
    data: Array<{
      __typename?: 'DocumentCategoryEntity'
      id?: string | null
      attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
    }>
  } | null
}

export type DocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type DocumentBySlugQuery = {
  __typename?: 'Query'
  documents?: {
    __typename?: 'DocumentEntityResponseCollection'
    data: Array<{
      __typename: 'DocumentEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Document'
        title: string
        slug: string
        description?: string | null
        publishedAt?: any | null
        documentCategory?: {
          __typename?: 'DocumentCategoryEntityResponse'
          data?: {
            __typename?: 'DocumentCategoryEntity'
            id?: string | null
            attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
          } | null
        } | null
        file: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              size: number
              ext?: string | null
            } | null
          } | null
        }
      } | null
    }>
  } | null
}

export type EventCardEntityFragment = {
  __typename: 'EventEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Event'
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
      __typename?: 'EventCategoryEntityResponse'
      data?: {
        __typename?: 'EventCategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'EventCategory'
          title?: string | null
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
    branch?: {
      __typename?: 'BranchEntityResponse'
      data?: {
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
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
        } | null
      } | null
    } | null
    eventTags?: {
      __typename?: 'EventTagRelationResponseCollection'
      data: Array<{
        __typename?: 'EventTagEntity'
        id?: string | null
        attributes?: {
          __typename?: 'EventTag'
          title?: string | null
          slug?: string | null
          createdAt?: any | null
          publishedAt?: any | null
          updatedAt?: any | null
        } | null
      }>
    } | null
    listingImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
  } | null
}

export type EventEntityFragment = {
  __typename: 'EventEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Event'
    promoted?: boolean | null
    showForm?: boolean | null
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
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          id?: string | null
          attributes?: {
            __typename?: 'UploadFile'
            url: string
            name: string
            alternativeText?: string | null
            caption?: string | null
            size: number
            width?: number | null
            height?: number | null
          } | null
        } | null
      } | null
    } | null> | null
    documents?: {
      __typename?: 'ComponentSectionsDocuments'
      title?: string | null
      documents?: {
        __typename?: 'DocumentRelationResponseCollection'
        data: Array<{
          __typename: 'DocumentEntity'
          id?: string | null
          attributes?: {
            __typename?: 'Document'
            title: string
            slug: string
            description?: string | null
            publishedAt?: any | null
            documentCategory?: {
              __typename?: 'DocumentCategoryEntityResponse'
              data?: {
                __typename?: 'DocumentCategoryEntity'
                id?: string | null
                attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
              } | null
            } | null
            file: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  size: number
                  ext?: string | null
                } | null
              } | null
            }
          } | null
        }>
      } | null
    } | null
    gallery?: {
      __typename?: 'UploadFileRelationResponseCollection'
      data: Array<{
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      }>
    } | null
    localizations?: {
      __typename?: 'EventRelationResponseCollection'
      data: Array<{
        __typename?: 'EventEntity'
        attributes?: { __typename?: 'Event'; slug: string; locale?: string | null } | null
      }>
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    eventCategory?: {
      __typename?: 'EventCategoryEntityResponse'
      data?: {
        __typename?: 'EventCategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'EventCategory'
          title?: string | null
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
    branch?: {
      __typename?: 'BranchEntityResponse'
      data?: {
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
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
        } | null
      } | null
    } | null
    eventTags?: {
      __typename?: 'EventTagRelationResponseCollection'
      data: Array<{
        __typename?: 'EventTagEntity'
        id?: string | null
        attributes?: {
          __typename?: 'EventTag'
          title?: string | null
          slug?: string | null
          createdAt?: any | null
          publishedAt?: any | null
          updatedAt?: any | null
        } | null
      }>
    } | null
    listingImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
  } | null
}

export type EventPropertiesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type EventPropertiesQuery = {
  __typename?: 'Query'
  eventCategories?: {
    __typename?: 'EventCategoryEntityResponseCollection'
    data: Array<{
      __typename?: 'EventCategoryEntity'
      id?: string | null
      attributes?: {
        __typename?: 'EventCategory'
        title?: string | null
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    }>
  } | null
  branches?: {
    __typename?: 'BranchEntityResponseCollection'
    data: Array<{
      __typename?: 'BranchEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Branch'
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
      } | null
    }>
  } | null
  eventTags?: {
    __typename?: 'EventTagEntityResponseCollection'
    data: Array<{
      __typename?: 'EventTagEntity'
      id?: string | null
      attributes?: {
        __typename?: 'EventTag'
        title?: string | null
        slug?: string | null
        createdAt?: any | null
        publishedAt?: any | null
        updatedAt?: any | null
      } | null
    }>
  } | null
}

export type EventBySlugQueryVariables = Exact<{
  slug: Scalars['String']
  locale: Scalars['I18NLocaleCode']
}>

export type EventBySlugQuery = {
  __typename?: 'Query'
  events?: {
    __typename?: 'EventEntityResponseCollection'
    data: Array<{
      __typename: 'EventEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Event'
        promoted?: boolean | null
        showForm?: boolean | null
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
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
            } | null
          } | null
        } | null> | null
        documents?: {
          __typename?: 'ComponentSectionsDocuments'
          title?: string | null
          documents?: {
            __typename?: 'DocumentRelationResponseCollection'
            data: Array<{
              __typename: 'DocumentEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Document'
                title: string
                slug: string
                description?: string | null
                publishedAt?: any | null
                documentCategory?: {
                  __typename?: 'DocumentCategoryEntityResponse'
                  data?: {
                    __typename?: 'DocumentCategoryEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'DocumentCategory'
                      label: string
                      slug: string
                    } | null
                  } | null
                } | null
                file: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      size: number
                      ext?: string | null
                    } | null
                  } | null
                }
              } | null
            }>
          } | null
        } | null
        gallery?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
        localizations?: {
          __typename?: 'EventRelationResponseCollection'
          data: Array<{
            __typename?: 'EventEntity'
            attributes?: { __typename?: 'Event'; slug: string; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
        eventCategory?: {
          __typename?: 'EventCategoryEntityResponse'
          data?: {
            __typename?: 'EventCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventCategory'
              title?: string | null
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
        branch?: {
          __typename?: 'BranchEntityResponse'
          data?: {
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Branch'
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
            } | null
          } | null
        } | null
        eventTags?: {
          __typename?: 'EventTagRelationResponseCollection'
          data: Array<{
            __typename?: 'EventTagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventTag'
              title?: string | null
              slug?: string | null
              createdAt?: any | null
              publishedAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type EventStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type EventStaticPathsQuery = {
  __typename?: 'Query'
  events?: {
    __typename?: 'EventEntityResponseCollection'
    data: Array<{
      __typename?: 'EventEntity'
      attributes?: { __typename?: 'Event'; slug: string; locale?: string | null } | null
    }>
  } | null
}

export type NoticeEntityFragment = {
  __typename: 'NoticeEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Notice'
    publishedAt?: any | null
    slug: string
    title: string
    body?: string | null
    promoted?: boolean | null
    listingImage?: {
      __typename?: 'UploadFileRelationResponseCollection'
      data: Array<{
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      }>
    } | null
    documents?: {
      __typename?: 'ComponentSectionsDocuments'
      title?: string | null
      documents?: {
        __typename?: 'DocumentRelationResponseCollection'
        data: Array<{
          __typename: 'DocumentEntity'
          id?: string | null
          attributes?: {
            __typename?: 'Document'
            title: string
            slug: string
            description?: string | null
            publishedAt?: any | null
            documentCategory?: {
              __typename?: 'DocumentCategoryEntityResponse'
              data?: {
                __typename?: 'DocumentCategoryEntity'
                id?: string | null
                attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
              } | null
            } | null
            file: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  size: number
                  ext?: string | null
                } | null
              } | null
            }
          } | null
        }>
      } | null
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
    localizations?: {
      __typename?: 'NoticeRelationResponseCollection'
      data: Array<{
        __typename?: 'NoticeEntity'
        attributes?: { __typename?: 'Notice'; slug: string; locale?: string | null } | null
      }>
    } | null
  } | null
}

export type NoticesStaticPathsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type NoticesStaticPathsQuery = {
  __typename?: 'Query'
  notices?: {
    __typename?: 'NoticeEntityResponseCollection'
    data: Array<{
      __typename?: 'NoticeEntity'
      id?: string | null
      attributes?: { __typename?: 'Notice'; slug: string; locale?: string | null } | null
    }>
  } | null
}

export type NoticeListingEntityFragment = {
  __typename: 'NoticeEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Notice'
    slug: string
    title: string
    publishedAt?: any | null
    listingImage?: {
      __typename?: 'UploadFileRelationResponseCollection'
      data: Array<{
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      }>
    } | null
  } | null
}

export type NoticesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
  limit?: InputMaybe<Scalars['Int']>
  start?: InputMaybe<Scalars['Int']>
}>

export type NoticesQuery = {
  __typename?: 'Query'
  notices?: {
    __typename?: 'NoticeEntityResponseCollection'
    data: Array<{
      __typename: 'NoticeEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Notice'
        slug: string
        title: string
        publishedAt?: any | null
        listingImage?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
      } | null
    }>
    meta: {
      __typename?: 'ResponseCollectionMeta'
      pagination: { __typename?: 'Pagination'; total: number }
    }
  } | null
}

export type NoticeBySlugQueryVariables = Exact<{
  slug: Scalars['String']
  locale: Scalars['I18NLocaleCode']
}>

export type NoticeBySlugQuery = {
  __typename?: 'Query'
  notices?: {
    __typename?: 'NoticeEntityResponseCollection'
    data: Array<{
      __typename: 'NoticeEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Notice'
        publishedAt?: any | null
        slug: string
        title: string
        body?: string | null
        promoted?: boolean | null
        listingImage?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
        documents?: {
          __typename?: 'ComponentSectionsDocuments'
          title?: string | null
          documents?: {
            __typename?: 'DocumentRelationResponseCollection'
            data: Array<{
              __typename: 'DocumentEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Document'
                title: string
                slug: string
                description?: string | null
                publishedAt?: any | null
                documentCategory?: {
                  __typename?: 'DocumentCategoryEntityResponse'
                  data?: {
                    __typename?: 'DocumentCategoryEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'DocumentCategory'
                      label: string
                      slug: string
                    } | null
                  } | null
                } | null
                file: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      size: number
                      ext?: string | null
                    } | null
                  } | null
                }
              } | null
            }>
          } | null
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
        localizations?: {
          __typename?: 'NoticeRelationResponseCollection'
          data: Array<{
            __typename?: 'NoticeEntity'
            attributes?: { __typename?: 'Notice'; slug: string; locale?: string | null } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type PageEntityFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Page'
    slug: string
    title: string
    createdAt?: any | null
    updatedAt?: any | null
    publishedAt?: any | null
    layout?: Enum_Page_Layout | null
    perex?: string | null
    locale?: string | null
    listingImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: {
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
      } | null
    } | null
    pageCategory?: {
      __typename?: 'CategoryEntityResponse'
      data?: {
        __typename?: 'CategoryEntity'
        attributes?: {
          __typename?: 'Category'
          title?: string | null
          priority?: number | null
          createdAt?: any | null
          updatedAt?: any | null
          subCategories?: {
            __typename?: 'CategoryRelationResponseCollection'
            data: Array<{
              __typename?: 'CategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Category'
                title?: string | null
                priority?: number | null
                createdAt?: any | null
                updatedAt?: any | null
                pages?: Array<{
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null> | null
                pageLink?: {
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            }>
          } | null
          parentCategory?: {
            __typename?: 'CategoryEntityResponse'
            data?: {
              __typename?: 'CategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Category'
                title?: string | null
                priority?: number | null
                createdAt?: any | null
                updatedAt?: any | null
                parentCategory?: {
                  __typename?: 'CategoryEntityResponse'
                  data?: {
                    __typename?: 'CategoryEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Category'
                      title?: string | null
                      priority?: number | null
                      createdAt?: any | null
                      updatedAt?: any | null
                      pages?: Array<{
                        __typename?: 'ComponentBlocksPageLink'
                        title?: string | null
                        url?: string | null
                        page?: {
                          __typename?: 'PageEntityResponse'
                          data?: {
                            __typename?: 'PageEntity'
                            id?: string | null
                            attributes?: {
                              __typename?: 'Page'
                              title: string
                              slug: string
                              newSlug: string
                              createdAt?: any | null
                              updatedAt?: any | null
                            } | null
                          } | null
                        } | null
                      } | null> | null
                      pageLink?: {
                        __typename?: 'ComponentBlocksPageLink'
                        title?: string | null
                        url?: string | null
                        page?: {
                          __typename?: 'PageEntityResponse'
                          data?: {
                            __typename?: 'PageEntity'
                            id?: string | null
                            attributes?: {
                              __typename?: 'Page'
                              title: string
                              slug: string
                              newSlug: string
                              createdAt?: any | null
                              updatedAt?: any | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
                pages?: Array<{
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null> | null
                pageLink?: {
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
          pages?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
          pageLink?: {
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          title?: string | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
          } | null> | null
          tableRows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
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
      | { __typename: 'ComponentSectionsBlogPostsListing' }
      | { __typename: 'ComponentSectionsChildrenListing' }
      | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
      | { __typename: 'ComponentSectionsDivider'; id: string }
      | {
          __typename: 'ComponentSectionsDocuments'
          id: string
          title?: string | null
          documents?: {
            __typename?: 'DocumentRelationResponseCollection'
            data: Array<{
              __typename: 'DocumentEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Document'
                title: string
                slug: string
                description?: string | null
                publishedAt?: any | null
                documentCategory?: {
                  __typename?: 'DocumentCategoryEntityResponse'
                  data?: {
                    __typename?: 'DocumentCategoryEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'DocumentCategory'
                      label: string
                      slug: string
                    } | null
                  } | null
                } | null
                file: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      size: number
                      ext?: string | null
                    } | null
                  } | null
                }
              } | null
            }>
          } | null
        }
      | { __typename: 'ComponentSectionsDocumentsListing' }
      | { __typename: 'ComponentSectionsEventsListing' }
      | {
          __typename: 'ComponentSectionsFaq'
          id: string
          title?: string | null
          questions?: Array<{
            __typename?: 'ComponentBlocksAccordionItem'
            id: string
            label?: string | null
            content?: string | null
          } | null> | null
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
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  alternativeText?: string | null
                  caption?: string | null
                  size: number
                  width?: number | null
                  height?: number | null
                } | null
              } | null
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
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Branch'
                  title: string
                  address?: string | null
                  slug: string
                  latitude?: number | null
                  longitude?: number | null
                  listingImage?: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        alternativeText?: string | null
                        caption?: string | null
                        size: number
                        width?: number | null
                        height?: number | null
                      } | null
                    } | null
                  } | null
                  subBranches?: {
                    __typename?: 'BranchRelationResponseCollection'
                    data: Array<{
                      __typename?: 'BranchEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Branch'
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
                      } | null
                    }>
                  } | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | { __typename: 'ComponentSectionsNewBooksListing' }
      | { __typename: 'ComponentSectionsNewsListing' }
      | {
          __typename: 'ComponentSectionsOpeningHoursSection'
          id: string
          title?: string | null
          branchList?: {
            __typename?: 'BranchRelationResponseCollection'
            data: Array<{
              __typename?: 'BranchEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Branch'
                title: string
                openingHours?: {
                  __typename?: 'ComponentBlocksOpeningHours'
                  days: Array<{
                    __typename?: 'ComponentBlocksOpeningHoursItem'
                    label?: string | null
                    time: string
                  } | null>
                } | null
              } | null
            }>
          } | null
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
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Branch'
                  title: string
                  address?: string | null
                  slug: string
                  latitude?: number | null
                  longitude?: number | null
                  listingImage?: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        alternativeText?: string | null
                        caption?: string | null
                        size: number
                        width?: number | null
                        height?: number | null
                      } | null
                    } | null
                  } | null
                  subBranches?: {
                    __typename?: 'BranchRelationResponseCollection'
                    data: Array<{
                      __typename?: 'BranchEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Branch'
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
                      } | null
                    }>
                  } | null
                } | null
              } | null
            } | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                attributes?: { __typename?: 'Page'; slug: string } | null
              } | null
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
          __typename: 'ComponentSectionsSubListing'
          id: string
          title?: string | null
          url?: string | null
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
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTable'
          primaryTitle?: string | null
          secondaryTitle?: string | null
          rows?: Array<{
            __typename?: 'ComponentAccordionItemsTableRow'
            label?: string | null
            value?: string | null
            valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsVideo'
          id: string
          youtube_url?: string | null
          media?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          } | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    localizations?: {
      __typename?: 'PageRelationResponseCollection'
      data: Array<{
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; slug: string; locale?: string | null } | null
      }>
    } | null
    seo?: {
      __typename?: 'ComponentCommonSeo'
      metaTitle?: string | null
      metaDescription?: string | null
      keywords?: string | null
    } | null
  } | null
}

export type SectionLinkPageFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: { __typename?: 'Page'; title: string } | null
}

export type SectionLinkBranchFragment = {
  __typename?: 'BranchEntity'
  id?: string | null
  attributes?: { __typename?: 'Branch'; slug: string; title: string } | null
}

export type PageWithBaseFieldsEntityFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Page'
    title: string
    slug: string
    newSlug: string
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type PageLocalizationEntityFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: { __typename?: 'Page'; slug: string; locale?: string | null } | null
}

export type CategoryFragment = {
  __typename?: 'Category'
  title?: string | null
  priority?: number | null
  createdAt?: any | null
  updatedAt?: any | null
  pages?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null> | null
  pageLink?: {
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null
}

export type PageCategoryEntityFragment = {
  __typename?: 'CategoryEntity'
  attributes?: {
    __typename?: 'Category'
    title?: string | null
    priority?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    subCategories?: {
      __typename?: 'CategoryRelationResponseCollection'
      data: Array<{
        __typename?: 'CategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Category'
          title?: string | null
          priority?: number | null
          createdAt?: any | null
          updatedAt?: any | null
          pages?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
          pageLink?: {
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null
        } | null
      }>
    } | null
    parentCategory?: {
      __typename?: 'CategoryEntityResponse'
      data?: {
        __typename?: 'CategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Category'
          title?: string | null
          priority?: number | null
          createdAt?: any | null
          updatedAt?: any | null
          parentCategory?: {
            __typename?: 'CategoryEntityResponse'
            data?: {
              __typename?: 'CategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Category'
                title?: string | null
                priority?: number | null
                createdAt?: any | null
                updatedAt?: any | null
                pages?: Array<{
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null> | null
                pageLink?: {
                  __typename?: 'ComponentBlocksPageLink'
                  title?: string | null
                  url?: string | null
                  page?: {
                    __typename?: 'PageEntityResponse'
                    data?: {
                      __typename?: 'PageEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Page'
                        title: string
                        slug: string
                        newSlug: string
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
          pages?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
          pageLink?: {
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
    pages?: Array<{
      __typename?: 'ComponentBlocksPageLink'
      title?: string | null
      url?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: {
            __typename?: 'Page'
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      } | null
    } | null> | null
    pageLink?: {
      __typename?: 'ComponentBlocksPageLink'
      title?: string | null
      url?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: {
            __typename?: 'Page'
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}>

export type PagesStaticPathsQuery = {
  __typename?: 'Query'
  pages?: {
    __typename?: 'PageEntityResponseCollection'
    data: Array<{
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; locale?: string | null } | null
    }>
  } | null
}

export type PageByIdQueryVariables = Exact<{
  id: Scalars['ID']
  locale: Scalars['I18NLocaleCode']
}>

export type PageByIdQuery = {
  __typename?: 'Query'
  pages?: {
    __typename?: 'PageEntityResponseCollection'
    data: Array<{
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        slug: string
        title: string
        createdAt?: any | null
        updatedAt?: any | null
        publishedAt?: any | null
        layout?: Enum_Page_Layout | null
        perex?: string | null
        locale?: string | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
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
          } | null
        } | null
        pageCategory?: {
          __typename?: 'CategoryEntityResponse'
          data?: {
            __typename?: 'CategoryEntity'
            attributes?: {
              __typename?: 'Category'
              title?: string | null
              priority?: number | null
              createdAt?: any | null
              updatedAt?: any | null
              subCategories?: {
                __typename?: 'CategoryRelationResponseCollection'
                data: Array<{
                  __typename?: 'CategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Category'
                    title?: string | null
                    priority?: number | null
                    createdAt?: any | null
                    updatedAt?: any | null
                    pages?: Array<{
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null> | null
                    pageLink?: {
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
              parentCategory?: {
                __typename?: 'CategoryEntityResponse'
                data?: {
                  __typename?: 'CategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Category'
                    title?: string | null
                    priority?: number | null
                    createdAt?: any | null
                    updatedAt?: any | null
                    parentCategory?: {
                      __typename?: 'CategoryEntityResponse'
                      data?: {
                        __typename?: 'CategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Category'
                          title?: string | null
                          priority?: number | null
                          createdAt?: any | null
                          updatedAt?: any | null
                          pages?: Array<{
                            __typename?: 'ComponentBlocksPageLink'
                            title?: string | null
                            url?: string | null
                            page?: {
                              __typename?: 'PageEntityResponse'
                              data?: {
                                __typename?: 'PageEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Page'
                                  title: string
                                  slug: string
                                  newSlug: string
                                  createdAt?: any | null
                                  updatedAt?: any | null
                                } | null
                              } | null
                            } | null
                          } | null> | null
                          pageLink?: {
                            __typename?: 'ComponentBlocksPageLink'
                            title?: string | null
                            url?: string | null
                            page?: {
                              __typename?: 'PageEntityResponse'
                              data?: {
                                __typename?: 'PageEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Page'
                                  title: string
                                  slug: string
                                  newSlug: string
                                  createdAt?: any | null
                                  updatedAt?: any | null
                                } | null
                              } | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                    pages?: Array<{
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null> | null
                    pageLink?: {
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
              pages?: Array<{
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
              pageLink?: {
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
              flatText?: Array<{
                __typename?: 'ComponentAccordionItemsFlatText'
                category?: string | null
                content?: string | null
              } | null> | null
              tableRows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
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
          | { __typename: 'ComponentSectionsBlogPostsListing' }
          | { __typename: 'ComponentSectionsChildrenListing' }
          | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
          | { __typename: 'ComponentSectionsDivider'; id: string }
          | {
              __typename: 'ComponentSectionsDocuments'
              id: string
              title?: string | null
              documents?: {
                __typename?: 'DocumentRelationResponseCollection'
                data: Array<{
                  __typename: 'DocumentEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Document'
                    title: string
                    slug: string
                    description?: string | null
                    publishedAt?: any | null
                    documentCategory?: {
                      __typename?: 'DocumentCategoryEntityResponse'
                      data?: {
                        __typename?: 'DocumentCategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'DocumentCategory'
                          label: string
                          slug: string
                        } | null
                      } | null
                    } | null
                    file: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          size: number
                          ext?: string | null
                        } | null
                      } | null
                    }
                  } | null
                }>
              } | null
            }
          | { __typename: 'ComponentSectionsDocumentsListing' }
          | { __typename: 'ComponentSectionsEventsListing' }
          | {
              __typename: 'ComponentSectionsFaq'
              id: string
              title?: string | null
              questions?: Array<{
                __typename?: 'ComponentBlocksAccordionItem'
                id: string
                label?: string | null
                content?: string | null
              } | null> | null
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
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      alternativeText?: string | null
                      caption?: string | null
                      size: number
                      width?: number | null
                      height?: number | null
                    } | null
                  } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | { __typename: 'ComponentSectionsNewBooksListing' }
          | { __typename: 'ComponentSectionsNewsListing' }
          | {
              __typename: 'ComponentSectionsOpeningHoursSection'
              id: string
              title?: string | null
              branchList?: {
                __typename?: 'BranchRelationResponseCollection'
                data: Array<{
                  __typename?: 'BranchEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Branch'
                    title: string
                    openingHours?: {
                      __typename?: 'ComponentBlocksOpeningHours'
                      days: Array<{
                        __typename?: 'ComponentBlocksOpeningHoursItem'
                        label?: string | null
                        time: string
                      } | null>
                    } | null
                  } | null
                }>
              } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: { __typename?: 'Page'; slug: string } | null
                  } | null
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
              __typename: 'ComponentSectionsSubListing'
              id: string
              title?: string | null
              url?: string | null
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
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsTable'
              primaryTitle?: string | null
              secondaryTitle?: string | null
              rows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
                label?: string | null
                value?: string | null
                valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsVideo'
              id: string
              youtube_url?: string | null
              media?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        localizations?: {
          __typename?: 'PageRelationResponseCollection'
          data: Array<{
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; slug: string; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
      } | null
    }>
  } | null
}

export type SortedPartnersQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type SortedPartnersQuery = {
  __typename?: 'Query'
  featuredPartners?: {
    __typename?: 'PartnerEntityResponseCollection'
    data: Array<{
      __typename?: 'PartnerEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Partner'
        title?: string | null
        url?: string | null
        priority?: number | null
        featured?: boolean | null
        logo?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              alternativeText?: string | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
  notFeaturedPartners?: {
    __typename?: 'PartnerEntityResponseCollection'
    data: Array<{
      __typename?: 'PartnerEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Partner'
        title?: string | null
        url?: string | null
        priority?: number | null
        featured?: boolean | null
        logo?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              alternativeText?: string | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type PartnerEntityFragment = {
  __typename?: 'PartnerEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Partner'
    title?: string | null
    url?: string | null
    priority?: number | null
    featured?: boolean | null
    logo?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          alternativeText?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type SeoFragment = {
  __typename?: 'ComponentCommonSeo'
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
}

export type UploadFileEntityFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: {
    __typename?: 'UploadFile'
    url: string
    name: string
    size: number
    ext?: string | null
  } | null
}

export type UploadImageEntityFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: {
    __typename?: 'UploadFile'
    url: string
    name: string
    alternativeText?: string | null
    caption?: string | null
    size: number
    width?: number | null
    height?: number | null
  } | null
}

export type HomePageQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type HomePageQuery = {
  __typename?: 'Query'
  homePage?: {
    __typename?: 'HomePageEntityResponse'
    data?: {
      __typename?: 'HomePageEntity'
      attributes?: {
        __typename?: 'HomePage'
        faqSection?: {
          __typename?: 'ComponentHomepageFaqSection'
          id: string
          title?: string | null
          redirectTo?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title: string
                slug: string
                newSlug: string
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
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
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        } | null
        registrationInfoSection?: {
          __typename?: 'ComponentHomepageRegistrationInfo'
          id: string
          title?: string | null
          description?: string | null
          redirectTo?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title: string
                slug: string
                newSlug: string
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
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
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title: string
                slug: string
                newSlug: string
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
          } | null
        } | null
        mapSection?: {
          __typename?: 'ComponentSectionsMap'
          id: string
          title?: string | null
          branches?: Array<{
            __typename?: 'ComponentBlocksBranchItem'
            branch?: {
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Branch'
                  title: string
                  address?: string | null
                  slug: string
                  latitude?: number | null
                  longitude?: number | null
                  listingImage?: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        alternativeText?: string | null
                        caption?: string | null
                        size: number
                        width?: number | null
                        height?: number | null
                      } | null
                    } | null
                  } | null
                  subBranches?: {
                    __typename?: 'BranchRelationResponseCollection'
                    data: Array<{
                      __typename?: 'BranchEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'Branch'
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
                      } | null
                    }>
                  } | null
                } | null
              } | null
            } | null
          } | null> | null
        } | null
        localizations?: {
          __typename?: 'HomePageRelationResponseCollection'
          data: Array<{
            __typename?: 'HomePageEntity'
            attributes?: { __typename?: 'HomePage'; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
      } | null
    } | null
  } | null
  promotedNews?: {
    __typename?: 'NoticeEntityResponseCollection'
    data: Array<{
      __typename: 'NoticeEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Notice'
        slug: string
        title: string
        publishedAt?: any | null
        listingImage?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
  promotedEvents?: {
    __typename?: 'EventEntityResponseCollection'
    data: Array<{
      __typename: 'EventEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Event'
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
          __typename?: 'EventCategoryEntityResponse'
          data?: {
            __typename?: 'EventCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventCategory'
              title?: string | null
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
        branch?: {
          __typename?: 'BranchEntityResponse'
          data?: {
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Branch'
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
            } | null
          } | null
        } | null
        eventTags?: {
          __typename?: 'EventTagRelationResponseCollection'
          data: Array<{
            __typename?: 'EventTagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventTag'
              title?: string | null
              slug?: string | null
              createdAt?: any | null
              publishedAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
  latestNotices?: {
    __typename?: 'NoticeEntityResponseCollection'
    data: Array<{
      __typename: 'NoticeEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Notice'
        slug: string
        title: string
        publishedAt?: any | null
        listingImage?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
  bookTags?: {
    __typename?: 'BookTagEntityResponseCollection'
    data: Array<{
      __typename?: 'BookTagEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BookTag'
        displayName?: string | null
        slug?: string | null
      } | null
    }>
  } | null
}

export type LatestNewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type LatestNewsQuery = {
  __typename?: 'Query'
  pages?: {
    __typename?: 'PageEntityResponseCollection'
    data: Array<{
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        slug: string
        title: string
        createdAt?: any | null
        updatedAt?: any | null
        publishedAt?: any | null
        layout?: Enum_Page_Layout | null
        perex?: string | null
        locale?: string | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
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
          } | null
        } | null
        pageCategory?: {
          __typename?: 'CategoryEntityResponse'
          data?: {
            __typename?: 'CategoryEntity'
            attributes?: {
              __typename?: 'Category'
              title?: string | null
              priority?: number | null
              createdAt?: any | null
              updatedAt?: any | null
              subCategories?: {
                __typename?: 'CategoryRelationResponseCollection'
                data: Array<{
                  __typename?: 'CategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Category'
                    title?: string | null
                    priority?: number | null
                    createdAt?: any | null
                    updatedAt?: any | null
                    pages?: Array<{
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null> | null
                    pageLink?: {
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
              parentCategory?: {
                __typename?: 'CategoryEntityResponse'
                data?: {
                  __typename?: 'CategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Category'
                    title?: string | null
                    priority?: number | null
                    createdAt?: any | null
                    updatedAt?: any | null
                    parentCategory?: {
                      __typename?: 'CategoryEntityResponse'
                      data?: {
                        __typename?: 'CategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Category'
                          title?: string | null
                          priority?: number | null
                          createdAt?: any | null
                          updatedAt?: any | null
                          pages?: Array<{
                            __typename?: 'ComponentBlocksPageLink'
                            title?: string | null
                            url?: string | null
                            page?: {
                              __typename?: 'PageEntityResponse'
                              data?: {
                                __typename?: 'PageEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Page'
                                  title: string
                                  slug: string
                                  newSlug: string
                                  createdAt?: any | null
                                  updatedAt?: any | null
                                } | null
                              } | null
                            } | null
                          } | null> | null
                          pageLink?: {
                            __typename?: 'ComponentBlocksPageLink'
                            title?: string | null
                            url?: string | null
                            page?: {
                              __typename?: 'PageEntityResponse'
                              data?: {
                                __typename?: 'PageEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Page'
                                  title: string
                                  slug: string
                                  newSlug: string
                                  createdAt?: any | null
                                  updatedAt?: any | null
                                } | null
                              } | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                    pages?: Array<{
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null> | null
                    pageLink?: {
                      __typename?: 'ComponentBlocksPageLink'
                      title?: string | null
                      url?: string | null
                      page?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Page'
                            title: string
                            slug: string
                            newSlug: string
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
              pages?: Array<{
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
              pageLink?: {
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
              flatText?: Array<{
                __typename?: 'ComponentAccordionItemsFlatText'
                category?: string | null
                content?: string | null
              } | null> | null
              tableRows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
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
          | { __typename: 'ComponentSectionsBlogPostsListing' }
          | { __typename: 'ComponentSectionsChildrenListing' }
          | { __typename: 'ComponentSectionsCta'; title?: string | null; url?: string | null }
          | { __typename: 'ComponentSectionsDivider'; id: string }
          | {
              __typename: 'ComponentSectionsDocuments'
              id: string
              title?: string | null
              documents?: {
                __typename?: 'DocumentRelationResponseCollection'
                data: Array<{
                  __typename: 'DocumentEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Document'
                    title: string
                    slug: string
                    description?: string | null
                    publishedAt?: any | null
                    documentCategory?: {
                      __typename?: 'DocumentCategoryEntityResponse'
                      data?: {
                        __typename?: 'DocumentCategoryEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'DocumentCategory'
                          label: string
                          slug: string
                        } | null
                      } | null
                    } | null
                    file: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          size: number
                          ext?: string | null
                        } | null
                      } | null
                    }
                  } | null
                }>
              } | null
            }
          | { __typename: 'ComponentSectionsDocumentsListing' }
          | { __typename: 'ComponentSectionsEventsListing' }
          | {
              __typename: 'ComponentSectionsFaq'
              id: string
              title?: string | null
              questions?: Array<{
                __typename?: 'ComponentBlocksAccordionItem'
                id: string
                label?: string | null
                content?: string | null
              } | null> | null
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
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      alternativeText?: string | null
                      caption?: string | null
                      size: number
                      width?: number | null
                      height?: number | null
                    } | null
                  } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | { __typename: 'ComponentSectionsNewBooksListing' }
          | { __typename: 'ComponentSectionsNewsListing' }
          | {
              __typename: 'ComponentSectionsOpeningHoursSection'
              id: string
              title?: string | null
              branchList?: {
                __typename?: 'BranchRelationResponseCollection'
                data: Array<{
                  __typename?: 'BranchEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Branch'
                    title: string
                    openingHours?: {
                      __typename?: 'ComponentBlocksOpeningHours'
                      days: Array<{
                        __typename?: 'ComponentBlocksOpeningHoursItem'
                        label?: string | null
                        time: string
                      } | null>
                    } | null
                  } | null
                }>
              } | null
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
                  __typename?: 'BranchEntityResponse'
                  data?: {
                    __typename?: 'BranchEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Branch'
                      title: string
                      address?: string | null
                      slug: string
                      latitude?: number | null
                      longitude?: number | null
                      listingImage?: {
                        __typename?: 'UploadFileEntityResponse'
                        data?: {
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            alternativeText?: string | null
                            caption?: string | null
                            size: number
                            width?: number | null
                            height?: number | null
                          } | null
                        } | null
                      } | null
                      subBranches?: {
                        __typename?: 'BranchRelationResponseCollection'
                        data: Array<{
                          __typename?: 'BranchEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Branch'
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
                          } | null
                        }>
                      } | null
                    } | null
                  } | null
                } | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: { __typename?: 'Page'; slug: string } | null
                  } | null
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
              __typename: 'ComponentSectionsSubListing'
              id: string
              title?: string | null
              url?: string | null
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
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title: string
                      slug: string
                      newSlug: string
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsTable'
              primaryTitle?: string | null
              secondaryTitle?: string | null
              rows?: Array<{
                __typename?: 'ComponentAccordionItemsTableRow'
                label?: string | null
                value?: string | null
                valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsVideo'
              id: string
              youtube_url?: string | null
              media?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        localizations?: {
          __typename?: 'PageRelationResponseCollection'
          data: Array<{
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; slug: string; locale?: string | null } | null
          }>
        } | null
        seo?: {
          __typename?: 'ComponentCommonSeo'
          metaTitle?: string | null
          metaDescription?: string | null
          keywords?: string | null
        } | null
      } | null
    }>
  } | null
}

export type MenuEntityFragment = {
  __typename?: 'MenuEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Menu'
    menuTitle?: string | null
    menuSlug?: string | null
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
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: {
            __typename?: 'Page'
            title: string
            slug: string
            newSlug: string
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      } | null
      sectionLinks?: Array<{
        __typename?: 'ComponentMenuSectionLinks'
        id: string
        sectionLinkTitle?: string | null
        sectionLinkPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title: string } | null
          } | null
        } | null
        sectionLinkBranch?: {
          __typename?: 'BranchEntityResponse'
          data?: {
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: { __typename?: 'Branch'; slug: string; title: string } | null
          } | null
        } | null
      } | null> | null
    } | null> | null
  } | null
}

export type GeneralEntityFragment = {
  __typename?: 'GeneralEntity'
  attributes?: {
    __typename?: 'General'
    eventsPage?: {
      __typename?: 'PageEntityResponse'
      data?: { __typename?: 'PageEntity'; id?: string | null } | null
    } | null
    newBooksPage?: {
      __typename?: 'PageEntityResponse'
      data?: { __typename?: 'PageEntity'; id?: string | null } | null
    } | null
    privacyTermsAndConditionsPage?: {
      __typename?: 'PageEntityResponse'
      data?: { __typename?: 'PageEntity'; id?: string | null } | null
    } | null
    openingHoursPage?: {
      __typename?: 'PageEntityResponse'
      data?: { __typename?: 'PageEntity'; id?: string | null } | null
    } | null
  } | null
}

export type MenuSectionFragment = {
  __typename?: 'ComponentMenuSections'
  id: string
  sectionTitle?: string | null
  sectionColumnSpan?: number | null
  sectionPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null
  } | null
  sectionLinks?: Array<{
    __typename?: 'ComponentMenuSectionLinks'
    id: string
    sectionLinkTitle?: string | null
    sectionLinkPage?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title: string } | null
      } | null
    } | null
    sectionLinkBranch?: {
      __typename?: 'BranchEntityResponse'
      data?: {
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: { __typename?: 'Branch'; slug: string; title: string } | null
      } | null
    } | null
  } | null> | null
}

export type BookTagEntityFragment = {
  __typename?: 'BookTagEntity'
  id?: string | null
  attributes?: { __typename?: 'BookTag'; displayName?: string | null; slug?: string | null } | null
}

export type DocumentsFragment = {
  __typename?: 'ComponentSectionsDocuments'
  title?: string | null
  documents?: {
    __typename?: 'DocumentRelationResponseCollection'
    data: Array<{
      __typename: 'DocumentEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Document'
        title: string
        slug: string
        description?: string | null
        publishedAt?: any | null
        documentCategory?: {
          __typename?: 'DocumentCategoryEntityResponse'
          data?: {
            __typename?: 'DocumentCategoryEntity'
            id?: string | null
            attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
          } | null
        } | null
        file: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              size: number
              ext?: string | null
            } | null
          } | null
        }
      } | null
    }>
  } | null
}

export type GalleryFragment = {
  __typename?: 'ComponentSectionsGallery'
  id: string
  Gallery?: Array<{
    __typename?: 'ComponentLocalityPartsGalleryParts'
    id: string
    Description?: string | null
    Photo?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
  } | null> | null
}

export type OpeningHoursDaysFragment = {
  __typename?: 'ComponentBlocksOpeningHours'
  days: Array<{
    __typename?: 'ComponentBlocksOpeningHoursItem'
    label?: string | null
    time: string
  } | null>
}

export type OpeningHoursSectionFragment = {
  __typename?: 'ComponentSectionsOpeningHoursSection'
  id: string
  title?: string | null
  branchList?: {
    __typename?: 'BranchRelationResponseCollection'
    data: Array<{
      __typename?: 'BranchEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Branch'
        title: string
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion'
  title?: string | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
  } | null> | null
  tableRows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
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

type Sections_ComponentSectionsBlogPostsListing_Fragment = {
  __typename: 'ComponentSectionsBlogPostsListing'
}

type Sections_ComponentSectionsChildrenListing_Fragment = {
  __typename: 'ComponentSectionsChildrenListing'
}

type Sections_ComponentSectionsCta_Fragment = {
  __typename: 'ComponentSectionsCta'
  title?: string | null
  url?: string | null
}

type Sections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider'
  id: string
}

type Sections_ComponentSectionsDocuments_Fragment = {
  __typename: 'ComponentSectionsDocuments'
  id: string
  title?: string | null
  documents?: {
    __typename?: 'DocumentRelationResponseCollection'
    data: Array<{
      __typename: 'DocumentEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Document'
        title: string
        slug: string
        description?: string | null
        publishedAt?: any | null
        documentCategory?: {
          __typename?: 'DocumentCategoryEntityResponse'
          data?: {
            __typename?: 'DocumentCategoryEntity'
            id?: string | null
            attributes?: { __typename?: 'DocumentCategory'; label: string; slug: string } | null
          } | null
        } | null
        file: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              size: number
              ext?: string | null
            } | null
          } | null
        }
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsDocumentsListing_Fragment = {
  __typename: 'ComponentSectionsDocumentsListing'
}

type Sections_ComponentSectionsEventsListing_Fragment = {
  __typename: 'ComponentSectionsEventsListing'
}

type Sections_ComponentSectionsFaq_Fragment = {
  __typename: 'ComponentSectionsFaq'
  id: string
  title?: string | null
  questions?: Array<{
    __typename?: 'ComponentBlocksAccordionItem'
    id: string
    label?: string | null
    content?: string | null
  } | null> | null
}

type Sections_ComponentSectionsFlatText_Fragment = {
  __typename: 'ComponentSectionsFlatText'
  id: string
  content?: string | null
}

type Sections_ComponentSectionsForm_Fragment = {
  __typename: 'ComponentSectionsForm'
  id: string
  type?: Enum_Componentsectionsform_Type | null
}

type Sections_ComponentSectionsGallery_Fragment = {
  __typename: 'ComponentSectionsGallery'
  id: string
  Gallery?: Array<{
    __typename?: 'ComponentLocalityPartsGalleryParts'
    id: string
    Description?: string | null
    Photo?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          alternativeText?: string | null
          caption?: string | null
          size: number
          width?: number | null
          height?: number | null
        } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsMap_Fragment = {
  __typename: 'ComponentSectionsMap'
  id: string
  title?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItem'
    branch?: {
      __typename?: 'BranchEntityResponse'
      data?: {
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
          title: string
          address?: string | null
          slug: string
          latitude?: number | null
          longitude?: number | null
          listingImage?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
            } | null
          } | null
          subBranches?: {
            __typename?: 'BranchRelationResponseCollection'
            data: Array<{
              __typename?: 'BranchEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Branch'
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
              } | null
            }>
          } | null
        } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsNewBooksListing_Fragment = {
  __typename: 'ComponentSectionsNewBooksListing'
}

type Sections_ComponentSectionsNewsListing_Fragment = { __typename: 'ComponentSectionsNewsListing' }

type Sections_ComponentSectionsOpeningHoursSection_Fragment = {
  __typename: 'ComponentSectionsOpeningHoursSection'
  id: string
  title?: string | null
  branchList?: {
    __typename?: 'BranchRelationResponseCollection'
    data: Array<{
      __typename?: 'BranchEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Branch'
        title: string
        openingHours?: {
          __typename?: 'ComponentBlocksOpeningHours'
          days: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label?: string | null
            time: string
          } | null>
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsPartners_Fragment = { __typename: 'ComponentSectionsPartners' }

type Sections_ComponentSectionsRental_Fragment = {
  __typename: 'ComponentSectionsRental'
  id: string
  title?: string | null
  text?: string | null
  branches?: Array<{
    __typename?: 'ComponentBlocksBranchItemWithPage'
    branch?: {
      __typename?: 'BranchEntityResponse'
      data?: {
        __typename?: 'BranchEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Branch'
          title: string
          address?: string | null
          slug: string
          latitude?: number | null
          longitude?: number | null
          listingImage?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                alternativeText?: string | null
                caption?: string | null
                size: number
                width?: number | null
                height?: number | null
              } | null
            } | null
          } | null
          subBranches?: {
            __typename?: 'BranchRelationResponseCollection'
            data: Array<{
              __typename?: 'BranchEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Branch'
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
              } | null
            }>
          } | null
        } | null
      } | null
    } | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: { __typename?: 'Page'; slug: string } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsSiteUsefullness_Fragment = {
  __typename: 'ComponentSectionsSiteUsefullness'
  id: string
  title?: string | null
  thankYouMessage?: string | null
}

type Sections_ComponentSectionsSubListing_Fragment = {
  __typename: 'ComponentSectionsSubListing'
  id: string
  title?: string | null
  url?: string | null
}

type Sections_ComponentSectionsSubpages_Fragment = {
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
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsTable_Fragment = {
  __typename: 'ComponentSectionsTable'
  primaryTitle?: string | null
  secondaryTitle?: string | null
  rows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
}

type Sections_ComponentSectionsVideo_Fragment = {
  __typename: 'ComponentSectionsVideo'
  id: string
  youtube_url?: string | null
  media?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  } | null
}

type Sections_Error_Fragment = { __typename: 'Error' }

export type SectionsFragment =
  | Sections_ComponentSectionsAccordion_Fragment
  | Sections_ComponentSectionsBlogPostsListing_Fragment
  | Sections_ComponentSectionsChildrenListing_Fragment
  | Sections_ComponentSectionsCta_Fragment
  | Sections_ComponentSectionsDivider_Fragment
  | Sections_ComponentSectionsDocuments_Fragment
  | Sections_ComponentSectionsDocumentsListing_Fragment
  | Sections_ComponentSectionsEventsListing_Fragment
  | Sections_ComponentSectionsFaq_Fragment
  | Sections_ComponentSectionsFlatText_Fragment
  | Sections_ComponentSectionsForm_Fragment
  | Sections_ComponentSectionsGallery_Fragment
  | Sections_ComponentSectionsMap_Fragment
  | Sections_ComponentSectionsNewBooksListing_Fragment
  | Sections_ComponentSectionsNewsListing_Fragment
  | Sections_ComponentSectionsOpeningHoursSection_Fragment
  | Sections_ComponentSectionsPartners_Fragment
  | Sections_ComponentSectionsRental_Fragment
  | Sections_ComponentSectionsSiteUsefullness_Fragment
  | Sections_ComponentSectionsSubListing_Fragment
  | Sections_ComponentSectionsSubpages_Fragment
  | Sections_ComponentSectionsTable_Fragment
  | Sections_ComponentSectionsVideo_Fragment
  | Sections_Error_Fragment

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

export type TableFragment = {
  __typename?: 'ComponentSectionsTable'
  primaryTitle?: string | null
  secondaryTitle?: string | null
  rows?: Array<{
    __typename?: 'ComponentAccordionItemsTableRow'
    label?: string | null
    value?: string | null
    valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null
  } | null> | null
}

export type SubpagesFragment = {
  __typename?: 'ComponentSectionsSubpages'
  title?: string | null
  subpages?: Array<{
    __typename?: 'ComponentBlocksSubpage'
    id: string
    title?: string | null
    description?: string | null
    url?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null> | null
}

export type ExternalLinkFragment = {
  __typename?: 'ComponentBlocksExternalLink'
  category?: string | null
  title?: string | null
  url?: string | null
}

export type AccordionItemFragment = {
  __typename?: 'ComponentBlocksAccordionItem'
  id: string
  label?: string | null
  content?: string | null
}

export type PageLinkFragment = {
  __typename?: 'ComponentBlocksPageLink'
  title?: string | null
  url?: string | null
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        title: string
        slug: string
        newSlug: string
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null
  } | null
}

export type PaginationFragment = {
  __typename?: 'Pagination'
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export type FooterEntityFragment = {
  __typename?: 'FooterEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Footer'
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
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Page'
              title: string
              slug: string
              newSlug: string
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
      } | null> | null
    } | null> | null
    siteMapLink?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
    privacyLink?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Page'
          title: string
          slug: string
          newSlug: string
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null
}

export type GeneralQueryVariables = Exact<{
  eventsFrom: Scalars['DateTime']
  locale: Scalars['I18NLocaleCode']
}>

export type GeneralQuery = {
  __typename?: 'Query'
  menus?: {
    __typename?: 'MenuEntityResponseCollection'
    data: Array<{
      __typename?: 'MenuEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Menu'
        menuTitle?: string | null
        menuSlug?: string | null
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
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title: string
                slug: string
                newSlug: string
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
          } | null
          sectionLinks?: Array<{
            __typename?: 'ComponentMenuSectionLinks'
            id: string
            sectionLinkTitle?: string | null
            sectionLinkPage?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: { __typename?: 'Page'; title: string } | null
              } | null
            } | null
            sectionLinkBranch?: {
              __typename?: 'BranchEntityResponse'
              data?: {
                __typename?: 'BranchEntity'
                id?: string | null
                attributes?: { __typename?: 'Branch'; slug: string; title: string } | null
              } | null
            } | null
          } | null> | null
        } | null> | null
      } | null
    }>
  } | null
  upcomingEvents?: {
    __typename?: 'EventEntityResponseCollection'
    data: Array<{
      __typename: 'EventEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Event'
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
          __typename?: 'EventCategoryEntityResponse'
          data?: {
            __typename?: 'EventCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventCategory'
              title?: string | null
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
        branch?: {
          __typename?: 'BranchEntityResponse'
          data?: {
            __typename?: 'BranchEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Branch'
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
            } | null
          } | null
        } | null
        eventTags?: {
          __typename?: 'EventTagRelationResponseCollection'
          data: Array<{
            __typename?: 'EventTagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'EventTag'
              title?: string | null
              slug?: string | null
              createdAt?: any | null
              publishedAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        listingImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              alternativeText?: string | null
              caption?: string | null
              size: number
              width?: number | null
              height?: number | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
  footer?: {
    __typename?: 'FooterEntityResponse'
    data?: {
      __typename?: 'FooterEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Footer'
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
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title: string
                  slug: string
                  newSlug: string
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        } | null> | null
        siteMapLink?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Page'
              title: string
              slug: string
              newSlug: string
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
        privacyLink?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Page'
              title: string
              slug: string
              newSlug: string
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  general?: {
    __typename?: 'GeneralEntityResponse'
    data?: {
      __typename?: 'GeneralEntity'
      attributes?: {
        __typename?: 'General'
        eventsPage?: {
          __typename?: 'PageEntityResponse'
          data?: { __typename?: 'PageEntity'; id?: string | null } | null
        } | null
        newBooksPage?: {
          __typename?: 'PageEntityResponse'
          data?: { __typename?: 'PageEntity'; id?: string | null } | null
        } | null
        privacyTermsAndConditionsPage?: {
          __typename?: 'PageEntityResponse'
          data?: { __typename?: 'PageEntity'; id?: string | null } | null
        } | null
        openingHoursPage?: {
          __typename?: 'PageEntityResponse'
          data?: { __typename?: 'PageEntity'; id?: string | null } | null
        } | null
      } | null
    } | null
  } | null
}

export const FileCategoryEntityFragmentDoc = gql`
  fragment FileCategoryEntity on FileCategoryEntity {
    id
    attributes {
      name
      slug
    }
  }
`
export const BasicDocumentFileFragmentDoc = gql`
  fragment BasicDocumentFile on UploadFileEntity {
    id
    attributes {
      url
      name
      ext
      size
    }
  }
`
export const UploadFileEntityFragmentDoc = gql`
  fragment UploadFileEntity on UploadFileEntity {
    id
    attributes {
      url
      name
      size
      ext
    }
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
        data {
          ...UploadFileEntity
        }
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
        data {
          ...UploadFileEntity
        }
      }
    }
    ... on ComponentMetadataObjednavky {
      id
      title
      date_period
      date_added
      attachment {
        data {
          ...UploadFileEntity
        }
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
        data {
          ...UploadFileEntity
        }
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const BasicDocumentEntityFragmentDoc = gql`
  fragment BasicDocumentEntity on BasicDocumentEntity {
    id
    attributes {
      slug
      title
      description
      date_added
      author
      link
      file_category {
        data {
          id
          attributes {
            name
            slug
          }
        }
      }
      metadata {
        ...Metadata
      }
      attachment {
        data {
          ...UploadFileEntity
        }
      }
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
  fragment PageWithBaseFieldsEntity on PageEntity {
    id
    attributes {
      title
      slug
      newSlug
      createdAt
      updatedAt
    }
  }
`
export const SubpagesFragmentDoc = gql`
  fragment Subpages on ComponentSectionsSubpages {
    title
    subpages {
      id
      title
      description
      url
      page {
        data {
          ...PageWithBaseFieldsEntity
        }
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const TableFragmentDoc = gql`
  fragment Table on ComponentSectionsTable {
    primaryTitle
    secondaryTitle
    rows {
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
export const TableRowFragmentDoc = gql`
  fragment TableRow on ComponentAccordionItemsTableRow {
    accordionCategory
    tableCategory
    label
    value
    valueAlign
  }
`
export const DocumentCategoryEntityFragmentDoc = gql`
  fragment DocumentCategoryEntity on DocumentCategoryEntity {
    id
    attributes {
      label
      slug
    }
  }
`
export const DocumentEntityFragmentDoc = gql`
  fragment DocumentEntity on DocumentEntity {
    id
    __typename
    attributes {
      title
      slug
      description
      publishedAt
      documentCategory {
        data {
          ...DocumentCategoryEntity
        }
      }
      file {
        data {
          ...UploadFileEntity
        }
      }
    }
  }
  ${DocumentCategoryEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const DocumentsFragmentDoc = gql`
  fragment Documents on ComponentSectionsDocuments {
    title
    documents {
      data {
        ...DocumentEntity
      }
    }
  }
  ${DocumentEntityFragmentDoc}
`
export const UploadImageEntityFragmentDoc = gql`
  fragment UploadImageEntity on UploadFileEntity {
    id
    attributes {
      url
      name
      alternativeText
      caption
      size
      width
      height
    }
  }
`
export const BranchPlaceEntityFragmentDoc = gql`
  fragment BranchPlaceEntity on BranchEntity {
    id
    attributes {
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
  }
`
export const BranchCardEntityFragmentDoc = gql`
  fragment BranchCardEntity on BranchEntity {
    id
    attributes {
      title
      address
      slug
      latitude
      longitude
      listingImage {
        data {
          ...UploadImageEntity
        }
      }
      subBranches {
        data {
          id
          ...BranchPlaceEntity
        }
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${BranchPlaceEntityFragmentDoc}
`
export const GalleryFragmentDoc = gql`
  fragment Gallery on ComponentSectionsGallery {
    id
    Gallery {
      id
      Description
      Photo {
        data {
          ...UploadImageEntity
        }
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
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
      data {
        id
        attributes {
          title
          openingHours {
            ...OpeningHoursDays
          }
        }
      }
    }
  }
  ${OpeningHoursDaysFragmentDoc}
`
export const SectionsFragmentDoc = gql`
  fragment Sections on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsSubListing {
      id
      title
      url
    }
    ... on ComponentSectionsFaq {
      id
      title
      questions {
        ...AccordionItem
      }
    }
    ... on ComponentSectionsFlatText {
      id
      content
    }
    ... on ComponentSectionsSiteUsefullness {
      id
      title
      thankYouMessage
    }
    ... on ComponentSectionsForm {
      id
      type
    }
    ... on ComponentSectionsSubpages {
      id
      ...Subpages
    }
    ... on ComponentSectionsTable {
      ...Table
    }
    ... on ComponentSectionsAccordion {
      title
      flatText {
        ...FlatText
      }
      tableRows(pagination: { limit: -1 }) {
        ...TableRow
      }
      forms {
        category
        type
      }
    }
    ... on ComponentSectionsDivider {
      id
    }
    ... on ComponentSectionsCta {
      title
      url
    }
    ... on ComponentSectionsVideo {
      id
      youtube_url
      media {
        data {
          attributes {
            url
          }
        }
      }
    }
    ... on ComponentSectionsDocuments {
      id
      ...Documents
    }
    ... on ComponentSectionsMap {
      id
      title
      branches {
        branch {
          data {
            ...BranchCardEntity
          }
        }
      }
    }
    ... on ComponentSectionsRental {
      id
      title
      text
      branches {
        branch {
          data {
            ...BranchCardEntity
          }
        }
        page {
          data {
            attributes {
              slug
            }
          }
        }
      }
    }
    ... on ComponentSectionsGallery {
      ...Gallery
    }
    ... on ComponentSectionsOpeningHoursSection {
      ...OpeningHoursSection
    }
  }
  ${AccordionItemFragmentDoc}
  ${SubpagesFragmentDoc}
  ${TableFragmentDoc}
  ${FlatTextFragmentDoc}
  ${TableRowFragmentDoc}
  ${DocumentsFragmentDoc}
  ${BranchCardEntityFragmentDoc}
  ${GalleryFragmentDoc}
  ${OpeningHoursSectionFragmentDoc}
`
export const SeoFragmentDoc = gql`
  fragment Seo on ComponentCommonSeo {
    metaTitle
    metaDescription
    keywords
  }
`
export const BlogPostEntityFragmentDoc = gql`
  fragment BlogPostEntity on BlogPostEntity {
    id
    attributes {
      slug
      title
      publishedAt
      coverMedia {
        data {
          attributes {
            url
            mime
            alternativeText
          }
        }
      }
      sections {
        ...Sections
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
      }
    }
  }
  ${SectionsFragmentDoc}
  ${SeoFragmentDoc}
`
export const BranchEntityFragmentDoc = gql`
  fragment BranchEntity on BranchEntity {
    ...BranchCardEntity
    attributes {
      medias {
        data {
          ...UploadImageEntity
        }
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
        data {
          id
          attributes {
            title
            slug
          }
        }
      }
      locale
      localizations {
        data {
          id
          attributes {
            title
            slug
            locale
          }
        }
      }
      seo {
        ...Seo
      }
    }
  }
  ${BranchCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${SeoFragmentDoc}
`
export const DisclosureEntityFragmentDoc = gql`
  fragment DisclosureEntity on DisclosureEntity {
    id
    __typename
    attributes {
      slug
      title
      description
      addedAt
      type
      file {
        data {
          ...UploadFileEntity
        }
      }
      dateFrom
      dateTo
      idNumber
      amount
      contractor
      grantProvider
      grantYear
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const EventCardEntityFragmentDoc = gql`
  fragment EventCardEntity on EventEntity {
    id
    __typename
    attributes {
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
        data {
          id
          attributes {
            title
            createdAt
            updatedAt
          }
        }
      }
      branch {
        data {
          ...BranchPlaceEntity
        }
      }
      eventTags {
        data {
          id
          attributes {
            title
            slug
            createdAt
            publishedAt
            updatedAt
          }
        }
      }
      listingImage {
        data {
          ...UploadImageEntity
        }
      }
      coverImage {
        data {
          ...UploadImageEntity
        }
      }
    }
  }
  ${BranchPlaceEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
`
export const EventEntityFragmentDoc = gql`
  fragment EventEntity on EventEntity {
    ...EventCardEntity
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
      documents {
        ...Documents
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
      }
    }
  }
  ${EventCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${DocumentsFragmentDoc}
  ${SeoFragmentDoc}
`
export const NoticeEntityFragmentDoc = gql`
  fragment NoticeEntity on NoticeEntity {
    __typename
    id
    attributes {
      publishedAt
      slug
      title
      body
      listingImage {
        data {
          ...UploadImageEntity
        }
      }
      promoted
      documents {
        ...Documents
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
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${DocumentsFragmentDoc}
  ${SeoFragmentDoc}
`
export const NoticeListingEntityFragmentDoc = gql`
  fragment NoticeListingEntity on NoticeEntity {
    __typename
    id
    attributes {
      slug
      title
      publishedAt
      listingImage {
        data {
          ...UploadImageEntity
        }
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const PageLinkFragmentDoc = gql`
  fragment PageLink on ComponentBlocksPageLink {
    title
    url
    page {
      data {
        ...PageWithBaseFieldsEntity
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const CategoryFragmentDoc = gql`
  fragment Category on Category {
    title
    priority
    pages(pagination: { limit: 20 }) {
      ...PageLink
    }
    pageLink {
      ...PageLink
    }
    createdAt
    updatedAt
  }
  ${PageLinkFragmentDoc}
`
export const PageCategoryEntityFragmentDoc = gql`
  fragment PageCategoryEntity on CategoryEntity {
    attributes {
      ...Category
      subCategories {
        data {
          id
          attributes {
            ...Category
          }
        }
      }
      parentCategory {
        data {
          id
          attributes {
            ...Category
            parentCategory {
              data {
                id
                attributes {
                  ...Category
                }
              }
            }
          }
        }
      }
    }
  }
  ${CategoryFragmentDoc}
`
export const PageLocalizationEntityFragmentDoc = gql`
  fragment PageLocalizationEntity on PageEntity {
    id
    attributes {
      slug
      locale
    }
  }
`
export const PageEntityFragmentDoc = gql`
  fragment PageEntity on PageEntity {
    id
    attributes {
      slug
      title
      createdAt
      updatedAt
      publishedAt
      listingImage {
        data {
          attributes {
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
        }
      }
      layout
      perex
      pageCategory {
        data {
          ...PageCategoryEntity
        }
      }
      sections {
        ...Sections
      }
      locale
      localizations {
        data {
          ...PageLocalizationEntity
        }
      }
      seo {
        ...Seo
      }
    }
  }
  ${PageCategoryEntityFragmentDoc}
  ${SectionsFragmentDoc}
  ${PageLocalizationEntityFragmentDoc}
  ${SeoFragmentDoc}
`
export const PartnerEntityFragmentDoc = gql`
  fragment PartnerEntity on PartnerEntity {
    id
    attributes {
      title
      url
      logo {
        data {
          id
          attributes {
            url
            alternativeText
          }
        }
      }
      priority
      featured
    }
  }
`
export const SectionLinkPageFragmentDoc = gql`
  fragment SectionLinkPage on PageEntity {
    id
    attributes {
      title
    }
  }
`
export const SectionLinkBranchFragmentDoc = gql`
  fragment SectionLinkBranch on BranchEntity {
    id
    attributes {
      slug
      title
    }
  }
`
export const MenuSectionFragmentDoc = gql`
  fragment MenuSection on ComponentMenuSections {
    id
    sectionTitle
    sectionColumnSpan
    sectionPage {
      data {
        ...PageWithBaseFieldsEntity
      }
    }
    sectionLinks(pagination: { limit: -1 }) {
      id
      sectionLinkTitle
      sectionLinkPage {
        data {
          ...SectionLinkPage
        }
      }
      sectionLinkBranch {
        data {
          ...SectionLinkBranch
        }
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
  ${SectionLinkPageFragmentDoc}
  ${SectionLinkBranchFragmentDoc}
`
export const MenuEntityFragmentDoc = gql`
  fragment MenuEntity on MenuEntity {
    id
    attributes {
      menuTitle
      menuSlug
      menuTotalColumns
      order
      menuSections {
        ...MenuSection
      }
      createdAt
      updatedAt
    }
  }
  ${MenuSectionFragmentDoc}
`
export const GeneralEntityFragmentDoc = gql`
  fragment GeneralEntity on GeneralEntity {
    attributes {
      eventsPage {
        data {
          id
        }
      }
      newBooksPage {
        data {
          id
        }
      }
      privacyTermsAndConditionsPage {
        data {
          id
        }
      }
      openingHoursPage {
        data {
          id
        }
      }
    }
  }
`
export const BookTagEntityFragmentDoc = gql`
  fragment BookTagEntity on BookTagEntity {
    id
    attributes {
      displayName
      slug
    }
  }
`
export const ExternalLinkFragmentDoc = gql`
  fragment ExternalLink on ComponentBlocksExternalLink {
    category
    title
    url
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
export const FooterEntityFragmentDoc = gql`
  fragment FooterEntity on FooterEntity {
    id
    attributes {
      footerColumns {
        id
        title
        footerLink {
          id
          redirectTo {
            data {
              ...PageWithBaseFieldsEntity
            }
          }
          title
          otherSite
        }
      }
      siteMapLink {
        data {
          ...PageWithBaseFieldsEntity
        }
      }
      privacyLink {
        data {
          ...PageWithBaseFieldsEntity
        }
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
`
export const BasicDocumentBySlugDocument = gql`
  query BasicDocumentBySlug($slug: String!) {
    basicDocuments(filters: { slug: { eq: $slug } }) {
      data {
        ...BasicDocumentEntity
      }
    }
  }
  ${BasicDocumentEntityFragmentDoc}
`
export const FileCategoriesDocument = gql`
  query FileCategories {
    fileCategories {
      data {
        ...FileCategoryEntity
      }
    }
  }
  ${FileCategoryEntityFragmentDoc}
`
export const BlogPostStaticPathsDocument = gql`
  query BlogPostStaticPaths($locale: I18NLocaleCode!) {
    blogPosts(locale: $locale, pagination: { limit: -1 }) {
      data {
        id
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const BlogPostBySlugDocument = gql`
  query BlogPostBySlug($slug: String!, $locale: I18NLocaleCode!) {
    blogPosts(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        ...BlogPostEntity
      }
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
    blogPosts(locale: $locale, pagination: { limit: $limit, start: $start }, sort: [$sort]) {
      data {
        ...BlogPostEntity
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
  ${BlogPostEntityFragmentDoc}
`
export const BranchStaticPathsDocument = gql`
  query BranchStaticPaths($locale: I18NLocaleCode!) {
    branches(locale: $locale, pagination: { limit: -1 }) {
      data {
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const BranchBySlugDocument = gql`
  query BranchBySlug($slug: String!, $locale: I18NLocaleCode!) {
    branches(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        ...BranchEntity
      }
    }
  }
  ${BranchEntityFragmentDoc}
`
export const DisclosureBySlugDocument = gql`
  query DisclosureBySlug($slug: String!) {
    disclosures(filters: { slug: { eq: $slug } }) {
      data {
        ...DisclosureEntity
      }
    }
  }
  ${DisclosureEntityFragmentDoc}
`
export const DocumentCategoriesDocument = gql`
  query DocumentCategories {
    documentCategories {
      data {
        ...DocumentCategoryEntity
      }
    }
  }
  ${DocumentCategoryEntityFragmentDoc}
`
export const DocumentBySlugDocument = gql`
  query DocumentBySlug($slug: String!) {
    documents(filters: { slug: { eq: $slug } }) {
      data {
        ...DocumentEntity
      }
    }
  }
  ${DocumentEntityFragmentDoc}
`
export const EventPropertiesDocument = gql`
  query EventProperties($locale: I18NLocaleCode!) {
    eventCategories(locale: $locale) {
      data {
        id
        attributes {
          title
          createdAt
          updatedAt
        }
      }
    }
    branches(locale: $locale) {
      data {
        id
        ...BranchPlaceEntity
      }
    }
    eventTags(locale: $locale) {
      data {
        id
        attributes {
          title
          slug
          createdAt
          publishedAt
          updatedAt
        }
      }
    }
  }
  ${BranchPlaceEntityFragmentDoc}
`
export const EventBySlugDocument = gql`
  query EventBySlug($slug: String!, $locale: I18NLocaleCode!) {
    events(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        ...EventEntity
      }
    }
  }
  ${EventEntityFragmentDoc}
`
export const EventStaticPathsDocument = gql`
  query EventStaticPaths($locale: I18NLocaleCode!) {
    events(locale: $locale, pagination: { limit: 32 }, sort: "dateFrom:desc") {
      data {
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const NoticesStaticPathsDocument = gql`
  query NoticesStaticPaths($locale: I18NLocaleCode!) {
    notices(locale: $locale, pagination: { limit: -1 }) {
      data {
        id
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const NoticesDocument = gql`
  query Notices($locale: I18NLocaleCode!, $limit: Int, $start: Int) {
    notices(
      locale: $locale
      pagination: { limit: $limit, start: $start }
      sort: "publishedAt:desc"
    ) {
      data {
        ...NoticeListingEntity
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
  ${NoticeListingEntityFragmentDoc}
`
export const NoticeBySlugDocument = gql`
  query NoticeBySlug($slug: String!, $locale: I18NLocaleCode!) {
    notices(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        ...NoticeEntity
      }
    }
  }
  ${NoticeEntityFragmentDoc}
`
export const PagesStaticPathsDocument = gql`
  query PagesStaticPaths($locale: I18NLocaleCode) {
    pages(locale: $locale) {
      data {
        id
        attributes {
          locale
        }
      }
    }
  }
`
export const PageByIdDocument = gql`
  query PageById($id: ID!, $locale: I18NLocaleCode!) {
    pages(filters: { id: { eq: $id } }, locale: $locale) {
      data {
        ...PageEntity
      }
    }
  }
  ${PageEntityFragmentDoc}
`
export const SortedPartnersDocument = gql`
  query SortedPartners($locale: I18NLocaleCode!) {
    featuredPartners: partners(
      locale: $locale
      pagination: { limit: 100 }
      filters: { featured: { eq: true } }
      sort: "priority:asc"
    ) {
      data {
        ...PartnerEntity
      }
    }
    notFeaturedPartners: partners(
      locale: $locale
      pagination: { limit: 100 }
      filters: { featured: { eq: false } }
      sort: "priority:asc"
    ) {
      data {
        ...PartnerEntity
      }
    }
  }
  ${PartnerEntityFragmentDoc}
`
export const HomePageDocument = gql`
  query HomePage($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
      data {
        attributes {
          faqSection {
            id
            title
            redirectTo {
              data {
                ...PageWithBaseFieldsEntity
              }
            }
            faqs(pagination: { limit: 100 }) {
              id
              question
              answer
            }
            ctas(pagination: { limit: 100 }) {
              id
              title
              ctaRedirectTo {
                data {
                  ...PageWithBaseFieldsEntity
                }
              }
            }
          }
          registrationInfoSection {
            id
            title
            description
            redirectTo {
              data {
                ...PageWithBaseFieldsEntity
              }
            }
            registrationBenefits {
              id
              benefit
            }
          }
          newsSection {
            id
            title
            redirectTo {
              data {
                ...PageWithBaseFieldsEntity
              }
            }
          }
          mapSection {
            id
            title
            branches {
              branch {
                data {
                  ...BranchCardEntity
                }
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
              }
            }
          }
          seo {
            ...Seo
          }
        }
      }
    }
    promotedNews: notices(
      locale: $locale
      sort: "publishedAt:desc"
      filters: { promoted: { eq: true } }
    ) {
      data {
        ...NoticeListingEntity
      }
    }
    promotedEvents: events(
      locale: $locale
      sort: "dateFrom:asc"
      filters: { promoted: { eq: true } }
    ) {
      data {
        ...EventCardEntity
      }
    }
    latestNotices: notices(
      locale: $locale
      pagination: { limit: 4, start: 0 }
      sort: "publishedAt:desc"
    ) {
      data {
        ...NoticeListingEntity
      }
    }
    bookTags(pagination: { limit: 100 }) {
      data {
        ...BookTagEntity
      }
    }
  }
  ${PageWithBaseFieldsEntityFragmentDoc}
  ${BranchCardEntityFragmentDoc}
  ${SeoFragmentDoc}
  ${NoticeListingEntityFragmentDoc}
  ${EventCardEntityFragmentDoc}
  ${BookTagEntityFragmentDoc}
`
export const LatestNewsDocument = gql`
  query LatestNews($locale: I18NLocaleCode!) {
    pages(
      filters: { layout: { eq: "news" } }
      locale: $locale
      pagination: { start: 0, limit: 4 }
      sort: "publishedAt:desc"
    ) {
      data {
        ...PageEntity
      }
    }
  }
  ${PageEntityFragmentDoc}
`
export const GeneralDocument = gql`
  query General($eventsFrom: DateTime!, $locale: I18NLocaleCode!) {
    menus(locale: $locale, sort: ["order:asc"]) {
      data {
        ...MenuEntity
      }
    }
    upcomingEvents: events(
      locale: $locale
      sort: "dateFrom:asc"
      pagination: { start: 0, limit: 4 }
      filters: { dateTo: { gte: $eventsFrom } }
    ) {
      data {
        ...EventCardEntity
      }
    }
    footer(locale: $locale) {
      data {
        ...FooterEntity
      }
    }
    general(locale: $locale) {
      data {
        ...GeneralEntity
      }
    }
  }
  ${MenuEntityFragmentDoc}
  ${EventCardEntityFragmentDoc}
  ${FooterEntityFragmentDoc}
  ${GeneralEntityFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    BasicDocumentBySlug(
      variables: BasicDocumentBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BasicDocumentBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BasicDocumentBySlugQuery>(BasicDocumentBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BasicDocumentBySlug',
        'query'
      )
    },
    FileCategories(
      variables?: FileCategoriesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<FileCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FileCategoriesQuery>(FileCategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FileCategories',
        'query'
      )
    },
    BlogPostStaticPaths(
      variables: BlogPostStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BlogPostStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostStaticPathsQuery>(BlogPostStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostStaticPaths',
        'query'
      )
    },
    BlogPostBySlug(
      variables: BlogPostBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BlogPostBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostBySlugQuery>(BlogPostBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostBySlug',
        'query'
      )
    },
    BlogPosts(
      variables: BlogPostsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BlogPostsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsQuery>(BlogPostsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPosts',
        'query'
      )
    },
    BranchStaticPaths(
      variables: BranchStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BranchStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BranchStaticPathsQuery>(BranchStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BranchStaticPaths',
        'query'
      )
    },
    BranchBySlug(
      variables: BranchBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BranchBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BranchBySlugQuery>(BranchBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BranchBySlug',
        'query'
      )
    },
    DisclosureBySlug(
      variables: DisclosureBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DisclosureBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DisclosureBySlugQuery>(DisclosureBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DisclosureBySlug',
        'query'
      )
    },
    DocumentCategories(
      variables?: DocumentCategoriesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DocumentCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DocumentCategoriesQuery>(DocumentCategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DocumentCategories',
        'query'
      )
    },
    DocumentBySlug(
      variables: DocumentBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DocumentBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DocumentBySlugQuery>(DocumentBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DocumentBySlug',
        'query'
      )
    },
    EventProperties(
      variables: EventPropertiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<EventPropertiesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventPropertiesQuery>(EventPropertiesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventProperties',
        'query'
      )
    },
    EventBySlug(
      variables: EventBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<EventBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventBySlugQuery>(EventBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventBySlug',
        'query'
      )
    },
    EventStaticPaths(
      variables: EventStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<EventStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventStaticPathsQuery>(EventStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EventStaticPaths',
        'query'
      )
    },
    NoticesStaticPaths(
      variables: NoticesStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<NoticesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticesStaticPathsQuery>(NoticesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'NoticesStaticPaths',
        'query'
      )
    },
    Notices(
      variables: NoticesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<NoticesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticesQuery>(NoticesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Notices',
        'query'
      )
    },
    NoticeBySlug(
      variables: NoticeBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<NoticeBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NoticeBySlugQuery>(NoticeBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'NoticeBySlug',
        'query'
      )
    },
    PagesStaticPaths(
      variables?: PagesStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PagesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PagesStaticPaths',
        'query'
      )
    },
    PageById(
      variables: PageByIdQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageByIdQuery>(PageByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PageById',
        'query'
      )
    },
    SortedPartners(
      variables: SortedPartnersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SortedPartnersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SortedPartnersQuery>(SortedPartnersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SortedPartners',
        'query'
      )
    },
    HomePage(
      variables: HomePageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<HomePageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomePageQuery>(HomePageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'HomePage',
        'query'
      )
    },
    LatestNews(
      variables: LatestNewsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<LatestNewsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestNewsQuery>(LatestNewsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'LatestNews',
        'query'
      )
    },
    General(
      variables: GeneralQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GeneralQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GeneralQuery>(GeneralDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'General',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
