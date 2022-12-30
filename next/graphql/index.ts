import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BasicDocumentMetadataDynamicZoneInput: any;
  BlogPostSectionsDynamicZoneInput: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  PageSectionsDynamicZoneInput: any;
  /** A time string with format HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BasicDocument = {
  __typename?: 'BasicDocument';
  attachment?: Maybe<UploadFileEntityResponse>;
  author?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date_added?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  file_category?: Maybe<FileCategoryEntityResponse>;
  link?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<BasicDocumentMetadataDynamicZone>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BasicDocumentEntity = {
  __typename?: 'BasicDocumentEntity';
  attributes?: Maybe<BasicDocument>;
  id?: Maybe<Scalars['ID']>;
};

export type BasicDocumentEntityResponse = {
  __typename?: 'BasicDocumentEntityResponse';
  data?: Maybe<BasicDocumentEntity>;
};

export type BasicDocumentEntityResponseCollection = {
  __typename?: 'BasicDocumentEntityResponseCollection';
  data: Array<BasicDocumentEntity>;
  meta: ResponseCollectionMeta;
};

export type BasicDocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_added?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  file_category?: InputMaybe<FileCategoryFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<BasicDocumentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BasicDocumentFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BasicDocumentInput = {
  attachment?: InputMaybe<Scalars['ID']>;
  author?: InputMaybe<Scalars['String']>;
  date_added?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  file_category?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<Scalars['BasicDocumentMetadataDynamicZoneInput']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BasicDocumentMetadataDynamicZone = ComponentMetadataFaktury | ComponentMetadataMetadata | ComponentMetadataObchodnaVerejnaSutaz | ComponentMetadataObjednavky | ComponentMetadataVerejneObstaravanie | ComponentMetadataZmluvy | Error;

export type BasicDocumentRelationResponseCollection = {
  __typename?: 'BasicDocumentRelationResponseCollection';
  data: Array<BasicDocumentEntity>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  Seo?: Maybe<ComponentSeoSeo>;
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date_added?: Maybe<Scalars['Date']>;
  parentPage?: Maybe<PageEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlogPostEntity = {
  __typename?: 'BlogPostEntity';
  attributes?: Maybe<BlogPost>;
  id?: Maybe<Scalars['ID']>;
};

export type BlogPostEntityResponse = {
  __typename?: 'BlogPostEntityResponse';
  data?: Maybe<BlogPostEntity>;
};

export type BlogPostEntityResponseCollection = {
  __typename?: 'BlogPostEntityResponseCollection';
  data: Array<BlogPostEntity>;
  meta: ResponseCollectionMeta;
};

export type BlogPostFiltersInput = {
  Seo?: InputMaybe<ComponentSeoSeoFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_added?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BlogPostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  parentPage?: InputMaybe<PageFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BlogPostInput = {
  Seo?: InputMaybe<ComponentSeoSeoInput>;
  coverMedia?: InputMaybe<Scalars['ID']>;
  date_added?: InputMaybe<Scalars['Date']>;
  parentPage?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BlogPostRelationResponseCollection = {
  __typename?: 'BlogPostRelationResponseCollection';
  data: Array<BlogPostEntity>;
};

export type BlogPostSectionsDynamicZone = ComponentSectionsAccordion | ComponentSectionsColumnedText | ComponentSectionsCta | ComponentSectionsDivider | ComponentSectionsDocuments | ComponentSectionsEventDetails | ComponentSectionsExternalLinks | ComponentSectionsFaq | ComponentSectionsFlatText | ComponentSectionsFlatTextCenter | ComponentSectionsForm | ComponentSectionsGallery | ComponentSectionsLocalityDetails | ComponentSectionsSiteUsefullness | ComponentSectionsSubListing | ComponentSectionsSubpages | ComponentSectionsTable | ComponentSectionsVideo | Error;

export type BookTag = {
  __typename?: 'BookTag';
  createdAt?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookTagEntity = {
  __typename?: 'BookTagEntity';
  attributes?: Maybe<BookTag>;
  id?: Maybe<Scalars['ID']>;
};

export type BookTagEntityResponse = {
  __typename?: 'BookTagEntityResponse';
  data?: Maybe<BookTagEntity>;
};

export type BookTagEntityResponseCollection = {
  __typename?: 'BookTagEntityResponseCollection';
  data: Array<BookTagEntity>;
  meta: ResponseCollectionMeta;
};

export type BookTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BookTagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BookTagFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BookTagInput = {
  displayName?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CategoryRelationResponseCollection>;
  pageLink?: Maybe<ComponentBlocksPageLink>;
  pages?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  parentCategory?: Maybe<CategoryEntityResponse>;
  priority?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  subCategories?: Maybe<CategoryRelationResponseCollection>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CategoryPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CategorySubCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  pageLink?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pages?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  parentCategory?: InputMaybe<CategoryFiltersInput>;
  priority?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  subCategories?: InputMaybe<CategoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  pageLink?: InputMaybe<ComponentBlocksPageLinkInput>;
  pages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  parentCategory?: InputMaybe<Scalars['ID']>;
  priority?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  subCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  data: Array<CategoryEntity>;
};

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText';
  category?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentAccordionItemsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  content?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>;
};

export type ComponentAccordionItemsForm = {
  __typename?: 'ComponentAccordionItemsForm';
  category?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type?: Maybe<Enum_Componentaccordionitemsform_Type>;
};

export type ComponentAccordionItemsFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFormFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsFormFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFormFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentAccordionItemsTableRow = {
  __typename?: 'ComponentAccordionItemsTableRow';
  accordionCategory?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  tableCategory?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueAlign?: Maybe<Enum_Componentaccordionitemstablerow_Valuealign>;
};

export type ComponentAccordionItemsTableRowFiltersInput = {
  accordionCategory?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsTableRowFiltersInput>>>;
  tableCategory?: InputMaybe<StringFilterInput>;
  value?: InputMaybe<StringFilterInput>;
  valueAlign?: InputMaybe<StringFilterInput>;
};

export type ComponentAddressAddress = {
  __typename?: 'ComponentAddressAddress';
  id: Scalars['ID'];
  navigateTo?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
};

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
};

export type ComponentBlocksExternalLink = {
  __typename?: 'ComponentBlocksExternalLink';
  category?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksExternalLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksExternalLinkFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksExternalLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksExternalLinkFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink';
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksPageLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksPageLinkInput = {
  id?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSubpageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksSubpageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSubpageFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksTableRow = {
  __typename?: 'ComponentBlocksTableRow';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueAlign?: Maybe<Enum_Componentblockstablerow_Valuealign>;
};

export type ComponentFooterFooterColumn = {
  __typename?: 'ComponentFooterFooterColumn';
  footerLink?: Maybe<Array<Maybe<ComponentFooterFooterLink>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentFooterFooterColumnFooterLinkArgs = {
  filters?: InputMaybe<ComponentFooterFooterLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentFooterFooterColumnFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnFiltersInput>>>;
  footerLink?: InputMaybe<ComponentFooterFooterLinkFiltersInput>;
  not?: InputMaybe<ComponentFooterFooterColumnFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentFooterFooterColumnInput = {
  footerLink?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentFooterFooterLink = {
  __typename?: 'ComponentFooterFooterLink';
  id: Scalars['ID'];
  otherSite?: Maybe<Scalars['String']>;
  redirectTo?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentFooterFooterLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkFiltersInput>>>;
  not?: InputMaybe<ComponentFooterFooterLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentFooterFooterLinkFiltersInput>>>;
  otherSite?: InputMaybe<StringFilterInput>;
  redirectTo?: InputMaybe<PageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentFooterFooterLinkInput = {
  id?: InputMaybe<Scalars['ID']>;
  otherSite?: InputMaybe<Scalars['String']>;
  redirectTo?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentGuestsGuest = {
  __typename?: 'ComponentGuestsGuest';
  avatar?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};

export type ComponentGuestsGuestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGuestsGuestFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestFiltersInput>>>;
  surname?: InputMaybe<StringFilterInput>;
};

export type ComponentGuestsGuestInput = {
  avatar?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type ComponentHomepageBenefits = {
  __typename?: 'ComponentHomepageBenefits';
  benefit?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentHomepageBenefitsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>;
  benefit?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentHomepageBenefitsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsFiltersInput>>>;
};

export type ComponentHomepageBenefitsInput = {
  benefit?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentHomepageCta = {
  __typename?: 'ComponentHomepageCta';
  ctaRedirectTo?: Maybe<PageEntityResponse>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentHomepageCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>;
  ctaRedirectTo?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<ComponentHomepageCtaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentHomepageCtaInput = {
  ctaRedirectTo?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentHomepageFaqSection = {
  __typename?: 'ComponentHomepageFaqSection';
  ctas?: Maybe<Array<Maybe<ComponentHomepageCta>>>;
  faqs?: Maybe<Array<Maybe<ComponentHomepageFaqs>>>;
  id: Scalars['ID'];
  redirectTo?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentHomepageFaqSectionCtasArgs = {
  filters?: InputMaybe<ComponentHomepageCtaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentHomepageFaqSectionFaqsArgs = {
  filters?: InputMaybe<ComponentHomepageFaqsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentHomepageFaqSectionInput = {
  ctas?: InputMaybe<Array<InputMaybe<ComponentHomepageCtaInput>>>;
  faqs?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  redirectTo?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentHomepageFaqs = {
  __typename?: 'ComponentHomepageFaqs';
  answer?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  question?: Maybe<Scalars['String']>;
};

export type ComponentHomepageFaqsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>;
  answer?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentHomepageFaqsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageFaqsFiltersInput>>>;
  question?: InputMaybe<StringFilterInput>;
};

export type ComponentHomepageFaqsInput = {
  answer?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  question?: InputMaybe<Scalars['String']>;
};

export type ComponentHomepageNewsSection = {
  __typename?: 'ComponentHomepageNewsSection';
  id: Scalars['ID'];
  redirectTo?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentHomepageNewsSectionInput = {
  id?: InputMaybe<Scalars['ID']>;
  redirectTo?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentHomepageRegistrationInfo = {
  __typename?: 'ComponentHomepageRegistrationInfo';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  redirectTo?: Maybe<PageEntityResponse>;
  registrationBenefits?: Maybe<Array<Maybe<ComponentHomepageBenefits>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentHomepageRegistrationInfoRegistrationBenefitsArgs = {
  filters?: InputMaybe<ComponentHomepageBenefitsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentHomepageRegistrationInfoInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  redirectTo?: InputMaybe<Scalars['ID']>;
  registrationBenefits?: InputMaybe<Array<InputMaybe<ComponentHomepageBenefitsInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentLocalityPartsGalleryParts = {
  __typename?: 'ComponentLocalityPartsGalleryParts';
  Description?: Maybe<Scalars['String']>;
  Photo?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentLocalityPartsGalleryPartsFiltersInput = {
  Description?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>;
  not?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>>>;
};

export type ComponentLocalityPartsLocalitySection = {
  __typename?: 'ComponentLocalityPartsLocalitySection';
  id: Scalars['ID'];
  isMainSection?: Maybe<Scalars['Boolean']>;
  localitySectionDescription?: Maybe<Scalars['String']>;
  localitySectionEmail?: Maybe<Scalars['String']>;
  localitySectionPhone?: Maybe<Scalars['String']>;
  localitySectionTitle?: Maybe<Scalars['String']>;
  openingHoursFridayFrom?: Maybe<Scalars['Time']>;
  openingHoursFridayTo?: Maybe<Scalars['Time']>;
  openingHoursMondayFrom?: Maybe<Scalars['Time']>;
  openingHoursMondayTo?: Maybe<Scalars['Time']>;
  openingHoursSaturdayFrom?: Maybe<Scalars['Time']>;
  openingHoursSaturdayTo?: Maybe<Scalars['Time']>;
  openingHoursSundayFrom?: Maybe<Scalars['Time']>;
  openingHoursSundayTo?: Maybe<Scalars['Time']>;
  openingHoursThursdayFrom?: Maybe<Scalars['Time']>;
  openingHoursThursdayTo?: Maybe<Scalars['Time']>;
  openingHoursTuesdayFrom?: Maybe<Scalars['Time']>;
  openingHoursTuesdayTo?: Maybe<Scalars['Time']>;
  openingHoursWednesdayFrom?: Maybe<Scalars['Time']>;
  openingHoursWednesdayTo?: Maybe<Scalars['Time']>;
};

export type ComponentLocalityPartsLocalitySectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>>>;
  isMainSection?: InputMaybe<BooleanFilterInput>;
  localitySectionDescription?: InputMaybe<StringFilterInput>;
  localitySectionEmail?: InputMaybe<StringFilterInput>;
  localitySectionPhone?: InputMaybe<StringFilterInput>;
  localitySectionTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>;
  openingHoursFridayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursFridayTo?: InputMaybe<TimeFilterInput>;
  openingHoursMondayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursMondayTo?: InputMaybe<TimeFilterInput>;
  openingHoursSaturdayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursSaturdayTo?: InputMaybe<TimeFilterInput>;
  openingHoursSundayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursSundayTo?: InputMaybe<TimeFilterInput>;
  openingHoursThursdayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursThursdayTo?: InputMaybe<TimeFilterInput>;
  openingHoursTuesdayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursTuesdayTo?: InputMaybe<TimeFilterInput>;
  openingHoursWednesdayFrom?: InputMaybe<TimeFilterInput>;
  openingHoursWednesdayTo?: InputMaybe<TimeFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>>>;
};

export type ComponentLocalityPartsLocalityServices = {
  __typename?: 'ComponentLocalityPartsLocalityServices';
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
};

export type ComponentLocalityPartsLocalityServicesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>>>;
  not?: InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
};

export type ComponentMenuSectionLinks = {
  __typename?: 'ComponentMenuSectionLinks';
  id: Scalars['ID'];
  sectionLinkPage?: Maybe<PageEntityResponse>;
  sectionLinkTitle?: Maybe<Scalars['String']>;
};

export type ComponentMenuSectionLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksFiltersInput>>>;
  not?: InputMaybe<ComponentMenuSectionLinksFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksFiltersInput>>>;
  sectionLinkPage?: InputMaybe<PageFiltersInput>;
  sectionLinkTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentMenuSectionLinksInput = {
  id?: InputMaybe<Scalars['ID']>;
  sectionLinkPage?: InputMaybe<Scalars['ID']>;
  sectionLinkTitle?: InputMaybe<Scalars['String']>;
};

export type ComponentMenuSections = {
  __typename?: 'ComponentMenuSections';
  id: Scalars['ID'];
  sectionColumnSpan?: Maybe<Scalars['Int']>;
  sectionLinks?: Maybe<Array<Maybe<ComponentMenuSectionLinks>>>;
  sectionPage?: Maybe<PageEntityResponse>;
  sectionTitle?: Maybe<Scalars['String']>;
};


export type ComponentMenuSectionsSectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSectionLinksFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentMenuSectionsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsFiltersInput>>>;
  not?: InputMaybe<ComponentMenuSectionsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsFiltersInput>>>;
  sectionColumnSpan?: InputMaybe<IntFilterInput>;
  sectionLinks?: InputMaybe<ComponentMenuSectionLinksFiltersInput>;
  sectionPage?: InputMaybe<PageFiltersInput>;
  sectionTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentMenuSectionsInput = {
  id?: InputMaybe<Scalars['ID']>;
  sectionColumnSpan?: InputMaybe<Scalars['Int']>;
  sectionLinks?: InputMaybe<Array<InputMaybe<ComponentMenuSectionLinksInput>>>;
  sectionPage?: InputMaybe<Scalars['ID']>;
  sectionTitle?: InputMaybe<Scalars['String']>;
};

export type ComponentMenuSubsection = {
  __typename?: 'ComponentMenuSubsection';
  columnSpan?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  subsectionLinks?: Maybe<Array<Maybe<ComponentMenuSubsectionLinks>>>;
  subsectionTitle?: Maybe<Scalars['String']>;
};


export type ComponentMenuSubsectionSubsectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentMenuSubsectionLinks = {
  __typename?: 'ComponentMenuSubsectionLinks';
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
  subsectionLinkTitle?: Maybe<Scalars['String']>;
};

export type ComponentMenuSubsectionLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>;
  not?: InputMaybe<ComponentMenuSubsectionLinksFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMenuSubsectionLinksFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  subsectionLinkTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentMetadataFaktury = {
  __typename?: 'ComponentMetadataFaktury';
  attachment?: Maybe<UploadFileEntityResponse>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ComponentMetadataMetadata = {
  __typename?: 'ComponentMetadataMetadata';
  amount?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  grant_name?: Maybe<Scalars['String']>;
  grant_number?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type ComponentMetadataObchodnaVerejnaSutaz = {
  __typename?: 'ComponentMetadataObchodnaVerejnaSutaz';
  amount?: Maybe<Scalars['String']>;
  attachment?: Maybe<UploadFileEntityResponse>;
  date_added?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type ComponentMetadataObjednavky = {
  __typename?: 'ComponentMetadataObjednavky';
  attachment?: Maybe<UploadFileEntityResponse>;
  date_added?: Maybe<Scalars['Date']>;
  date_period?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentMetadataVerejneObstaravanie = {
  __typename?: 'ComponentMetadataVerejneObstaravanie';
  amount?: Maybe<Scalars['String']>;
  attachment?: Maybe<UploadFileEntityResponse>;
  date_added?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type ComponentMetadataZmluvy = {
  __typename?: 'ComponentMetadataZmluvy';
  amount?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  supplier?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion';
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>;
  forms?: Maybe<Array<Maybe<ComponentAccordionItemsForm>>>;
  id: Scalars['ID'];
  tableRows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsAccordionFlatTextArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsAccordionFormsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsAccordionTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsColumnedText = {
  __typename?: 'ComponentSectionsColumnedText';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsCta = {
  __typename?: 'ComponentSectionsCta';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider';
  id: Scalars['ID'];
  shown?: Maybe<Scalars['Boolean']>;
};

export type ComponentSectionsDocuments = {
  __typename?: 'ComponentSectionsDocuments';
  basicDocuments?: Maybe<BasicDocumentRelationResponseCollection>;
  id: Scalars['ID'];
  moreLink?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsDocumentsBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsDocumentsMoreLinkArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsEventDetails = {
  __typename?: 'ComponentSectionsEventDetails';
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  eventCategory?: Maybe<EventCategoryEntityResponse>;
  eventCoverImage?: Maybe<UploadFileEntityResponse>;
  eventDescription?: Maybe<Scalars['String']>;
  eventLocality?: Maybe<EventLocalityEntityResponse>;
  eventTags?: Maybe<EventTagRelationResponseCollection>;
  eventTitle?: Maybe<Scalars['String']>;
  guests?: Maybe<Array<Maybe<ComponentGuestsGuest>>>;
  id: Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
};


export type ComponentSectionsEventDetailsEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsEventDetailsGuestsArgs = {
  filters?: InputMaybe<ComponentGuestsGuestFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsExternalLinks = {
  __typename?: 'ComponentSectionsExternalLinks';
  descriptions?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>;
  externalLinks?: Maybe<Array<Maybe<ComponentBlocksExternalLink>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsExternalLinksDescriptionsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsExternalLinksExternalLinksArgs = {
  filters?: InputMaybe<ComponentBlocksExternalLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsFaq = {
  __typename?: 'ComponentSectionsFaq';
  id: Scalars['ID'];
  questions?: Maybe<Array<Maybe<ComponentBlocksAccordionItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsFaqQuestionsArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsFlatText = {
  __typename?: 'ComponentSectionsFlatText';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<UploadFileEntityResponse>;
};

export type ComponentSectionsFlatTextCenter = {
  __typename?: 'ComponentSectionsFlatTextCenter';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
};

export type ComponentSectionsForm = {
  __typename?: 'ComponentSectionsForm';
  id: Scalars['ID'];
  type?: Maybe<Enum_Componentsectionsform_Type>;
};

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery';
  Gallery?: Maybe<Array<Maybe<ComponentLocalityPartsGalleryParts>>>;
  id: Scalars['ID'];
};


export type ComponentSectionsGalleryGalleryArgs = {
  filters?: InputMaybe<ComponentLocalityPartsGalleryPartsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsLocalityDetails = {
  __typename?: 'ComponentSectionsLocalityDetails';
  displayOnHomePage?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  isMainLocality?: Maybe<Scalars['Boolean']>;
  localityAddress?: Maybe<ComponentAddressAddress>;
  localityCoverImage?: Maybe<UploadFileEntityResponse>;
  localityDescription?: Maybe<Scalars['String']>;
  localityLatitude?: Maybe<Scalars['Float']>;
  localityLongitude?: Maybe<Scalars['Float']>;
  localityMap?: Maybe<UploadFileEntityResponse>;
  localitySections?: Maybe<Array<Maybe<ComponentLocalityPartsLocalitySection>>>;
  localityServices?: Maybe<Array<Maybe<ComponentLocalityPartsLocalityServices>>>;
  localityTitle?: Maybe<Scalars['String']>;
};


export type ComponentSectionsLocalityDetailsLocalitySectionsArgs = {
  filters?: InputMaybe<ComponentLocalityPartsLocalitySectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsLocalityDetailsLocalityServicesArgs = {
  filters?: InputMaybe<ComponentLocalityPartsLocalityServicesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsParnters = {
  __typename?: 'ComponentSectionsParnters';
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsSiteUsefullness = {
  __typename?: 'ComponentSectionsSiteUsefullness';
  id: Scalars['ID'];
  thankYouMessage?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsSubListing = {
  __typename?: 'ComponentSectionsSubListing';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentSectionsSubpages = {
  __typename?: 'ComponentSectionsSubpages';
  id: Scalars['ID'];
  subpages?: Maybe<Array<Maybe<ComponentBlocksSubpage>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsSubpagesSubpagesArgs = {
  filters?: InputMaybe<ComponentBlocksSubpageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsTable = {
  __typename?: 'ComponentSectionsTable';
  id: Scalars['ID'];
  primaryTitle?: Maybe<Scalars['String']>;
  rows?: Maybe<Array<Maybe<ComponentAccordionItemsTableRow>>>;
  secondaryTitle?: Maybe<Scalars['String']>;
};


export type ComponentSectionsTableRowsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsTableRowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsVideo = {
  __typename?: 'ComponentSectionsVideo';
  id: Scalars['ID'];
  media?: Maybe<UploadFileEntityResponse>;
  youtube_url?: Maybe<Scalars['String']>;
};

export type ComponentSeoSeo = {
  __typename?: 'ComponentSeoSeo';
  canonicalURL?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  keywords?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaRobots?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  metaViewport?: Maybe<Scalars['String']>;
};

export type ComponentSeoSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSeoSeoFiltersInput>>>;
  canonicalURL?: InputMaybe<StringFilterInput>;
  keywords?: InputMaybe<StringFilterInput>;
  metaDescription?: InputMaybe<StringFilterInput>;
  metaRobots?: InputMaybe<StringFilterInput>;
  metaTitle?: InputMaybe<StringFilterInput>;
  metaViewport?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSeoSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSeoSeoFiltersInput>>>;
};

export type ComponentSeoSeoInput = {
  canonicalURL?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  keywords?: InputMaybe<Scalars['String']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaRobots?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  metaViewport?: InputMaybe<Scalars['String']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  contains?: InputMaybe<Scalars['Date']>;
  containsi?: InputMaybe<Scalars['Date']>;
  endsWith?: InputMaybe<Scalars['Date']>;
  eq?: InputMaybe<Scalars['Date']>;
  eqi?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']>;
  notContainsi?: InputMaybe<Scalars['Date']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  startsWith?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

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
  TabletyACitacky = 'tablety_a_citacky'
}

export enum Enum_Componentaccordionitemstablerow_Valuealign {
  Center = 'center',
  Start = 'start'
}

export enum Enum_Componentblockstablerow_Valuealign {
  Center = 'center',
  Start = 'start'
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
  TabletyACitacky = 'tablety_a_citacky'
}

export enum Enum_Page_Layout {
  BlogPosts = 'blog_posts',
  BookNews = 'book_news',
  ContentWithSidebar = 'content_with_sidebar',
  Documents = 'documents',
  Event = 'event',
  EventsListing = 'eventsListing',
  FullContent = 'full_content',
  Listing = 'listing',
  LocalitiesListing = 'localitiesListing',
  Locality = 'locality',
  News = 'news',
  NewsListing = 'newsListing',
  Partners = 'partners',
  Premises = 'premises',
  Sublisting = 'sublisting'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  Seo?: Maybe<ComponentSeoSeo>;
  coverImage?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  eventCategory?: Maybe<EventCategoryEntityResponse>;
  eventLocality?: Maybe<EventLocalityEntityResponse>;
  eventTags?: Maybe<EventTagRelationResponseCollection>;
  guests?: Maybe<Array<Maybe<ComponentGuestsGuest>>>;
  listingImage?: Maybe<UploadFileEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventRelationResponseCollection>;
  price?: Maybe<Scalars['Float']>;
  promoted?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  showForm?: Maybe<Scalars['Boolean']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventGuestsArgs = {
  filters?: InputMaybe<ComponentGuestsGuestFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventLocalizationsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventCategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventCategoryLocalizationsArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventCategoryEntity = {
  __typename?: 'EventCategoryEntity';
  attributes?: Maybe<EventCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type EventCategoryEntityResponse = {
  __typename?: 'EventCategoryEntityResponse';
  data?: Maybe<EventCategoryEntity>;
};

export type EventCategoryEntityResponseCollection = {
  __typename?: 'EventCategoryEntityResponseCollection';
  data: Array<EventCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type EventCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventCategoryFiltersInput>;
  not?: InputMaybe<EventCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventCategoryInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EventCategoryRelationResponseCollection = {
  __typename?: 'EventCategoryRelationResponseCollection';
  data: Array<EventCategoryEntity>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars['ID']>;
};

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse';
  data?: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  __typename?: 'EventEntityResponseCollection';
  data: Array<EventEntity>;
  meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  Seo?: InputMaybe<ComponentSeoSeoFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateFrom?: InputMaybe<DateTimeFilterInput>;
  dateTo?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  eventCategory?: InputMaybe<EventCategoryFiltersInput>;
  eventLocality?: InputMaybe<EventLocalityFiltersInput>;
  eventTags?: InputMaybe<EventTagFiltersInput>;
  guests?: InputMaybe<ComponentGuestsGuestFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventFiltersInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  promoted?: InputMaybe<BooleanFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  showForm?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventInput = {
  Seo?: InputMaybe<ComponentSeoSeoInput>;
  coverImage?: InputMaybe<Scalars['ID']>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  eventCategory?: InputMaybe<Scalars['ID']>;
  eventLocality?: InputMaybe<Scalars['ID']>;
  eventTags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  guests?: InputMaybe<Array<InputMaybe<ComponentGuestsGuestInput>>>;
  listingImage?: InputMaybe<Scalars['ID']>;
  price?: InputMaybe<Scalars['Float']>;
  promoted?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  showForm?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EventLocality = {
  __typename?: 'EventLocality';
  createdAt?: Maybe<Scalars['DateTime']>;
  eventAddress?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventLocalityRelationResponseCollection>;
  navigateTo?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventLocalityLocalizationsArgs = {
  filters?: InputMaybe<EventLocalityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventLocalityEntity = {
  __typename?: 'EventLocalityEntity';
  attributes?: Maybe<EventLocality>;
  id?: Maybe<Scalars['ID']>;
};

export type EventLocalityEntityResponse = {
  __typename?: 'EventLocalityEntityResponse';
  data?: Maybe<EventLocalityEntity>;
};

export type EventLocalityEntityResponseCollection = {
  __typename?: 'EventLocalityEntityResponseCollection';
  data: Array<EventLocalityEntity>;
  meta: ResponseCollectionMeta;
};

export type EventLocalityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventLocalityFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  eventAddress?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventLocalityFiltersInput>;
  navigateTo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventLocalityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventLocalityFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventLocalityInput = {
  eventAddress?: InputMaybe<Scalars['String']>;
  navigateTo?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EventLocalityRelationResponseCollection = {
  __typename?: 'EventLocalityRelationResponseCollection';
  data: Array<EventLocalityEntity>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type EventSubscription = {
  __typename?: 'EventSubscription';
  createdAt?: Maybe<Scalars['DateTime']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userMail?: Maybe<Scalars['String']>;
};

export type EventSubscriptionEntity = {
  __typename?: 'EventSubscriptionEntity';
  attributes?: Maybe<EventSubscription>;
  id?: Maybe<Scalars['ID']>;
};

export type EventSubscriptionEntityResponse = {
  __typename?: 'EventSubscriptionEntityResponse';
  data?: Maybe<EventSubscriptionEntity>;
};

export type EventSubscriptionEntityResponseCollection = {
  __typename?: 'EventSubscriptionEntityResponseCollection';
  data: Array<EventSubscriptionEntity>;
  meta: ResponseCollectionMeta;
};

export type EventSubscriptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventSubscriptionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EventSubscriptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventSubscriptionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  refreshToken?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  userMail?: InputMaybe<StringFilterInput>;
};

export type EventSubscriptionInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  userMail?: InputMaybe<Scalars['String']>;
};

export type EventTag = {
  __typename?: 'EventTag';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventTagRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventTagLocalizationsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventTagEntity = {
  __typename?: 'EventTagEntity';
  attributes?: Maybe<EventTag>;
  id?: Maybe<Scalars['ID']>;
};

export type EventTagEntityResponse = {
  __typename?: 'EventTagEntityResponse';
  data?: Maybe<EventTagEntity>;
};

export type EventTagEntityResponseCollection = {
  __typename?: 'EventTagEntityResponseCollection';
  data: Array<EventTagEntity>;
  meta: ResponseCollectionMeta;
};

export type EventTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventTagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventTagFiltersInput>;
  not?: InputMaybe<EventTagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventTagFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventTagInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EventTagRelationResponseCollection = {
  __typename?: 'EventTagRelationResponseCollection';
  data: Array<EventTagEntity>;
};

export type FileCategory = {
  __typename?: 'FileCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  page?: Maybe<PageEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type FileCategoryEntity = {
  __typename?: 'FileCategoryEntity';
  attributes?: Maybe<FileCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type FileCategoryEntityResponse = {
  __typename?: 'FileCategoryEntityResponse';
  data?: Maybe<FileCategoryEntity>;
};

export type FileCategoryEntityResponseCollection = {
  __typename?: 'FileCategoryEntityResponseCollection';
  data: Array<FileCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type FileCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<FileCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FileCategoryFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FileCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type Footer = {
  __typename?: 'Footer';
  copyrightText?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  footerColumns?: Maybe<Array<Maybe<ComponentFooterFooterColumn>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<FooterRelationResponseCollection>;
  privacyLink?: Maybe<PageEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  siteMapLink?: Maybe<PageEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type FooterFooterColumnsArgs = {
  filters?: InputMaybe<ComponentFooterFooterColumnFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type FooterLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type FooterEntity = {
  __typename?: 'FooterEntity';
  attributes?: Maybe<Footer>;
  id?: Maybe<Scalars['ID']>;
};

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse';
  data?: Maybe<FooterEntity>;
};

export type FooterInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  footerColumns?: InputMaybe<Array<InputMaybe<ComponentFooterFooterColumnInput>>>;
  privacyLink?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  siteMapLink?: InputMaybe<Scalars['ID']>;
};

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection';
  data: Array<FooterEntity>;
};

export type GenericMorph = BasicDocument | BlogPost | BookTag | Category | ComponentAccordionItemsFlatText | ComponentAccordionItemsForm | ComponentAccordionItemsTableRow | ComponentAddressAddress | ComponentBlocksAccordionItem | ComponentBlocksExternalLink | ComponentBlocksPageLink | ComponentBlocksSubpage | ComponentBlocksTableRow | ComponentFooterFooterColumn | ComponentFooterFooterLink | ComponentGuestsGuest | ComponentHomepageBenefits | ComponentHomepageCta | ComponentHomepageFaqSection | ComponentHomepageFaqs | ComponentHomepageNewsSection | ComponentHomepageRegistrationInfo | ComponentLocalityPartsGalleryParts | ComponentLocalityPartsLocalitySection | ComponentLocalityPartsLocalityServices | ComponentMenuSectionLinks | ComponentMenuSections | ComponentMenuSubsection | ComponentMenuSubsectionLinks | ComponentMetadataFaktury | ComponentMetadataMetadata | ComponentMetadataObchodnaVerejnaSutaz | ComponentMetadataObjednavky | ComponentMetadataVerejneObstaravanie | ComponentMetadataZmluvy | ComponentSectionsAccordion | ComponentSectionsColumnedText | ComponentSectionsCta | ComponentSectionsDivider | ComponentSectionsDocuments | ComponentSectionsEventDetails | ComponentSectionsExternalLinks | ComponentSectionsFaq | ComponentSectionsFlatText | ComponentSectionsFlatTextCenter | ComponentSectionsForm | ComponentSectionsGallery | ComponentSectionsLocalityDetails | ComponentSectionsParnters | ComponentSectionsSiteUsefullness | ComponentSectionsSubListing | ComponentSectionsSubpages | ComponentSectionsTable | ComponentSectionsVideo | ComponentSeoSeo | Event | EventCategory | EventLocality | EventSubscription | EventTag | FileCategory | Footer | HomePage | I18NLocale | Menu | Page | Partner | Premise | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type HomePage = {
  __typename?: 'HomePage';
  Seo?: Maybe<ComponentSeoSeo>;
  createdAt?: Maybe<Scalars['DateTime']>;
  faqSection?: Maybe<ComponentHomepageFaqSection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<HomePageRelationResponseCollection>;
  newsSection?: Maybe<ComponentHomepageNewsSection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  registrationInfoSection?: Maybe<ComponentHomepageRegistrationInfo>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type HomePageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type HomePageEntity = {
  __typename?: 'HomePageEntity';
  attributes?: Maybe<HomePage>;
  id?: Maybe<Scalars['ID']>;
};

export type HomePageEntityResponse = {
  __typename?: 'HomePageEntityResponse';
  data?: Maybe<HomePageEntity>;
};

export type HomePageInput = {
  Seo?: InputMaybe<ComponentSeoSeoInput>;
  faqSection?: InputMaybe<ComponentHomepageFaqSectionInput>;
  newsSection?: InputMaybe<ComponentHomepageNewsSectionInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  registrationInfoSection?: InputMaybe<ComponentHomepageRegistrationInfoInput>;
};

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection';
  data: Array<HomePageEntity>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Menu = {
  __typename?: 'Menu';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<MenuRelationResponseCollection>;
  menuSections?: Maybe<Array<Maybe<ComponentMenuSections>>>;
  menuSlug?: Maybe<Scalars['String']>;
  menuTitle?: Maybe<Scalars['String']>;
  menuTotalColumns?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MenuLocalizationsArgs = {
  filters?: InputMaybe<MenuFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MenuMenuSectionsArgs = {
  filters?: InputMaybe<ComponentMenuSectionsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MenuEntity = {
  __typename?: 'MenuEntity';
  attributes?: Maybe<Menu>;
  id?: Maybe<Scalars['ID']>;
};

export type MenuEntityResponse = {
  __typename?: 'MenuEntityResponse';
  data?: Maybe<MenuEntity>;
};

export type MenuEntityResponseCollection = {
  __typename?: 'MenuEntityResponseCollection';
  data: Array<MenuEntity>;
  meta: ResponseCollectionMeta;
};

export type MenuFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MenuFiltersInput>;
  menuSections?: InputMaybe<ComponentMenuSectionsFiltersInput>;
  menuSlug?: InputMaybe<StringFilterInput>;
  menuTitle?: InputMaybe<StringFilterInput>;
  menuTotalColumns?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<MenuFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MenuInput = {
  menuSections?: InputMaybe<Array<InputMaybe<ComponentMenuSectionsInput>>>;
  menuSlug?: InputMaybe<Scalars['String']>;
  menuTitle?: InputMaybe<Scalars['String']>;
  menuTotalColumns?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection';
  data: Array<MenuEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createBasicDocument?: Maybe<BasicDocumentEntityResponse>;
  createBlogPost?: Maybe<BlogPostEntityResponse>;
  createBookTag?: Maybe<BookTagEntityResponse>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createEventCategory?: Maybe<EventCategoryEntityResponse>;
  createEventCategoryLocalization?: Maybe<EventCategoryEntityResponse>;
  createEventLocality?: Maybe<EventLocalityEntityResponse>;
  createEventLocalityLocalization?: Maybe<EventLocalityEntityResponse>;
  createEventLocalization?: Maybe<EventEntityResponse>;
  createEventSubscription?: Maybe<EventSubscriptionEntityResponse>;
  createEventTag?: Maybe<EventTagEntityResponse>;
  createEventTagLocalization?: Maybe<EventTagEntityResponse>;
  createFileCategory?: Maybe<FileCategoryEntityResponse>;
  createFooterLocalization?: Maybe<FooterEntityResponse>;
  createHomePageLocalization?: Maybe<HomePageEntityResponse>;
  createMenu?: Maybe<MenuEntityResponse>;
  createMenuLocalization?: Maybe<MenuEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  createPageLocalization?: Maybe<PageEntityResponse>;
  createPartner?: Maybe<PartnerEntityResponse>;
  createPartnerLocalization?: Maybe<PartnerEntityResponse>;
  createPremise?: Maybe<PremiseEntityResponse>;
  createPremiseLocalization?: Maybe<PremiseEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteBasicDocument?: Maybe<BasicDocumentEntityResponse>;
  deleteBlogPost?: Maybe<BlogPostEntityResponse>;
  deleteBookTag?: Maybe<BookTagEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteEventCategory?: Maybe<EventCategoryEntityResponse>;
  deleteEventLocality?: Maybe<EventLocalityEntityResponse>;
  deleteEventSubscription?: Maybe<EventSubscriptionEntityResponse>;
  deleteEventTag?: Maybe<EventTagEntityResponse>;
  deleteFileCategory?: Maybe<FileCategoryEntityResponse>;
  deleteFooter?: Maybe<FooterEntityResponse>;
  deleteHomePage?: Maybe<HomePageEntityResponse>;
  deleteMenu?: Maybe<MenuEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePartner?: Maybe<PartnerEntityResponse>;
  deletePremise?: Maybe<PremiseEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateBasicDocument?: Maybe<BasicDocumentEntityResponse>;
  updateBlogPost?: Maybe<BlogPostEntityResponse>;
  updateBookTag?: Maybe<BookTagEntityResponse>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateEventCategory?: Maybe<EventCategoryEntityResponse>;
  updateEventLocality?: Maybe<EventLocalityEntityResponse>;
  updateEventSubscription?: Maybe<EventSubscriptionEntityResponse>;
  updateEventTag?: Maybe<EventTagEntityResponse>;
  updateFileCategory?: Maybe<FileCategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFooter?: Maybe<FooterEntityResponse>;
  updateHomePage?: Maybe<HomePageEntityResponse>;
  updateMenu?: Maybe<MenuEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  updatePartner?: Maybe<PartnerEntityResponse>;
  updatePremise?: Maybe<PremiseEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateBasicDocumentArgs = {
  data: BasicDocumentInput;
};


export type MutationCreateBlogPostArgs = {
  data: BlogPostInput;
};


export type MutationCreateBookTagArgs = {
  data: BookTagInput;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventArgs = {
  data: EventInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventCategoryArgs = {
  data: EventCategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventCategoryLocalizationArgs = {
  data?: InputMaybe<EventCategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventLocalityArgs = {
  data: EventLocalityInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventLocalityLocalizationArgs = {
  data?: InputMaybe<EventLocalityInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventLocalizationArgs = {
  data?: InputMaybe<EventInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventSubscriptionArgs = {
  data: EventSubscriptionInput;
};


export type MutationCreateEventTagArgs = {
  data: EventTagInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventTagLocalizationArgs = {
  data?: InputMaybe<EventTagInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateFileCategoryArgs = {
  data: FileCategoryInput;
};


export type MutationCreateFooterLocalizationArgs = {
  data?: InputMaybe<FooterInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateHomePageLocalizationArgs = {
  data?: InputMaybe<HomePageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMenuArgs = {
  data: MenuInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMenuLocalizationArgs = {
  data?: InputMaybe<MenuInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePartnerArgs = {
  data: PartnerInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePartnerLocalizationArgs = {
  data?: InputMaybe<PartnerInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePremiseArgs = {
  data: PremiseInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePremiseLocalizationArgs = {
  data?: InputMaybe<PremiseInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteBasicDocumentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBookTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventLocalityArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventSubscriptionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEventTagArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteFileCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMenuArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePartnerArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePremiseArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateBasicDocumentArgs = {
  data: BasicDocumentInput;
  id: Scalars['ID'];
};


export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput;
  id: Scalars['ID'];
};


export type MutationUpdateBookTagArgs = {
  data: BookTagInput;
  id: Scalars['ID'];
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventCategoryArgs = {
  data: EventCategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventLocalityArgs = {
  data: EventLocalityInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventSubscriptionArgs = {
  data: EventSubscriptionInput;
  id: Scalars['ID'];
};


export type MutationUpdateEventTagArgs = {
  data: EventTagInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateFileCategoryArgs = {
  data: FileCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateHomePageArgs = {
  data: HomePageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMenuArgs = {
  data: MenuInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePremiseArgs = {
  data: PremiseInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Page = {
  __typename?: 'Page';
  Seo?: Maybe<ComponentSeoSeo>;
  blogPosts?: Maybe<BlogPostRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date_added?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  layout?: Maybe<Enum_Page_Layout>;
  listingImage?: Maybe<UploadFileEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageRelationResponseCollection>;
  pageCategory?: Maybe<CategoryEntityResponse>;
  promoted?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  Seo?: InputMaybe<ComponentSeoSeoFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  blogPosts?: InputMaybe<BlogPostFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_added?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  layout?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  pageCategory?: InputMaybe<CategoryFiltersInput>;
  promoted?: InputMaybe<BooleanFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  Seo?: InputMaybe<ComponentSeoSeoInput>;
  blogPosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  date_added?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<Enum_Page_Layout>;
  listingImage?: InputMaybe<Scalars['ID']>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  promoted?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type PageSectionsDynamicZone = ComponentSectionsAccordion | ComponentSectionsColumnedText | ComponentSectionsCta | ComponentSectionsDivider | ComponentSectionsDocuments | ComponentSectionsEventDetails | ComponentSectionsExternalLinks | ComponentSectionsFaq | ComponentSectionsFlatText | ComponentSectionsFlatTextCenter | ComponentSectionsForm | ComponentSectionsGallery | ComponentSectionsLocalityDetails | ComponentSectionsSiteUsefullness | ComponentSectionsSubListing | ComponentSectionsSubpages | ComponentSectionsTable | ComponentSectionsVideo | Error;

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Partner = {
  __typename?: 'Partner';
  createdAt?: Maybe<Scalars['DateTime']>;
  featured?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PartnerRelationResponseCollection>;
  logo?: Maybe<UploadFileEntityResponse>;
  priority?: Maybe<Scalars['Float']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};


export type PartnerLocalizationsArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PartnerEntity = {
  __typename?: 'PartnerEntity';
  attributes?: Maybe<Partner>;
  id?: Maybe<Scalars['ID']>;
};

export type PartnerEntityResponse = {
  __typename?: 'PartnerEntityResponse';
  data?: Maybe<PartnerEntity>;
};

export type PartnerEntityResponseCollection = {
  __typename?: 'PartnerEntityResponseCollection';
  data: Array<PartnerEntity>;
  meta: ResponseCollectionMeta;
};

export type PartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  featured?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PartnerFiltersInput>;
  not?: InputMaybe<PartnerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  priority?: InputMaybe<FloatFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type PartnerInput = {
  featured?: InputMaybe<Scalars['Boolean']>;
  logo?: InputMaybe<Scalars['ID']>;
  priority?: InputMaybe<Scalars['Float']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type PartnerRelationResponseCollection = {
  __typename?: 'PartnerRelationResponseCollection';
  data: Array<PartnerEntity>;
};

export type Premise = {
  __typename?: 'Premise';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  image?: Maybe<UploadFileEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PremiseRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};


export type PremiseLocalizationsArgs = {
  filters?: InputMaybe<PremiseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PremiseEntity = {
  __typename?: 'PremiseEntity';
  attributes?: Maybe<Premise>;
  id?: Maybe<Scalars['ID']>;
};

export type PremiseEntityResponse = {
  __typename?: 'PremiseEntityResponse';
  data?: Maybe<PremiseEntity>;
};

export type PremiseEntityResponseCollection = {
  __typename?: 'PremiseEntityResponseCollection';
  data: Array<PremiseEntity>;
  meta: ResponseCollectionMeta;
};

export type PremiseFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PremiseFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PremiseFiltersInput>;
  not?: InputMaybe<PremiseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PremiseFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type PremiseInput = {
  address?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type PremiseRelationResponseCollection = {
  __typename?: 'PremiseRelationResponseCollection';
  data: Array<PremiseEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  basicDocument?: Maybe<BasicDocumentEntityResponse>;
  basicDocuments?: Maybe<BasicDocumentEntityResponseCollection>;
  blogPost?: Maybe<BlogPostEntityResponse>;
  blogPosts?: Maybe<BlogPostEntityResponseCollection>;
  bookTag?: Maybe<BookTagEntityResponse>;
  bookTags?: Maybe<BookTagEntityResponseCollection>;
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  event?: Maybe<EventEntityResponse>;
  eventCategories?: Maybe<EventCategoryEntityResponseCollection>;
  eventCategory?: Maybe<EventCategoryEntityResponse>;
  eventLocalities?: Maybe<EventLocalityEntityResponseCollection>;
  eventLocality?: Maybe<EventLocalityEntityResponse>;
  eventSubscription?: Maybe<EventSubscriptionEntityResponse>;
  eventSubscriptions?: Maybe<EventSubscriptionEntityResponseCollection>;
  eventTag?: Maybe<EventTagEntityResponse>;
  eventTags?: Maybe<EventTagEntityResponseCollection>;
  events?: Maybe<EventEntityResponseCollection>;
  fileCategories?: Maybe<FileCategoryEntityResponseCollection>;
  fileCategory?: Maybe<FileCategoryEntityResponse>;
  footer?: Maybe<FooterEntityResponse>;
  homePage?: Maybe<HomePageEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  menu?: Maybe<MenuEntityResponse>;
  menus?: Maybe<MenuEntityResponseCollection>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  partner?: Maybe<PartnerEntityResponse>;
  partners?: Maybe<PartnerEntityResponseCollection>;
  premise?: Maybe<PremiseEntityResponse>;
  premises?: Maybe<PremiseEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryBasicDocumentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBasicDocumentsArgs = {
  filters?: InputMaybe<BasicDocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBookTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBookTagsArgs = {
  filters?: InputMaybe<BookTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventCategoriesArgs = {
  filters?: InputMaybe<EventCategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventLocalitiesArgs = {
  filters?: InputMaybe<EventLocalityFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventLocalityArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventSubscriptionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEventSubscriptionsArgs = {
  filters?: InputMaybe<EventSubscriptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventTagsArgs = {
  filters?: InputMaybe<EventTagFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFileCategoriesArgs = {
  filters?: InputMaybe<FileCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFileCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMenuArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryMenusArgs = {
  filters?: InputMaybe<MenuFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPartnerArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPremiseArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPremisesArgs = {
  filters?: InputMaybe<PremiseFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
  contains?: InputMaybe<Scalars['Time']>;
  containsi?: InputMaybe<Scalars['Time']>;
  endsWith?: InputMaybe<Scalars['Time']>;
  eq?: InputMaybe<Scalars['Time']>;
  eqi?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  ne?: InputMaybe<Scalars['Time']>;
  not?: InputMaybe<TimeFilterInput>;
  notContains?: InputMaybe<Scalars['Time']>;
  notContainsi?: InputMaybe<Scalars['Time']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
  startsWith?: InputMaybe<Scalars['Time']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type BasicDocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type BasicDocumentBySlugQuery = { __typename?: 'Query', basicDocuments?: { __typename?: 'BasicDocumentEntityResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null };

export type FileCategoryEntityFragment = { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null };

export type FileCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FileCategoriesQuery = { __typename?: 'Query', fileCategories?: { __typename?: 'FileCategoryEntityResponseCollection', data: Array<{ __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null }> } | null };

export type BasicDocumentFileFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null };

export type BasicDocumentFragment = { __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null };

type Metadata_ComponentMetadataFaktury_Fragment = { __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null };

type Metadata_ComponentMetadataMetadata_Fragment = { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null };

type Metadata_ComponentMetadataObchodnaVerejnaSutaz_Fragment = { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null };

type Metadata_ComponentMetadataObjednavky_Fragment = { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null };

type Metadata_ComponentMetadataVerejneObstaravanie_Fragment = { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null };

type Metadata_ComponentMetadataZmluvy_Fragment = { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null };

type Metadata_Error_Fragment = { __typename: 'Error' };

export type MetadataFragment = Metadata_ComponentMetadataFaktury_Fragment | Metadata_ComponentMetadataMetadata_Fragment | Metadata_ComponentMetadataObchodnaVerejnaSutaz_Fragment | Metadata_ComponentMetadataObjednavky_Fragment | Metadata_ComponentMetadataVerejneObstaravanie_Fragment | Metadata_ComponentMetadataZmluvy_Fragment | Metadata_Error_Fragment;

export type BlogPostEntityFragment = { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null };

export type BlogPostWithParentPageEntityFragment = { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, layout?: Enum_Page_Layout | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type BlogPostStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogPostStaticPathsQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null } | null }> } | null };

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type BlogPostBySlugQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, layout?: Enum_Page_Layout | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null }> } | null };

export type BlogPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type BlogPostsQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null };

export type BlogPostsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogPostsCountQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number } } } | null };

export type ImageEntityFragment = { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null };

export type EventCardAttributesFragment = { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null };

export type EventCardEntityFragment = { __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null };

export type EventEntityFragment = { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', promoted?: boolean | null, showForm?: boolean | null, slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, guests?: Array<{ __typename?: 'ComponentGuestsGuest', id: string, name?: string | null, surname?: string | null, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null> | null, localizations?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', attributes?: { __typename?: 'Event', slug: string, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null };

export type EventPropertiesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type EventPropertiesQuery = { __typename?: 'Query', eventCategories?: { __typename?: 'EventCategoryEntityResponseCollection', data: Array<{ __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null, eventLocalities?: { __typename?: 'EventLocalityEntityResponseCollection', data: Array<{ __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null, eventTags?: { __typename?: 'EventTagEntityResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null };

export type EventListQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  filters?: InputMaybe<EventFiltersInput>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type EventListQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type UpcomingEventsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  date: Scalars['DateTime'];
}>;


export type UpcomingEventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null };

export type PromotedEventsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type PromotedEventsQuery = { __typename?: 'Query', promotedEvents?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null };

export type EventBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
  date: Scalars['DateTime'];
}>;


export type EventBySlugQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', promoted?: boolean | null, showForm?: boolean | null, slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, guests?: Array<{ __typename?: 'ComponentGuestsGuest', id: string, name?: string | null, surname?: string | null, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null> | null, localizations?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', attributes?: { __typename?: 'Event', slug: string, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null, menus?: { __typename?: 'MenuEntityResponseCollection', data: Array<{ __typename?: 'MenuEntity', id?: string | null, attributes?: { __typename?: 'Menu', menuTitle?: string | null, menuSlug?: string | null, menuTotalColumns?: number | null, order?: number | null, createdAt?: any | null, updatedAt?: any | null, menuSections?: Array<{ __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null } | null> | null } | null }> } | null, upcomingEvents?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null, footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', id?: string | null, attributes?: { __typename?: 'Footer', footerColumns?: Array<{ __typename?: 'ComponentFooterFooterColumn', id: string, title?: string | null, footerLink?: Array<{ __typename?: 'ComponentFooterFooterLink', id: string, title?: string | null, otherSite?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | null> | null, siteMapLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, privacyLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null };

export type EventsCountQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type EventsCountQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number } } } | null };

export type AllEventSlugsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type AllEventSlugsQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', attributes?: { __typename?: 'Event', slug: string, locale?: string | null } | null }> } | null };

export type PageEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null };

export type SectionLinkPageFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null };

export type PageWithBaseFieldsEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type PageLocalizationEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null };

export type CategoryFragment = { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null };

export type PageCategoryEntityFragment = { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null };

export type ParentPageFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, layout?: Enum_Page_Layout | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type PromoNewsCardFragment = { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null } | null };

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null };

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
  date: Scalars['DateTime'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }> } | null, menus?: { __typename?: 'MenuEntityResponseCollection', data: Array<{ __typename?: 'MenuEntity', id?: string | null, attributes?: { __typename?: 'Menu', menuTitle?: string | null, menuSlug?: string | null, menuTotalColumns?: number | null, order?: number | null, createdAt?: any | null, updatedAt?: any | null, menuSections?: Array<{ __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null } | null> | null } | null }> } | null, upcomingEvents?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null, footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', id?: string | null, attributes?: { __typename?: 'Footer', footerColumns?: Array<{ __typename?: 'ComponentFooterFooterColumn', id: string, title?: string | null, footerLink?: Array<{ __typename?: 'ComponentFooterFooterLink', id: string, title?: string | null, otherSite?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | null> | null, siteMapLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, privacyLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null };

export type PagesByLayoutQueryVariables = Exact<{
  layout: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type PagesByLayoutQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }> } | null };

export type PagesByLayoutPaginatedQueryVariables = Exact<{
  layout: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type PagesByLayoutPaginatedQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } } } | null };

export type PagesByLayoutCountQueryVariables = Exact<{
  layout: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
}>;


export type PagesByLayoutCountQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number } } } | null };

export type SortedPartnersQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type SortedPartnersQuery = { __typename?: 'Query', featuredPartners?: { __typename?: 'PartnerEntityResponseCollection', data: Array<{ __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title?: string | null, url?: string | null, priority?: number | null, featured?: boolean | null, logo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | null }> } | null, notFeaturedPartners?: { __typename?: 'PartnerEntityResponseCollection', data: Array<{ __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title?: string | null, url?: string | null, priority?: number | null, featured?: boolean | null, logo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | null }> } | null };

export type PartnerEntityFragment = { __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title?: string | null, url?: string | null, priority?: number | null, featured?: boolean | null, logo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | null };

export type FooterQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type FooterQuery = { __typename?: 'Query', footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', id?: string | null, attributes?: { __typename?: 'Footer', copyrightText?: string | null, footerColumns?: Array<{ __typename?: 'ComponentFooterFooterColumn', id: string, title?: string | null, footerLink?: Array<{ __typename?: 'ComponentFooterFooterLink', id: string, title?: string | null, otherSite?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | null> | null, siteMapLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, privacyLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null };

export type HomePageQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  date: Scalars['DateTime'];
}>;


export type HomePageQuery = { __typename?: 'Query', homePage?: { __typename?: 'HomePageEntityResponse', data?: { __typename?: 'HomePageEntity', attributes?: { __typename?: 'HomePage', faqSection?: { __typename?: 'ComponentHomepageFaqSection', id: string, title?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, faqs?: Array<{ __typename?: 'ComponentHomepageFaqs', id: string, question?: string | null, answer?: string | null } | null> | null, ctas?: Array<{ __typename?: 'ComponentHomepageCta', id: string, title?: string | null, ctaRedirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | null, registrationInfoSection?: { __typename?: 'ComponentHomepageRegistrationInfo', id: string, title?: string | null, description?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, registrationBenefits?: Array<{ __typename?: 'ComponentHomepageBenefits', id: string, benefit?: string | null } | null> | null } | null, newsSection?: { __typename?: 'ComponentHomepageNewsSection', id: string, title?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null, localizations?: { __typename?: 'HomePageRelationResponseCollection', data: Array<{ __typename?: 'HomePageEntity', attributes?: { __typename?: 'HomePage', locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null } | null } | null, menus?: { __typename?: 'MenuEntityResponseCollection', data: Array<{ __typename?: 'MenuEntity', id?: string | null, attributes?: { __typename?: 'Menu', menuTitle?: string | null, menuSlug?: string | null, menuTotalColumns?: number | null, order?: number | null, createdAt?: any | null, updatedAt?: any | null, menuSections?: Array<{ __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null } | null> | null } | null }> } | null, upcomingEvents?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null, promotedNews?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null } | null }> } | null, promotedEvents?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', slug: string, title: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, locale?: string | null, dateFrom?: any | null, dateTo?: any | null, price?: number | null, eventCategory?: { __typename?: 'EventCategoryEntityResponse', data?: { __typename?: 'EventCategoryEntity', id?: string | null, attributes?: { __typename?: 'EventCategory', title?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventLocality?: { __typename?: 'EventLocalityEntityResponse', data?: { __typename?: 'EventLocalityEntity', id?: string | null, attributes?: { __typename?: 'EventLocality', title?: string | null, navigateTo?: string | null, eventAddress?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, eventTags?: { __typename?: 'EventTagRelationResponseCollection', data: Array<{ __typename?: 'EventTagEntity', id?: string | null, attributes?: { __typename?: 'EventTag', title?: string | null, slug?: string | null, createdAt?: any | null, publishedAt?: any | null, updatedAt?: any | null } | null }> } | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null, latestNews?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }> } | null, bookTags?: { __typename?: 'BookTagEntityResponseCollection', data: Array<{ __typename?: 'BookTagEntity', id?: string | null, attributes?: { __typename?: 'BookTag', displayName?: string | null, slug?: string | null } | null }> } | null, localityPages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }> } | null, footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', id?: string | null, attributes?: { __typename?: 'Footer', footerColumns?: Array<{ __typename?: 'ComponentFooterFooterColumn', id: string, title?: string | null, footerLink?: Array<{ __typename?: 'ComponentFooterFooterLink', id: string, title?: string | null, otherSite?: string | null, redirectTo?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | null> | null, siteMapLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, privacyLink?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null };

export type PremiseEntityFragment = { __typename?: 'PremiseEntity', id?: string | null, attributes?: { __typename?: 'Premise', title?: string | null, address?: string | null, url?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null };

export type PremisesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type PremisesQuery = { __typename?: 'Query', premises?: { __typename?: 'PremiseEntityResponseCollection', data: Array<{ __typename?: 'PremiseEntity', id?: string | null, attributes?: { __typename?: 'Premise', title?: string | null, address?: string | null, url?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, hash: string, mime: string, size: number, alternativeText?: string | null } | null } | null } | null } | null }> } | null };

export type MenusQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type MenusQuery = { __typename?: 'Query', menus?: { __typename?: 'MenuEntityResponseCollection', data: Array<{ __typename?: 'MenuEntity', id?: string | null, attributes?: { __typename?: 'Menu', menuTitle?: string | null, menuSlug?: string | null, menuTotalColumns?: number | null, order?: number | null, createdAt?: any | null, updatedAt?: any | null, menuSections?: Array<{ __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null } | null> | null } | null }> } | null };

export type LatestNewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type LatestNewsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, layout?: Enum_Page_Layout | null, description?: string | null, locale?: string | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, alternativeText?: string | null, updatedAt?: any | null } | null } | null } | null, pageCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, subCategories?: { __typename?: 'CategoryRelationResponseCollection', data: Array<{ __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null }> } | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, parentCategory?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', title?: string | null, priority?: number | null, createdAt?: any | null, updatedAt?: any | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null, pageLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null, blogPosts?: { __typename?: 'BlogPostRelationResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, mime: string, alternativeText?: string | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null } | { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null } | { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsDivider', shown?: boolean | null } | { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsEventDetails' } | { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null } | { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null } | { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null } | { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null } | { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | { __typename: 'Error' } | null> | null } | null }> } | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, Seo?: { __typename?: 'ComponentSeoSeo', id: string, metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null, metaRobots?: string | null, metaViewport?: string | null, canonicalURL?: string | null } | null } | null }> } | null };

export type MenuFragment = { __typename?: 'MenuEntity', id?: string | null, attributes?: { __typename?: 'Menu', menuTitle?: string | null, menuSlug?: string | null, menuTotalColumns?: number | null, order?: number | null, createdAt?: any | null, updatedAt?: any | null, menuSections?: Array<{ __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null } | null> | null } | null };

export type MenuSectionFragment = { __typename?: 'ComponentMenuSections', id: string, sectionTitle?: string | null, sectionColumnSpan?: number | null, sectionPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null, sectionLinks?: Array<{ __typename?: 'ComponentMenuSectionLinks', id: string, sectionLinkTitle?: string | null, sectionLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout?: Enum_Page_Layout | null, title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null, date_added?: any | null, listingImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null } | null } | null } | null } | null> | null };

export type BookTagEntityFragment = { __typename?: 'BookTagEntity', id?: string | null, attributes?: { __typename?: 'BookTag', displayName?: string | null, slug?: string | null } | null };

type Sections_ComponentSectionsAccordion_Fragment = { __typename: 'ComponentSectionsAccordion', title?: string | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null, tableRows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null, forms?: Array<{ __typename?: 'ComponentAccordionItemsForm', category?: string | null, type?: Enum_Componentaccordionitemsform_Type | null } | null> | null };

type Sections_ComponentSectionsColumnedText_Fragment = { __typename: 'ComponentSectionsColumnedText', title?: string | null, content?: string | null };

type Sections_ComponentSectionsCta_Fragment = { __typename: 'ComponentSectionsCta', title?: string | null, url?: string | null };

type Sections_ComponentSectionsDivider_Fragment = { __typename: 'ComponentSectionsDivider', shown?: boolean | null };

type Sections_ComponentSectionsDocuments_Fragment = { __typename: 'ComponentSectionsDocuments', id: string, title?: string | null, basicDocuments?: { __typename?: 'BasicDocumentRelationResponseCollection', data: Array<{ __typename?: 'BasicDocumentEntity', id?: string | null, attributes?: { __typename?: 'BasicDocument', slug?: string | null, title?: string | null, description?: string | null, date_added?: any | null, author?: string | null, link?: string | null, file_category?: { __typename?: 'FileCategoryEntityResponse', data?: { __typename?: 'FileCategoryEntity', id?: string | null, attributes?: { __typename?: 'FileCategory', name?: string | null, slug?: string | null } | null } | null } | null, metadata?: Array<{ __typename: 'ComponentMetadataFaktury', id: string, name?: string | null, date?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataMetadata', id: string, provider?: string | null, year?: number | null, grant_name?: string | null, grant_number?: string | null, amount?: string | null, description?: string | null } | { __typename: 'ComponentMetadataObchodnaVerejnaSutaz', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataObjednavky', id: string, title?: string | null, date_period?: any | null, date_added?: any | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataVerejneObstaravanie', id: string, subject?: string | null, description?: string | null, number?: string | null, date_added?: any | null, amount?: string | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | { __typename: 'ComponentMetadataZmluvy', id: string, date?: any | null, number?: string | null, amount?: string | null, supplier?: string | null, subject?: string | null } | { __typename: 'Error' } | null> | null, attachment?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, ext?: string | null } | null } | null } | null } | null }> } | null, moreLink?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsEventDetails_Fragment = { __typename: 'ComponentSectionsEventDetails' };

type Sections_ComponentSectionsExternalLinks_Fragment = { __typename: 'ComponentSectionsExternalLinks', title?: string | null, externalLinks?: Array<{ __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null } | null> | null, descriptions?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null } | null> | null };

type Sections_ComponentSectionsFaq_Fragment = { __typename: 'ComponentSectionsFaq', id: string, title?: string | null, questions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null } | null> | null };

type Sections_ComponentSectionsFlatText_Fragment = { __typename: 'ComponentSectionsFlatText', id: string, content?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null };

type Sections_ComponentSectionsFlatTextCenter_Fragment = { __typename: 'ComponentSectionsFlatTextCenter', id: string, content?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null, alternativeText?: string | null } | null } | null } | null };

type Sections_ComponentSectionsForm_Fragment = { __typename: 'ComponentSectionsForm', id: string, type?: Enum_Componentsectionsform_Type | null };

type Sections_ComponentSectionsGallery_Fragment = { __typename: 'ComponentSectionsGallery', id: string, Gallery?: Array<{ __typename?: 'ComponentLocalityPartsGalleryParts', id: string, Description?: string | null, Photo?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsLocalityDetails_Fragment = { __typename: 'ComponentSectionsLocalityDetails', id: string, localityTitle?: string | null, localityDescription?: string | null, localityLongitude?: number | null, localityLatitude?: number | null, displayOnHomePage?: boolean | null, isMainLocality?: boolean | null, localityCoverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityMap?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', name: string, width?: number | null, height?: number | null, url: string, createdAt?: any | null, hash: string, mime: string, provider: string, size: number, updatedAt?: any | null } | null } | null } | null, localityAddress?: { __typename?: 'ComponentAddressAddress', id: string, title?: string | null, navigateTo?: string | null } | null, localitySections?: Array<{ __typename?: 'ComponentLocalityPartsLocalitySection', id: string, localitySectionTitle?: string | null, localitySectionPhone?: string | null, localitySectionEmail?: string | null, localitySectionDescription?: string | null, isMainSection?: boolean | null, openingHoursMondayFrom?: any | null, openingHoursMondayTo?: any | null, openingHoursTuesdayFrom?: any | null, openingHoursTuesdayTo?: any | null, openingHoursWednesdayFrom?: any | null, openingHoursWednesdayTo?: any | null, openingHoursThursdayFrom?: any | null, openingHoursThursdayTo?: any | null, openingHoursFridayFrom?: any | null, openingHoursFridayTo?: any | null, openingHoursSaturdayFrom?: any | null, openingHoursSaturdayTo?: any | null, openingHoursSundayFrom?: any | null, openingHoursSundayTo?: any | null } | null> | null, localityServices?: Array<{ __typename?: 'ComponentLocalityPartsLocalityServices', id: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsSiteUsefullness_Fragment = { __typename: 'ComponentSectionsSiteUsefullness', id: string, title?: string | null, thankYouMessage?: string | null };

type Sections_ComponentSectionsSubListing_Fragment = { __typename: 'ComponentSectionsSubListing', id: string, title?: string | null, url?: string | null };

type Sections_ComponentSectionsSubpages_Fragment = { __typename: 'ComponentSectionsSubpages', id: string, title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsTable_Fragment = { __typename: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null };

type Sections_ComponentSectionsVideo_Fragment = { __typename: 'ComponentSectionsVideo', id: string, youtube_url?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null };

type Sections_Error_Fragment = { __typename: 'Error' };

export type SectionsFragment = Sections_ComponentSectionsAccordion_Fragment | Sections_ComponentSectionsColumnedText_Fragment | Sections_ComponentSectionsCta_Fragment | Sections_ComponentSectionsDivider_Fragment | Sections_ComponentSectionsDocuments_Fragment | Sections_ComponentSectionsEventDetails_Fragment | Sections_ComponentSectionsExternalLinks_Fragment | Sections_ComponentSectionsFaq_Fragment | Sections_ComponentSectionsFlatText_Fragment | Sections_ComponentSectionsFlatTextCenter_Fragment | Sections_ComponentSectionsForm_Fragment | Sections_ComponentSectionsGallery_Fragment | Sections_ComponentSectionsLocalityDetails_Fragment | Sections_ComponentSectionsSiteUsefullness_Fragment | Sections_ComponentSectionsSubListing_Fragment | Sections_ComponentSectionsSubpages_Fragment | Sections_ComponentSectionsTable_Fragment | Sections_ComponentSectionsVideo_Fragment | Sections_Error_Fragment;

export type FlatTextFragment = { __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null };

export type TableRowFragment = { __typename?: 'ComponentAccordionItemsTableRow', accordionCategory?: string | null, tableCategory?: string | null, label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null };

export type TableFragment = { __typename?: 'ComponentSectionsTable', primaryTitle?: string | null, secondaryTitle?: string | null, rows?: Array<{ __typename?: 'ComponentAccordionItemsTableRow', label?: string | null, value?: string | null, valueAlign?: Enum_Componentaccordionitemstablerow_Valuealign | null } | null> | null };

export type SubpagesFragment = { __typename?: 'ComponentSectionsSubpages', title?: string | null, subpages?: Array<{ __typename?: 'ComponentBlocksSubpage', id: string, title?: string | null, description?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null } | null> | null };

export type ExternalLinkFragment = { __typename?: 'ComponentBlocksExternalLink', category?: string | null, title?: string | null, url?: string | null };

export type AccordionItemFragment = { __typename?: 'ComponentBlocksAccordionItem', id: string, label?: string | null, content?: string | null };

export type PageLinkFragment = { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null } | null };

export type PaginationFragment = { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number };

export const FileCategoryEntityFragmentDoc = gql`
    fragment FileCategoryEntity on FileCategoryEntity {
  id
  attributes {
    name
    slug
  }
}
    `;
export const AccordionItemFragmentDoc = gql`
    fragment AccordionItem on ComponentBlocksAccordionItem {
  id
  label
  content
}
    `;
export const PageWithBaseFieldsEntityFragmentDoc = gql`
    fragment PageWithBaseFieldsEntity on PageEntity {
  id
  attributes {
    title
    slug
    createdAt
    updatedAt
  }
}
    `;
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
    ${PageWithBaseFieldsEntityFragmentDoc}`;
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
    `;
export const FlatTextFragmentDoc = gql`
    fragment FlatText on ComponentAccordionItemsFlatText {
  category
  content
}
    `;
export const TableRowFragmentDoc = gql`
    fragment TableRow on ComponentAccordionItemsTableRow {
  accordionCategory
  tableCategory
  label
  value
  valueAlign
}
    `;
export const ExternalLinkFragmentDoc = gql`
    fragment ExternalLink on ComponentBlocksExternalLink {
  category
  title
  url
}
    `;
export const BasicDocumentFileFragmentDoc = gql`
    fragment BasicDocumentFile on UploadFileEntity {
  id
  attributes {
    url
    name
    ext
  }
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on BasicDocumentMetadataDynamicZone {
  __typename
  ... on ComponentMetadataFaktury {
    id
    name
    date
    attachment {
      data {
        ...BasicDocumentFile
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
        ...BasicDocumentFile
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
        ...BasicDocumentFile
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
        ...BasicDocumentFile
      }
    }
  }
}
    ${BasicDocumentFileFragmentDoc}`;
export const BasicDocumentFragmentDoc = gql`
    fragment BasicDocument on BasicDocumentEntity {
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
        ...BasicDocumentFile
      }
    }
  }
}
    ${MetadataFragmentDoc}
${BasicDocumentFileFragmentDoc}`;
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
    ${PageWithBaseFieldsEntityFragmentDoc}`;
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
  ... on ComponentSectionsFlatTextCenter {
    id
    content
    image {
      data {
        id
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
          updatedAt
          alternativeText
        }
      }
    }
  }
  ... on ComponentSectionsFlatText {
    id
    content
    media {
      data {
        id
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
          updatedAt
          alternativeText
        }
      }
    }
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
    tableRows(pagination: {limit: 100}) {
      ...TableRow
    }
    forms {
      category
      type
    }
  }
  ... on ComponentSectionsDivider {
    shown
  }
  ... on ComponentSectionsColumnedText {
    title
    content
  }
  ... on ComponentSectionsExternalLinks {
    title
    externalLinks {
      ...ExternalLink
    }
    descriptions {
      ...FlatText
    }
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
    title
    basicDocuments {
      data {
        ...BasicDocument
      }
    }
    moreLink {
      ...PageLink
    }
  }
  ... on ComponentSectionsLocalityDetails {
    id
    localityTitle
    localityDescription
    localityLongitude
    localityLatitude
    displayOnHomePage
    isMainLocality
    localityCoverImage {
      data {
        id
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
          updatedAt
        }
      }
    }
    localityMap {
      data {
        id
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
          updatedAt
        }
      }
    }
    localityAddress {
      id
      title
      navigateTo
    }
    localitySections {
      id
      localitySectionTitle
      localitySectionPhone
      localitySectionEmail
      localitySectionDescription
      isMainSection
      openingHoursMondayFrom
      openingHoursMondayTo
      openingHoursTuesdayFrom
      openingHoursTuesdayTo
      openingHoursWednesdayFrom
      openingHoursWednesdayTo
      openingHoursThursdayFrom
      openingHoursThursdayTo
      openingHoursFridayFrom
      openingHoursFridayTo
      openingHoursSaturdayFrom
      openingHoursSaturdayTo
      openingHoursSundayFrom
      openingHoursSundayTo
    }
    localityServices {
      id
      page {
        data {
          ...PageWithBaseFieldsEntity
        }
      }
    }
  }
  ... on ComponentSectionsGallery {
    id
    Gallery {
      id
      Description
      Photo {
        data {
          id
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
            updatedAt
          }
        }
      }
    }
  }
}
    ${AccordionItemFragmentDoc}
${SubpagesFragmentDoc}
${TableFragmentDoc}
${FlatTextFragmentDoc}
${TableRowFragmentDoc}
${ExternalLinkFragmentDoc}
${BasicDocumentFragmentDoc}
${PageLinkFragmentDoc}
${PageWithBaseFieldsEntityFragmentDoc}`;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  title
  priority
  pages(pagination: {limit: 20}) {
    ...PageLink
  }
  pageLink {
    ...PageLink
  }
  createdAt
  updatedAt
}
    ${PageLinkFragmentDoc}`;
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
    ${CategoryFragmentDoc}`;
export const ParentPageFragmentDoc = gql`
    fragment ParentPage on PageEntity {
  id
  attributes {
    title
    slug
    layout
    pageCategory {
      data {
        ...PageCategoryEntity
      }
    }
  }
}
    ${PageCategoryEntityFragmentDoc}`;
export const BlogPostWithParentPageEntityFragmentDoc = gql`
    fragment BlogPostWithParentPageEntity on BlogPostEntity {
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
    parentPage {
      data {
        ...ParentPage
      }
    }
  }
}
    ${SectionsFragmentDoc}
${ParentPageFragmentDoc}`;
export const ImageEntityFragmentDoc = gql`
    fragment ImageEntity on UploadFileEntity {
  attributes {
    name
    width
    height
    url
    hash
    mime
    size
    alternativeText
  }
}
    `;
export const EventCardAttributesFragmentDoc = gql`
    fragment EventCardAttributes on Event {
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
  eventLocality {
    data {
      id
      attributes {
        title
        navigateTo
        eventAddress
        createdAt
        updatedAt
      }
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
      ...ImageEntity
    }
  }
  coverImage {
    data {
      ...ImageEntity
    }
  }
}
    ${ImageEntityFragmentDoc}`;
export const EventCardEntityFragmentDoc = gql`
    fragment EventCardEntity on EventEntity {
  id
  __typename
  attributes {
    ...EventCardAttributes
  }
}
    ${EventCardAttributesFragmentDoc}`;
export const EventEntityFragmentDoc = gql`
    fragment EventEntity on EventEntity {
  id
  attributes {
    ...EventCardAttributes
    promoted
    showForm
    guests {
      id
      name
      surname
      avatar {
        data {
          ...ImageEntity
        }
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
    Seo {
      id
      metaTitle
      metaDescription
      keywords
      metaRobots
      metaViewport
      canonicalURL
    }
  }
}
    ${EventCardAttributesFragmentDoc}
${ImageEntityFragmentDoc}`;
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
  }
}
    ${SectionsFragmentDoc}`;
export const PageLocalizationEntityFragmentDoc = gql`
    fragment PageLocalizationEntity on PageEntity {
  id
  attributes {
    slug
    locale
  }
}
    `;
export const PageEntityFragmentDoc = gql`
    fragment PageEntity on PageEntity {
  id
  attributes {
    slug
    title
    createdAt
    updatedAt
    publishedAt
    date_added
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
    description
    pageCategory {
      data {
        ...PageCategoryEntity
      }
    }
    sections {
      ...Sections
    }
    blogPosts {
      data {
        ...BlogPostEntity
      }
    }
    locale
    localizations {
      data {
        ...PageLocalizationEntity
      }
    }
    Seo {
      id
      metaTitle
      metaDescription
      keywords
      metaRobots
      metaViewport
      canonicalURL
    }
  }
}
    ${PageCategoryEntityFragmentDoc}
${SectionsFragmentDoc}
${BlogPostEntityFragmentDoc}
${PageLocalizationEntityFragmentDoc}`;
export const PromoNewsCardFragmentDoc = gql`
    fragment PromoNewsCard on PageEntity {
  id
  __typename
  attributes {
    title
    slug
  }
}
    `;
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
    `;
export const PremiseEntityFragmentDoc = gql`
    fragment PremiseEntity on PremiseEntity {
  id
  attributes {
    title
    address
    url
    image {
      data {
        ...ImageEntity
      }
    }
  }
}
    ${ImageEntityFragmentDoc}`;
export const SectionLinkPageFragmentDoc = gql`
    fragment SectionLinkPage on PageEntity {
  id
  attributes {
    layout
    title
    slug
    createdAt
    updatedAt
    date_added
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
          updatedAt
          alternativeText
        }
      }
    }
  }
}
    `;
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
  sectionLinks(pagination: {limit: 20}) {
    id
    sectionLinkTitle
    sectionLinkPage {
      data {
        ...SectionLinkPage
      }
    }
  }
}
    ${PageWithBaseFieldsEntityFragmentDoc}
${SectionLinkPageFragmentDoc}`;
export const MenuFragmentDoc = gql`
    fragment Menu on MenuEntity {
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
    ${MenuSectionFragmentDoc}`;
export const BookTagEntityFragmentDoc = gql`
    fragment BookTagEntity on BookTagEntity {
  id
  attributes {
    displayName
    slug
  }
}
    `;
export const PaginationFragmentDoc = gql`
    fragment Pagination on Pagination {
  total
  page
  pageSize
  pageCount
}
    `;
export const BasicDocumentBySlugDocument = gql`
    query BasicDocumentBySlug($slug: String!) {
  basicDocuments(filters: {slug: {eq: $slug}}) {
    data {
      ...BasicDocument
    }
  }
}
    ${BasicDocumentFragmentDoc}`;
export const FileCategoriesDocument = gql`
    query FileCategories {
  fileCategories {
    data {
      ...FileCategoryEntity
    }
  }
}
    ${FileCategoryEntityFragmentDoc}`;
export const BlogPostStaticPathsDocument = gql`
    query BlogPostStaticPaths {
  blogPosts {
    data {
      id
      attributes {
        slug
      }
    }
  }
}
    `;
export const BlogPostBySlugDocument = gql`
    query BlogPostBySlug($slug: String!) {
  blogPosts(filters: {slug: {eq: $slug}}) {
    data {
      ...BlogPostWithParentPageEntity
    }
  }
}
    ${BlogPostWithParentPageEntityFragmentDoc}`;
export const BlogPostsDocument = gql`
    query BlogPosts($limit: Int, $start: Int, $sort: String = "publishedAt:desc") {
  blogPosts(pagination: {limit: $limit, start: $start}, sort: [$sort]) {
    data {
      ...BlogPostEntity
    }
  }
}
    ${BlogPostEntityFragmentDoc}`;
export const BlogPostsCountDocument = gql`
    query BlogPostsCount {
  blogPosts {
    meta {
      pagination {
        total
      }
    }
  }
}
    `;
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
  eventLocalities(locale: $locale) {
    data {
      id
      attributes {
        title
        navigateTo
        createdAt
        updatedAt
      }
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
    `;
export const EventListDocument = gql`
    query EventList($locale: I18NLocaleCode!, $start: Int, $limit: Int, $filters: EventFiltersInput, $sort: String = "dateFrom:desc") {
  events(
    locale: $locale
    sort: [$sort]
    pagination: {start: $start, limit: $limit}
    filters: $filters
  ) {
    data {
      ...EventCardEntity
    }
    meta {
      pagination {
        ...Pagination
      }
    }
  }
}
    ${EventCardEntityFragmentDoc}
${PaginationFragmentDoc}`;
export const UpcomingEventsDocument = gql`
    query UpcomingEvents($locale: I18NLocaleCode!, $date: DateTime!) {
  events(
    locale: $locale
    sort: ["dateFrom:asc"]
    pagination: {start: 0, limit: 4}
    filters: {dateFrom: {gte: $date}}
  ) {
    data {
      ...EventCardEntity
    }
  }
}
    ${EventCardEntityFragmentDoc}`;
export const PromotedEventsDocument = gql`
    query PromotedEvents($locale: I18NLocaleCode!, $start: Int, $limit: Int) {
  promotedEvents: events(
    locale: $locale
    sort: "dateFrom:asc"
    pagination: {start: $start, limit: $limit}
    filters: {promoted: {eq: true}}
  ) {
    data {
      ...EventCardEntity
    }
  }
}
    ${EventCardEntityFragmentDoc}`;
export const EventBySlugDocument = gql`
    query EventBySlug($slug: String!, $locale: I18NLocaleCode!, $date: DateTime!) {
  events(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...EventEntity
    }
  }
  menus(locale: $locale, sort: ["order:asc"]) {
    data {
      ...Menu
    }
  }
  upcomingEvents: events(
    locale: $locale
    sort: "dateFrom:asc"
    pagination: {start: 0, limit: 4}
    filters: {dateFrom: {gte: $date}}
  ) {
    data {
      ...EventCardEntity
    }
  }
  footer(locale: $locale) {
    data {
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
  }
}
    ${EventEntityFragmentDoc}
${MenuFragmentDoc}
${EventCardEntityFragmentDoc}
${PageWithBaseFieldsEntityFragmentDoc}`;
export const EventsCountDocument = gql`
    query EventsCount($locale: I18NLocaleCode!) {
  events(locale: $locale) {
    meta {
      pagination {
        total
      }
    }
  }
}
    `;
export const AllEventSlugsDocument = gql`
    query AllEventSlugs($locale: I18NLocaleCode!) {
  events(locale: $locale) {
    data {
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($locale: I18NLocaleCode) {
  pages(locale: $locale) {
    data {
      id
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const PageBySlugDocument = gql`
    query PageBySlug($slug: String!, $locale: I18NLocaleCode!, $date: DateTime!) {
  pages(filters: {slug: {eq: $slug}}, locale: $locale) {
    data {
      ...PageEntity
    }
  }
  menus(locale: $locale, sort: ["order:asc"]) {
    data {
      ...Menu
    }
  }
  upcomingEvents: events(
    locale: $locale
    sort: ["dateFrom:asc"]
    pagination: {start: 0, limit: 4}
    filters: {dateFrom: {gte: $date}}
  ) {
    data {
      ...EventCardEntity
    }
  }
  footer(locale: $locale) {
    data {
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
  }
}
    ${PageEntityFragmentDoc}
${MenuFragmentDoc}
${EventCardEntityFragmentDoc}
${PageWithBaseFieldsEntityFragmentDoc}`;
export const PagesByLayoutDocument = gql`
    query PagesByLayout($layout: String!, $locale: I18NLocaleCode!, $start: Int, $limit: Int, $sort: String = "publishedAt:desc") {
  pages(
    filters: {layout: {eq: $layout}}
    locale: $locale
    pagination: {start: $start, limit: $limit}
    sort: [$sort]
  ) {
    data {
      ...PageEntity
    }
  }
}
    ${PageEntityFragmentDoc}`;
export const PagesByLayoutPaginatedDocument = gql`
    query PagesByLayoutPaginated($layout: String!, $locale: I18NLocaleCode!, $start: Int, $limit: Int, $sort: String = "publishedAt:desc") {
  pages(
    filters: {layout: {eq: $layout}}
    locale: $locale
    pagination: {start: $start, limit: $limit}
    sort: [$sort]
  ) {
    data {
      ...PageEntity
    }
    meta {
      pagination {
        ...Pagination
      }
    }
  }
}
    ${PageEntityFragmentDoc}
${PaginationFragmentDoc}`;
export const PagesByLayoutCountDocument = gql`
    query PagesByLayoutCount($layout: String!, $locale: I18NLocaleCode!) {
  pages(filters: {layout: {eq: $layout}}, locale: $locale) {
    meta {
      pagination {
        total
      }
    }
  }
}
    `;
export const SortedPartnersDocument = gql`
    query SortedPartners($locale: I18NLocaleCode!) {
  featuredPartners: partners(
    locale: $locale
    pagination: {limit: 100}
    filters: {featured: {eq: true}}
    sort: "priority:asc"
  ) {
    data {
      ...PartnerEntity
    }
  }
  notFeaturedPartners: partners(
    locale: $locale
    pagination: {limit: 100}
    filters: {featured: {eq: false}}
    sort: "priority:asc"
  ) {
    data {
      ...PartnerEntity
    }
  }
}
    ${PartnerEntityFragmentDoc}`;
export const FooterDocument = gql`
    query Footer($locale: I18NLocaleCode!) {
  footer(locale: $locale) {
    data {
      id
      attributes {
        footerColumns {
          id
          title
          footerLink {
            id
            title
            otherSite
            redirectTo {
              data {
                ...PageWithBaseFieldsEntity
              }
            }
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
        copyrightText
      }
    }
  }
}
    ${PageWithBaseFieldsEntityFragmentDoc}`;
export const HomePageDocument = gql`
    query HomePage($locale: I18NLocaleCode!, $date: DateTime!) {
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
          faqs(pagination: {limit: 100}) {
            id
            question
            answer
          }
          ctas(pagination: {limit: 100}) {
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
        localizations {
          data {
            attributes {
              locale
            }
          }
        }
        Seo {
          id
          metaTitle
          metaDescription
          keywords
          metaRobots
          metaViewport
          canonicalURL
        }
      }
    }
  }
  menus(locale: $locale, sort: ["order:asc"]) {
    data {
      ...Menu
    }
  }
  upcomingEvents: events(
    locale: $locale
    sort: ["dateFrom:asc"]
    pagination: {start: 0, limit: 4}
    filters: {dateFrom: {gte: $date}}
  ) {
    data {
      ...EventCardEntity
    }
  }
  promotedNews: pages(
    filters: {promoted: {eq: true}, layout: {eq: "news"}}
    locale: $locale
  ) {
    data {
      ...PromoNewsCard
    }
  }
  promotedEvents: events(
    locale: $locale
    sort: "dateFrom:asc"
    filters: {promoted: {eq: true}}
  ) {
    data {
      ...EventCardEntity
    }
  }
  latestNews: pages(
    filters: {layout: {eq: "news"}}
    locale: $locale
    pagination: {start: 0, limit: 4}
    sort: "publishedAt:desc"
  ) {
    data {
      ...PageEntity
    }
  }
  bookTags(pagination: {limit: 100}) {
    data {
      ...BookTagEntity
    }
  }
  localityPages: pages(
    filters: {layout: {eq: "locality"}}
    locale: $locale
    pagination: {start: 0, limit: 100}
    sort: ["publishedAt:asc"]
  ) {
    data {
      ...PageEntity
    }
  }
  footer(locale: $locale) {
    data {
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
  }
}
    ${PageWithBaseFieldsEntityFragmentDoc}
${MenuFragmentDoc}
${EventCardEntityFragmentDoc}
${PromoNewsCardFragmentDoc}
${PageEntityFragmentDoc}
${BookTagEntityFragmentDoc}`;
export const PremisesDocument = gql`
    query Premises($locale: I18NLocaleCode!) {
  premises(locale: $locale) {
    data {
      ...PremiseEntity
    }
  }
}
    ${PremiseEntityFragmentDoc}`;
export const MenusDocument = gql`
    query Menus($locale: I18NLocaleCode!) {
  menus(locale: $locale, sort: ["order:asc"]) {
    data {
      ...Menu
    }
  }
}
    ${MenuFragmentDoc}`;
export const LatestNewsDocument = gql`
    query LatestNews($locale: I18NLocaleCode!) {
  pages(
    filters: {layout: {eq: "news"}}
    locale: $locale
    pagination: {start: 0, limit: 4}
    sort: "publishedAt:desc"
  ) {
    data {
      ...PageEntity
    }
  }
}
    ${PageEntityFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    BasicDocumentBySlug(variables: BasicDocumentBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BasicDocumentBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BasicDocumentBySlugQuery>(BasicDocumentBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BasicDocumentBySlug', 'query');
    },
    FileCategories(variables?: FileCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FileCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FileCategoriesQuery>(FileCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FileCategories', 'query');
    },
    BlogPostStaticPaths(variables?: BlogPostStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostStaticPathsQuery>(BlogPostStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPostStaticPaths', 'query');
    },
    BlogPostBySlug(variables: BlogPostBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostBySlugQuery>(BlogPostBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPostBySlug', 'query');
    },
    BlogPosts(variables?: BlogPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostsQuery>(BlogPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPosts', 'query');
    },
    BlogPostsCount(variables?: BlogPostsCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostsCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostsCountQuery>(BlogPostsCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPostsCount', 'query');
    },
    EventProperties(variables: EventPropertiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventPropertiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventPropertiesQuery>(EventPropertiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventProperties', 'query');
    },
    EventList(variables: EventListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventListQuery>(EventListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventList', 'query');
    },
    UpcomingEvents(variables: UpcomingEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpcomingEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpcomingEventsQuery>(UpcomingEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpcomingEvents', 'query');
    },
    PromotedEvents(variables: PromotedEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PromotedEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PromotedEventsQuery>(PromotedEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PromotedEvents', 'query');
    },
    EventBySlug(variables: EventBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventBySlugQuery>(EventBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventBySlug', 'query');
    },
    EventsCount(variables: EventsCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventsCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventsCountQuery>(EventsCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventsCount', 'query');
    },
    AllEventSlugs(variables: AllEventSlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllEventSlugsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllEventSlugsQuery>(AllEventSlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllEventSlugs', 'query');
    },
    PagesStaticPaths(variables?: PagesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesStaticPaths', 'query');
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>(PageBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PageBySlug', 'query');
    },
    PagesByLayout(variables: PagesByLayoutQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesByLayoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesByLayoutQuery>(PagesByLayoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesByLayout', 'query');
    },
    PagesByLayoutPaginated(variables: PagesByLayoutPaginatedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesByLayoutPaginatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesByLayoutPaginatedQuery>(PagesByLayoutPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesByLayoutPaginated', 'query');
    },
    PagesByLayoutCount(variables: PagesByLayoutCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesByLayoutCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesByLayoutCountQuery>(PagesByLayoutCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesByLayoutCount', 'query');
    },
    SortedPartners(variables: SortedPartnersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SortedPartnersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SortedPartnersQuery>(SortedPartnersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SortedPartners', 'query');
    },
    Footer(variables: FooterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FooterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FooterQuery>(FooterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Footer', 'query');
    },
    HomePage(variables: HomePageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomePageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomePageQuery>(HomePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomePage', 'query');
    },
    Premises(variables: PremisesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PremisesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PremisesQuery>(PremisesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Premises', 'query');
    },
    Menus(variables: MenusQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MenusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MenusQuery>(MenusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Menus', 'query');
    },
    LatestNews(variables: LatestNewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LatestNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LatestNewsQuery>(LatestNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LatestNews', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;