import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface ColumnedTextProps {
  className?: string
  content?: string
  title?: string
}

export const ColumnedText = ({ className, content, title }: ColumnedTextProps) => {
  const breakWord = '<break>'
  const columns = content?.split(breakWord) || []
  const { Markdown: UIMarkdown } = useUIContext()

  if (!content) return null

  return (
    <div
      className={cx(className, 'columns-1', {
        'md:columns-2': columns.length === 2,
        'md:columns-3': columns.length === 3,
        'md:columns-4': columns.length === 4,
        'md:columns-5': columns.length === 5,
        'md:columns-6': columns.length === 6,
        'md:columns-7': columns.length === 7,
        'md:columns-8': columns.length === 8,
        'md:columns-9': columns.length === 9,
        'md:columns-10': columns.length === 10,
        'md:columns-11': columns.length === 11,
        'md:columns-12': columns.length >= 12,
      })}
    >
      {columns.map((column, i) => (
        <div key={i}>
          <UIMarkdown content={column} className="text-base"/>
        </div>
      ))}
    </div>
  )
}
