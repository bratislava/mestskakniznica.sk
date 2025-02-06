import React from 'react'

import { Input, InputProps } from '@/components/ui/Input/Input'
import cn from '@/utils/cn'

export interface SearchBarProps
  extends InputProps,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isOpen?: boolean
}

export const SearchBar = ({
  className,
  inputClassName,
  value = '',
  iconRight,
  isOpen,
  placeholder,
  ...props
}: SearchBarProps) => {
  return (
    <div className={cn(className)}>
      <Input
        placeholder={placeholder}
        labelContent={placeholder}
        labelClassName="sr-only"
        inputClassName={cn('px-12', inputClassName)}
        value={value}
        iconRight={
          !!iconRight && (
            <span
              className={cn('cursor-pointer text-foreground-heading transition-all duration-100', {
                '-ml-20 md:-ml-32': isOpen,
                '-ml-9': !isOpen,
              })}
            >
              {iconRight}
            </span>
          )
        }
        {...props}
      />
    </div>
  )
}

export default SearchBar
