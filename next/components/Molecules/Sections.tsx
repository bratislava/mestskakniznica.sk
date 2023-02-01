import {
  ColumnedText,
  Documents,
  ExternalLinks,
  Faq,
  FlatText,
  FlatTextCenter,
  Localities,
  SiteUsefullness,
  SubListing,
  Subpages,
  Table,
  Video,
} from '@bratislava/ui-city-library'
import BranchCard from '@components/Molecules/BranchCard'
import Accordion from '@modules/common/Accordion'
import Button from '@modules/common/Button'
import BlogPostsListingSection from '@modules/sections/BlogPostsListingSection'
import DocumentsListingSection from '@modules/sections/DocumentsListingSection'
import EventsListingSection from '@modules/sections/EventsListingSection'
import NewBooksSection from '@modules/sections/NewBooksSection'
import NoticesListingSection from '@modules/sections/NoticesListingSection'
import PartnersSection from '@modules/sections/PartnersSection'
import {
  BasicDocumentEntityFragment,
  BlogPostSectionsDynamicZone,
  EventCardEntityFragment,
  PageSectionsDynamicZone,
} from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import {
  groupByAccordionCategory,
  groupByCategory,
  groupByLinksCategory,
  parsePageLink,
  parseSubpages,
} from '@utils/page'
import { TFunction, useTranslation } from 'next-i18next'

import AskLibraryForm from '../forms/AskLibraryForm.tsx'
import BookNotInLibraryForm from '../forms/BookNotInLibraryForm'
import CityLibraryRegistrationForm from '../forms/CityLibraryRegistrationForm'
import CycleDeliveryReservationForm from '../forms/CycleDeliveryReservationForm'
import EventReservationForm, { EventReservationFormProps } from '../forms/EventReservationForm'
import ExcursionReservationForm from '../forms/ExcursionReservationForm'
import GiftCardReservationForm from '../forms/GiftCardReservationForm'
import InterlibraryLoanServiceFormLibrary from '../forms/InterlibraryLoanServiceFormLibrary'
import InterlibraryLoanServiceFormReader from '../forms/InterlibraryLoanServiceFormReader'
import MusicalInstrumentReservationForm from '../forms/MusicalInstrumentReservationForm'
import ReaderReservationForm from '../forms/ReaderReservationForm'
import RechercheReservationForm from '../forms/RechercheReservationForm'
import ServiceReservationForm from '../forms/ServiceReservationForm'
import SpaceReservationForm from '../forms/SpaceReservationForm'
import TabletReservationForm from '../forms/TabletReservationForm'
import TheaterTechReservationForm from '../forms/TheaterTechReservationForm'
import VenueRentalForm, { VenueRentalFormProps } from '../forms/VenueRentalForm'
import GalleryBanner from './GalleryBanner'

type FormsProps =
  | (() => JSX.Element)
  | ((props: VenueRentalFormProps) => JSX.Element)
  | ((eventDetail: EventReservationFormProps) => JSX.Element)

interface dynamicObject {
  [key: string]: FormsProps
}

type SectionType = BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined

const FORM: dynamicObject = {
  napiste_nam: AskLibraryForm,
  ako_sa_prihlasit_do_kniznice: CityLibraryRegistrationForm,
  cyklodonaska: CycleDeliveryReservationForm,
  detail_podujatia: EventReservationForm,
  pre_skoly: ExcursionReservationForm,
  darcekova_poukazka: GiftCardReservationForm,
  medzikniznicna_vypozicna_sluzba_citatel: InterlibraryLoanServiceFormReader,
  medzikniznicna_vypozicna_sluzba_kniznica: InterlibraryLoanServiceFormLibrary,
  hra_na_hudobne_nastroje: MusicalInstrumentReservationForm,
  tablety_a_citacky: ReaderReservationForm,
  tablety: TabletReservationForm,
  pracujte_v_priestoroch_kniznice: SpaceReservationForm,
  divadelna_technika: TheaterTechReservationForm,
  prenajmite_si_priestor: VenueRentalForm,
  kniharska_dielna: ServiceReservationForm,
  bibliografia_a_resers: RechercheReservationForm,
  aka_kniha_vam_v_kniznici_chyba: BookNotInLibraryForm,
}

