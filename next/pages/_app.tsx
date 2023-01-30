import '../styles/globals.css'

import { NavMenuContextProvider } from '@modules/navigation/navMenuContext'
import MI18nProvider from '@modules/providers/MI18nProvider'
import MQueryClientProvider from '@modules/providers/MQueryClientProvider'
import { beausiteFont } from '@utils/beausiteFont'
import { isProductionDeployment } from '@utils/utils'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next'
import { NextAdapter } from 'next-query-params'
import { OverlayProvider, SSRProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'

import ErrorDisplay from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  if (pageProps.error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={pageProps.error} />
      </ErrorPage>
    )
  }

  return (
    <div className={`${beausiteFont.variable} font-beausite`}>
      <Script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.sk" />
      {isProductionDeployment() ? (
        <Script
          strategy="afterInteractive"
          data-domain="mestskakniznica.sk"
          src="https://plausible.io/js/plausible.js"
        />
      ) : null}
      <SSRProvider>
        <MQueryClientProvider>
          <MI18nProvider>
            <OverlayProvider>
              <QueryParamProvider adapter={NextAdapter}>
                <NavMenuContextProvider>
                  <Component {...pageProps} />
                </NavMenuContextProvider>
              </QueryParamProvider>
            </OverlayProvider>
          </MI18nProvider>
        </MQueryClientProvider>
      </SSRProvider>
    </div>
  )
}

export default appWithTranslation(CustomApp)
