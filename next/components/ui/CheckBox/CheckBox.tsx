import CheckMark from '@assets/images/check-mark.svg'
import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox'
import cx from 'classnames'
import React from 'react'

export type CheckBoxProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'> & {
  id?: string
  className?: string
  required?: boolean
  onChange?: (value: boolean) => void
}

export const CheckBox = ({ className, children, ...props }: CheckBoxProps) => {
  return (
    <div className={cx('flex items-center gap-3.5', className)}>
      <Checkbox
        checked={props.checked}
        onCheckedChange={props.onChange}
        id={props.id}
        required={props.required}
        className={cx(
          'flex-0 box-border flex h-5 w-5 items-center justify-center overflow-hidden border-2 border-border-dark text-white outline-1 outline-offset-2 focus:outline',
          {
            'bg-dark': props.checked,
            'base-input--disabled': props.disabled,
          }
        )}
      >
        <CheckboxIndicator>
          <CheckMark/>
        </CheckboxIndicator>
      </Checkbox>

      <label
        className={cx('flex-1 cursor-pointer text-foreground-body', {
          'base-input--disabled': props.disabled,
        })}
        htmlFor={props.id}
      >
        {children}
      </label>
    </div>
  )
}
