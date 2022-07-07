import { BlogPostSectionsDynamicZone, PageSectionsDynamicZone, SectionsFragment } from '@bratislava/strapi-sdk-city-library'
import {
  Accordion,
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
import { TFunction, useTranslation } from 'next-i18next'
import * as React from 'react'

import {
  groupByAccordionCategory,
  groupByCategory,
  groupByLinksCategory,
  parsePageLink,
  parseSubpages,
} from '../../utils/page'
import { IEvent } from '../../utils/types'
import { formatDateToLocal } from '../../utils/utils'
import AskLibraryForm from '../forms/AskLibraryForm.tsx'
import BookNotInLibraryForm from '../forms/BookNotInLibraryForm'
import CityLibraryRegistrationForm from '../forms/CityLibraryRegistrationForm'
import CycleDeliveryReservationForm from '../forms/CycleDeliveryReservationForm'
import EventReservationForm from '../forms/EventReservationForm'
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
import VenueRentalForm from '../forms/VenueRentalForm'
import { usePageWrapperContext } from '../layouts/PageWrapper'
import EventDetails from './EventDetails'
import GalleryBanner from './GalleryBanner'
import LocalityDetails from './LocalityDetails'
import Metadata from './Metadata'

interface dynamicObject {
  [key: string]: any
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

function NullComponent() {
  return null
}

export const getForm = (formType: string, key?: string | null, eventDetail?: IEvent) => {
  if (!formType) return NullComponent

  let Comp: (arg: any) => any = FORM[formType]

  if (!Comp) {
    Comp = NullComponent
  }

  return (
    <div key={key} id={formType}>
      <Comp slug={key} eventDetail={eventDetail} />
    </div>
  )
}

function Sections({
  pageTitle,
  sections,
  events,
  eventsListingUrl,
  className,
}: {
  pageTitle?: string | null | undefined
  sections: (BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined)[]
  events?: IEvent[] | undefined
  eventsListingUrl?: string | undefined
  className?: string | undefined
}) {
  return (
    <div className={className ?? 'flex flex-col space-y-8'}>
      {sections.map((section: BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined, index: any) => (
        <Section
          sections={sections}
          pageTitle={pageTitle}
          key={index}
          section={section || null}
          events={events}
          eventsListingUrl={eventsListingUrl}
        />
      ))}
    </div>
  )
}

function Section({
  sections,
  pageTitle,
  section,
  events,
  eventsListingUrl,
}: {
  sections: (BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined)[];
  pageTitle?: string | null | undefined
  section: BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null
  events: IEvent[] | undefined
  eventsListingUrl: string | undefined
}) {
  const [openAccordion, setOpenAccordion] = React.useState('')
  const { t } = useTranslation(['common', 'homepage'])
  const { locale } = usePageWrapperContext()

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenAccordion(state ? id : '')
  }

  if (!section) return null

  return (
    <div>
      {sectionContent(sections, pageTitle, section, events, eventsListingUrl, t, openAccordion, listenAccordionState, locale)}
    </div>
  )
}

const sectionContent = (
  sections: (BlogPostSectionsDynamicZone | PageSectionsDynamicZone | null | undefined)[] | any,
  pageTitle: string | null | undefined,
  section: BlogPostSectionsDynamicZone,
  events: IEvent[] | undefined,
  eventsListingUrl: string | undefined,
  t: TFunction,
  openAccordion: string,
  listenAccordionState: (id: string, state: boolean) => unknown,
  locale: string | undefined
): React.ReactNode | any => {
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
      return <SubListing title={section?.title || undefined} url={section.url || undefined} linkTitle={t('more')} />

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
          {section.title && <h2 className="flex font-normal text-md pb-6">{section.title}</h2>}
          {section.tableRows &&
            groupByAccordionCategory(section.tableRows ?? []).map((item, index) => (
              <Accordion
                key={index}
                label={item.title}
                id={item.title}
                defaultState={item.title === openAccordion}
                stateListener={listenAccordionState}
                content={
                  <div key={index} className="flex flex-col space-y-6">
                    {item.tables.map((table, index) => (
                      <Table key={index} secondaryTitle={table.title} rows={table.rows} />
                    ))}
                  </div>
                }
                size="big"
                type="divider"
              />
            ))}
          {section.flatText &&
            groupByCategory(section.flatText).map((flatText, index) => (
              <Accordion
                key={index}
                label={flatText.category}
                id={flatText.category}
                defaultState={flatText.category === openAccordion}
                stateListener={listenAccordionState}
                content={flatText.items.map((item, index) => (
                  <FlatText key={`${item?.category} ${index}`} content={item?.content ?? ''} />
                ))}
                size="big"
                type="divider"
              />
            ))}
          {section.forms &&
            groupByCategory(section.forms).map((form, index) => (
              <Accordion
                key={index}
                label={form.category}
                id={form.category}
                defaultState={form.category === openAccordion}
                stateListener={listenAccordionState}
                content={form.items.map((item, index) =>
                  getForm(item?.type || '', index.toString(), eventDetail || undefined)
                )}
                size="big"
                type="divider"
              />
            ))}
        </>
      )

    case 'ComponentSectionsForm':
      return getForm(section.type || '', pageTitle, eventDetail || undefined)

    case 'ComponentSectionsEventDetails':
      return <EventDetails sections={sections} eventDetails={section} />

    case 'ComponentSectionsDivider':
      return section.shown && <div className="border-b border-gray-universal-100" />

    case 'ComponentSectionsColumnedText':
      return <ColumnedText title={section.title ?? ''} content={section.content ?? ''} />

    case 'ComponentSectionsCta':
      return (
        <div className="w-full flex justify-center">
          <LinkButton href={section.url || ''} target="_blank" className="py-[9px] px-5">
            {section.title}
          </LinkButton>
        </div>
      )

    case 'ComponentSectionsLocalityDetails':
      return <LocalityDetails localityDetails={section} events={events} eventsListingUrl={eventsListingUrl} />

    case 'ComponentSectionsExternalLinks':
      return (
        <ExternalLinks
          title={section.title ?? ''}
          sections={groupByLinksCategory(section.descriptions || undefined, section.externalLinks || undefined)}
        />
      )

    case 'ComponentSectionsVideo':
      return (
        section.media?.data?.attributes?.url ||
        (section.youtube_url && (
          <div className="flex justify-center w-full">
            <Video id={section.id} mediaUrl={section.media?.data?.attributes?.url ?? ''} youTubeUrl={section.youtube_url ?? ''} />
          </div>
        ))
      )

    case 'ComponentSectionsDocuments':
      return (
        <Documents
          title={section.title || undefined}
          moreLink={{
            url: parsePageLink(section?.moreLink?.[0])?.url ?? '',
            title: section.moreLink?.[0]?.title ?? section.moreLink?.[0]?.page?.data?.attributes?.title ?? '',
          }}
          files={section.basicDocuments?.data?.map((document) => ({
            url: `${t('documents_category_slug')}${document?.attributes?.file_category?.data?.attributes?.slug}/${document?.attributes?.slug}`,
            content: {
              type: document?.attributes?.file_category?.data?.attributes?.name ?? '',
              title: document?.attributes?.title ?? '',
              metadata: <Metadata metadata={document?.attributes?.metadata || []} /> ?? '',
              dateAdded: document?.attributes?.date_added ? `${t('added')} ${formatDateToLocal(document?.attributes?.date_added, locale)}` : '',
              fileType: document?.attributes?.attachment?.data?.attributes?.ext?.toUpperCase().replace('.', '') ?? '',
            },
          }))}
        />
      )

    default:
      return null
  }
}

export default Sections
