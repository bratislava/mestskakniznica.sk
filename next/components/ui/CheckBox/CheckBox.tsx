import CheckMark from '@assets/images/check-mark.svg'
import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox'
import cx from 'classnames'
import React from 'react'

export type CheckBoxProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
> & {
  id?: string
  className?: string
  required?: boolean
  onChange?: (value: boolean) => void
}

export function CheckBox({ className, children, ...props }: CheckBoxProps) {
  return (
    <div className={cx('flex items-center gap-3.5', className)}>
      <Checkbox
        checked={props.checked}
        onCheckedChange={props.onChange}
        id={props.id}
        required={props.required}
        className={cx(
          'border-gray-universal-100 w-5 h-5 border-2 flex flex-0 text-white items-center justify-center box-border overflow-hidden focus:outline outline-offset-2 outline-1',
          {
            'bg-gray-universal-100': props.checked,
            'base-input--disabled': props.disabled,
          }
        )}
      >
        <CheckboxIndicator>
          <CheckMark />
        </CheckboxIndicator>
      </Checkbox>

      <label
        className={cx('flex-1 text-gray-universal-70 cursor-pointer', {
          'base-input--disabled': props.disabled,
        })}
        htmlFor={props.id}
      >
        {children}
      </label>
    </div>
  )
}
