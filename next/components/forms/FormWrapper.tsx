import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import React from 'react'

import FormSubmittedComponent from './FormSubmittedComponent'

export const phoneRegex = /(^(\+\d{1,3}|0)(?: ?\d{3}){3}$)/
export const postalCodeRegex = /^\d{5}(?:-\d{4})?$/
export const IBANRegex = /^[A-Z]{2}(?: ?\d){13,30}$/

interface IProps {
  className?: string
  children: React.ReactNode
  title: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitted: boolean
}

function FormWrapper({ className, children, title, onSubmit, isSubmitted }: IProps) {
  return (
    <div
      className={cx(
        className,
        'w-72 max-w-[680px] lg:w-full lg:border lg:border-gray-universal-100 lg:px-8 lg:pt-8'
      )}
    >
      <div className="-mx-4 flex justify-between border-b border-gray-universal-100 px-4 py-4.5 lg:border-none lg:py-0">
        <h4 className="text-base font-normal lg:text-md">{title}</h4>
        <button>
          <CloseIcon className="lg:hidden" />
        </button>
      </div>
      <form className="mt-6 flex flex-col gap-y-8" onSubmit={onSubmit}>
        {/* Here are the children of each form if unsubmitted, otherwise default SubmittedFormComponent */}
        <FormSubmittedComponent
          className={cx({
            hidden: !isSubmitted,
          })}
        />
        <div
          className={cx({
            hidden: isSubmitted,
          })}
        >
          {children}
        </div>
      </form>
    </div>
  )
}

export default FormWrapper
