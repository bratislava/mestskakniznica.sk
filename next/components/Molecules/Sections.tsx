import {
  BlogPostSectionsDynamicZone,
  EventCardEntityFragment,
  PageSectionsDynamicZone,
} from '@bratislava/strapi-sdk-city-library'
import {
  ColumnedText,
  Documents,
  ExternalLinks,
  Faq,
  FlatText,
  FlatTextCenter,
  LinkButton,
  SiteUsefullness,
  SubListing,
  Subpages,
  Table,
  Video,
} from '@bratislava/ui-city-library'
import Accordion from '@components/ui/Accordion/Accordion'
import { isDefined } from '@utils/isDefined'
import {
  groupByAccordionCategory,
  groupByCategory,
  groupByLinksCategory,
  parsePageLink,
  parseSubpages,
} from '@utils/page'
import { formatDateToLocal } from '@utils/utils'
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
import { usePageWrapperContext } from '../layouts/PageWrapper'
import GalleryBanner from './GalleryBanner'
import LocalityDetails from './LocalityDetails'
import Metadata from './Metadata'

type FormsProps =
  | (() => JSX.Element)
  | ((props: VenueRentalFormProps) => JSX.Element)
  | ((eventDetail: EventReservationFormProps) => JSX.Element)

interface dynamicObject {
  [key: string]: FormsProps
}

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
  section: BlogPostSectionsDynamicZone,
  events: EventCardEntityFragment[] | undefined,
  eventsListingUrl: string | undefined,
  t: TFunction,
  locale: string | undefined
): React.ReactNode => {
  const eventDetail = events?.length ? events[0] : null

  switch (section.__typename) {
    case 'ComponentSectionsFlatText':
      return (
        <FlatText
          content={section?.content ?? ''}
          media={section.media?.data?.attributes?.url || ''}
          alt={section.media?.data?.attributes?.alternativeText || ''}
          mediaType={section.media?.data?.attributes?.mime?.split('/')[0] ?? ''}
        />
      )

    case 'ComponentSectionsGallery':
      return <GalleryBanner gallery={section.Gallery || undefined} />

    case 'ComponentSectionsFlatTextCenter':
      return (
        <FlatTextCenter
          content={section?.content ?? ''}
          imgSrc={section.image?.data?.attributes?.url ?? ''}
          alt={section.image?.data?.attributes?.alternativeText || ''}
        />
      )

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
      return section.shown && <div className="border-b border-border-dark" />

    case 'ComponentSectionsColumnedText':
      return <ColumnedText title={section.title ?? ''} content={section.content ?? ''} />

    case 'ComponentSectionsCta':
      return (
        <div className="flex w-full justify-center">
          <LinkButton href={section.url || ''} target="_blank" className="py-[9px] px-5">
            {section.title}
          </LinkButton>
        </div>
      )

    case 'ComponentSectionsLocalityDetails':
      return (
        <LocalityDetails
          localityDetails={section}
          events={events}
          eventsListingUrl={eventsListingUrl}
        />
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
          title={section.title || undefined}
          moreLink={{
            url: parsePageLink(section?.moreLink?.[0])?.url ?? '',
            title:
              section.moreLink?.[0]?.title ??
              section.moreLink?.[0]?.page?.data?.attributes?.title ??
              '',
          }}
          files={section.basicDocuments?.data?.map((document) => ({
            url: `${t('documents_slug')}${document?.attributes?.slug}`,
            content: {
              type: document?.attributes?.file_category?.data?.attributes?.name ?? '',
              title: document?.attributes?.title ?? '',
              metadata: <Metadata metadata={document?.attributes?.metadata || []} /> ?? '',
              dateAdded: document?.attributes?.date_added
                ? `${t('added')} ${formatDateToLocal(document?.attributes?.date_added, locale)}`
                : '',
              fileType:
                document?.attributes?.attachment?.data?.attributes?.ext
                  ?.toUpperCase()
                  .replace('.', '') ?? '',
            },
          }))}
        />
      )

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
  section: BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null
  events: EventCardEntityFragment[] | undefined
  eventsListingUrl: string | undefined
}) => {
  const { t } = useTranslation(['common', 'homepage'])
  const { locale } = usePageWrapperContext()

  if (!section) return null

  return <div>{sectionContent(pageTitle, section, events, eventsListingUrl, t, locale)}</div>
}

const Sections = ({
  pageTitle,
  sections,
  events,
  eventsListingUrl,
  className,
}: {
  pageTitle?: string | null | undefined
  sections: (BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined)[]
  events?: EventCardEntityFragment[] | undefined
  eventsListingUrl?: string | undefined
  className?: string | undefined
}) => {
  return (
    <div className={className ?? 'flex flex-col space-y-8'}>
      {sections.map(
        (
          section: BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined,
          index
        ) => (
          <Section
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            pageTitle={pageTitle}
            section={section || null}
            events={events}
            eventsListingUrl={eventsListingUrl}
          />
        )
      )}
    </div>
  )
}

export default Sections
