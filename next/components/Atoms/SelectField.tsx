import React, { ReactNode } from 'react'
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Select,
  SelectProps,
  SelectValue,
  Text,
  ValidationResult,
} from 'react-aria-components'

import ChevronDownIcon from '@/assets/images/chevron-down.svg'
import CheckInCircleIcon from '@/assets/images/fajka-kruh.svg'
import cn from '@/utils/cn'

// This component was copied from Enforcement project and updated to use newer react-aria-components version
// https://github.com/bratislava/enforcement-new/blob/aa888b55c97f756c19dee6cbf0ac8ce1bf6e6c78/components/inputs/select-field.tsx

// docs: https://react-spectrum.adobe.com/react-aria/Select.html#reusable-wrappers
export interface SelectFieldProps<T extends object> extends Omit<SelectProps<T>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

type SelectItemProps = Omit<ListBoxItemProps, 'children'> & {
  label: ReactNode
  description?: string
  isDivider?: boolean
}

export const SelectItem = ({ label, description, isDivider = false, ...rest }: SelectItemProps) => {
  return (
    <ListBoxItem
      {...rest}
      className={({ isHovered, isFocusVisible }) =>
        cn('base-focus-ring flex cursor-pointer justify-between px-5 py-3 ring-inset', {
          'bg-promo-yellow': isHovered,
          'ring-3 ring-offset-2': isFocusVisible,
          'after:not-last:block after:h-0.5': isDivider,
        })
      }
    >
      {({ isSelected }) => (
        <>
          <div className="flex flex-col items-start gap-1">
            <Text slot="label">{label}</Text>
            {description ? <Text slot="description">{description}</Text> : null}
          </div>
          <div className={cn('shrink-0', { hidden: !isSelected })}>
            <CheckInCircleIcon />
          </div>
        </>
      )}
    </ListBoxItem>
  )
}

/**
 * Based on bratislava.sk: https://github.com/bratislava/bratislava.sk/blob/master/next/src/components/common/SelectField/SelectField.tsx
 */
const SelectField = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  items,
  ...props
}: SelectFieldProps<T>) => {
  const disabled = props.isDisabled

  const style = cn(
    'outline-hidden base-focus-ring flex w-full items-center justify-between gap-3 border bg-white px-3 py-2 lg:px-4 lg:py-3',
    {
      'border-grey-200 hover:border-grey-400': !disabled,
      'border-negative-700 hover:border-negative-700': errorMessage && !disabled,
      'border-grey-300 bg-grey-100 pointer-events-none': disabled,
    },
  )

  return (
    <Select
      {...props}
      className={cn('flex flex-col gap-1', { className: typeof className === 'string' })}
    >
      {label ? (
        <Label className="font-semibold">
          {label}
          {props.isRequired ? <span className="text-error"> *</span> : undefined}
        </Label>
      ) : null}
      <Button className={style}>
        <SelectValue />
        <span aria-hidden>
          <ChevronDownIcon />
        </span>
      </Button>
      {/* TODO style description and error */}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>

      <Popover
        className="w-[--trigger-width] overflow-y-auto border bg-white py-2"
        shouldFlip={false}
      >
        <ListBox items={items} className="max-h-100">
          {children}
        </ListBox>
      </Popover>
    </Select>
  )
}

export default SelectField
