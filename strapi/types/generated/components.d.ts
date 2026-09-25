import type { Schema, Struct } from '@strapi/strapi'

export interface AccordionItemsFlatText extends Struct.ComponentSchema {
  collectionName: 'components_accordion_items_flat_texts'
  info: {
    displayName: 'flatText'
  }
  attributes: {
    category: Schema.Attribute.String
    content: Schema.Attribute.RichText
  }
}

export interface AccordionItemsForm extends Struct.ComponentSchema {
  collectionName: 'components_accordion_items_forms'
  info: {
    displayName: 'form'
  }
  attributes: {
    category: Schema.Attribute.String
    type: Schema.Attribute.Enumeration<
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
        'aka_kniha_vam_v_kniznici_chyba',
      ]
    >
  }
}

export interface AccordionItemsTableRow extends Struct.ComponentSchema {
  collectionName: 'components_accordion_items_table_rows'
  info: {
    displayName: 'tableRow'
  }
  attributes: {
    accordionCategory: Schema.Attribute.String
    label: Schema.Attribute.String
    tableCategory: Schema.Attribute.String
    value: Schema.Attribute.String
    valueAlign: Schema.Attribute.Enumeration<['start', 'center']>
  }
}

export interface AddressAddress extends Struct.ComponentSchema {
  collectionName: 'components_address_addresses'
  info: {
    displayName: 'address'
  }
  attributes: {
    navigateTo: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface BlocksAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordion_items'
  info: {
    displayName: 'accordionItem'
  }
  attributes: {
    content: Schema.Attribute.RichText
    label: Schema.Attribute.String
  }
}

export interface BlocksBranchItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_branch_items'
  info: {
    displayName: 'branch item'
    icon: 'map-marker'
  }
  attributes: {
    branch: Schema.Attribute.Relation<'oneToOne', 'api::branch.branch'>
  }
}

export interface BlocksBranchItemWithPage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_branch_item_with_pages'
  info: {
    displayName: 'branch item with page'
  }
  attributes: {
    branch: Schema.Attribute.Relation<'oneToOne', 'api::branch.branch'>
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface BlocksFileItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_file_items'
  info: {
    displayName: 'file item'
  }
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required
    name: Schema.Attribute.String
  }
}

export interface BlocksNoticeFiles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_notice_files'
  info: {
    description: ''
    displayName: 'notice files'
  }
  attributes: {
    files: Schema.Attribute.Component<'blocks.file-item', true>
    title: Schema.Attribute.String
  }
}

export interface BlocksOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_blocks_opening_hours'
  info: {
    description: ''
    displayName: 'opening hours'
    icon: 'clock'
  }
  attributes: {
    days: Schema.Attribute.Component<'blocks.opening-hours-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
  }
}

export interface BlocksOpeningHoursItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_opening_hours_items'
  info: {
    description: ''
    displayName: 'opening hours item'
    icon: 'clock'
  }
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Pondelok a\u017E piatok'>
    time: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'8:00 - 19:00'>
  }
}

export interface BlocksPageLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_page_links'
  info: {
    description: ''
    displayName: 'pageLink'
  }
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
    url: Schema.Attribute.Text
  }
}

export interface BlocksSubpage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_subpages'
  info: {
    description: ''
    displayName: 'subpage'
  }
  attributes: {
    description: Schema.Attribute.RichText
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
    url: Schema.Attribute.String
  }
}

export interface BlocksTableRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_table_rows'
  info: {
    displayName: 'tableRow'
  }
  attributes: {
    label: Schema.Attribute.String
    value: Schema.Attribute.String
    valueAlign: Schema.Attribute.Enumeration<['start', 'center']>
  }
}

export interface CommonSeo extends Struct.ComponentSchema {
  collectionName: 'components_common_seos'
  info: {
    displayName: 'seo'
  }
  attributes: {
    keywords: Schema.Attribute.String
    metaDescription: Schema.Attribute.Text
    metaTitle: Schema.Attribute.String
  }
}

