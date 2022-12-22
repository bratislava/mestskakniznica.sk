import cx from 'classnames'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { Button } from '../Button/Button'
import { CheckBox } from '../CheckBox/CheckBox'
import { Input } from '../Input/Input'

interface IProps {
  className?: string
  title: string
  buttonContent: string
  checkboxContent: React.ReactNode
  errorMessage: React.ReactNode
  inputPlaceholder: string
  respondMessage: string
  resStatus: boolean
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export const NewsLetter = (
  {
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
  const methods = useFormContext()
  const { errors } = useFormState()

  return (
    <div className={cx('flex flex-col items-center justify-center', className)}>
      <h2 className="pt-10 text-center text-h3 lg:pt-24">{title}</h2>
      <form className="pt-4 pb-10 lg:pt-6 lg:pb-24" onSubmit={onSubmit}>
        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0">
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

          <Button className="w-full py-[9px] text-sm lg:w-auto lg:py-4.25 lg:px-8">
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
                  onChange={onChange} // send value to hook form
                  checked={value}
                >
                  {checkboxContent}
                </CheckBox>
                {!!errors.acceptTerms && (
                  <p className="mt-2 text-base text-error">{errorMessage}</p>
                )}
                <p className={`mt-2 text-base ${resStatus ? 'text-green-600' : 'text-error'}`}>
                  {respondMessage}
                </p>
              </>
            )}
          />
        </div>
      </form>
    </div>
  )
}
