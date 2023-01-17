import { Localities, SectionContainer } from '@bratislava/ui-city-library'
import SectionHomepageNewBooks from '@components/HomePage/SectionHomepageNewBooks'
import type { Book } from '@modules/common/Cards/BookCard'
import {
  BookTagEntityFragment,
  ComponentHomepageFaqSection,
  ComponentHomepageNewsSection,
  ComponentHomepageRegistrationInfo,
  ComponentSectionsMap,
  ComponentSeoSeo,
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
import { isPresent } from '@utils/utils'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Section from '../components/AppLayout/Section'
import SectionFaq from '../components/HomePage/SectionFaq'
import SectionLibraryNews from '../components/HomePage/SectionLibraryNews'
import SectionPromos from '../components/HomePage/SectionPromos'
import SectionRegistrationInfo from '../components/HomePage/SectionRegistrationInfo'
import SectionTags from '../components/HomePage/SectionTags'
import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'
// used for example meili usage
// import { useUpcomingEvents } from '../hooks/useUpcomingEvets'
// import { useEffect } from 'react'
// import { meiliClient } from '@utils/meilisearch'

interface IIndexProps {
  locale?: string
  localizations?: PageLocalizationEntityFragment[]
  promos: (EventCardEntityFragment | NoticeListingEntityFragment)[]
  latestNotices: NoticeListingEntityFragment[]
  newBooks: Book[] | null
  faqSection: ComponentHomepageFaqSection | null
  newsSection: ComponentHomepageNewsSection | null
  registrationInfoSection: ComponentHomepageRegistrationInfo
  bookTags: BookTagEntityFragment[]
  mapSection: ComponentSectionsMap | null
  error?: IDisplayError
  Seo?: ComponentSeoSeo
  general: GeneralQuery
}

export const Index = ({
  locale = 'sk',
  localizations,
  promos,
  latestNotices,
  newBooks,
  faqSection,
  newsSection,
  registrationInfoSection,
  bookTags,
  mapSection,
  error,
  Seo,
  general,
}: IIndexProps) => {
  const { t } = useTranslation('common')

  // example of how to search in hooked events with meilisearch
  // useEffect(() => {
  //   meiliClient
  //     .index('event')
  //     .search('eve', {
  //       limit: 10,
  //       filter: [`locale = ${locale}`],
  //     })
  //     .then(console.log)
  // }, [locale])

  if (error) {
    return (
      <PageWrapper
        locale={locale}
        slug="/"
        localizations={localizations?.filter(isPresent).map((localization) => ({
          locale: localization.attributes?.locale,
          slug: localization.attributes?.slug,
        }))}
      >
        <ErrorPage code={500}>
          <ErrorDisplay error={error} />
        </ErrorPage>
      </PageWrapper>
    )
  }

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={locale ?? 'sk'}
        slug="/"
        localizations={localizations
          ?.filter(isPresent)
          // add empty slug because it's expected in wrapper and index page does not have slug
          .map((l) => ({ ...l, slug: '' }))}
      >
        <DefaultPageLayout Seo={Seo}>
          <h1 className="sr-only">{t('pageTitle')}</h1>
          {promos.length > 0 && (
            <SectionContainer>
              <Section>
                <SectionPromos promos={promos} />
              </Section>
            </SectionContainer>
          )}

          {newBooks && newBooks.length > 0 ? (
            <SectionContainer>
              <SectionHomepageNewBooks books={newBooks} />
            </SectionContainer>
          ) : null}

          {faqSection !== null && (
            <SectionContainer>
              <Section>
                <SectionFaq faqSection={faqSection} />
              </Section>
            </SectionContainer>
          )}

          {registrationInfoSection !== null && (
            <SectionContainer>
              <Section>
                <SectionRegistrationInfo registrationInfoSection={registrationInfoSection} />
              </Section>
            </SectionContainer>
          )}

          {newsSection !== null && latestNotices.length > 0 && (
            <SectionContainer>
              <Section>
                <SectionLibraryNews newsSection={newsSection} notices={latestNotices} />
              </Section>
            </SectionContainer>
          )}

          {bookTags && bookTags.length > 0 && (
            <SectionContainer>
              <Section>
                <SectionTags bookTags={bookTags} />
              </Section>
            </SectionContainer>
          )}

          {mapSection && (
            <SectionContainer>
              <Section noBorder>
                <Localities
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
                  branches={
                    mapSection.branches?.map((branch) => branch?.branch?.data).filter(isDefined) ??
                    []
                  }
                />
              </Section>
            </SectionContainer>
          )}
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'sk' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  try {
    // running all requests parallel
    // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
    const [newBooks, { homePage, promotedNews, promotedEvents, latestNotices, bookTags }, general] =
      await Promise.all([
        newBooksHomePageServerSideFetcher(),
        client.HomePage({ locale }),
        generalFetcher(locale),
      ])

    if (!homePage) {
      return { notFound: true }
    }

    // const localities = convertPagesToLocalities(localityPages?.data ?? [], true).map(
    //   (locality) => ({
    //     ...locality,
    //     hideOpeningHours: true,
    //   })
    // )

    return {
      props: {
        locale,
        localizations: homePage?.data?.attributes?.localizations?.data ?? null,
        promos: [...(promotedNews?.data ?? []), ...(promotedEvents?.data ?? [])],
        latestNotices: latestNotices?.data?.filter(hasAttributes) ?? [],
        newBooks,
        faqSection: homePage?.data?.attributes?.faqSection ?? null,
        newsSection: homePage?.data?.attributes?.newsSection ?? null,
        registrationInfoSection: homePage?.data?.attributes?.registrationInfoSection ?? null,
        bookTags: bookTags?.data?.filter(hasAttributes) ?? [],
        mapSection: homePage?.data?.attributes?.mapSection ?? null,
        Seo: homePage?.data?.attributes?.Seo ?? null,
        general,
        ...translations,
      },
      revalidate: 10,
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 10,
    }
  }
}

export default Index