export interface FooterFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_columns'
  info: {
    displayName: 'footerColumn'
  }
  attributes: {
    footerLink: Schema.Attribute.Component<'footer.footer-link', true>
    title: Schema.Attribute.String
  }
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_links'
  info: {
    description: ''
    displayName: 'footerLink'
  }
  attributes: {
    otherSite: Schema.Attribute.String
    redirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface GuestsGuest extends Struct.ComponentSchema {
  collectionName: 'components_guests_guests'
  info: {
    displayName: 'guest'
  }
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    name: Schema.Attribute.String
    surname: Schema.Attribute.String
  }
}

export interface HomepageBenefits extends Struct.ComponentSchema {
  collectionName: 'components_homepage_benefits'
  info: {
    displayName: 'benefits'
  }
  attributes: {
    benefit: Schema.Attribute.String
  }
}

export interface HomepageCta extends Struct.ComponentSchema {
  collectionName: 'components_homepage_ctas'
  info: {
    description: ''
    displayName: 'cta'
  }
  attributes: {
    ctaRedirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface HomepageFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_faq_sections'
  info: {
    description: ''
    displayName: 'faqSection'
  }
  attributes: {
    ctas: Schema.Attribute.Component<'homepage.cta', true>
    faqs: Schema.Attribute.Component<'homepage.faqs', true>
    redirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface HomepageFaqs extends Struct.ComponentSchema {
  collectionName: 'components_homepage_faqs'
  info: {
    displayName: 'faqs'
  }
  attributes: {
    answer: Schema.Attribute.RichText
    question: Schema.Attribute.String
  }
}

export interface HomepageNewsSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_news_sections'
  info: {
    description: ''
    displayName: 'newsSection'
  }
  attributes: {
    redirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface HomepagePromotedContent extends Struct.ComponentSchema {
  collectionName: 'components_homepage_promoted_content_sections'
  info: {
    description: ''
    displayName: 'promotedContent'
  }
  attributes: {
    events: Schema.Attribute.Relation<'oneToMany', 'api::event.event'>
    notices: Schema.Attribute.Relation<'oneToMany', 'api::notice.notice'>
  }
}

export interface HomepageRegistrationInfo extends Struct.ComponentSchema {
  collectionName: 'components_homepage_registration_infos'
  info: {
    description: ''
    displayName: 'registrationInfo'
  }
  attributes: {
    description: Schema.Attribute.String
    redirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    registrationBenefits: Schema.Attribute.Component<'homepage.benefits', true>
    title: Schema.Attribute.String
  }
}

export interface LocalityPartsGalleryParts extends Struct.ComponentSchema {
  collectionName: 'components_locality_parts_gallery_parts'
  info: {
    displayName: 'gallery-parts'
  }
  attributes: {
    Description: Schema.Attribute.Text
    Photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
  }
}

export interface MenuSectionLinks extends Struct.ComponentSchema {
  collectionName: 'components_menu_items_section_links'
  info: {
    description: ''
    displayName: 'sectionLinks'
  }
  attributes: {
    sectionLinkBranch: Schema.Attribute.Relation<'oneToOne', 'api::branch.branch'>
    sectionLinkPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    sectionLinkTitle: Schema.Attribute.String
  }
}

export interface MenuSections extends Struct.ComponentSchema {
  collectionName: 'components_menu_items_sections'
  info: {
    description: ''
    displayName: 'sections'
  }
  attributes: {
    sectionColumnSpan: Schema.Attribute.Integer
    sectionLinks: Schema.Attribute.Component<'menu.section-links', true>
    sectionPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    sectionTitle: Schema.Attribute.String
  }
}

export interface MenuSubsection extends Struct.ComponentSchema {
  collectionName: 'components_menu_items_subsections'
  info: {
    description: ''
    displayName: 'subsection'
  }
  attributes: {
    columnSpan: Schema.Attribute.Integer
    subsectionLinks: Schema.Attribute.Component<'menu.subsection-links', true>
    subsectionTitle: Schema.Attribute.String
  }
}

export interface MenuSubsectionLinks extends Struct.ComponentSchema {
  collectionName: 'components_menu_items_subsection_links'
  info: {
    description: ''
    displayName: 'subsectionLinks'
  }
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    subsectionLinkTitle: Schema.Attribute.String
  }
}

export interface MetadataFaktury extends Struct.ComponentSchema {
  collectionName: 'components_metadata_fakturies'
  info: {
    displayName: 'Fakt\u00FAry'
  }
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    date: Schema.Attribute.Date
    name: Schema.Attribute.String
  }
}

export interface MetadataMetadata extends Struct.ComponentSchema {
  collectionName: 'components_metadata_granty'
  info: {
    description: ''
    displayName: 'Metadata'
    icon: 'folder'
    name: 'Granty'
  }
  attributes: {
    amount: Schema.Attribute.String
    description: Schema.Attribute.Text
    grant_name: Schema.Attribute.String
    grant_number: Schema.Attribute.String
    provider: Schema.Attribute.String
    year: Schema.Attribute.Integer
  }
}

export interface MetadataObchodnaVerejnaSutaz extends Struct.ComponentSchema {
  collectionName: 'components_metadata_obchodna_verejna_sutaz'
  info: {
    displayName: 'Obchodn\u00E1 Verejn\u00E1 S\u00FA\u0165a\u017E'
  }
  attributes: {
    amount: Schema.Attribute.String
    attachment: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    date_added: Schema.Attribute.Date
    description: Schema.Attribute.Text
    number: Schema.Attribute.String
    subject: Schema.Attribute.String
  }
}

export interface MetadataObjednavky extends Struct.ComponentSchema {
  collectionName: 'components_metadata_objednavky'
  info: {
    displayName: 'Objedn\u00E1vky'
  }
  attributes: {
    attachment: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    date_added: Schema.Attribute.Date
    date_period: Schema.Attribute.Date
    title: Schema.Attribute.String
  }
}

export interface MetadataVerejneObstaravanie extends Struct.ComponentSchema {
  collectionName: 'components_metadata_verejne_obstaravanies'
  info: {
    displayName: 'Verejn\u00E9 Obstar\u00E1vanie'
  }
  attributes: {
    amount: Schema.Attribute.String
    attachment: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    date_added: Schema.Attribute.Date
    description: Schema.Attribute.Text
    number: Schema.Attribute.String
    subject: Schema.Attribute.String
  }
}

export interface MetadataZmluvy extends Struct.ComponentSchema {
  collectionName: 'components_metadata_zmluvy'
  info: {
    displayName: 'Zmluvy'
  }
  attributes: {
    amount: Schema.Attribute.String
    date: Schema.Attribute.Date
    number: Schema.Attribute.String
    subject: Schema.Attribute.String
    supplier: Schema.Attribute.String
    type: Schema.Attribute.String
  }
}

export interface SectionsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_accordions'
  info: {
    displayName: 'Akorde\u00F3n'
  }
  attributes: {
    flatText: Schema.Attribute.Component<'accordion-items.flat-text', true>
    forms: Schema.Attribute.Component<'accordion-items.form', true>
    tableRows: Schema.Attribute.Component<'accordion-items.table-row', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsAssets extends Struct.ComponentSchema {
  collectionName: 'components_sections_assets'
  info: {
    displayName: 'Assety'
  }
  attributes: {
    assets: Schema.Attribute.Relation<'oneToMany', 'api::asset.asset'>
    basicDocuments: Schema.Attribute.Relation<'oneToMany', 'api::basic-document.basic-document'>
    disclosures: Schema.Attribute.Relation<'oneToMany', 'api::disclosure.disclosure'>
    title: Schema.Attribute.String
  }
}

export interface SectionsAssetsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_assets_listing'
  info: {
    displayName: 'Listing: Assety a Zverej\u0148ovanie'
  }
  attributes: {}
}

export interface SectionsBlogPostsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_posts_listing'
  info: {
    displayName: 'Listing: \u010Cl\u00E1nky'
  }
  attributes: {}
}

export interface SectionsCherrypickSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cherrypick_sections'
  info: {
    description: ''
    displayName: 'V\u00FDber podstr\u00E1nok'
  }
  attributes: {
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface SectionsChildrenListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_children_listings'
  info: {
    displayName: 'Zoznam podstr\u00E1nok'
  }
  attributes: {
    depth: Schema.Attribute.Enumeration<['depth-1', 'depth-2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'depth-1'>
  }
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas'
  info: {
    displayName: 'CTA'
  }
  attributes: {
    title: Schema.Attribute.String
    url: Schema.Attribute.String
  }
}

export interface SectionsDivider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_dividers'
  info: {
    description: ''
    displayName: 'Odde\u013Eova\u010D'
  }
  attributes: {}
}

export interface SectionsEventsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_events_listing'
  info: {
    displayName: 'Listing: Podujatia'
  }
  attributes: {}
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs'
  info: {
    displayName: 'FAQ'
  }
  attributes: {
    ctaButton: Schema.Attribute.String
    questions: Schema.Attribute.Component<'blocks.accordion-item', true>
    redirectTo: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
  }
}

