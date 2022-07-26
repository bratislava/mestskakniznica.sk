import {
  BookTagsQuery,
  ComponentHomepageFaqSection,
  ComponentHomepageNewsSection,
  ComponentHomepageRegistrationInfo,
  ComponentSeoSeo,
  EventCardEntityFragment,
  EventEntity,
  FooterEntity,
  MenuEntity,
  PageEntity,
  PageEntityFragment,
  PagesByLayoutQuery,
  PromoNewsCardFragment,
} from '@bratislava/strapi-sdk-city-library'
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
import { hasAttributes, isDefined } from '../utils/isDefined'
import { getOpacBooks, OpacBook } from '../utils/opac'
import { ILocality } from '../utils/types'
import { convertPagesToLocalities, isPresent } from '../utils/utils'

export function Index({
  locale,
  localizations,
  news,
  latestEvents,
  promos,
  bookTags,
  faqSection,
  registrationInfoSection,
  newsSection,
  opacBookNews,
  localities,
  error,
  Seo,
  menus,
  footer,
}: IProps) {
  if (error) {
    return (
      <PageWrapper
        locale={locale ?? 'sk'}
        slug="/"
        localizations={localizations
          ?.filter(isPresent)
          // add empty slug because it's expected in wrapper and index page does not have slug
          .map((l) => ({ ...l, slug: '' }))}
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
      <DefaultPageLayout Seo={Seo} menus={menus} footer={footer} latestEvents={latestEvents}>
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

        <SectionContainer>
          <Section>
            <SectionTags bookTags={bookTags} />
          </Section>
        </SectionContainer>

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

interface IProps {
  locale?: string
  localizations?: Partial<PageEntity>[]
  news: PageEntity[]
  latestEvents: EventEntity[]
  opacBookNews: OpacBook[]
  promos: (EventCardEntityFragment | PromoNewsCardFragment)[]
  bookTags: NonNullable<BookTagsQuery['bookTags']>
  faqSection: ComponentHomepageFaqSection
  newsSection: ComponentHomepageNewsSection
  registrationInfoSection: ComponentHomepageRegistrationInfo
  localities: ILocality[]
  error?: IDisplayError
  Seo?: ComponentSeoSeo
  menus: MenuEntity[]
  footer: FooterEntity
}

// trigger redeployment :)

export const getStaticProps: GetStaticProps = async ({ locale = 'sk' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  try {
    // running all requests parallel
    // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
    const [
      opacBookNews,
      { pages: news },
      { homePage, menus, footer },
      { promotedNews },
      { promotedEvents },
      localityPages,
      { bookTags },
    ] = await Promise.all([
      getOpacBooks(),
      client.PagesByLayout({
        layout: 'news',
        locale,
        sort: 'publishedAt:asc',
        start: 0,
        limit: 4,
      }),
      client.HomePage({ locale }),
      client.PromotedNews({ locale }),
      client.PromotedEvents({ locale, start: 0, limit: 3 }),
      client.PagesByLayout({
        layout: 'locality',
        locale,
        sort: 'publishedAt:asc',
        start: 0,
        limit: 4,
      }),
      client.BookTags(),
    ])

    if (!homePage || !bookTags) {
      return { notFound: true }
    }

    const today = new Date()
    const { events: latestEventsResponse } = await client.EventList({
      locale,
      start: 0,
      limit: 4,
      filters: { dateFrom: { gte: today.toISOString() } },
      sort: 'dateFrom:asc',
    })

    const localities = convertPagesToLocalities(localityPages.pages?.data ?? [], true).map(
      (locality) => ({
        ...locality,
        hideOpeningHours: true,
      })
    )

    return {
      props: {
        locale,
        localizations: homePage?.data?.attributes?.localizations?.data,
        news: news?.data?.filter(hasAttributes) ?? [],
        latestEvents: latestEventsResponse?.data.filter(hasAttributes) ?? [],
        promos: [...(promotedNews?.data ?? []), ...(promotedEvents?.data ?? [])],
        bookTags,
        opacBookNews,
        menus: menus?.data,
        footer: footer?.data,
        faqSection: homePage?.data?.attributes?.faqSection,
        newsSection: homePage?.data?.attributes?.newsSection,
        Seo: homePage?.data?.attributes?.Seo,
        registrationInfoSection: homePage?.data?.attributes?.registrationInfoSection,
        localities,
        ...translations,
      },
      revalidate: 86400,
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
      revalidate: 86400,
    }
  }
}

export default Index
