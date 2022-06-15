import cx from 'classnames'

export interface FileIconProps {
  className?: string
  type?: string
}

export const FileIcon = ({ className, type }: FileIconProps) => (
  <div
    className={cx(
      className,
      'flex lg:border lg:border-gray-universal-100 lg:rounded-full lg:h-14 lg:w-14 justify-center items-center'
    )}
  >
    <span className="lg:w-14 lg:text-center text-[12px] text-gray-universal-100">{type}</span>
  </div>
)

export default FileIcon
