import cx from 'classnames';
import * as React from 'react';
import { ReactComponent as ChevronDown } from '../../assets/images/chevron-down.svg';

export interface ISelectOption {
  key: string;
  title: string;
  disabled?: boolean;
}

interface IProps<T extends ISelectOption> {
  className?: string;
  selectClassName?: string;
  options: T[];
  onChange?: (value: T) => void;
  value: string | T;
  id?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  labelContent?: string;
  helpText?: string;
  required?: boolean;
}

export const Select = <T extends ISelectOption>({
  id,
  className,
  selectClassName,
  options,
  value: iValue,
  onChange,
  hasError,
  errorMessage,
  placeholder,
  labelContent,
  helpText,
  required,
  ...rest
}: IProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!onChange) return;

    const selectedKey = e.target.value;
    const selectedOption = options.find((opt) => opt.key === selectedKey);
    if (selectedOption) onChange(selectedOption);
  };

  const value = typeof iValue === 'string' ? iValue : iValue?.key;

  return (
    <div className={cx('relative flex flex-col', className)}>
      {/* Label */}
      {labelContent && (
        <label
          className="text-xs text-gray-universal-100 mb-0.5 opacity-80"
          htmlFor={id}
        >
          {labelContent}
          {required && <span className="text-error pl-1">*</span>}
        </label>
      )}
      <div className={cx('flex items-center relative')}>
        <select
          id={id}
          className={cx(
            'base-input cursor-pointer w-full pr-9',
            selectClassName,
            {
              'base-input--with-error': hasError,
            }
          )}
          onChange={handleChange}
          value={value}
          placeholder={placeholder ?? placeholder}
          aria-invalid={hasError}
          aria-errormessage={errorMessage ? id + '_err' : null}
          {...rest}
        >
          {options.map((option) => (
            <option
              key={option.key}
              value={option.key}
              disabled={option.disabled}
            >
              {option.title}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 mr-4 pointer-events-none text-gray-universal-100" />
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <p
          id={id + '_err'}
          className={cx('text-xs text-error mt-2', { hidden: !hasError })}
          aria-labelledby={id}
        >
          {errorMessage}
        </p>
      )}

      {/* Help Text */}
      {helpText && (
        <p
          className={cx('text-xs mt-0.5 opacity-80', {
            'text-gray-universal-70': !hasError,
            'text-error': hasError,
          })}
        >
          {helpText}
        </p>
      )}
    </div>
  );
};
