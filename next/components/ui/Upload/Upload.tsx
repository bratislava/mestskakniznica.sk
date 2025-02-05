import React from 'react'

import { UploadIcon } from '@/assets/icons'
import cn from '@/utils/cn'

export interface UploadProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelContent: string
  hasError?: boolean
  errorMessage?: string
}

export const Upload = ({
                         id,
                         className,
                         children,
                         labelContent,
                         hasError,
                         errorMessage,
                         required,
                         ...props
                       }: UploadProps) => {
  const [isInArea, setIsInArea] = React.useState(false)
  const fileInputRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)

  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label htmlFor={id} className="mb-0.5 text-sm text-foreground-heading opacity-80">
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}
      <div
        className={cn(
          'group relative flex flex-col items-center justify-center gap-y-6 border border-dashed p-6 ring-offset-2 transition focus-within:ring',
          {
            'bg-emerald-200 transform transition-all duration-200':
              isInArea || fileInputRef.current?.files?.length,
            'border-border-dark': !hasError,
            'border-error': hasError,
          },
        )}
        onDragEnter={() => setIsInArea(true)}
        onDragLeave={() => setIsInArea(false)}
      >
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          className="absolute size-full cursor-pointer opacity-0 outline-none"
          aria-invalid={hasError}
          aria-required={required}
          aria-errormessage={errorMessage ? `${id ?? ''}_err` : undefined}
          {...props}
        />
        <UploadIcon
          className="group-hover:rounded-full group-hover:bg-dark group-hover:bg-error group-hover:text-white" />
        <div className="text-center text-[12px] text-foreground-body lg:text-[14px]">
          {children}
        </div>
      </div>
    </div>
  )
}
