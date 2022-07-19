import {
  ComponentSeoSeo,
  FooterEntity,
  MenuEntity,
  PageEntity,
} from '@bratislava/strapi-sdk-city-library'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'
import SearchPage from '../components/pages/SearchPage'
import { client } from '../utils/gql'
import { arrayify, isPresent } from '../utils/utils'

export function Search({ locale, error, Seo, page, menus, footer }: IProps) {
  if (error) {
    return (
      <PageWrapper
        locale={locale ?? 'sk'}
        slug="/"
        localizations={page?.attributes?.localizations?.data.filter(isPresent).map(localisation => ({locale: localisation.attributes?.locale, slug: localisation.attributes?.slug}))}
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
      localizations={page?.attributes?.localizations?.data.filter(isPresent).map(localisation => ({locale: localisation.attributes?.locale, slug: localisation.attributes?.slug}))}
    >
      <DefaultPageLayout Seo={page?.attributes?.Seo} menus={menus} footer={footer}>
        <SearchPage page={page} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

interface IProps {
  locale?: string;
  localizations?: Partial<PageEntity>[];
  error?: IDisplayError;
  Seo?: ComponentSeoSeo;
  page?: PageEntity;
  menus: MenuEntity[];
  footer: FooterEntity;
}

// trigger redeployment :)

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  const locale = ctx?.locale ?? 'sk'
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  const slug = arrayify(ctx?.params?.slug).join('/')

  try {
    // running all requests parallel
    // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
    //const [{ homePage, menus, footer }] = await Promise.all([client.HomePage({ locale })])

    const {pages, menus, footer }= await client.PageBySlug({
      slug,
      locale,
    })

    return {
      props: {
        locale,
        page: pages?.data[0] ?? [],
        menus: menus?.data,
        footer: footer?.data,
        ...translations,
      },
    }
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...translations,
      },
    }
  }
}

export default Search
