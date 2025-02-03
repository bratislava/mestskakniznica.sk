import type { Attribute, Schema } from '@strapi/strapi';

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
    category: Attribute.String;
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

export interface AccordionItemsTableRow extends Schema.Component {
  collectionName: 'components_accordion_items_table_rows';
  info: {
    displayName: 'tableRow';
  };
  attributes: {
    accordionCategory: Attribute.String;
    label: Attribute.String;
    tableCategory: Attribute.String;
    value: Attribute.String;
    valueAlign: Attribute.Enumeration<['start', 'center']>;
  };
}

export interface AddressAddress extends Schema.Component {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    navigateTo: Attribute.String;
    title: Attribute.String;
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

export interface BlocksFileItem extends Schema.Component {
  collectionName: 'components_blocks_file_items';
  info: {
    displayName: 'file item';
  };
  attributes: {
    attachment: Attribute.Media<'images' | 'files'> & Attribute.Required;
    name: Attribute.String;
  };
}

export interface BlocksNoticeFiles extends Schema.Component {
  collectionName: 'components_blocks_notice_files';
  info: {
    description: '';
    displayName: 'notice files';
  };
  attributes: {
    files: Attribute.Component<'blocks.file-item', true>;
    title: Attribute.String;
  };
}

export interface BlocksOpeningHours extends Schema.Component {
  collectionName: 'components_blocks_opening_hours';
  info: {
    description: '';
    displayName: 'opening hours';
    icon: 'clock';
  };
  attributes: {
    days: Attribute.Component<'blocks.opening-hours-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface BlocksOpeningHoursItem extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_items';
  info: {
    description: '';
    displayName: 'opening hours item';
    icon: 'clock';
  };
  attributes: {
    label: Attribute.String & Attribute.DefaultTo<'Pondelok a\u017E piatok'>;
    time: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'8:00 - 19:00'>;
  };
}

export interface BlocksPageLink extends Schema.Component {
  collectionName: 'components_blocks_page_links';
  info: {
    description: '';
    displayName: 'pageLink';
  };
  attributes: {
    page: Attribute.Relation<'blocks.page-link', 'oneToOne', 'api::page.page'>;
    title: Attribute.String;
    url: Attribute.Text;
  };
}

export interface BlocksSubpage extends Schema.Component {
  collectionName: 'components_blocks_subpages';
  info: {
    description: '';
    displayName: 'subpage';
  };
  attributes: {
    description: Attribute.RichText;
    page: Attribute.Relation<'blocks.subpage', 'oneToOne', 'api::page.page'>;
    title: Attribute.String;
    url: Attribute.String;
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
    keywords: Attribute.String;
    metaDescription: Attribute.Text;
    metaTitle: Attribute.String;
  };
}

export interface FooterFooterColumn extends Schema.Component {
  collectionName: 'components_footer_footer_columns';
  info: {
    displayName: 'footerColumn';
  };
  attributes: {
    footerLink: Attribute.Component<'footer.footer-link', true>;
    title: Attribute.String;
  };
}

export interface FooterFooterLink extends Schema.Component {
  collectionName: 'components_footer_footer_links';
  info: {
    description: '';
    displayName: 'footerLink';
  };
  attributes: {
    otherSite: Attribute.String;
    redirectTo: Attribute.Relation<
      'footer.footer-link',
      'oneToOne',
      'api::page.page'
    >;
    title: Attribute.String;
  };
}

export interface GuestsGuest extends Schema.Component {
  collectionName: 'components_guests_guests';
  info: {
    displayName: 'guest';
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String;
    surname: Attribute.String;
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
    description: '';
    displayName: 'cta';
  };
  attributes: {
    ctaRedirectTo: Attribute.Relation<
      'homepage.cta',
      'oneToOne',
      'api::page.page'
    >;
    title: Attribute.String;
  };
}

export interface HomepageFaqSection extends Schema.Component {
  collectionName: 'components_homepage_faq_sections';
  info: {
    description: '';
    displayName: 'faqSection';
  };
  attributes: {
    ctas: Attribute.Component<'homepage.cta', true>;
    faqs: Attribute.Component<'homepage.faqs', true>;
    redirectTo: Attribute.Relation<
      'homepage.faq-section',
      'oneToOne',
      'api::page.page'
    >;
    title: Attribute.String;
  };
}

export interface HomepageFaqs extends Schema.Component {
  collectionName: 'components_homepage_faqs';
  info: {
    displayName: 'faqs';
  };
  attributes: {
    answer: Attribute.RichText;
    question: Attribute.String;
  };
}

export interface HomepageNewsSection extends Schema.Component {
  collectionName: 'components_homepage_news_sections';
  info: {
    description: '';
    displayName: 'newsSection';
  };
  attributes: {
    redirectTo: Attribute.Relation<
      'homepage.news-section',
      'oneToOne',
      'api::page.page'
    >;
    title: Attribute.String;
  };
}

export interface HomepagePromotedContent extends Schema.Component {
  collectionName: 'components_homepage_promoted_content_sections';
  info: {
    description: '';
    displayName: 'promotedContent';
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
    description: '';
    displayName: 'registrationInfo';
  };
  attributes: {
    description: Attribute.String;
    redirectTo: Attribute.Relation<
      'homepage.registration-info',
      'oneToOne',
      'api::page.page'
    >;
    registrationBenefits: Attribute.Component<'homepage.benefits', true>;
    title: Attribute.String;
  };
}

export interface LocalityPartsGalleryParts extends Schema.Component {
  collectionName: 'components_locality_parts_gallery_parts';
  info: {
    displayName: 'gallery-parts';
  };
  attributes: {
    Description: Attribute.Text;
    Photo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MenuSectionLinks extends Schema.Component {
  collectionName: 'components_menu_items_section_links';
  info: {
    description: '';
    displayName: 'sectionLinks';
  };
  attributes: {
    sectionLinkBranch: Attribute.Relation<
      'menu.section-links',
      'oneToOne',
      'api::branch.branch'
    >;
    sectionLinkPage: Attribute.Relation<
      'menu.section-links',
      'oneToOne',
      'api::page.page'
    >;
    sectionLinkTitle: Attribute.String;
  };
}

export interface MenuSections extends Schema.Component {
  collectionName: 'components_menu_items_sections';
  info: {
    description: '';
    displayName: 'sections';
  };
  attributes: {
    sectionColumnSpan: Attribute.Integer;
    sectionLinks: Attribute.Component<'menu.section-links', true>;
    sectionPage: Attribute.Relation<
      'menu.sections',
      'oneToOne',
      'api::page.page'
    >;
    sectionTitle: Attribute.String;
  };
}

export interface MenuSubsection extends Schema.Component {
  collectionName: 'components_menu_items_subsections';
  info: {
    description: '';
    displayName: 'subsection';
  };
  attributes: {
    columnSpan: Attribute.Integer;
    subsectionLinks: Attribute.Component<'menu.subsection-links', true>;
    subsectionTitle: Attribute.String;
  };
}

export interface MenuSubsectionLinks extends Schema.Component {
  collectionName: 'components_menu_items_subsection_links';
  info: {
    description: '';
    displayName: 'subsectionLinks';
  };
  attributes: {
    page: Attribute.Relation<
      'menu.subsection-links',
      'oneToOne',
      'api::page.page'
    >;
    subsectionLinkTitle: Attribute.String;
  };
}

export interface MetadataFaktury extends Schema.Component {
  collectionName: 'components_metadata_fakturies';
  info: {
    displayName: 'Fakt\u00FAry';
  };
  attributes: {
    attachment: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date: Attribute.Date;
    name: Attribute.String;
  };
}

export interface MetadataMetadata extends Schema.Component {
  collectionName: 'components_metadata_granty';
  info: {
    description: '';
    displayName: 'Metadata';
    icon: 'folder';
    name: 'Granty';
  };
  attributes: {
    amount: Attribute.String;
    description: Attribute.Text;
    grant_name: Attribute.String;
    grant_number: Attribute.String;
    provider: Attribute.String;
    year: Attribute.Integer;
  };
}

export interface MetadataObchodnaVerejnaSutaz extends Schema.Component {
  collectionName: 'components_metadata_obchodna_verejna_sutaz';
  info: {
    displayName: 'Obchodn\u00E1 Verejn\u00E1 S\u00FA\u0165a\u017E';
  };
  attributes: {
    amount: Attribute.String;
    attachment: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date_added: Attribute.Date;
    description: Attribute.Text;
    number: Attribute.String;
    subject: Attribute.String;
  };
}

export interface MetadataObjednavky extends Schema.Component {
  collectionName: 'components_metadata_objednavky';
  info: {
    displayName: 'Objedn\u00E1vky';
  };
  attributes: {
    attachment: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date_added: Attribute.Date;
    date_period: Attribute.Date;
    title: Attribute.String;
  };
}

export interface MetadataVerejneObstaravanie extends Schema.Component {
  collectionName: 'components_metadata_verejne_obstaravanies';
  info: {
    displayName: 'Verejn\u00E9 Obstar\u00E1vanie';
  };
  attributes: {
    amount: Attribute.String;
    attachment: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date_added: Attribute.Date;
    description: Attribute.Text;
    number: Attribute.String;
    subject: Attribute.String;
  };
}

export interface MetadataZmluvy extends Schema.Component {
  collectionName: 'components_metadata_zmluvy';
  info: {
    displayName: 'Zmluvy';
  };
  attributes: {
    amount: Attribute.String;
    date: Attribute.Date;
    number: Attribute.String;
    subject: Attribute.String;
    supplier: Attribute.String;
    type: Attribute.String;
  };
}

export interface SectionsAccordion extends Schema.Component {
  collectionName: 'components_sections_accordions';
  info: {
    displayName: 'Akorde\u00F3n';
  };
  attributes: {
    flatText: Attribute.Component<'accordion-items.flat-text', true>;
    forms: Attribute.Component<'accordion-items.form', true>;
    tableRows: Attribute.Component<'accordion-items.table-row', true>;
    title: Attribute.String;
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
    description: '';
    displayName: 'V\u00FDber podstr\u00E1nok';
  };
  attributes: {
    pages: Attribute.Relation<
      'sections.cherrypick-section',
      'oneToMany',
      'api::page.page'
    >;
    title: Attribute.String;
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
    description: '';
    displayName: 'Odde\u013Eova\u010D';
  };
  attributes: {};
}

export interface SectionsDocuments extends Schema.Component {
  collectionName: 'components_sections_documents';
  info: {
    description: '';
    displayName: 'Dokumenty';
  };
  attributes: {
    basicDocuments: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::basic-document.basic-document'
    >;
    disclosures: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::disclosure.disclosure'
    >;
    documents: Attribute.Relation<
      'sections.documents',
      'oneToMany',
      'api::document.document'
    >;
    title: Attribute.String;
  };
}

export interface SectionsDocumentsListing extends Schema.Component {
  collectionName: 'components_sections_documents_listing';
  info: {
    displayName: 'Listing: Dokumenty a Zverej\u0148ovanie';
  };
  attributes: {};
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
    ctaButton: Attribute.String;
    questions: Attribute.Component<'blocks.accordion-item', true>;
    redirectTo: Attribute.Relation<
      'sections.faq',
      'oneToOne',
      'api::page.page'
    >;
    title: Attribute.String;
  };
}

export interface SectionsFlatText extends Schema.Component {
  collectionName: 'components_sections_flat_texts';
  info: {
    description: '';
    displayName: 'Richtext';
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
    branches: Attribute.Component<'blocks.branch-item', true>;
    title: Attribute.String;
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
    branchList: Attribute.Relation<
      'sections.opening-hours-section',
      'oneToMany',
      'api::branch.branch'
    >;
    title: Attribute.String;
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
    description: '';
    displayName: 'Pren\u00E1jom priestorov';
  };
  attributes: {
    branches: Attribute.Component<'blocks.branch-item-with-page', true>;
    text: Attribute.RichText;
    title: Attribute.String;
  };
}

export interface SectionsSiteUsefullness extends Schema.Component {
  collectionName: 'components_sections_site_usefullnesses';
  info: {
    displayName: 'U\u017Eito\u010Dnos\u0165 str\u00E1nky';
  };
  attributes: {
    thankYouMessage: Attribute.String;
    title: Attribute.String;
  };
}

export interface SectionsSubpages extends Schema.Component {
  collectionName: 'components_sections_subpages';
  info: {
    displayName: 'Extern\u00E9 str\u00E1nky';
  };
  attributes: {
    subpages: Attribute.Component<'blocks.subpage', true>;
    title: Attribute.String;
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
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    youtube_url: Attribute.String;
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
      'blocks.branch-item': BlocksBranchItem;
      'blocks.branch-item-with-page': BlocksBranchItemWithPage;
      'blocks.file-item': BlocksFileItem;
      'blocks.notice-files': BlocksNoticeFiles;
      'blocks.opening-hours': BlocksOpeningHours;
      'blocks.opening-hours-item': BlocksOpeningHoursItem;
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
      'menu.subsection': MenuSubsection;
      'menu.subsection-links': MenuSubsectionLinks;
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
      'sections.documents': SectionsDocuments;
      'sections.documents-listing': SectionsDocumentsListing;
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
