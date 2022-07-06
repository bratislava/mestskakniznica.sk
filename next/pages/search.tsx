import {
  ComponentSeoSeo,
  FooterEntity,
  MenuEntity,
  PageEntity,
} from '@bratislava/strapi-sdk-city-library';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { GetStaticPropsContext } from 'next';

import DefaultPageLayout from '../components/layouts/DefaultPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'
import { swrCacheGet } from '../utils/cache'
import { client } from '../utils/gql'
import { isPresent, arrayify } from '../utils/utils'
import SearchPage from '../components/pages/SearchPage';

export function Search({
  locale,
  localizations,
  error,
  Seo,
  page,
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
          .map((l: any) => ({ ...l, slug: '' }))}
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
        .map((l: any) => ({ ...l, slug: '' }))}
    >
      <DefaultPageLayout Seo={Seo} menus={menus} footer={footer}>
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
  const ssr = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])
  
  const slug = arrayify(ctx?.params?.slug).join('/');
  
  try {
    // running all requests parallel
    // TODO rewrite this into a single gql query for homepage - beforehand filter needless data that isn't used
    const [{ homePage, menus, footer }]: any = await swrCacheGet(
      `homepage-${locale}`,
      () => Promise.all([client.HomePage({ locale })])
    );

    const pageBySlugResponse = await client.PageBySlug({
      slug,
      locale,
    });

    return {
      props: {
        locale,
        localizations: homePage?.localizations ?? null,
        page: pageBySlugResponse.pages,
        menus,
        footer,
        Seo: homePage?.Seo ?? null,
        ...ssr,
      },
    };
  } catch (iError) {
    console.error(iError)
    const error = getError(iError)

    return {
      props: {
        error,
        ...ssr,
      },
    }
  }
}

export default Search