export const getForm = (formType: string, key: string, eventDetail?: EventCardEntityFragment) => {
  if (!formType) return null

  const Comp = FORM[formType]

  return (
    <div key={key} id={formType}>
      {Comp && <Comp slug={key} eventDetail={eventDetail} />}
    </div>
  )
}

const sectionContent = (
  pageTitle: string | null | undefined,
  section: NonNullable<SectionType>,
  events: EventCardEntityFragment[] | undefined,
  eventsListingUrl: string | undefined,
  t: TFunction
): React.ReactNode => {
  const eventDetail = events?.length ? events[0] : null

  switch (section.__typename) {
    case 'ComponentSectionsFlatText':
      return <FlatText content={section?.content ?? ''} />

    case 'ComponentSectionsGallery':
      return <GalleryBanner gallery={section.Gallery || undefined} />

    case 'ComponentSectionsFlatTextCenter':
      return <FlatTextCenter content={section?.content ?? ''} />

    case 'ComponentSectionsSubListing':
      return (
        <SubListing
          title={section?.title || undefined}
          url={section.url || undefined}
          linkTitle={t('more')}
        />
      )

    case 'ComponentSectionsFaq':
      return <Faq title={section.title ?? ''} questions={section?.questions ?? []} />

    case 'ComponentSectionsSiteUsefullness':
      return (
        <SiteUsefullness
          thankYouMessage={section.thankYouMessage || ''}
          title={section.title || ''}
          firstOption={t('answer_yes')}
          secondOption={t('answer_no')}
          onButtonClick={() => {
            console.log('// TODO')
          }}
        />
      )

    case 'ComponentSectionsSubpages':
      return <Subpages title={section.title ?? ''} subpages={parseSubpages(section)} />

    case 'ComponentSectionsTable':
      return (
        <Table
          primaryTitle={section.primaryTitle ?? ''}
          secondaryTitle={section.secondaryTitle ?? ''}
          rows={section.rows ?? []}
        />
      )

    case 'ComponentSectionsAccordion':
      return (
        <>
          {section.title && <h2 className="flex pb-6 text-h4 font-normal">{section.title}</h2>}
          {section.tableRows &&
            groupByAccordionCategory(section.tableRows ?? []).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Accordion key={index} title={item.title} type="divider-big">
                <div className="flex flex-col space-y-6">
                  {item.tables.map((table, tableIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Table key={tableIndex} secondaryTitle={table.title} rows={table.rows} />
                  ))}
                </div>
              </Accordion>
            ))}
          {section.flatText &&
            groupByCategory(section.flatText).map((flatText, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Accordion key={index} title={flatText.category} type="divider-big">
                <div className="text-base">
                  {flatText.items.filter(isDefined).map((item) => (
                    <FlatText key={item.id} content={item?.content ?? ''} />
                  ))}
                </div>
              </Accordion>
            ))}
          {section.forms &&
            groupByCategory(section.forms).map((form, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Accordion key={index} title={form.category} type="divider-big">
                <div className="text-base">
                  {form.items.map((item, itemIndex) =>
                    getForm(item?.type || '', itemIndex.toString(), eventDetail || undefined)
                  )}
                </div>
              </Accordion>
            ))}
        </>
      )

    case 'ComponentSectionsForm':
      return getForm(section.type || '', pageTitle ?? '', eventDetail || undefined)

    case 'ComponentSectionsDivider':
      return <div className="border-b border-border-dark" />

    case 'ComponentSectionsColumnedText':
      return <ColumnedText title={section.title ?? ''} content={section.content ?? ''} />

    case 'ComponentSectionsCta':
      return (
        <div className="flex w-full justify-center">
          <Button href={section.url || ''} target="_blank">
            {section.title}
          </Button>
        </div>
      )

    case 'ComponentSectionsExternalLinks':
      return (
        <ExternalLinks
          title={section.title ?? ''}
          sections={groupByLinksCategory(
            section.descriptions || undefined,
            section.externalLinks || undefined
          )}
        />
      )

    case 'ComponentSectionsVideo':
      return (
        section.media?.data?.attributes?.url ||
        (section.youtube_url && (
          <div className="flex w-full justify-center">
            <Video
              id={section.id}
              mediaUrl={section.media?.data?.attributes?.url ?? ''}
              youTubeUrl={section.youtube_url ?? ''}
            />
          </div>
        ))
      )

    case 'ComponentSectionsDocuments':
      return (
        <Documents
          title={section.title}
          moreLink={{
            url: parsePageLink(section?.moreLink?.[0])?.url ?? '',
            title:
              section.moreLink?.[0]?.title ??
              section.moreLink?.[0]?.page?.data?.attributes?.title ??
              '',
          }}
          documents={(section.basicDocuments?.data as BasicDocumentEntityFragment[]) ?? []}
        />
      )

    case 'ComponentSectionsMap':
      return (
        <Localities
          altDesign
          title={section.title}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
          branches={section.branches?.map((branch) => branch?.branch?.data).filter(isDefined) ?? []}
        />
      )

    case 'ComponentSectionsRental':
      return (
        <>
          {section.title && <h2 className="pb-6 text-h2">{section.title}</h2>}
          {section.text && <FlatText content={section.text} />}
          {section.branches?.length ? (
            <div className="grid gap-x-5 gap-y-8 py-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {section.branches?.filter(isDefined).map(({ branch, page }) => {
                const { title, address, slug, listingImage } = branch?.data?.attributes ?? {}
                const pageSlug = page?.data?.attributes?.slug

                return (
                  <BranchCard
                    address={address || ''}
                    image={listingImage?.data}
                    title={title || ''}
                    linkHref={pageSlug ? `/${pageSlug}` : ''}
                    key={slug}
                  />
                )
              })}
            </div>
          ) : null}
        </>
      )

    case 'ComponentSectionsPartners':
      return <PartnersSection />

    case 'ComponentSectionsNewBooksListing':
      return <NewBooksSection />

    case 'ComponentSectionsBlogPostsListing':
      return <BlogPostsListingSection />

    case 'ComponentSectionsDocumentsListing':
      return <DocumentsListingSection />

    case 'ComponentSectionsNewsListing':
      return <NoticesListingSection />

    case 'ComponentSectionsEventsListing':
      return <EventsListingSection />

    default:
      return null
  }
}

const Section = ({
  pageTitle,
  section,
  events,
  eventsListingUrl,
}: {
  pageTitle?: string | null | undefined
  section: SectionType
  events: EventCardEntityFragment[] | undefined
  eventsListingUrl: string | undefined
}) => {
  const { t } = useTranslation(['common', 'homepage'])

  if (!section) return null

  return <div>{sectionContent(pageTitle, section, events, eventsListingUrl, t)}</div>
}

const Sections = ({
  pageTitle,
  sections,
  events,
  eventsListingUrl,
  className,
}: {
  pageTitle?: string | null | undefined
  sections: SectionType[]
  events?: EventCardEntityFragment[] | undefined
  eventsListingUrl?: string | undefined
  className?: string | undefined
}) => {
  return (
    <div className={className ?? 'flex flex-col space-y-8'}>
      {sections.map((section: SectionType, index) => (
        <Section
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          pageTitle={pageTitle}
          section={section || null}
          events={events}
          eventsListingUrl={eventsListingUrl}
        />
      ))}
    </div>
  )
}

export default Sections
