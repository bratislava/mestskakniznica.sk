import React, { ReactNode } from 'react'
import {
  FieldError,
  Label,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  RadioGroupProps as RACRadioGroupProps,
  RadioProps as RACRadioProps,
  ValidationResult,
} from 'react-aria-components'

import cn from '@/utils/cn'

export interface IRadioOption {
  key: string
  title: string
  isDisabled?: boolean
  price?: string
}

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  options?: IRadioOption[]
}

type RadioProps = RACRadioProps

export const Radio = ({ children, className, ...props }: RadioProps) => {
  return (
    <RACRadio
      {...props}
      className={({ isDisabled, isInvalid }) =>
        cn(
          'base-input flex w-full cursor-pointer items-center gap-3.5 text-foreground-body',
          {
            'base-input--disabled cursor-not-allowed': isDisabled,
            'base-input--with-error': isInvalid,
          },
          className,
        )
      }
    >
      {({ isSelected, isDisabled }) => (
        <>
          {/* Indicator */}
          <div
            className={cn(
              'base-focus-ring box-border flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border-dark',
              {
                'border-border-disabled': isDisabled,
              },
            )}
          >
            {isSelected ? <div className="size-3 rounded-full bg-dark" /> : null}
          </div>
          {/* Option label */}
          {children}
        </>
      )}
    </RACRadio>
  )
}

export const RadioGroup = ({
  label,
  description,
  id,
  options,
  className,
  ...props
}: RadioGroupProps) => {
  return (
    <RACRadioGroup
      {...props}
      orientation={props.orientation ?? 'vertical'}
      className={cn('group flex flex-col', className)}
    >
      {({ orientation }) => (
        <>
          {/* Label */}
          {label ? (
            <Label className="mb-1 block text-sm text-foreground-heading opacity-80">
              {label}
              {props.isRequired ? <span className="pl-1 text-error">*</span> : null}
            </Label>
          ) : null}

          <div
            className={cn('flex gap-2', {
              'flex-col': orientation === 'vertical',
              'gap-4': orientation === 'horizontal',
            })}
          >
            {options?.map((option) => (
              <Radio
                key={option.key}
                id={option.key}
                value={option.key}
                isDisabled={option.isDisabled}
              >
                {option.price ? (
                  <div className="flex w-full justify-between gap-2">
                    <div>{option.title}</div>
                    <div className="w-24 text-right text-base">{option.price}</div>
                  </div>
                ) : (
                  option.title
                )}
              </Radio>
            ))}
          </div>
          {/* {props.description && <Description>{props.description}</Description>} */}
          <FieldError className="mt-2 text-sm text-error">{props.errorMessage}</FieldError>
        </>
      )}
    </RACRadioGroup>
  )
}

export default RadioGroup
