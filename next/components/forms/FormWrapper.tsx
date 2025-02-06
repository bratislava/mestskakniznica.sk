import React from 'react'

import { CloseIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'
import cn from '@/utils/cn'

import { SubmitStatus } from './FormContainer'
import FormSubmittedComponent from './FormSubmittedComponent'

export const phoneRegex = /(^(\+\d{1,3}|0)(?: ?\d{3}){3}$)/
export const postalCodeRegex = /^\d{5}(?:-\d{4})?$/
export const IBANRegex = /^[A-Z]{2}(?: ?\d){13,30}$/

interface IProps {
  className?: string
  children: React.ReactNode
  title: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitted: SubmitStatus
}

const FormWrapper = ({ className, children, title, onSubmit, isSubmitted }: IProps) => {
  return (
    <div
      className={cn(
        className,
        'w-72 max-w-[680px] lg:w-full lg:border lg:border-border-dark lg:px-8 lg:pt-8'
      )}
    >
      <div className="-mx-4 flex justify-between border-b border-border-dark px-4 py-4.5 lg:border-none lg:py-0">
        <h4 className="text-h4 font-normal">{title}</h4>
        {/* TODO ARIA: add aria-label */}
        <Button variant="unstyled">
          <CloseIcon className="lg:hidden" />
        </Button>
      </div>
      <form className="mt-6 flex flex-col gap-y-8" onSubmit={onSubmit}>
        {/* Here are the children of each form if unsubmitted, otherwise default SubmittedFormComponent */}
        <FormSubmittedComponent
          className={cn({ hidden: isSubmitted == SubmitStatus.NONE })}
          submitStatus={isSubmitted}
        />
        <div className={cn({ hidden: isSubmitted != SubmitStatus.NONE })}>{children}</div>
      </form>
    </div>
  )
}

export default FormWrapper
