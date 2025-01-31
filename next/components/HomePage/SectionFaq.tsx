import { useTranslation } from 'next-i18next'
import React from 'react'

import { SectionContainer } from '@/components/ui'
import PageCard from '@/modules/cards-and-rows/PageCard'
import Accordion from '@/modules/common/Accordion'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import RichText from '@/modules/formatting/RichText'
import { HomepageFaqSectionFragment } from '@/services/graphql'
import { useNavikronos } from '@/utils/navikronos'

interface SectionFaqProps {
  faqSection: HomepageFaqSectionFragment
}

const SectionFaq = ({ faqSection }: SectionFaqProps) => {
  const { t } = useTranslation(['common'])
  const { getPathForStrapiEntity } = useNavikronos()

  return (
    <SectionContainer hasBorder>
      <div className="flex flex-col space-y-8 py-12 md:flex-row md:space-y-0 md:space-x-8">
        <div className="w-full space-y-4 md:w-96">
          {faqSection?.ctas?.map((cta) => (
            <div key={cta?.title}>
              <PageCard
                title={cta?.title || ''}
                href={getPathForStrapiEntity(cta?.ctaRedirectTo?.data) ?? '#'}
                className="h-[222px] w-full p-4 text-h3 hover:underline"
              />
            </div>
          ))}
        </div>
        <div className="border-l border-border-dark" />
        <div className="w-full">
          <h2 className="mb-8 text-h3">{faqSection?.title ?? t('sectionFaq.faqTitle')}</h2>
          {faqSection?.faqs?.map((faq) => (
            <Accordion key={faq?.id} title={faq?.question} type="divider-big">
              <RichText content={faq?.answer || ''} />
            </Accordion>
          ))}
          <div className="pt-6 text-sm">
            {faqSection?.redirectTo && (
              <ShowMoreLink href={getPathForStrapiEntity(faqSection?.redirectTo.data) ?? '#'}>
                {t('showMore')}
              </ShowMoreLink>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default SectionFaq
