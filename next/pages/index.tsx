import {
  BookTagEntityFragment,
  ComponentHomepageFaqSection,
  ComponentHomepageNewsSection,
  ComponentHomepageRegistrationInfo,
  ComponentSeoSeo,
  EventCardEntityFragment,
  FooterEntity,
  MenuEntity,
  PageEntity,
  PageEntityFragment,
  PageLocalizationEntityFragment,
  PromoNewsCardFragment,
} from '../graphql'
import { Localities, SectionContainer } from '@bratislava/ui-city-library'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Section from '../components/AppLayout/Section'
import SectionFaq from '../components/HomePage/SectionFaq'
import SectionLibraryNews from '../components/HomePage/SectionLibraryNews'
import SectionOpacBookNews from '../components/HomePage/SectionOpacBookNews'
import SectionPromos from '../components/HomePage/SectionPromos'
import SectionRegistrationInfo from '../components/HomePage/SectionRegistrationInfo'
import SectionTags from '../components/HomePage/SectionTags'
import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'
import { client } from '../utils/gql'
import { hasAttributes } from '../utils/isDefined'
import { getOpacBooks, OpacBook } from '../utils/opac'
import { ILocality } from '../utils/types'
import { convertPagesToLocalities, isPresent } from '../utils/utils'
import { useUpcomingEvents } from '../hooks/useUpcomingEvets'

interface IIndexProps {
  locale?: string
  localizations?: PageLocalizationEntityFragment[]
  menus: MenuEntity[]
  upcomingEvents: EventCardEntityFragment[]
  promos: (EventCardEntityFragment | PromoNewsCardFragment)[]
  news: PageEntity[]
  opacBookNews: OpacBook[]
  faqSection: ComponentHomepageFaqSection
  newsSection: ComponentHomepageNewsSection
  registrationInfoSection: ComponentHomepageRegistrationInfo
  localities: ILocality[]
  bookTags: BookTagEntityFragment[]
  footer: FooterEntity
  error?: IDisplayError
  Seo?: ComponentSeoSeo
}

export function Index({
  locale = 'sk',
  localizations,
  menus,
  upcomingEvents,
  promos,
  news,
  opacBookNews,
  faqSection,
  newsSection,
  registrationInfoSection,
  localities,
  bookTags,
  footer,
  error,
  Seo,
}: IIndexProps) {
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
    <PageWrapper
      locale={locale ?? 'sk'}
      slug="/"
      localizations={localizations
        ?.filter(isPresent)
        // add empty slug because it's expected in wrapper and index page does not have slug
        .map((l) => ({ ...l, slug: '' }))}
    >
      <DefaultPageLayout Seo={Seo} menus={menus} footer={footer} upcomingEvents={upcomingEvents}>
        {promos.length > 0 && (
          <SectionContainer>
            <Section>
              <SectionPromos promos={promos} />
            </Section>
          </SectionContainer>
        )}

        <SectionContainer>
          <SectionOpacBookNews books={opacBookNews} />
        </SectionContainer>

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

        {newsSection !== null && news.length > 0 && (
          <SectionContainer>
            <Section>
              <SectionLibraryNews newsSection={newsSection} news={news as PageEntityFragment[]} />
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

        <SectionContainer>
          <Section noBorder>
            <Localities
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
              localities={localities}
            />
          </Section>
        </SectionContainer>
      </DefaultPageLayout>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'sk' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  try {
    // running all requests parallel
    // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
    const [
      opacBookNews,
      {
        homePage,
        menus,
        upcomingEvents,
        promotedNews,
        promotedEvents,
        latestNews,
        bookTags,
        localityPages,
        footer,
      },
    ] = await Promise.all([
      getOpacBooks(),
      client.HomePage({ locale, date: new Date().toISOString() }),
    ])

    if (!homePage) {
      return { notFound: true }
    }

    const localities = convertPagesToLocalities(localityPages?.data ?? [], true).map(
      (locality) => ({
        ...locality,
        hideOpeningHours: true,
      })
    )

    return {
      props: {
        locale,
        localizations: homePage?.data?.attributes?.localizations?.data,
        menus: menus?.data,
        upcomingEvents: upcomingEvents?.data ?? [],
        promos: [...(promotedNews?.data ?? []), ...(promotedEvents?.data ?? [])],
        news: latestNews?.data?.filter(hasAttributes) ?? [],
        opacBookNews,
        faqSection: homePage?.data?.attributes?.faqSection,
        newsSection: homePage?.data?.attributes?.newsSection,
        registrationInfoSection: homePage?.data?.attributes?.registrationInfoSection,
        localities,
        bookTags: bookTags?.data?.filter(hasAttributes) ?? [],
        footer: footer?.data,
        Seo: homePage?.data?.attributes?.Seo,
        ...translations,
      },
      revalidate: 3600, // revalidates every hour
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 180, // in case of an error, revalidates in 3 minutes
    }
  }
}

export default Index
