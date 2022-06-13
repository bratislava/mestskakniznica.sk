import cx from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React from 'react';

export interface IRadioOption {
  key: string;
  title: string;
  disabled?: boolean;
  price?: string;
}

interface RadioGroupProps<T extends IRadioOption> {
  id?: string;
  className?: string;
  wrapperClassName?: string;
  radioClassName?: string;
  labelContent?: string;
  hasError?: boolean;
  errorMessage?: string;
  options: T[];
  onChange?: (value: string) => void;
  value?: string;
  required?: boolean | undefined;
}

export const RadioGroup = <T extends IRadioOption>({
  id,
  wrapperClassName,
  className,
  radioClassName,
  labelContent,
  hasError,
  errorMessage,
  options,
  onChange,
  value,
  required,
}: RadioGroupProps<T>) => {
  return (
    <div className={wrapperClassName}>
      {/* Label */}
      {labelContent && (
        <label
          className={cx(
            'text-xs text-gray-universal-100 mb-1 block opacity-80 '
          )}
          htmlFor={id}
        >
          {labelContent}
          {required && <span className="text-error pl-1">*</span>}
        </label>
      )}

      <div>
        <RadioGroupPrimitive.Root
          aria-label={labelContent}
          aria-invalid={hasError}
          aria-errormessage={errorMessage ? id + '_err' : null}
          className={className}
          onValueChange={onChange}
          value={value}
        >
          {options.map((opt) => (
            <div
              key={opt.key}
              className={cx(
                'cursor-pointer flex items-center gap-3.5 text-base base-input py-3 w-full',
                radioClassName,
                {
                  'base-input--with-error': hasError,
                }
              )}
            >
              <RadioGroupPrimitive.Item
                value={opt.key}
                id={opt.key}
                className="border-gray-universal-100 w-5 h-5 rounded-full border-2 flex flex-0 items-center justify-center box-border overflow-hidden "
              >
                <RadioGroupPrimitive.Indicator className="bg-gray-universal-100 w-3 h-3 rounded-full" />
              </RadioGroupPrimitive.Item>
              <label
                htmlFor={opt.key}
                className={cx('flex-1 text-gray-universal-70 cursor-pointer', {
                  'base-input--disabled': opt.disabled,
                })}
              >
                <div className="flex justify-between">
                  <span>{opt.title}</span>
                  {opt.price && (
                    <span className="w-24 text-right">{opt.price}</span>
                  )}
                </div>
              </label>
            </div>
          ))}
        </RadioGroupPrimitive.Root>

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
      </div>
    </div>
  );
};

export default RadioGroup;
