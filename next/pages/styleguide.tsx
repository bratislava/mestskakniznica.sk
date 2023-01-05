import StyleguideAccordion from '@components/styleguide/StyleguideAccordion'
import StyleguideCards from '@components/styleguide/StyleguideCards'
import StyleguideShowMoreLink from '@components/styleguide/StyleguideShowMoreLink'
import StyleguideTypography from '@components/styleguide/StyleguideTypography'
import { isProductionDeployment } from '@utils/utils'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const Styleguide = () => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container mx-auto">
        <StyleguideTypography />
        <StyleguideAccordion />
        <StyleguideCards />
        <StyleguideShowMoreLink />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Styleguide
