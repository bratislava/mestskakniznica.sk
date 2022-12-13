import Arrow from '@assets/images/arrow-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ComponentHomepageFaqSection } from '@bratislava/strapi-sdk-city-library'
import { Accordion, CallToAction } from '@bratislava/ui-city-library'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

interface SectionFaqProps {
  faqSection: ComponentHomepageFaqSection
}

const SectionFaq = ({ faqSection }: SectionFaqProps) => {
  const { t } = useTranslation(['homepage', 'common'])
  const [openFaq, setOpenFaq] = useState('')
  const { Markdown: UIMarkdown } = useUIContext()

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenFaq(state ? id : '')
  }

  return (
    <section className="py-12">
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <div className="w-full space-y-4 md:w-96">
          {faqSection?.ctas?.map((cta) => (
            <div key={cta?.title}>
              {cta?.ctaRedirectTo?.data?.attributes?.slug && (
                <CallToAction
                  title={cta?.title || ''}
                  href={cta?.ctaRedirectTo?.data?.attributes.slug}
                  bottomText=""
                  className="h-[222px] w-full p-4 text-h3.5 hover:underline"
                  customIcon={<Arrow/>}
                  hasIcon={false}
                  uppercase={false}
                />
              )}
            </div>
          ))}
        </div>
        <div className="border-l border-border-dark"/>
        <div className="w-full">
          <h2 className="mb-8 text-h3">{faqSection?.title ?? t('faqTitle')}</h2>
          {faqSection?.faqs?.map((faq) => (
            <Accordion
              className="w-full"
              id={faq?.id}
              key={faq?.id}
              type="divider"
              size="big"
              stateListener={listenAccordionState}
              defaultState={openFaq === faq?.id}
              ariaLabelPrefix={openFaq === faq?.id ? t('openAccordian') : t('closeAccordian')}
              label={faq?.question || ''}
              content={<UIMarkdown content={faq?.answer || ''}/>}
            />
          ))}
          <div className="font-serif cursor-pointer pt-6 text-sm">
            <Link href={faqSection?.redirectTo?.data?.attributes?.slug ?? '#'} passHref>
              <a href={faqSection?.redirectTo?.data?.attributes?.slug ?? '#'} className="uppercase">
                {t('showMore', { ns: 'common' })} {'>'}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFaq
