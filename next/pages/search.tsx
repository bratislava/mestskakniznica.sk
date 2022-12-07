import {
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

export const Search = ({ locale, error, page, menus, footer }: IProps) => {
  if (error) {
    return (
      <PageWrapper
        locale={locale ?? 'sk'}
        slug="/"
        localizations={page?.attributes?.localizations?.data
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
      localizations={page?.attributes?.localizations?.data
        ?.filter(isPresent)
        .map((localization) => ({
          locale: localization.attributes?.locale,
          slug: localization.attributes?.slug,
        }))}
    >
      <DefaultPageLayout Seo={page?.attributes?.Seo} menus={menus} footer={footer}>
        <SearchPage page={page} />
      </DefaultPageLayout>
    </PageWrapper>
  )
}

interface IProps {
  locale?: string
  error?: IDisplayError
  page?: PageEntity
  menus: MenuEntity[]
  footer: FooterEntity
}

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  const locale = ctx?.locale ?? 'sk'
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  const slug = arrayify(ctx?.params?.slug).join('/')

  try {
    const today = new Date().toISOString()
    const [{ menus, footer }] = await Promise.all([client.HomePage({ locale, date: today })])

    const { pages } = await client.PageBySlug({ slug, locale, date: today })

    return {
      props: {
        locale,
        page: pages?.data[0] ?? [],
        menus: menus?.data,
        footer,
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
