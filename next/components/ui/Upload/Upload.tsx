import cx from 'classnames'
import React from 'react'
import UploadIcon from '@assets/images/upload.svg'

export interface UploadProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelContent: string
  hasError?: boolean
}

export const Upload = ({ className, children, labelContent, hasError, required, ...props }: UploadProps) => {
  const [isInArea, setIsInArea] = React.useState(false)
  const fileInputRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)

  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label className={cx('text-xs text-gray-universal-100 mb-0.5 opacity-80')}>
          {labelContent}
          {required && <span className="text-error pl-1">*</span>}
        </label>
      )}
      <div
        className={cx('relative flex flex-col group gap-y-6 items-center justify-center p-6 border border-dashed', {
          'bg-emerald-200 transform transition-all duration-200': isInArea || fileInputRef.current?.files?.length,
          'border-gray-universal-100': !hasError,
          'border-error': hasError,
        })}
        onDragEnter={() => setIsInArea(true)}
        onDragLeave={() => setIsInArea(false)}
      >
        <input
          id="file_input"
          ref={fileInputRef}
          type="file"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          aria-required={required}
          {...props}
        />
        <UploadIcon className="group-hover:text-white group-hover:rounded-full group-hover:bg-gray-universal-100 group-hover:bg-red-300" />
        <div className="text-center text-gray-universal-70 text-[12px] lg:text-[14px]">{children}</div>
      </div>
    </div>
  )
}
