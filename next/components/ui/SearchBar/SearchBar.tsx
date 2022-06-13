import cx from 'classnames';
import { Input, InputProps } from '../Input/Input';

export interface SearchBarProps
  extends InputProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}

export const SearchBar = ({
  className,
  inputClassName,
  value = '',
  iconRight,
  placeholder,
  ...props
}: SearchBarProps) => (
  <div className={className}>
    <Input
      placeholder={placeholder}
      labelContent={placeholder}
      labelClassName="sr-only"
      inputClassName={cx('px-12', inputClassName)}
      value={value}
      iconRight={
        !!iconRight && (
          <span className="-ml-9 cursor-pointer text-gray-universal-100">
            {iconRight}
          </span>
        )
      }
      {...props}
    />
  </div>
);

export default SearchBar;
