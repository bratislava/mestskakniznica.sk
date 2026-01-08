import { useTranslation } from 'next-i18next'

import AskLibraryForm from '@/components/forms/AskLibraryForm.tsx'
import BookNotInLibraryForm from '@/components/forms/BookNotInLibraryForm'
import CityLibraryRegistrationForm from '@/components/forms/CityLibraryRegistrationForm'
import CycleDeliveryReservationForm from '@/components/forms/CycleDeliveryReservationForm'
import ExcursionReservationForm from '@/components/forms/ExcursionReservationForm'
import { CommonFormProps } from '@/components/forms/FormFooter'
import GiftCardReservationForm from '@/components/forms/GiftCardReservationForm'
import InterlibraryLoanServiceFormLibrary from '@/components/forms/InterlibraryLoanServiceFormLibrary'
import InterlibraryLoanServiceFormReader from '@/components/forms/InterlibraryLoanServiceFormReader'
import MusicalInstrumentReservationForm from '@/components/forms/MusicalInstrumentReservationForm'
import ReaderReservationForm from '@/components/forms/ReaderReservationForm'
import RechercheReservationForm from '@/components/forms/RechercheReservationForm'
import ServiceReservationForm from '@/components/forms/ServiceReservationForm'
import SpaceReservationForm from '@/components/forms/SpaceReservationForm'
import TabletReservationForm from '@/components/forms/TabletReservationForm'
import TheaterTechReservationForm from '@/components/forms/TheaterTechReservationForm'
import VenueRentalForm, { VenueRentalFormProps } from '@/components/forms/VenueRentalForm'
import AccordionSection from '@/components/Molecules/AccordionSection'
import RentalSection from '@/components/Molecules/RentalSection'
import { Documents, Faq, FlatText, SiteUsefullness, Subpages, Table, Video } from '@/components/ui'
import MapSection from '@/components/ui/MapSection/MapSection'
import Button from '@/modules/common/Button'
import BlogPostsListingSection from '@/modules/sections/BlogPostsListingSection'
import CherrypickSection from '@/modules/sections/CherrypickSection'
import ChildrenListingSection from '@/modules/sections/ChildrenListingSection'
import DocumentsListingSection from '@/modules/sections/DocumentsListingSection'
import EventsListingSection from '@/modules/sections/EventsListingSection'
import GalleryBannerSection from '@/modules/sections/GalleryBannerSection'
import NewBooksSection from '@/modules/sections/NewBooksSection'
import NoticesListingSection from '@/modules/sections/NoticesListingSection'
import OpeningHoursSection from '@/modules/sections/OpeningHoursSection'
import PartnersSection from '@/modules/sections/PartnersSection'
import {
  BlogPostSectionsFragment,
  DisclosureEntityFragment,
  DocumentEntityFragment,
  PageSectionsFragment,
} from '@/services/graphql'
import { useGeneralContext } from '@/utils/generalContext'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'
import { parseSubpages } from '@/utils/page'

type FormsProps =
  | (() => JSX.Element)
  | ((props: VenueRentalFormProps) => JSX.Element)
  | ((props: CommonFormProps) => JSX.Element)

interface dynamicObject {
  [key: string]: FormsProps
}

const FORM: dynamicObject = {
  napiste_nam: AskLibraryForm,
  ako_sa_prihlasit_do_kniznice: CityLibraryRegistrationForm,
  cyklodonaska: CycleDeliveryReservationForm,
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

export const getForm = (formType: string, key: string, privacyPolicyHref?: string) => {
  if (!formType) return null

  const Comp = FORM[formType]

  return (
    <div key={key} id={formType}>
      {Comp && <Comp slug={key} privacyPolicyHref={privacyPolicyHref} />}
    </div>
  )
}

const Sections = ({
  sections,
}: {
  sections: PageSectionsFragment[] | BlogPostSectionsFragment[]
}) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const { getPathForStrapiEntity } = useNavikronos()

  return (
    <div className="flex flex-col space-y-8">
      {sections.map((section) => {
        if (!section) return null

        switch (section.__typename) {
          case 'ComponentSectionsFlatText':
            return <FlatText content={section?.content ?? ''} />

          case 'ComponentSectionsGallery':
            return <GalleryBannerSection section={section} />

          case 'ComponentSectionsFaq':
            return (
              <Faq
                title={section.title ?? ''}
                questions={section?.questions ?? []}
                ctaButton={section?.ctaButton ?? ''}
                redirectTo={section?.redirectTo ?? null}
              />
            )

          case 'ComponentSectionsSiteUsefullness':
            return (
              <SiteUsefullness
                thankYouMessage={section.thankYouMessage || ''}
                title={section.title || ''}
                firstOption={t('answer.yes')}
                secondOption={t('answer.no')}
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
                rows={section.rows?.filter(isDefined) ?? []}
              />
            )

          case 'ComponentSectionsAccordion':
            return <AccordionSection section={section} />

          case 'ComponentSectionsForm':
            // TODO add key
            return section.type
              ? getForm(
                  section.type,
                  section.type,
                  getPathForStrapiEntity(
                    general?.data?.attributes?.privacyTermsAndConditionsPage?.data,
                  ) ?? undefined,
                )
              : null

          case 'ComponentSectionsDivider':
            return <div className="border-b border-border-dark" />

          case 'ComponentSectionsCta':
            return (
              <div className="flex w-full justify-center">
                <Button href={section.url || ''} target="_blank">
                  {section.title}
                </Button>
              </div>
            )

          case 'ComponentSectionsVideo':
            return (
              (section.youtube_url || section.media?.data?.attributes?.url) && (
                <div className="flex w-full justify-center">
                  <Video
                    id={section.id}
                    mediaUrl={section.media?.data?.attributes?.url ?? ''}
                    youTubeUrl={section.youtube_url ?? ''}
                  />
                </div>
              )
            )

          case 'ComponentSectionsDocuments':
            return (
              <Documents
                title={section.title}
                documents={[
                  ...((section.documents?.data as DocumentEntityFragment[]) ?? []),
                  ...((section.disclosures?.data as DisclosureEntityFragment[]) ?? []),
                ]}
              />
            )

          case 'ComponentSectionsOpeningHoursSection':
            return <OpeningHoursSection title={section.title} branchList={section.branchList} />

          case 'ComponentSectionsMap':
            return (
              <MapSection
                altDesign
                title={section.title}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
                branches={
                  section.branches?.map((branch) => branch?.branch?.data).filter(isDefined) ?? []
                }
              />
            )

          case 'ComponentSectionsRental':
            return <RentalSection section={section} />

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

          case 'ComponentSectionsChildrenListing':
            return <ChildrenListingSection section={section} />

          case 'ComponentSectionsCherrypickSection':
            return <CherrypickSection section={section} />

          default:
            return null
        }
      })}
    </div>
  )
}

export default Sections
