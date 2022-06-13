import { useState } from 'react';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
import Accordion from '../../components/Accordion/Accordion';

export interface FaqProps {
  className?: string;
  title?: string;
  questions?: (
    | { label?: string | undefined | null; content?: string | undefined | null }
    | undefined
    | null
  )[];
}

export const Faq = ({ className, title, questions }: FaqProps) => {
  const { Markdown: UIMarkdown } = useUIContext();
  const [openFaqIndex, setOpenFaqIndex] = useState('');

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenFaqIndex(state ? id : '');
  };

  return (
    <div className={cx(className)}>
      <h2 className="font-normal text-md">{title}</h2>
      <div className="mt-6">
        {questions?.map((question, index) => (
          <Accordion
            key={question.label ?? ''}
            label={question.label ?? ''}
            id={question.label ?? ''}
            defaultState={question.label === openFaqIndex}
            stateListener={listenAccordionState}
            content={
              <UIMarkdown
                paragraphClassName="text-sm"
                content={question.content ?? ''}
              />
            }
            size="small"
            type="divider"
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
