import { useUIContext } from '@bratislava/common-frontend-ui-context'
import ReactMarkdown from 'react-markdown'
import { twMerge } from 'tailwind-merge'

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
      className={twMerge('mb-7 whitespace-pre-wrap', className)}
      components={{
        p: ({ children }) => (
          <p className={twMerge('text-foreground-body', paragraphClassName)}>{children}</p>
        ),
        h1: ({ children }) => <h1 className="text-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-8 text-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-h3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-h4">{children}</h4>,
        h5: ({ children }) => <h5 className="text-h5">{children}</h5>,
        h6: ({ children }) => <h6 className="text-h6">{children}</h6>,
        ul: ({ children }) => (
          <ul className="ml-8 flex list-disc flex-col space-y-1 text-base text-foreground-body">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="ml-6 flex list-decimal flex-col space-y-1 text-base text-foreground-body">
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
