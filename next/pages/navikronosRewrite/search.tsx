import DefaultPageLayout from '@components/layouts/DefaultPageLayout'
import ErrorDisplay, { getError, IDisplayError } from '@components/Molecules/ErrorDisplay'
import ErrorPage from '@components/pages/ErrorPage'
import SearchPage from '@components/pages/SearchPage'
import { GeneralQuery } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { GeneralContextProvider } from '@utils/generalContext'
import { CLNavikronosPageProps, navikronosConfig } from '@utils/navikronos'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { navikronosGetStaticProps } from '../../navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '../../navikronos/wrapNavikronosProvider'

export const Search = ({ error, general }: PageProps) => {
  if (error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={error} />
      </ErrorPage>
    )
  }

  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout>
        <SearchPage />
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

type PageProps = {
  error?: IDisplayError
  general: GeneralQuery
} & CLNavikronosPageProps

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-non-null-asserted-optional-chain
  const locale = ctx?.locale!
  const translations = await serverSideTranslations(locale, ['common', 'newsletter', 'homepage'])

  const navikronosStaticProps = await navikronosGetStaticProps({
    navikronosConfig,
    ctx,
    currentEntity: {
      type: 'static',
      id: 'search',
    },
  })

  try {
    const general = await generalFetcher(locale)

    return {
      props: {
        general,
        navikronosStaticProps,
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

export default wrapNavikronosProvider(Search)
