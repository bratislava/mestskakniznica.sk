import '@/styles/globals.css'

import { AppProps } from 'next/app'
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next/pages'
import PlausibleProvider from 'next-plausible'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import { OverlayProvider } from 'react-aria'

import ErrorDisplay from '@/components/Molecules/ErrorDisplay'
import ErrorPage from '@/components/pages/ErrorPage'
import { NavMenuContextProvider } from '@/modules/navigation/navMenuContext'
import MI18nProvider from '@/modules/providers/MI18nProvider'
import MQueryClientProvider from '@/modules/providers/MQueryClientProvider'
import { NavikronosConfigProvider } from '@/navikronos/NavikronosConfigProvider'
import { beausiteFont } from '@/utils/beausiteFont'
import { navikronosConfig } from '@/utils/navikronos'
import { isProductionDeployment } from '@/utils/utils'

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
      <PlausibleProvider
        domain="mestskakniznica.sk"
        taggedEvents
        trackFileDownloads
        enabled={isProductionDeployment()}
      />
      <NavikronosConfigProvider config={navikronosConfig}>
        <MQueryClientProvider>
          <MI18nProvider>
            <OverlayProvider>
              <NuqsAdapter>
                <NavMenuContextProvider>
                  <Component id="root" {...pageProps} />
                </NavMenuContextProvider>
              </NuqsAdapter>
            </OverlayProvider>
          </MI18nProvider>
        </MQueryClientProvider>
      </NavikronosConfigProvider>
    </div>
  )
}

export default appWithTranslation(CustomApp)
