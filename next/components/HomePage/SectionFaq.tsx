import Arrow from '@assets/images/arrow-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ComponentHomepageFaqSection } from '@bratislava/strapi-sdk-city-library'
import { CallToAction } from '@bratislava/ui-city-library'
import Accordion from '@modules/common/Accordion'
import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface SectionFaqProps {
  faqSection: ComponentHomepageFaqSection
}

const SectionFaq = ({ faqSection }: SectionFaqProps) => {
  const { t } = useTranslation(['homepage', 'common'])
  const { Markdown: UIMarkdown } = useUIContext()

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
                  className="h-[222px] w-full p-4 text-h3 hover:underline"
                  customIcon={<Arrow />}
                  hasIcon={false}
                  uppercase={false}
                />
              )}
            </div>
          ))}
        </div>
        <div className="border-l border-border-dark" />
        <div className="w-full">
          <h2 className="mb-8 text-h3">{faqSection?.title ?? t('faqTitle')}</h2>
          {faqSection?.faqs?.map((faq) => (
            <Accordion key={faq?.id} title={faq?.question} type="divider-big">
              <UIMarkdown content={faq?.answer || ''} className="mb-0 text-base" />
            </Accordion>
          ))}
          <div className="pt-6 text-sm">
            <MLink
              href={faqSection?.redirectTo?.data?.attributes?.slug ?? '#'}
              variant="basic"
              className="uppercase"
            >
              {t('showMore', { ns: 'common' })} {'>'}
            </MLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFaq
