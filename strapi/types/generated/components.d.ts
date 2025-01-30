import type { Schema, Attribute } from '@strapi/strapi';

export interface AccordionItemsFlatText extends Schema.Component {
  collectionName: 'components_accordion_items_flat_texts';
  info: {
    displayName: 'flatText';
  };
  attributes: {
    category: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface AccordionItemsForm extends Schema.Component {
  collectionName: 'components_accordion_items_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    type: Attribute.Enumeration<
      [
        'napiste_nam',
        'ako_sa_prihlasit_do_kniznice',
        'cyklodonaska',
        'detail_podujatia',
        'pre_skoly',
        'darcekova_poukazka',
        'medzikniznicna_vypozicna_sluzba_citatel',
        'medzikniznicna_vypozicna_sluzba_kniznica',
        'hra_na_hudobne_nastroje',
        'tablety_a_citacky',
        'tablety',
        'pracujte_v_priestoroch_kniznice',
        'divadelna_technika',
        'prenajmite_si_priestor',
        'kniharska_dielna',
        'bibliografia_a_resers',
        'aka_kniha_vam_v_kniznici_chyba'
      ]
    >;
    category: Attribute.String;
  };
}

export interface AccordionItemsTableRow extends Schema.Component {
  collectionName: 'components_accordion_items_table_rows';
  info: {
    displayName: 'tableRow';
  };
  attributes: {
    tableCategory: Attribute.String;
    label: Attribute.String;
    value: Attribute.String;
    accordionCategory: Attribute.String;
    valueAlign: Attribute.Enumeration<['start', 'center']>;
  };
}

export interface AddressAddress extends Schema.Component {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    title: Attribute.String;
    navigateTo: Attribute.String;
  };
}

export interface BlocksAccordionItem extends Schema.Component {
  collectionName: 'components_blocks_accordion_items';
  info: {
    displayName: 'accordionItem';
  };
  attributes: {
    content: Attribute.RichText;
    label: Attribute.String;
  };
}

