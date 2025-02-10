import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import MLink from '@/modules/common/MLink'
import NormalizeText from '@/modules/formatting/NormalizeText/NormalizeText'
import cn from '@/utils/cn'

export interface HomepageMarkdownProps {
  className?: string
  paragraphClassName?: string
  content?: string
}

export const RichText = ({ className, paragraphClassName, content }: HomepageMarkdownProps) => {
  const topMargin = '[&:not(:first-child)]:mt-6'

  return (
    <ReactMarkdown
      className={cn('flex flex-col gap-4 text-foreground-body', className)}
      // remarkPlugins={[remarkGfm]}
      // rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1 className={`text-h1 ${topMargin}`} {...props}>
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2 className={`text-h2 ${topMargin}`} {...props}>
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3 className={`text-h3 ${topMargin}`} {...props}>
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4 className={`text-h4 ${topMargin}`} {...props}>
            {children}
          </h4>
        ),
        h5: ({ node, children, ...props }) => (
          <h5 className={`text-h5 ${topMargin}`} {...props}>
            {children}
          </h5>
        ),
        h6: ({ node, children, ...props }) => (
          <h6 className={`text-h6 ${topMargin}`} {...props}>
            {children}
          </h6>
        ),
        p: ({ node, children, ...props }) => (
          <p className={cn('whitespace-pre-wrap', paragraphClassName)} {...props}>
            {Array.isArray(children) ? (
              children.map((child, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <NormalizeText key={index}>{child}</NormalizeText>
              ))
            ) : (
              <NormalizeText>{children}</NormalizeText>
            )}
          </p>
        ),
        ul: ({ node, children, ...props }) => {
          return (
            <ul className="flex list-disc flex-col gap-1.5 pl-8" {...props}>
              {children}
            </ul>
          )
        },
        ol: ({ node, children, ...props }) => (
          <ol className="flex list-decimal flex-col gap-1.5 pl-8" {...props}>
            {children}
          </ol>
        ),
        li: ({ node, children, ...props }) => <li {...props}>{children}</li>,
        // TODO this still produces a hydration error, because the remark-unwrap-images only works when image is the only child of the paragraph
        img: ({ src, alt }) => (
          <div className={`-mx-7.5 flex justify-center md:mx-0 ${topMargin}`}>
            {src ? (
              <Image
                src={src}
                alt={alt ?? ''}
                // Inspired by: https://github.com/bratislava/olo.sk/blob/master/next/src/components/formatting/Markdown.tsx
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full overflow-hidden"
              />
            ) : null}
          </div>
        ),
        strong: ({ node, children, ...props }) => <strong {...props}>{children}</strong>,
        a: ({ node, href, title, children, ...props }) => {
          const isExternal = href?.startsWith('http')
          return (
            <MLink
              href={href ?? '#'}
              target={isExternal ? '_blank' : '_self'}
              variant="richtext"
              {...props}
            >
              {children}
              {isExternal && ' ↗'}
            </MLink>
          )
        },
        blockquote: ({ node, children, ...props }) => (
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
