import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'

export interface HomepageMarkdownProps {
  className?: string
  paragraphClassName?: string
  content?: string
}

export const CityLibraryMarkdown = ({
  className,
  paragraphClassName,
  content,
}: HomepageMarkdownProps) => {
  const { Link: UILink, Image: UIImage } = useUIContext()
  return (
    <ReactMarkdown
      className={cx(className, 'mb-7 whitespace-pre-wrap')}
      components={{
        p: ({ children }) => <p className={cx(paragraphClassName, 'text-text-body')}>{children}</p>,
        h1: ({ children }) => (
          <h1 className="text-md2 text-text-heading lg:text-2xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-8 text-md text-text-heading lg:text-lg">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-default text-text-heading lg:text-md2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-[18px] text-text-heading lg:text-md">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm text-text-heading lg:text-default">{children}</h5>
        ),
        h6: ({ children }) => <h6 className="text-sm text-text-heading">{children}</h6>,
        ul: ({ children }) => (
          <ul className="ml-8 flex list-disc flex-col space-y-1 text-sm text-text-body">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="ml-6 flex list-decimal flex-col space-y-1 text-sm text-text-body">
            {children}
          </ol>
        ),
        img: ({ src, alt }) => (
          <div className="-mx-7.5 flex justify-center md:mx-0">
            {src && <UIImage src={src} alt={alt} shadow={false} />}
          </div>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        a: ({ href, children }) => (
          <UILink
            href={href ?? '#'}
            className="underline"
            target={['#', '/'].includes(href?.[0] || '') ? '_self' : '_blank'}
          >
            {children[0]}
          </UILink>
        ),
      }}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default CityLibraryMarkdown