export interface BlocksBranchItemWithPage extends Schema.Component {
  collectionName: 'components_blocks_branch_item_with_pages';
  info: {
    displayName: 'branch item with page';
  };
  attributes: {
    branch: Attribute.Relation<
      'blocks.branch-item-with-page',
      'oneToOne',
      'api::branch.branch'
    >;
    page: Attribute.Relation<
      'blocks.branch-item-with-page',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface BlocksBranchItem extends Schema.Component {
  collectionName: 'components_blocks_branch_items';
  info: {
    displayName: 'branch item';
    icon: 'map-marker';
  };
  attributes: {
    branch: Attribute.Relation<
      'blocks.branch-item',
      'oneToOne',
      'api::branch.branch'
    >;
  };
}

export interface BlocksFileItem extends Schema.Component {
  collectionName: 'components_blocks_file_items';
  info: {
    displayName: 'file item';
  };
  attributes: {
    name: Attribute.String;
    attachment: Attribute.Media & Attribute.Required;
  };
}

export interface BlocksNoticeFiles extends Schema.Component {
  collectionName: 'components_blocks_notice_files';
  info: {
    displayName: 'notice files';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    files: Attribute.Component<'blocks.file-item', true>;
  };
}

export interface BlocksOpeningHoursItem extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_items';
  info: {
    displayName: 'opening hours item';
    icon: 'clock';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.DefaultTo<'Pondelok a\u017E piatok'>;
    time: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'8:00 - 19:00'>;
  };
}

export interface BlocksOpeningHours extends Schema.Component {
  collectionName: 'components_blocks_opening_hours';
  info: {
    displayName: 'opening hours';
    icon: 'clock';
    description: '';
  };
  attributes: {
    days: Attribute.Component<'blocks.opening-hours-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface BlocksPageLink extends Schema.Component {
  collectionName: 'components_blocks_page_links';
  info: {
    displayName: 'pageLink';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.Text;
    page: Attribute.Relation<'blocks.page-link', 'oneToOne', 'api::page.page'>;
  };
}

export interface BlocksSubpage extends Schema.Component {
  collectionName: 'components_blocks_subpages';
  info: {
    displayName: 'subpage';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    url: Attribute.String;
    page: Attribute.Relation<'blocks.subpage', 'oneToOne', 'api::page.page'>;
  };
}

export interface BlocksTableRow extends Schema.Component {
  collectionName: 'components_blocks_table_rows';
  info: {
    displayName: 'tableRow';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.String;
    valueAlign: Attribute.Enumeration<['start', 'center']>;
  };
}

export interface CommonSeo extends Schema.Component {
  collectionName: 'components_common_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    keywords: Attribute.String;
  };
}

export interface FooterFooterColumn extends Schema.Component {
  collectionName: 'components_footer_footer_columns';
  info: {
    displayName: 'footerColumn';
  };
  attributes: {
    title: Attribute.String;
    footerLink: Attribute.Component<'footer.footer-link', true>;
  };
}

export interface FooterFooterLink extends Schema.Component {
  collectionName: 'components_footer_footer_links';
  info: {
    displayName: 'footerLink';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    otherSite: Attribute.String;
    redirectTo: Attribute.Relation<
      'footer.footer-link',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface GuestsGuest extends Schema.Component {
  collectionName: 'components_guests_guests';
  info: {
    displayName: 'guest';
  };
  attributes: {
    name: Attribute.String;
    surname: Attribute.String;
    avatar: Attribute.Media;
  };
}

export interface HomepageBenefits extends Schema.Component {
  collectionName: 'components_homepage_benefits';
  info: {
    displayName: 'benefits';
  };
  attributes: {
    benefit: Attribute.String;
  };
}

export interface HomepageCta extends Schema.Component {
  collectionName: 'components_homepage_ctas';
  info: {
    displayName: 'cta';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    ctaRedirectTo: Attribute.Relation<
      'homepage.cta',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface HomepageFaqSection extends Schema.Component {
  collectionName: 'components_homepage_faq_sections';
  info: {
    displayName: 'faqSection';
    description: '';
  };
  attributes: {
    ctas: Attribute.Component<'homepage.cta', true>;
    faqs: Attribute.Component<'homepage.faqs', true>;
    title: Attribute.String;
    redirectTo: Attribute.Relation<
      'homepage.faq-section',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface HomepageFaqs extends Schema.Component {
  collectionName: 'components_homepage_faqs';
  info: {
    displayName: 'faqs';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.RichText;
  };
}

export interface HomepageNewsSection extends Schema.Component {
  collectionName: 'components_homepage_news_sections';
  info: {
    displayName: 'newsSection';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    redirectTo: Attribute.Relation<
      'homepage.news-section',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface HomepagePromotedContent extends Schema.Component {
  collectionName: 'components_homepage_promoted_content_sections';
  info: {
    displayName: 'promotedContent';
    description: '';
  };
  attributes: {
    events: Attribute.Relation<
      'homepage.promoted-content',
      'oneToMany',
      'api::event.event'
    >;
    notices: Attribute.Relation<
      'homepage.promoted-content',
      'oneToMany',
      'api::notice.notice'
    >;
  };
}

export interface HomepageRegistrationInfo extends Schema.Component {
  collectionName: 'components_homepage_registration_infos';
  info: {
    displayName: 'registrationInfo';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    registrationBenefits: Attribute.Component<'homepage.benefits', true>;
    redirectTo: Attribute.Relation<
      'homepage.registration-info',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface LocalityPartsGalleryParts extends Schema.Component {
  collectionName: 'components_locality_parts_gallery_parts';
  info: {
    displayName: 'gallery-parts';
  };
  attributes: {
    Photo: Attribute.Media;
    Description: Attribute.Text;
  };
}

export interface MenuSectionLinks extends Schema.Component {
  collectionName: 'components_menu_items_section_links';
  info: {
    displayName: 'sectionLinks';
    description: '';
  };
  attributes: {
    sectionLinkTitle: Attribute.String;
    sectionLinkPage: Attribute.Relation<
      'menu.section-links',
      'oneToOne',
      'api::page.page'
    >;
    sectionLinkBranch: Attribute.Relation<
      'menu.section-links',
      'oneToOne',
      'api::branch.branch'
    >;
  };
}

export interface MenuSections extends Schema.Component {
  collectionName: 'components_menu_items_sections';
  info: {
    displayName: 'sections';
    description: '';
  };
  attributes: {
    sectionTitle: Attribute.String;
    sectionColumnSpan: Attribute.Integer;
    sectionLinks: Attribute.Component<'menu.section-links', true>;
    sectionPage: Attribute.Relation<
      'menu.sections',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface MenuSubsectionLinks extends Schema.Component {
  collectionName: 'components_menu_items_subsection_links';
  info: {
    displayName: 'subsectionLinks';
    description: '';
  };
  attributes: {
    subsectionLinkTitle: Attribute.String;
    page: Attribute.Relation<
      'menu.subsection-links',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface MenuSubsection extends Schema.Component {
  collectionName: 'components_menu_items_subsections';
  info: {
    displayName: 'subsection';
    description: '';
  };
  attributes: {
    subsectionTitle: Attribute.String;
    columnSpan: Attribute.Integer;
    subsectionLinks: Attribute.Component<'menu.subsection-links', true>;
  };
}

export interface MetadataFaktury extends Schema.Component {
  collectionName: 'components_metadata_fakturies';
  info: {
    displayName: 'Fakt\u00FAry';
  };
  attributes: {
    name: Attribute.String;
    date: Attribute.Date;
    attachment: Attribute.Media;
  };
}

export interface MetadataMetadata extends Schema.Component {
  collectionName: 'components_metadata_granty';
  info: {
    name: 'Granty';
    icon: 'folder';
    description: '';
    displayName: 'Metadata';
  };
  attributes: {
    provider: Attribute.String;
    year: Attribute.Integer;
    grant_name: Attribute.String;
    grant_number: Attribute.String;
    description: Attribute.Text;
    amount: Attribute.String;
  };
}

export interface MetadataObchodnaVerejnaSutaz extends Schema.Component {
  collectionName: 'components_metadata_obchodna_verejna_sutaz';
  info: {
    displayName: 'Obchodn\u00E1 Verejn\u00E1 S\u00FA\u0165a\u017E';
  };
  attributes: {
    subject: Attribute.String;
    description: Attribute.Text;
    number: Attribute.String;
    date_added: Attribute.Date;
    attachment: Attribute.Media;
    amount: Attribute.String;
  };
}

export interface MetadataObjednavky extends Schema.Component {
  collectionName: 'components_metadata_objednavky';
  info: {
    displayName: 'Objedn\u00E1vky';
  };
  attributes: {
    title: Attribute.String;
    date_period: Attribute.Date;
    date_added: Attribute.Date;
    attachment: Attribute.Media;
  };
}

export interface MetadataVerejneObstaravanie extends Schema.Component {
  collectionName: 'components_metadata_verejne_obstaravanies';
  info: {
    displayName: 'Verejn\u00E9 Obstar\u00E1vanie';
  };
  attributes: {
    subject: Attribute.String;
    date_added: Attribute.Date;
    number: Attribute.String;
    description: Attribute.Text;
    attachment: Attribute.Media;
    amount: Attribute.String;
  };
}

export interface MetadataZmluvy extends Schema.Component {
  collectionName: 'components_metadata_zmluvy';
  info: {
    displayName: 'Zmluvy';
  };
  attributes: {
    date: Attribute.Date;
    type: Attribute.String;
    number: Attribute.String;
    supplier: Attribute.String;
    subject: Attribute.String;
    amount: Attribute.String;
  };
}

export interface SectionsAccordion extends Schema.Component {
  collectionName: 'components_sections_accordions';
  info: {
    displayName: 'Akorde\u00F3n';
  };
  attributes: {
    title: Attribute.String;
    flatText: Attribute.Component<'accordion-items.flat-text', true>;
    tableRows: Attribute.Component<'accordion-items.table-row', true>;
    forms: Attribute.Component<'accordion-items.form', true>;
  };
}

export interface SectionsBlogPostsListing extends Schema.Component {
  collectionName: 'components_sections_blog_posts_listing';
  info: {
    displayName: 'Listing: \u010Cl\u00E1nky';
  };
  attributes: {};
}

export interface SectionsCherrypickSection extends Schema.Component {
  collectionName: 'components_sections_cherrypick_sections';
  info: {
    displayName: 'V\u00FDber podstr\u00E1nok';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    pages: Attribute.Relation<
      'sections.cherrypick-section',
      'oneToMany',
      'api::page.page'
    >;
  };
}

export interface SectionsChildrenListing extends Schema.Component {
  collectionName: 'components_sections_children_listings';
  info: {
    displayName: 'Zoznam podstr\u00E1nok';
  };
  attributes: {
    depth: Attribute.Enumeration<['depth-1', 'depth-2']> &
      Attribute.Required &
      Attribute.DefaultTo<'depth-1'>;
  };
}

export interface SectionsCta extends Schema.Component {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
  };
}

export interface SectionsDivider extends Schema.Component {
  collectionName: 'components_blocks_dividers';
  info: {
    displayName: 'Odde\u013Eova\u010D';
    description: '';
  };
  attributes: {};
}

export interface SectionsDocumentsListing extends Schema.Component {
  collectionName: 'components_sections_documents_listing';
  info: {
    displayName: 'Listing: Dokumenty a Zverej\u0148ovanie';
  };
  attributes: {};
}

export interface SectionsDocuments extends Schema.Component {
  collectionName: 'components_sections_documents';
  info: {
    displayName: 'Dokumenty';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    basicDocuments: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::basic-document.basic-document'
    >;
    documents: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::document.document'
    >;
    disclosures: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::disclosure.disclosure'
    >;
  };
}

export interface SectionsEventsListing extends Schema.Component {
  collectionName: 'components_sections_events_listing';
  info: {
    displayName: 'Listing: Podujatia';
  };
  attributes: {};
}

export interface SectionsFaq extends Schema.Component {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    title: Attribute.String;
    questions: Attribute.Component<'blocks.accordion-item', true>;
    ctaButton: Attribute.String;
    redirectTo: Attribute.Relation<
      'sections.faq',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface SectionsFlatText extends Schema.Component {
  collectionName: 'components_sections_flat_texts';
  info: {
    displayName: 'Richtext';
    description: '';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsForm extends Schema.Component {
  collectionName: 'components_sections_forms';
  info: {
    displayName: 'Formul\u00E1r';
  };
  attributes: {
    type: Attribute.Enumeration<
      [
        'napiste_nam',
        'ako_sa_prihlasit_do_kniznice',
        'cyklodonaska',
        'detail_podujatia',
        'pre_skoly',
        'darcekova_poukazka',
        'medzikniznicna_vypozicna_sluzba_citatel',
        'medzikniznicna_vypozicna_sluzba_kniznica',
        'hra_na_hudobne_nastroje',
        'tablety_a_citacky',
        'tablety',
        'pracujte_v_priestoroch_kniznice',
        'divadelna_technika',
        'prenajmite_si_priestor',
        'kniharska_dielna',
        'bibliografia_a_resers',
        'aka_kniha_vam_v_kniznici_chyba'
      ]
    >;
  };
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gal\u00E9ria obr\u00E1zkov';
  };
  attributes: {
    Gallery: Attribute.Component<'locality-parts.gallery-parts', true>;
  };
}

export interface SectionsMap extends Schema.Component {
  collectionName: 'components_sections_maps';
  info: {
    displayName: 'Mapa pobo\u010Diek';
  };
  attributes: {
    title: Attribute.String;
    branches: Attribute.Component<'blocks.branch-item', true>;
  };
}

export interface SectionsNewBooksListing extends Schema.Component {
  collectionName: 'components_sections_new_books_listing';
  info: {
    displayName: 'Listing: Kni\u017En\u00E9 novinky';
  };
  attributes: {};
}

export interface SectionsNewsListing extends Schema.Component {
  collectionName: 'components_sections_news_listing';
  info: {
    displayName: 'Listing: Aktuality';
  };
  attributes: {};
}

export interface SectionsOpeningHoursSection extends Schema.Component {
  collectionName: 'components_sections_opening_hours_sections';
  info: {
    displayName: 'Otv\u00E1racie hodiny';
  };
  attributes: {
    title: Attribute.String;
    branchList: Attribute.Relation<
      'sections.opening-hours-section',
      'oneToMany',
      'api::branch.branch'
    >;
  };
}

export interface SectionsPartners extends Schema.Component {
  collectionName: 'components_sections_partners';
  info: {
    displayName: 'Partneri';
  };
  attributes: {};
}

export interface SectionsRental extends Schema.Component {
  collectionName: 'components_sections_rentals';
  info: {
    displayName: 'Pren\u00E1jom priestorov';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    branches: Attribute.Component<'blocks.branch-item-with-page', true>;
  };
}

export interface SectionsSiteUsefullness extends Schema.Component {
  collectionName: 'components_sections_site_usefullnesses';
  info: {
    displayName: 'U\u017Eito\u010Dnos\u0165 str\u00E1nky';
  };
  attributes: {
    title: Attribute.String;
    thankYouMessage: Attribute.String;
  };
}

export interface SectionsSubpages extends Schema.Component {
  collectionName: 'components_sections_subpages';
  info: {
    displayName: 'Extern\u00E9 str\u00E1nky';
  };
  attributes: {
    title: Attribute.String;
    subpages: Attribute.Component<'blocks.subpage', true>;
  };
}

export interface SectionsTable extends Schema.Component {
  collectionName: 'components_blocks_tables';
  info: {
    displayName: 'Tabu\u013Eka';
  };
  attributes: {
    primaryTitle: Attribute.String;
    rows: Attribute.Component<'accordion-items.table-row', true>;
    secondaryTitle: Attribute.String;
  };
}

export interface SectionsVideo extends Schema.Component {
  collectionName: 'components_sections_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    youtube_url: Attribute.String;
    media: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'accordion-items.flat-text': AccordionItemsFlatText;
      'accordion-items.form': AccordionItemsForm;
      'accordion-items.table-row': AccordionItemsTableRow;
      'address.address': AddressAddress;
      'blocks.accordion-item': BlocksAccordionItem;
      'blocks.branch-item-with-page': BlocksBranchItemWithPage;
      'blocks.branch-item': BlocksBranchItem;
      'blocks.file-item': BlocksFileItem;
      'blocks.notice-files': BlocksNoticeFiles;
      'blocks.opening-hours-item': BlocksOpeningHoursItem;
      'blocks.opening-hours': BlocksOpeningHours;
      'blocks.page-link': BlocksPageLink;
      'blocks.subpage': BlocksSubpage;
      'blocks.table-row': BlocksTableRow;
      'common.seo': CommonSeo;
      'footer.footer-column': FooterFooterColumn;
      'footer.footer-link': FooterFooterLink;
      'guests.guest': GuestsGuest;
      'homepage.benefits': HomepageBenefits;
      'homepage.cta': HomepageCta;
      'homepage.faq-section': HomepageFaqSection;
      'homepage.faqs': HomepageFaqs;
      'homepage.news-section': HomepageNewsSection;
      'homepage.promoted-content': HomepagePromotedContent;
      'homepage.registration-info': HomepageRegistrationInfo;
      'locality-parts.gallery-parts': LocalityPartsGalleryParts;
      'menu.section-links': MenuSectionLinks;
      'menu.sections': MenuSections;
      'menu.subsection-links': MenuSubsectionLinks;
      'menu.subsection': MenuSubsection;
      'metadata.faktury': MetadataFaktury;
      'metadata.metadata': MetadataMetadata;
      'metadata.obchodna-verejna-sutaz': MetadataObchodnaVerejnaSutaz;
      'metadata.objednavky': MetadataObjednavky;
      'metadata.verejne-obstaravanie': MetadataVerejneObstaravanie;
      'metadata.zmluvy': MetadataZmluvy;
      'sections.accordion': SectionsAccordion;
      'sections.blog-posts-listing': SectionsBlogPostsListing;
      'sections.cherrypick-section': SectionsCherrypickSection;
      'sections.children-listing': SectionsChildrenListing;
      'sections.cta': SectionsCta;
      'sections.divider': SectionsDivider;
      'sections.documents-listing': SectionsDocumentsListing;
      'sections.documents': SectionsDocuments;
      'sections.events-listing': SectionsEventsListing;
      'sections.faq': SectionsFaq;
      'sections.flat-text': SectionsFlatText;
      'sections.form': SectionsForm;
      'sections.gallery': SectionsGallery;
      'sections.map': SectionsMap;
      'sections.new-books-listing': SectionsNewBooksListing;
      'sections.news-listing': SectionsNewsListing;
      'sections.opening-hours-section': SectionsOpeningHoursSection;
      'sections.partners': SectionsPartners;
      'sections.rental': SectionsRental;
      'sections.site-usefullness': SectionsSiteUsefullness;
      'sections.subpages': SectionsSubpages;
      'sections.table': SectionsTable;
      'sections.video': SectionsVideo;
    }
  }
}
