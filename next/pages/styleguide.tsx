 
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import StyleguideAccordion from '@/components/styleguide/StyleguideAccordion'
import StyleguideBreadcrumbs from '@/components/styleguide/StyleguideBreadcrumbs'
import StyleguideCards from '@/components/styleguide/StyleguideCards'
import StyleguideCheckbox from '@/components/styleguide/StyleguideCheckbox'
import StyleguideForms from '@/components/styleguide/StyleguideForms'
import StyleguideRadioGroup from '@/components/styleguide/StyleguideRadioGroup'
import StyleguideShowMoreLink from '@/components/styleguide/StyleguideShowMoreLink'
import StyleguideTypography from '@/components/styleguide/StyleguideTypography'
import { NOT_FOUND } from '@/utils/consts'
import { isProductionDeployment } from '@/utils/utils'

const Styleguide = () => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <>
      <Head>
        <title>Styleguide</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container mx-auto">
        <StyleguideTypography />
        <StyleguideCheckbox />
        <StyleguideRadioGroup />
        <StyleguideForms />
        <StyleguideAccordion />
        <StyleguideCards />
        <StyleguideShowMoreLink />
        <StyleguideBreadcrumbs />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) {
    return NOT_FOUND
  }

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
