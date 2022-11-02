import UploadIcon from '@assets/images/upload.svg'
import cx from 'classnames'
import React from 'react'

export interface UploadProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelContent: string
  hasError?: boolean
}

export const Upload = ({
  className,
  children,
  labelContent,
  hasError,
  required,
  ...props
}: UploadProps) => {
  const [isInArea, setIsInArea] = React.useState(false)
  const fileInputRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)

  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label className={cx('mb-0.5 text-xs text-gray-universal-100 opacity-80')}>
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}
      <div
        className={cx(
          'group relative flex flex-col items-center justify-center gap-y-6 border border-dashed p-6',
          {
            'transform bg-emerald-200 transition-all duration-200':
              isInArea || fileInputRef.current?.files?.length,
            'border-gray-universal-100': !hasError,
            'border-error': hasError,
          }
        )}
        onDragEnter={() => setIsInArea(true)}
        onDragLeave={() => setIsInArea(false)}
      >
        <input
          id="file_input"
          ref={fileInputRef}
          type="file"
          className="absolute h-full w-full cursor-pointer opacity-0"
          aria-required={required}
          {...props}
        />
        <UploadIcon className="group-hover:rounded-full group-hover:bg-gray-universal-100 group-hover:bg-red-300 group-hover:text-white" />
        <div className="text-center text-[12px] text-gray-universal-70 lg:text-[14px]">
          {children}
        </div>
      </div>
    </div>
  )
}
