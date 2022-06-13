import cx from 'classnames';
import ReactMarkdown from 'react-markdown';
import { useUIContext } from '@bratislava/common-frontend-ui-context';

export interface HomepageMarkdownProps {
  className?: string;
  paragraphClassName?: string;
  content?: string;
}

export const CityLibraryMarkdown = ({
  className,
  paragraphClassName,
  content,
}: HomepageMarkdownProps) => {
  const { Link: UILink, Image: UIImage } = useUIContext();
  return (
    <ReactMarkdown
      className={cx(className, 'whitespace-pre-wrap mb-7')}
      components={{
        p: ({ children }) => (
          <p className={cx(paragraphClassName, 'text-gray-universal-70')}>
            {children}
          </p>
        ),
        h1: ({ children }) => (
          <h1 className="text-md2 lg:text-2xl text-gray-universal-100">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-md lg:text-lg text-gray-universal-100 mb-8">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-default lg:text-md2 text-gray-universal-100">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-[18px] lg:text-md text-gray-universal-100">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm lg:text-default text-gray-universal-100">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-sm text-gray-universal-100">{children}</h6>
        ),
        ul: ({ children }) => (
          <ul className="flex flex-col list-disc ml-8 space-y-1 text-gray-universal-70 text-sm">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="flex flex-col list-decimal ml-6 space-y-1 text-gray-universal-70 text-sm">
            {children}
          </ol>
        ),
        img: ({ src, alt }) => (
          <div className="flex justify-center -mx-7.5 md:mx-0">
            {src && <UIImage src={src} alt={alt} shadow={false} />}
          </div>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        a: ({ href, children }) => (
          <UILink
            href={href ?? '#'}
            className="underline"
            target={['#', '/'].includes(href?.[0]) ? '_self' : '_blank'}
          >
            {children[0]}
          </UILink>
        ),
      }}
    >
      {content ?? ''}
    </ReactMarkdown>
  );
};

export default CityLibraryMarkdown;
