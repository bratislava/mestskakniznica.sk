import cx from 'classnames'
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

export interface TextAreaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  labelContent?: string
  helpText?: string
  hasError?: boolean
  errorMessage?: string
  textAreaClassname?: string
}

export const TextArea = (
  {
    className,
    children,
    labelContent,
    helpText,
    id,
    hasError = false,
    errorMessage,
    textAreaClassname,
    required,
    ...props
  }: TextAreaProps) => {
  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label className={cx('mb-0.5 text-sm text-foreground-heading opacity-80')} htmlFor={id}>
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}
      <div>
        <textarea
          id={id}
          className={cx('base-input resize-none', textAreaClassname, {
            'base-input--with-error': hasError,
          })}
          aria-invalid={hasError}
          aria-required={required}
          aria-errormessage={errorMessage ? `${id}_err` : ''}
          {...props}
        >
          {children}
        </textarea>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p
          id={`${id}_err`}
          className={cx('mt-2 text-sm text-error', { hidden: !hasError })}
          aria-labelledby={id}
        >
          {labelContent} {errorMessage}
        </p>
      )}

      {/* Help Text */}
      {helpText && (
        <p
          className={cx('mt-0.5 text-sm opacity-80', {
            'text-foreground-body': !hasError,
            'text-error': hasError,
          })}
        >
          {helpText}
        </p>
      )}
    </div>
  )
}
