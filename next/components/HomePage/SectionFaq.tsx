import { CallToAction } from '@bratislava/ui-city-library'
import Accordion from '@modules/common/Accordion'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import RichText from '@modules/formatting/RichText'
import { ComponentHomepageFaqSection } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface SectionFaqProps {
  faqSection: ComponentHomepageFaqSection
}

const SectionFaq = ({ faqSection }: SectionFaqProps) => {
  const { t } = useTranslation(['homepage', 'common'])
  const { getPathForEntity } = useNavikronos()
  const showMoreId = faqSection?.redirectTo?.data?.id

  return (
    <section className="py-12">
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <div className="w-full space-y-4 md:w-96">
          {faqSection?.ctas?.map((cta) => {
            const ctaId = cta?.ctaRedirectTo?.data?.id
            return ctaId ? (
              <div key={cta?.title}>
                <CallToAction
                  title={cta?.title || ''}
                  href={
                    getPathForEntity({
                      type: 'page',
                      id: ctaId,
                    }) ?? ''
                  }
                  className="h-[222px] w-full p-4 text-h3 hover:underline"
                />
              </div>
            ) : null
          })}
        </div>
        <div className="border-l border-border-dark" />
        <div className="w-full">
          <h2 className="mb-8 text-h3">{faqSection?.title ?? t('faqTitle')}</h2>
          {faqSection?.faqs?.map((faq) => (
            <Accordion key={faq?.id} title={faq?.question} type="divider-big">
              <RichText content={faq?.answer || ''} />
            </Accordion>
          ))}
          <div className="pt-6 text-sm">
            {showMoreId && (
              <ShowMoreLink href={getPathForEntity({ type: 'page', id: showMoreId }) ?? ''}>
                {t('showMore', { ns: 'common' })}
              </ShowMoreLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFaq
