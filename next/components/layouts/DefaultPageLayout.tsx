import { Footer, SectionContainer } from '@bratislava/ui-city-library'
import { SeoFragment } from '@services/graphql'
import cx from 'classnames'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import ScrollToTopButton from '@/modules/common/ScrollToTopButton'
import HeaderWrapper from '@/modules/navigation/HeaderWrapper'
import { useNavMenuContext } from '@/modules/navigation/navMenuContext'
import { useGeneralContext } from '@/utils/generalContext'
import { useNavikronos } from '@/utils/navikronos'

import favicon from '../../assets/images/mkb_favicon.png'
import NewsletterSection from '../HomePage/NewsletterSection'

interface IProps {
  children?: ReactNode
  title?: string | undefined | null
  seo?: SeoFragment | undefined | null
  defaultMetaDescription?: string | undefined | null
}

const DefaultPageLayout = ({ children, title, seo, defaultMetaDescription }: IProps) => {
  const { footer, general } = useGeneralContext()
  const { getPathForStrapiEntity, localizations, getPathForEntity } = useNavikronos()

  const { t } = useTranslation('common')
  const { menuValue } = useNavMenuContext()

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>{`${seo?.metaTitle || title || ''} – mestskakniznica.sk`}</title>

        <meta name="title" content={`${seo?.metaTitle || title || ''} – mestskakniznica.sk`} />
        <meta name="description" content={seo?.metaDescription || defaultMetaDescription || ''} />
        <meta name="keywords" content={seo?.keywords ?? ''} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {localizations?.map((entity) => (
          <link key={entity.locale} rel="alternate" href={getPathForEntity(entity) ?? '#'} />
        ))}
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
                href:
                  getPathForStrapiEntity(
                    general?.data?.attributes?.privacyTermsAndConditionsPage?.data
                  ) ?? '#',
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
