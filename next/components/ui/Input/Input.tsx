import React from 'react'

import ErrorOutline from '@/assets/images/error-outline.svg'
import cn from '@/utils/cn'

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

export const Input = ({
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
}: InputProps) => {
  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label
          className={cn(labelClassName, 'mb-0.5 text-sm text-foreground-heading opacity-80')}
          id={`${id ?? ''}_label`}
          htmlFor={id}
        >
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}

      {/* LeftIcon Accessory */}
      <div className="relative flex w-full items-center">
        {!!iconLeft && (
          <span className={cn('absolute left-4.5 z-10 text-foreground-heading', iconClassName)}>
            {iconLeft}
          </span>
        )}

        {/* BaseInput */}
        <input
          id={id}
          className={cn('base-input base-focus-ring', inputClassName, {
            'base-input--disabled cursor-not-allowed text-foreground-disabled': props.disabled,
            'base-input--with-error': hasError,
          })}
          aria-invalid={hasError}
          aria-required={required}
          aria-errormessage={errorMessage ? `${id ?? ''}_err` : undefined}
          {...props}
        />

        {/* RightIcon Accessory */}
        {iconRight ||
          (hasError &&
            (hasError ? (
              <ErrorOutline className="absolute right-4.5 text-error" />
            ) : (
              <span className={cn('absolute right-4.5', iconClassName)}>{iconRight}</span>
            )))}
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <p
          id={`${id ?? ''}_err`}
          className={cn('mt-2 text-sm text-error', { hidden: !hasError })}
          aria-labelledby={`${id ?? ''}_label`}
        >
          {labelContent} {errorMessage}
        </p>
      )}

      {/* Help Text */}
      {helpText && (
        <p
          className={cn('mt-0.5 text-sm opacity-80', {
            'text-foreground-body': !hasError,
            'text-error': hasError,
            '-ml-4.5': iconLeft,
          })}
        >
          {helpText}
        </p>
      )}
    </div>
  )
}
