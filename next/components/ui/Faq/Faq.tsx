import Accordion from '@modules/common/Accordion'
import RichText from '@modules/formatting/RichText'
import { ComponentSectionsFaq } from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'

export interface FaqProps {
  className?: string
  title?: string
  questions?: ComponentSectionsFaq['questions']
}

export const Faq = ({ className, title, questions }: FaqProps) => {
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
    </div>
  )
}

export default Faq
