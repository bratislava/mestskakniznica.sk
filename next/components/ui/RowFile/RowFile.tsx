import ChevronRight from '@assets/images/chevron-right.svg'
import SingleDot from '@assets/images/dot.svg'
import cx from 'classnames'

import { FileIcon } from '../FileIcon/FileIcon'

export interface RowFileProps {
  className?: string
  type: string
  title: string
  metadata: React.ReactNode
  dateAdded: string
  fileType?: string
}

export const RowFile = ({
                          className,
                          type,
                          title,
                          metadata,
                          dateAdded,
                          fileType,
                        }: RowFileProps) => {
  return (
    <div
      className={cx(
        'group flex items-center justify-between border-b border-border-dark bg-white py-4 pr-2',
        className
      )}
    >
      <div className="flex items-center gap-x-6">
        <FileIcon type={fileType ?? ''}/>

        <div className="space-y-2">
          <p className="hidden cursor-default text-xs text-text-body">{type}</p>
          <h5 className="text-default lg:cursor-pointer lg:group-hover:underline">{title}</h5>
          <div className="flex cursor-default items-center gap-x-3 text-xs text-text-body">
            <span className="hidden lg:block">{metadata}</span>
            <SingleDot className="hidden lg:block"/>
            <span>{dateAdded}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="hidden lg:block"/>
    </div>
  )
}
