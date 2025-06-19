import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { usePlausible } from 'next-plausible'
import { useEffect } from 'react'

import DefaultPageLayout from '@/components/layouts/DefaultPageLayout'
import ErrorPage from '@/components/pages/ErrorPage'
import Button from '@/modules/common/Button'
import { navikronosGetStaticProps } from '@/navikronos/navikronosGetStaticProps'
import { wrapNavikronosProvider } from '@/navikronos/wrapNavikronosProvider'
import { GeneralQuery } from '@/services/graphql'
import { generalFetcher } from '@/services/graphql/fetchers/general.fetcher'
import { GeneralContextProvider } from '@/utils/generalContext'
import { CLNavikronosPageProps, navikronosConfig } from '@/utils/navikronos'

type Error404PageProps = {
  general: GeneralQuery
} & CLNavikronosPageProps

const Custom404 = ({ general }: Error404PageProps) => {
  const { t, i18n } = useTranslation()

  const { asPath } = useRouter()

  const plausible = usePlausible()

  // Inspired by https://github.com/4lejandrito/next-plausible/issues/24
  useEffect(() => {
    plausible('404', { props: { path: document.location.pathname } })
  }, [plausible])

  return (
    <GeneralContextProvider general={general}>
      <DefaultPageLayout>
        <ErrorPage code={404}>
          <header className="mb-6 text-h1">
            <h1>{t('404.pageNotFound')}</h1>
          </header>
          <p className="text-base">{t('404.pageNotFoundSorry')}</p>
          <p className="pt-10 text-base underline">
            {`https://www.mestskakniznica.sk${
              i18n.language === 'sk' ? '' : `/${i18n.language}`
            }${asPath}`}
          </p>
          <Button variant="primary" href="/" className="mt-8">
            {t('common.homepage')}
          </Button>
        </ErrorPage>
      </DefaultPageLayout>
    </GeneralContextProvider>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const [general, translations, navikronosStaticProps] = await Promise.all([
    generalFetcher(locale),
    serverSideTranslations(locale),
    navikronosGetStaticProps({
      navikronosConfig,
      ctx,
    }),
  ])

  return {
    props: {
      general,
      navikronosStaticProps,
      ...translations,
    },
  }
}

export default wrapNavikronosProvider(Custom404)
