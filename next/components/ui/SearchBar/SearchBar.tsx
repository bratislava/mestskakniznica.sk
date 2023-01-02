import cx from 'classnames'

import { Input, InputProps } from '../Input/Input'

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
    <div className={className}>
      <Input
        placeholder={placeholder}
        labelContent={placeholder}
        labelClassName="sr-only"
        inputClassName={cx('px-12', inputClassName)}
        value={value}
        iconRight={
          !!iconRight && (
            <span
              className={cx('cursor-pointer text-foreground-heading transition-all duration-100', {
                '-ml-32': isOpen,
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
