import './index.css'

import { UIContextProvider } from '@bratislava/common-frontend-ui-context'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Link from 'next/link'
import Script from 'next/script'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { CityLibraryMarkdown } from '../components/Atoms/CityLibraryMarkdown'
import CookieConsent from '../components/Molecules/CookieConsent'
import ErrorDisplay from '../components/Molecules/ErrorDisplay'
import ErrorPage from '../components/pages/ErrorPage'

function CustomApp({ Component, pageProps, router }: AppProps): JSX.Element {
  if (pageProps.error) {
    return (
      <ErrorPage code={500}>
        <ErrorDisplay error={pageProps.error} />
      </ErrorPage>
    )
  }
  return (
    <div className="font-beausite text-default">
      <Script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.sk" />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY}
        language="sk"
        useEnterprise={true}
      >
        <UIContextProvider
          components={{
            Link: ({ href, className, children, locale, target, rel }) => {
              if (href === undefined || href === null) return null
              return (
                <Link href={href} locale={locale}>
                  <a target={target} rel={rel} href={href} className={className}>
                    {children}
                  </a>
                </Link>
              )
            },
            Image: ({ alt, src }) => <img alt={alt} src={src} />,
            Markdown: ({ className, paragraphClassName, content }) => (
              <CityLibraryMarkdown
                className={className}
                paragraphClassName={paragraphClassName}
                content={content}
              />
            ),
          }}
        >
          <Component {...pageProps} />
        </UIContextProvider>
        </GoogleReCaptchaProvider>
      <CookieConsent />
    </div>
  )
}

export default appWithTranslation(CustomApp)