export interface SectionsFlatText extends Struct.ComponentSchema {
  collectionName: 'components_sections_flat_texts'
  info: {
    description: ''
    displayName: 'Richtext'
  }
  attributes: {
    content: Schema.Attribute.RichText
  }
}

export interface SectionsForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_forms'
  info: {
    displayName: 'Formul\u00E1r'
  }
  attributes: {
    type: Schema.Attribute.Enumeration<
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
        'aka_kniha_vam_v_kniznici_chyba',
      ]
    >
  }
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries'
  info: {
    displayName: 'Gal\u00E9ria obr\u00E1zkov'
  }
  attributes: {
    Gallery: Schema.Attribute.Component<'locality-parts.gallery-parts', true>
  }
}

export interface SectionsMap extends Struct.ComponentSchema {
  collectionName: 'components_sections_maps'
  info: {
    displayName: 'Mapa pobo\u010Diek'
  }
  attributes: {
    branches: Schema.Attribute.Component<'blocks.branch-item', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsNewBooksListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_new_books_listing'
  info: {
    displayName: 'Listing: Kni\u017En\u00E9 novinky'
  }
  attributes: {}
}

export interface SectionsNewsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_news_listing'
  info: {
    displayName: 'Listing: Aktuality'
  }
  attributes: {}
}

