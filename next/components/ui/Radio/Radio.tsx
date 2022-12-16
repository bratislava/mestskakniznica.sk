import cx from 'classnames'
import React from 'react'

type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

export const Radio = ({ className, children, ...props }: RadioProps) => {
  return (
    <label className={cx('flex cursor-pointer items-center gap-3.5 text-base', className)}>
      <input type="radio" className="hidden" {...props} />
      <div
        className={cx(
          'flex-0 box-border flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border-2 border-border-dark',
          {
            'base-input--disabled': props.disabled,
          },
          className
        )}
      >
        {props.checked && <div className="h-3 w-3 rounded-full bg-dark"/>}
      </div>
      <p
        className={cx('flex-1 text-foreground-body', {
          'base-input--disabled': props.disabled,
        })}
      >
        {children}
      </p>
    </label>
  )
}
