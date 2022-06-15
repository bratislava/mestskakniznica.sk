import cx from 'classnames'
import React from 'react'

type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Radio({ className, children, ...props }: RadioProps) {
  return <label className={cx('cursor-pointer flex items-center gap-3.5 text-base', className)}>
    <input type="radio" className="hidden" {...props} />
    <div
      className={cx(
        'border-gray-universal-100 w-5 h-5 rounded-full border-2 flex flex-0 items-center justify-center box-border overflow-hidden',
        {
          'base-input--disabled': props.disabled,
        },
        className
      )}
    >
      {props.checked && <div className="bg-gray-universal-100 w-3 h-3 rounded-full" />}
    </div>
    <p
      className={cx('flex-1 text-gray-universal-70', {
        'base-input--disabled': props.disabled,
      })}
    >
      {children}
    </p>
  </label>
}
