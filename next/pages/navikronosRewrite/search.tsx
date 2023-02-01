import { GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { GeneralContextProvider } from '@utils/generalContext'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import PageWrapper from '@components/layouts/PageWrapper'
import ErrorDisplay, { getError, IDisplayError } from '@components/Molecules/ErrorDisplay'
import ErrorPage from '@components/pages/ErrorPage'
import SearchPage from '@components/pages/SearchPage'

export const Search = ({ locale, error, general }: IProps) => {
  if (error) {
    return (
      <PageWrapper locale={locale ?? 'sk'} slug="/">
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
        slug="vyhladavanie"
        localizations={[
          {
            locale: 'sk',
            slug: 'vyhladavanie',
          },
          {
            locale: 'en',
            slug: 'search',
          },
        ]}
      >
        <DefaultPageLayout>
          <SearchPage />
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

interface IProps {
  locale?: string
  error?: IDisplayError
  general: GeneralQuery
}

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  const locale = ctx?.locale!
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  try {
    const general = await generalFetcher(locale)

    return {
      props: {
        locale,
        general,
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
