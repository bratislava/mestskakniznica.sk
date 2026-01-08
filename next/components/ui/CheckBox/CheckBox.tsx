import React from 'react'
import { Checkbox as RACCheckbox, CheckboxProps as RACCheckboxProps } from 'react-aria-components'

import CheckMark from '@/assets/images/check-mark.svg'
import MinusIcon from '@/assets/images/minus.svg'
import cn from '@/utils/cn'

export type CheckBoxProps = RACCheckboxProps

export const CheckBox = ({ className, children, ...props }: CheckBoxProps) => {
  return (
    <RACCheckbox
      {...props}
      className={({ isDisabled }) =>
        cn(
          'flex flex-1 cursor-pointer items-center gap-3.5 text-foreground-body',
          {
            'cursor-not-allowed': isDisabled,
          },
          className,
        )
      }
    >
      {({ isSelected, isDisabled, isIndeterminate, isInvalid, isFocusVisible }) => (
        <>
          <div
            className={cn(
              'flex-0 box-border flex h-5 w-5 items-center justify-center overflow-hidden border-2 border-border-dark text-white',
              {
                'bg-dark': isSelected,
                'base-focus-ring ring': isFocusVisible,
                'border-border-disabled': isDisabled,
                'border-error': isInvalid && !isSelected,
              },
            )}
          >
            {isIndeterminate ? (
              <MinusIcon aria-hidden />
            ) : isSelected ? (
              <CheckMark aria-hidden />
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  )
}
