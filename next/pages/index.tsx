import { Localities, SectionContainer } from '@bratislava/ui-city-library'
import SectionHomepageNewBooks from '@components/HomePage/SectionHomepageNewBooks'
import type { Book } from '@modules/common/Cards/BookCard'
import {
  BookTagEntityFragment,
  ComponentCommonSeo,
  ComponentHomepageFaqSection,
  ComponentHomepageNewsSection,
  ComponentHomepageRegistrationInfo,
  ComponentSectionsMap,
  EventCardEntityFragment,
  GeneralQuery,
  NoticeListingEntityFragment,
  PageLocalizationEntityFragment,
} from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { newBooksHomePageServerSideFetcher } from '@services/opac/fetchers/new-books-server-side.fetcher'
import { GeneralContextProvider } from '@utils/generalContext'
import { hasAttributes, isDefined } from '@utils/isDefined'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SectionFaq from '../components/HomePage/SectionFaq'
import SectionLibraryNews from '../components/HomePage/SectionLibraryNews'
import SectionPromos from '../components/HomePage/SectionPromos'
import SectionRegistrationInfo from '../components/HomePage/SectionRegistrationInfo'
import SectionTags from '../components/HomePage/SectionTags'
import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import { navikronosGetStaticProps } from '../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../navikronos/wrapNavikronosProvider'

type HomeProps = {
  localizations?: PageLocalizationEntityFragment[]
  promos: (EventCardEntityFragment | NoticeListingEntityFragment)[]
  latestNotices: NoticeListingEntityFragment[]
  newBooks: Book[] | null
  faqSection: ComponentHomepageFaqSection | null
  newsSection: ComponentHomepageNewsSection | null
  registrationInfoSection: ComponentHomepageRegistrationInfo
  bookTags: BookTagEntityFragment[]
  mapSection: ComponentSectionsMap | null
  seo?: ComponentCommonSeo
  general: GeneralQuery
} & SSRConfig &
  CLNavikronosPageProps

export const Index = ({
  localizations, // TODO examine
  promos,
  latestNotices,
  newBooks,
  faqSection,
  newsSection,
  registrationInfoSection,
  bookTags,
  mapSection,
  seo,
  general,
}: HomeProps) => {
  const { t } = useTranslation('common')

  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout seo={seo}>
        <h1 className="sr-only">{t('pageTitle')}</h1>
        {promos.length > 0 && (
          <SectionContainer hasBorder>
            <SectionPromos promos={promos} />
          </SectionContainer>
        )}

        {newBooks && newBooks.length > 0 ? <SectionHomepageNewBooks books={newBooks} /> : null}

        {faqSection && <SectionFaq faqSection={faqSection} />}

        {registrationInfoSection && (
          <SectionRegistrationInfo registrationInfoSection={registrationInfoSection} />
        )}

        {newsSection !== null && latestNotices.length > 0 && (
          <SectionLibraryNews newsSection={newsSection} notices={latestNotices} />
        )}

        {bookTags && bookTags.length > 0 && <SectionTags bookTags={bookTags} />}

        {mapSection && (
          <SectionContainer>
            <Localities
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
              branches={
                mapSection.branches?.map((branch) => branch?.branch?.data).filter(isDefined) ?? []
              }
            />
          </SectionContainer>
        )}
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx
  if (!locale) {
    return { notFound: true }
  }

  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  // running all requests parallel
  // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
  const [
    newBooks,
    { homePage, promotedNews, promotedEvents, latestNotices, bookTags },
    general,
    navikronosStaticProps,
  ] = await Promise.all([
    newBooksHomePageServerSideFetcher(),
    client.HomePage({ locale }),
    generalFetcher(locale),
    navikronosGetStaticProps(navikronosConfig, ctx),
  ])

  if (!homePage) {
    return { notFound: true }
  }

  return {
    props: {
      localizations: homePage?.data?.attributes?.localizations?.data ?? null,
      promos: [...(promotedNews?.data ?? []), ...(promotedEvents?.data ?? [])],
      latestNotices: latestNotices?.data?.filter(hasAttributes) ?? [],
      newBooks,
      faqSection: homePage?.data?.attributes?.faqSection ?? null,
      newsSection: homePage?.data?.attributes?.newsSection ?? null,
      registrationInfoSection: homePage?.data?.attributes?.registrationInfoSection ?? null,
      bookTags: bookTags?.data?.filter(hasAttributes) ?? [],
      mapSection: homePage?.data?.attributes?.mapSection ?? null,
      seo: homePage?.data?.attributes?.seo ?? null,
      general,
      navikronosStaticProps,
      ...translations,
    },
    revalidate: 10,
  }
}

export default wrapNavikronosProvider(Index)
