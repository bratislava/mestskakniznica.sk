import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import cx from 'classnames'
import React from 'react'

export interface IRadioOption {
  key: string
  title: string
  disabled?: boolean
  price?: string
}

interface RadioGroupProps<T extends IRadioOption> {
  id?: string
  className?: string
  wrapperClassName?: string
  radioClassName?: string
  labelContent?: string
  hasError?: boolean
  errorMessage?: string
  options: T[]
  onChange?: (value: string) => void
  value?: string
  required?: boolean | undefined
}

export const RadioGroup = <T extends IRadioOption>(
  {
    id,
    wrapperClassName,
    className,
    radioClassName,
    labelContent,
    hasError,
    errorMessage,
    options,
    onChange,
    value,
    required,
  }: RadioGroupProps<T>) => {
  return (
    <div className={wrapperClassName}>
      {/* Label */}
      {labelContent && (
        <label className={cx('mb-1 block text-sm text-foreground-heading opacity-80 ')} htmlFor={id}>
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}

      <div>
        <RadioGroupPrimitive.Root
          aria-label={labelContent}
          aria-invalid={hasError}
          aria-errormessage={errorMessage ? `${id}_err` : ''}
          className={className}
          onValueChange={onChange}
          value={value}
        >
          {options.map((opt) => (
            <div
              key={opt.key}
              className={cx(
                'base-input flex w-full cursor-pointer items-center gap-3.5 py-3 text-base',
                radioClassName,
                {
                  'base-input--with-error': hasError,
                }
              )}
            >
              <RadioGroupPrimitive.Item
                value={opt.key}
                id={opt.key}
                className="flex-0 box-border flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border-2 border-border-dark "
              >
                <RadioGroupPrimitive.Indicator className="h-3 w-3 rounded-full bg-dark"/>
              </RadioGroupPrimitive.Item>
              <label
                htmlFor={opt.key}
                className={cx('flex-1 cursor-pointer text-foreground-body', {
                  'base-input--disabled': opt.disabled,
                })}
              >
                <div className="flex justify-between">
                  <span>{opt.title}</span>
                  {opt.price && <span className="w-24 text-right">{opt.price}</span>}
                </div>
              </label>
            </div>
          ))}
        </RadioGroupPrimitive.Root>

        {/* Error Message */}
        {hasError && errorMessage && (
          <p
            id={`${id}_err`}
            className={cx('mt-2 text-sm text-error', { hidden: !hasError })}
            aria-labelledby={id}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default RadioGroup
