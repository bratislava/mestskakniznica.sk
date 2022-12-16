import {
  ComponentSeoSeo,
  EventCardEntityFragment,
  FooterEntity,
  MenuEntity,
} from '@bratislava/strapi-sdk-city-library'
import { Footer, SectionContainer } from '@bratislava/ui-city-library'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import favicon from '../../assets/images/mkb_favicon.png'
import Header from '../AppLayout/Header'
import MobileHeader from '../AppLayout/MobileNavigation/MobileHeader'
import NewsletterSection from '../HomePage/NewsletterSection'
import ScrollToTop from '../ScrollToTop'
import { otherLocale, usePageWrapperContext } from './PageWrapper'

interface IProps {
  children?: React.ReactNode
  title?: string | undefined | null
  Seo?: ComponentSeoSeo | undefined | null
  menus: MenuEntity[]
  footer: FooterEntity
  upcomingEvents?: EventCardEntityFragment[]
  isHomePage?: boolean
}

const DefaultPageLayout = ({
  children,
  title,
  Seo,
  menus,
  footer,
  upcomingEvents,
  isHomePage,
}: IProps) => {
  const { localizations, locale } = usePageWrapperContext()
  const otherLangData = otherLocale(locale ?? 'sk', localizations)
  const currentLangData = otherLocale(otherLangData.locale, localizations)

  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>
          {`${(title ?? t('pageTitle') ?? '') +
            ((title || t('pageTitle')) && ' | ') 
            }mestskakniznica.sk`}
        </title>
        {Seo && (
          <>
            <meta
              name="title"
              content={
                `${(Seo.metaTitle ?? title ?? '') +
                ((Seo.metaTitle || title) && ' | ') 
                }mestskakniznica.sk`
              }
            />
            <meta name="description" content={Seo.metaDescription ?? t('chooseYourBook')} />
            <meta name="keywords" content={Seo.keywords ?? ''} />
            <meta
              name="viewport"
              content={Seo.metaViewport ?? 'width=device-width, initial-scale=1'}
            />
            <meta name="robots" content={Seo.metaRobots ?? ''} />
            <meta name="canonical" content={Seo.canonicalURL ?? ''} />
          </>
        )}
        <link
          rel="alternate"
          href={process.env.ORIGIN_ROOT_URL + currentLangData.path}
          hrefLang={`${locale}-sk`}
        />
        <link
          rel="alternate"
          href={process.env.ORIGIN_ROOT_URL + otherLangData.path}
          hrefLang={`${otherLangData.locale}-sk`}
        />
      </Head>
      <div className="flex min-h-screen flex-1 flex-col justify-self-stretch">
        <header>
          <div className="hidden lg:block lg:px-8">
            <Header menus={menus} upcomingEvents={upcomingEvents} isHomePage={isHomePage} />
          </div>
          <div className="block lg:hidden">
            <MobileHeader menus={menus} />
          </div>
        </header>
        <main id="content-anchor">
          {children}
          <div className="px-4">
            <NewsletterSection />
          </div>
          <ScrollToTop />
        </main>
        <footer>
          <SectionContainer>
            <Footer
              footerColumns={footer?.attributes?.footerColumns || []}
              // siteMap={{
              //   title: t('siteMap'),
              //   href: footer?.siteMapLink?.slug ?? '#',
              // }}
              gdpr={{
                title: t('privacy'),
                // href: footer?.privacyLink?.slug ?? '#',
                href:
                  locale == 'sk'
                    ? '/o-nas/ochrana-osobnych-udajov'
                    : '/en/about-us/privacy-terms-and-conditions',
              }}
              VOP={{
                title: t('VOP'),
                href: 'https://cdn-api.bratislava.sk/strapi-city-library/upload/vyhlasenie_o_pristupnosti_mkb_a75189f26f.pdf',
              }}
              copyrightText={`${new Date().getFullYear()} ${t('copyright')}`}
              facebookUrl="https://sk-sk.facebook.com/mestskakniznica/"
              instagramUrl="https://www.instagram.com/mestska_kniznica_bratislava/?hl=sk"
              youtubeUrl="https://www.youtube.com/channel/UCX4B3tYI32-YcdsaD-Yt8Dw"
            />
          </SectionContainer>
        </footer>
      </div>
    </>
  )
}

export default DefaultPageLayout
