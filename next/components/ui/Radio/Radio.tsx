import cx from 'classnames'
import React from 'react'

type RadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Radio = ({ className, children, ...props }: RadioProps) => {
  return (
    <label className={cx('flex cursor-pointer items-center gap-3.5 text-base', className)}>
      <input type="radio" className="hidden" {...props} />
      <div
        className={cx(
          'flex-0 box-border flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border-2 border-gray-universal-100',
          {
            'base-input--disabled': props.disabled,
          },
          className
        )}
      >
        {props.checked && <div className="h-3 w-3 rounded-full bg-gray-universal-100" />}
      </div>
      <p
        className={cx('flex-1 text-gray-universal-70', {
          'base-input--disabled': props.disabled,
        })}
      >
        {children}
      </p>
    </label>
  )
}
