import MinusIcon from '@assets/images/minus.svg'
import PlusIcon from '@assets/images/plus.svg'
import { InputProps } from '@bratislava/ui-city-library'
import cx from 'classnames'
import * as React from 'react'

interface NumberSwitcherProps extends InputProps {
  id?: string
  value?: number
  className?: string
  hasError?: boolean
  errorMessage?: string
  required: boolean
  disabled?: boolean
  labelContent?: React.ReactNode
  inputClassName?: string
  onClickChange?: (num: number) => void
}

const clampValue = (n: number) => Math.max(1, n)

export const NumberSwitcher = ({
  className,
  value,
  hasError,
  errorMessage,
  id,
  onClickChange,
  labelContent,
  required,
  inputClassName,
  ...props
}: NumberSwitcherProps) => {
  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label className={cx('mb-0.5 text-sm text-foreground-heading opacity-80')} htmlFor={id}>
          {labelContent}
          {required && <span className="pl-1 text-error">*</span>}
        </label>
      )}
      <div
        className={cx(className, 'base-input flex h-11 items-center justify-between py-0', {
          'base-input--with-error': hasError,
          'base-input--disabled cursor-not-allowed': props.disabled,
        })}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            onClickChange && onClickChange(clampValue(Number(value) - 1))
          }}
          className="h-full cursor-pointer py-2 text-foreground-heading"
        >
          <MinusIcon />
        </button>

        <div className="mx-3 h-full w-full border-x border-border-light py-2 px-6 text-center">
          <input
            id={id}
            type="number"
            className="w-full text-center "
            value={value}
            aria-invalid={hasError}
            aria-required={required}
            aria-errormessage={errorMessage ? `${id}_err` : ''}
            {...props}
          />
        </div>

        {/* TODO replace by Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onClickChange && onClickChange(clampValue(Number(value) + 1))
          }}
          className="h-full cursor-pointer py-2 text-foreground-heading"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <p
          id={`${id}_err`}
          className={cx('mt-2 text-sm text-error', { hidden: !hasError })}
          aria-labelledby={id}
        >
          {labelContent} {errorMessage}
        </p>
      )}
    </div>
  )
}

export default NumberSwitcher