export interface SectionsOpeningHoursSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_opening_hours_sections'
  info: {
    displayName: 'Otv\u00E1racie hodiny'
  }
  attributes: {
    branchList: Schema.Attribute.Relation<'oneToMany', 'api::branch.branch'>
    title: Schema.Attribute.String
  }
}

export interface SectionsPartners extends Struct.ComponentSchema {
  collectionName: 'components_sections_partners'
  info: {
    displayName: 'Partneri'
  }
  attributes: {}
}

export interface SectionsRental extends Struct.ComponentSchema {
  collectionName: 'components_sections_rentals'
  info: {
    description: ''
    displayName: 'Pren\u00E1jom priestorov'
  }
  attributes: {
    branches: Schema.Attribute.Component<'blocks.branch-item-with-page', true>
    text: Schema.Attribute.RichText
    title: Schema.Attribute.String
  }
}

export interface SectionsSiteUsefullness extends Struct.ComponentSchema {
  collectionName: 'components_sections_site_usefullnesses'
  info: {
    displayName: 'U\u017Eito\u010Dnos\u0165 str\u00E1nky'
  }
  attributes: {
    thankYouMessage: Schema.Attribute.String
    title: Schema.Attribute.String
  }
}

export interface SectionsSubpages extends Struct.ComponentSchema {
  collectionName: 'components_sections_subpages'
  info: {
    displayName: 'Extern\u00E9 str\u00E1nky'
  }
  attributes: {
    subpages: Schema.Attribute.Component<'blocks.subpage', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_tables'
  info: {
    displayName: 'Tabu\u013Eka'
  }
  attributes: {
    primaryTitle: Schema.Attribute.String
    rows: Schema.Attribute.Component<'accordion-items.table-row', true>
    secondaryTitle: Schema.Attribute.String
  }
}

export interface SectionsVideo extends Struct.ComponentSchema {
  collectionName: 'components_sections_videos'
  info: {
    displayName: 'Video'
  }
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    youtube_url: Schema.Attribute.String
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'accordion-items.flat-text': AccordionItemsFlatText
      'accordion-items.form': AccordionItemsForm
      'accordion-items.table-row': AccordionItemsTableRow
      'address.address': AddressAddress
      'blocks.accordion-item': BlocksAccordionItem
      'blocks.branch-item': BlocksBranchItem
      'blocks.branch-item-with-page': BlocksBranchItemWithPage
      'blocks.file-item': BlocksFileItem
      'blocks.notice-files': BlocksNoticeFiles
      'blocks.opening-hours': BlocksOpeningHours
      'blocks.opening-hours-item': BlocksOpeningHoursItem
      'blocks.page-link': BlocksPageLink
      'blocks.subpage': BlocksSubpage
      'blocks.table-row': BlocksTableRow
      'common.seo': CommonSeo
      'footer.footer-column': FooterFooterColumn
      'footer.footer-link': FooterFooterLink
      'guests.guest': GuestsGuest
      'homepage.benefits': HomepageBenefits
      'homepage.cta': HomepageCta
      'homepage.faq-section': HomepageFaqSection
      'homepage.faqs': HomepageFaqs
      'homepage.news-section': HomepageNewsSection
      'homepage.promoted-content': HomepagePromotedContent
      'homepage.registration-info': HomepageRegistrationInfo
      'locality-parts.gallery-parts': LocalityPartsGalleryParts
      'menu.section-links': MenuSectionLinks
      'menu.sections': MenuSections
      'menu.subsection': MenuSubsection
      'menu.subsection-links': MenuSubsectionLinks
      'metadata.faktury': MetadataFaktury
      'metadata.metadata': MetadataMetadata
      'metadata.obchodna-verejna-sutaz': MetadataObchodnaVerejnaSutaz
      'metadata.objednavky': MetadataObjednavky
      'metadata.verejne-obstaravanie': MetadataVerejneObstaravanie
      'metadata.zmluvy': MetadataZmluvy
      'sections.accordion': SectionsAccordion
      'sections.assets': SectionsAssets
      'sections.assets-listing': SectionsAssetsListing
      'sections.blog-posts-listing': SectionsBlogPostsListing
      'sections.cherrypick-section': SectionsCherrypickSection
      'sections.children-listing': SectionsChildrenListing
      'sections.cta': SectionsCta
      'sections.divider': SectionsDivider
      'sections.events-listing': SectionsEventsListing
      'sections.faq': SectionsFaq
      'sections.flat-text': SectionsFlatText
      'sections.form': SectionsForm
      'sections.gallery': SectionsGallery
      'sections.map': SectionsMap
      'sections.new-books-listing': SectionsNewBooksListing
      'sections.news-listing': SectionsNewsListing
      'sections.opening-hours-section': SectionsOpeningHoursSection
      'sections.partners': SectionsPartners
      'sections.rental': SectionsRental
      'sections.site-usefullness': SectionsSiteUsefullness
      'sections.subpages': SectionsSubpages
      'sections.table': SectionsTable
      'sections.video': SectionsVideo
    }
  }
}
