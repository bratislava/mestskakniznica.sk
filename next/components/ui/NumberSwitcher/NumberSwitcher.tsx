import cx from 'classnames'
import MinusIcon from '@assets/images/minus.svg'
import PlusIcon from '@assets/images/plus.svg'
import * as React from 'react'
import { InputProps } from '@bratislava/ui-city-library'

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
        <label className={cx('text-xs text-gray-universal-100 mb-0.5 opacity-80')} htmlFor={id}>
          {labelContent}
          {required && <span className="text-error pl-1">*</span>}
        </label>
      )}
      <div
        className={cx(className, 'base-input py-0 flex items-center justify-between h-11', {
          'base-input--with-error': hasError,
          'base-input--disabled cursor-not-allowed': props.disabled,
        })}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            onClickChange(clampValue(Number(value) - 1))
          }}
          className="cursor-pointer py-2 text-black-universal h-full"
        >
          <MinusIcon />
        </button>

        <div className="border-l border-r mx-3 w-full text-center border-gray-universal-200 h-full py-2 px-6">
          <input
            id={id}
            type="number"
            className="text-center w-full "
            value={value}
            aria-invalid={hasError}
            aria-required={required}
            aria-errormessage={errorMessage ? id + '_err' : null}
            {...props}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            onClickChange(clampValue(Number(value) + 1))
          }}
          className="cursor-pointer py-2 text-black-universal h-full"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <p id={id + '_err'} className={cx('text-xs text-error mt-2', { hidden: !hasError })} aria-labelledby={id}>
          {labelContent} {errorMessage}
        </p>
      )}
    </div>
  )
}

export default NumberSwitcher
