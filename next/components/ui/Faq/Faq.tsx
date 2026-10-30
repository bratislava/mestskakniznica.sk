import { useTranslation } from 'next-i18next/pages'

import Accordion from '@/modules/common/Accordion'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import RichText from '@/modules/formatting/RichText'
import { ComponentSectionsFaq } from '@/services/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

export interface FaqProps {
  className?: string
  title?: string
  questions?: ComponentSectionsFaq['questions']
  ctaButton?: string
  redirectTo?: ComponentSectionsFaq['redirectTo']
}

export const Faq = ({ className, title, questions, ctaButton, redirectTo }: FaqProps) => {
  const { getFullPath } = useNavigation()
  const { t } = useTranslation()

  return (
    <div className={cn(className)}>
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
          <ShowMoreLink href={getFullPath(redirectTo?.data) ?? '#'}>
            {ctaButton || t('common.showMore')}
          </ShowMoreLink>
        </div>
      )}
    </div>
  )
}

export default Faq
