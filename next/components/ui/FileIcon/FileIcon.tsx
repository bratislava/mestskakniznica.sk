import cx from 'classnames'

export interface FileIconProps {
  className?: string
  type?: string
}

export const FileIcon = ({ className, type }: FileIconProps) => {
  return (
    <div
      className={cx(
        className,
        'flex items-center justify-center lg:h-14 lg:w-14 lg:rounded-full lg:border lg:border-border-dark'
      )}
    >
      <span className="text-[12px] text-text-heading lg:w-14 lg:text-center">{type}</span>
    </div>
  )
}

export default FileIcon
