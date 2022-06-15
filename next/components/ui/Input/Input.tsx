import ErrorOutline from '@assets/images/error-outline.svg'
import cx from 'classnames'

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  hasError?: boolean
  errorMessage?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  iconClassName?: string
  labelContent?: React.ReactNode
  labelClassName?: string
  helpText?: string
  inputClassName?: string
}

export function Input({
  className,
  id,
  required,
  labelContent,
  helpText,
  hasError,
  errorMessage,
  iconLeft,
  iconRight,
  iconClassName,
  inputClassName,
  labelClassName,
  ...props
}: InputProps) {
  return <div className={className}>
    {/* Label */}
    {labelContent && (
      <label
        className={cx(labelClassName, 'text-xs text-gray-universal-100 mb-0.5 opacity-80')}
        id={`${id  }_label`}
        htmlFor={id}
      >
        {labelContent}
        {required && <span className="text-error pl-1">*</span>}
      </label>
    )}

    {/* LeftIcon Accessory */}
    <div className="flex items-center relative w-full">
      {!!iconLeft && (
        <span className={cx('absolute left-4.5 z-10 text-gray-universal-100', iconClassName)}>{iconLeft}</span>
      )}

      {/* BaseInput */}
      <input
        id={id}
        className={cx('base-input', inputClassName, {
          'base-input--disabled cursor-not-allowed text-gray-universal-60': props.disabled,
          'base-input--with-error': hasError,
        })}
        aria-invalid={hasError}
        aria-required={required}
        aria-errormessage={errorMessage ? `${id  }_err` : null}
        {...props}
      />

      {/* RightIcon Accessory */}
      {iconRight ||
        (hasError &&
          (hasError ? (
            <ErrorOutline className="absolute right-4.5 text-error" />
          ) : (
            <span className={cx('absolute right-4.5', iconClassName)}>{iconRight}</span>
          )))}
    </div>

    {/* Error Message */}
    {hasError && errorMessage && (
      <p
        id={`${id  }_err`}
        className={cx('text-xs text-error mt-2', { hidden: !hasError })}
        aria-labelledby={`${id  }_label`}
      >
        {labelContent} {errorMessage}
      </p>
    )}

    {/* Help Text */}
    {helpText && (
      <p
        className={cx('text-xs mt-0.5 opacity-80', {
          'text-gray-universal-70': !hasError,
          'text-error': hasError,
          '-ml-4.5': iconLeft,
        })}
      >
        {helpText}
      </p>
    )}
  </div>
}
