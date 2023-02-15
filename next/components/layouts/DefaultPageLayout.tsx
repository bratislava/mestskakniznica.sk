import { Footer, SectionContainer } from '@bratislava/ui-city-library'
import ScrollToTopButton from '@modules/common/ScrollToTopButton'
import HeaderWrapper from '@modules/navigation/HeaderWrapper'
import { useNavMenuContext } from '@modules/navigation/navMenuContext'
import { SeoFragment } from '@services/graphql'
import { useGeneralContext } from '@utils/generalContext'
import cx from 'classnames'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import favicon from '../../assets/images/mkb_favicon.png'
import NewsletterSection from '../HomePage/NewsletterSection'
import { otherLocale, usePageWrapperContext } from './PageWrapper'
import { useNavikronos } from '@utils/navikronos'

interface IProps {
  children?: React.ReactNode
  title?: string | undefined | null
  seo?: SeoFragment | undefined | null
}

const DefaultPageLayout = ({ children, title, seo }: IProps) => {
  {
    /* TODO fix for other content types */
  }
  const { localizations, locale } = usePageWrapperContext()
  const otherLangData = otherLocale(locale ?? 'sk', localizations)
  const currentLangData = otherLocale(otherLangData.locale, localizations)
  const { footer, general } = useGeneralContext()
  const { getPathForEntity } = useNavikronos()

  const { t } = useTranslation('common')

  const { menuValue } = useNavMenuContext()

  return (
    <>
      {/* TODO separate Seo info component */}
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>{`${seo?.metaTitle || title || ''} – mestskakniznica.sk`}</title>
        {seo && (
          <>
            <meta name="title" content={`${seo?.metaTitle || title || ''} – mestskakniznica.sk`} />

            {/* TODO add perex or similar field as description */}
            <meta name="description" content={seo?.metaDescription || ''} />
            <meta name="keywords" content={seo?.keywords ?? ''} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <div
        className={cx('flex min-h-screen flex-1 flex-col justify-self-stretch', {
          // If menu is open, disable pointer events on the whole page (pointer events on menu must be re-enabled)
          'pointer-events-none': menuValue !== '',
        })}
      >
        <header>
          <HeaderWrapper />
        </header>
        <main id="content-anchor">
          {children}
          <div className="px-4">
            <NewsletterSection />
          </div>
          <ScrollToTopButton />
        </main>
        <footer>
          <SectionContainer>
            <Footer
              footerColumns={footer?.data?.attributes?.footerColumns || []}
              // siteMap={{
              //   title: t('siteMap'),
              //   href: footer?.siteMapLink?.slug ?? '#',
              // }}
              gdpr={{
                title: t('privacy'),
                // href: footer?.privacyLink?.slug ?? '#',
                // TODO: Navikronos
                href:
                  getPathForEntity({
                    type: 'page',
                    id: general?.data?.attributes?.privacyTermsAndConditionsPage?.data?.id,
                  }) ?? '',
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
