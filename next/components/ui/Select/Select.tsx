import * as React from 'react'

import ChevronDown from '@/assets/images/chevron-down.svg'
import cn from '@/utils/cn'

export interface ISelectOption {
  key: string
  title: string
  disabled?: boolean
}

interface IProps<T extends ISelectOption> {
  className?: string
  selectClassName?: string
  options: T[]
  onChange?: (value: T) => void
  value: string | T
  id?: string
  hasError?: boolean
  errorMessage?: string
  placeholder?: string
  labelContent?: string
  helpText?: string
  required?: boolean
}

export const Select = <T extends ISelectOption>({
  id,
  className,
  selectClassName,
  options,
  value: iValue,
  onChange,
  hasError,
  errorMessage,
  placeholder,
  labelContent,
  helpText,
  required,
  ...rest
}: IProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!onChange) return

    const selectedKey = e.target.value
    const selectedOption = options.find((opt) => opt.key === selectedKey)
    if (selectedOption) onChange(selectedOption)
  }

  const value = typeof iValue === 'string' ? iValue : iValue?.key

  return (
    <div className={cn('relative flex flex-col', className)}>
      {/* Label */}
      {labelContent && (
        <label className="mb-0.5 text-sm text-foreground-heading opacity-80" htmlFor={id}>
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={id}
          className={cn(
            'base-input base-focus-ring w-full cursor-pointer pr-9',
            { 'base-input--with-error': hasError },
            selectClassName,
          )}
          onChange={handleChange}
          value={value}
          aria-invalid={hasError}
          aria-errormessage={errorMessage ? `${id ?? ''}_err` : undefined}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.key} value={option.key} disabled={option.disabled}>
              {option.title}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 mr-4 text-foreground-heading" />
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <p
          id={`${id ?? ''}_err`}
          className={cn('mt-2 text-sm text-error', { hidden: !hasError })}
          aria-labelledby={id}
        >
          {errorMessage}
        </p>
      )}

      {/* Help Text */}
      {helpText && (
        <p
          className={cn('mt-0.5 text-sm opacity-80', {
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
