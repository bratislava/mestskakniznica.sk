import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ComponentSectionsFaq } from '@bratislava/strapi-sdk-city-library'
import Accordion from '@modules/common/Accordion'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'

export interface FaqProps {
  className?: string
  title?: string
  questions?: ComponentSectionsFaq['questions']
}

export const Faq = ({ className, title, questions }: FaqProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  return (
    <div className={cx(className)}>
      <h2 className="text-h4 font-normal">{title}</h2>
      <div className="mt-6">
        {questions?.filter(isDefined).map((question) => (
          <Accordion key={question.id} title={question.label} type="divider-small">
            <UIMarkdown
              className="mb-0"
              paragraphClassName="text-base"
              content={question.content ?? ''}
            />
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default Faq
