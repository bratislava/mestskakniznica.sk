import React from 'react';
import cx from 'classnames';
import { Button } from '../Button/Button';
import { CheckBox } from '../CheckBox/CheckBox';
import { Input } from '../Input/Input';
import { Controller, useFormContext, useFormState } from 'react-hook-form';

interface IProps {
  className?: string;
  title: string;
  buttonContent: string;
  checkboxContent: React.ReactNode;
  errorMessage: React.ReactNode;
  inputPlaceholder: string;
  respondMessage: string;
  resStatus: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const NewsLetter = ({
  className,
  title,
  buttonContent,
  checkboxContent,
  errorMessage,
  inputPlaceholder,
  respondMessage,
  resStatus,
  onSubmit,
}: IProps) => {
  const methods = useFormContext();
  const { errors } = useFormState();

  return (
    <div
      className={cx(
        'container flex flex-col items-center justify-center',
        className
      )}
    >
      <h2 className="text-center pt-10 lg:pt-24 text-md lg:text-lg">{title}</h2>
      <form className="pt-4 lg:pt-6 pb-10 lg:pb-24" onSubmit={onSubmit}>
        <div className="flex flex-col lg:flex-row lg:gap-x-4 gap-y-4 lg:gap-y-0">
          <Controller
            control={methods.control}
            name="email"
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <Input
                type="email"
                placeholder={inputPlaceholder}
                aria-label={inputPlaceholder}
                inputClassName="py-2 lg:py-4 px-5 w-full lg:w-[613px]"
                hasError={!!errors.email}
                {...field}
              />
            )}
          />

          <Button className="w-full lg:w-auto py-[9px] lg:py-4.25 lg:px-8 text-xs">
            {buttonContent}
          </Button>
        </div>
        <div className="pl-0.5 pt-4.5 pb-8">
          <Controller
            control={methods.control}
            name="acceptTerms"
            defaultValue={false}
            render={({ field: { onChange, value, name } }) => (
              <>
                <CheckBox
                  id="acceptTerms"
                  name={name}
                  children={checkboxContent}
                  onChange={onChange} // send value to hook form
                  checked={value}
                />
                {!!errors.acceptTerms && (
                  <p className="text-error text-base mt-2">{errorMessage}</p>
                )}
                <p
                  className={`text-base mt-2 ${
                    resStatus ? 'text-green-600' : 'text-error'
                  }`}
                >
                  {respondMessage}
                </p>
              </>
            )}
          />
        </div>
      </form>
    </div>
  );
};
