import cx from 'classnames'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { CheckBox, Input } from '@/components/ui'
import Button from '@/modules/common/Button'

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
  const methods = useFormContext()
  const { errors } = useFormState()

  return (
    <div className={cx('flex flex-col items-center justify-center', className)}>
      <h2 className="pt-10 text-center text-h3 lg:pt-24">{title}</h2>
      <form className="pb-10 pt-4 lg:pb-24 lg:pt-6" onSubmit={onSubmit}>
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

          <Button type="submit" mobileFullWidth>
            {buttonContent}
          </Button>
        </div>
        <div className="pb-8 pl-0.5 pt-4.5">
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
                <p className={`mt-2 text-base ${resStatus ? 'text-success' : 'text-error'}`}>
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
