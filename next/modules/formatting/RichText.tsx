import { useUIContext } from '@bratislava/common-frontend-ui-context'
import MLink from '@modules/common/MLink'
import NormalizeText from '@modules/formatting/NormalizeText/NormalizeText'
import ReactMarkdown from 'react-markdown'
import { twMerge } from 'tailwind-merge'

export interface HomepageMarkdownProps {
  className?: string
  paragraphClassName?: string
  content?: string
}

export const RichText = ({ className, paragraphClassName, content }: HomepageMarkdownProps) => {
  const { Image: UIImage } = useUIContext()

  const topMargin = '[&:not(:first-child)]:mt-6'

  return (
    <ReactMarkdown
      className={twMerge('flex flex-col gap-4 text-foreground-body', className)}
      // remarkPlugins={[remarkGfm]}
      // rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h1 className={`text-h1 ${topMargin}`}>{children}</h1>,
        h2: ({ children }) => <h2 className={`text-h2 ${topMargin}`}>{children}</h2>,
        h3: ({ children }) => <h3 className={`text-h3 ${topMargin}`}>{children}</h3>,
        h4: ({ children }) => <h4 className={`text-h4 ${topMargin}`}>{children}</h4>,
        h5: ({ children }) => <h5 className={`text-h5 ${topMargin}`}>{children}</h5>,
        h6: ({ children }) => <h6 className={`text-h6 ${topMargin}`}>{children}</h6>,
        p: ({ children, ...props }) => (
          <p className={paragraphClassName} {...props}>
            {children.map((child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <NormalizeText key={index}>{child}</NormalizeText>
            ))}
          </p>
        ),
        ul: ({ children, ordered, ...props }) => {
          return (
            <ul className="flex list-disc flex-col gap-1.5 pl-8" {...props}>
              {children}
            </ul>
          )
        },
        ol: ({ children, ordered, ...props }) => (
          <ol className="flex list-decimal flex-col gap-1.5 pl-8" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ordered, ...props }) => <li {...props}>{children}</li>,
        img: ({ src, alt }) => (
          <div className={`-mx-7.5 flex justify-center md:mx-0 ${topMargin}`}>
            {src && <UIImage src={src} alt={alt} shadow={false} />}
          </div>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http')
          return (
            <MLink href={href ?? '#'} target={isExternal ? '_blank' : '_self'} variant="richtext">
              {children[0]}
              {isExternal && ' ↗'}
            </MLink>
          )
        },
        blockquote: ({ children, ...props }) => (
          <blockquote {...props} className="border-l-4 border-foreground-dark p-6 md:p-8">
            {children}
          </blockquote>
        ),
      }}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default RichText
