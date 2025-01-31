import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Accordion from '@/modules/common/Accordion'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import RichText from '@/modules/formatting/RichText'
import { ComponentSectionsFaq } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface FaqProps {
  className?: string
  title?: string
  questions?: ComponentSectionsFaq['questions']
  ctaButton?: string
  redirectTo?: ComponentSectionsFaq['redirectTo']
}

export const Faq = ({ className, title, questions, ctaButton, redirectTo }: FaqProps) => {
  const { getPathForEntity } = useNavikronos()
  const { t } = useTranslation()

  return (
    <div className={cx(className)}>
      <h2 className="text-h4 font-normal">{title}</h2>
      <div className="mt-6">
        {questions?.filter(isDefined).map((question) => (
          <Accordion key={question.id} title={question.label} type="divider-small">
            <RichText content={question.content ?? ''} />
          </Accordion>
        ))}
      </div>
      {redirectTo?.data && (
        <div className="pt-6 text-sm">
          <ShowMoreLink href={getPathForEntity({ type: 'page', id: redirectTo?.data?.id }) ?? '#'}>
            {ctaButton || t('common.showMore')}
          </ShowMoreLink>
        </div>
      )}
    </div>
  )
}

export default Faq
