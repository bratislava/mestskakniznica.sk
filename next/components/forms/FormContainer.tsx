import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { ReactNode, useEffect, useState } from 'react'
import { useLockedBody, useWindowSize } from 'usehooks-ts'

import { CloseIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

import FormSubmittedComponent from './FormSubmittedComponent'

export const phoneRegex = /(^(\+\d{1,3}|0)(?: ?\d{3}){3}$)/
export const phoneRegexOrEmpty = /(^(\+\d{1,3}|0)(?: ?\d{3}){3}$)|^$/
export const postalCodeRegex = /^\d{5}(?:-\d{4})?$/
export const IBANRegex = /^[A-Z]{2}(?: ?\d){13,30}$/
export const IDCardRegex = /^[\dA-Za-z]{1,15}$/

export enum SubmitStatus {
  NONE,
  LOADING,
  SUCCESS,
  FAILURE,
}

interface FormContainerProps {
  children: ReactNode
  buttonText?: string
  title: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitted: SubmitStatus
  onReset?: () => void
  successTitle?: string
  successMessage?: string
  errorMessage?: string
  wrapperClass?: string
}

const FormContainer = ({
  children,
  buttonText,
  title,
  onSubmit,
  isSubmitted,
  onReset,
  successTitle,
  successMessage,
  errorMessage,
  wrapperClass,
}: FormContainerProps) => {
  const [isFormOpen, setFormOpen] = useState(false)
  const { t } = useTranslation('forms')

  // TODO revisit translations
  //  keeping them here to not be deleted by i18next-parser
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unidentifiedTranslations = [
    t('instrument_type'), // also musical_instrument_type exists

    // these are used in getMailTranslationKey
    t('mail_accept_fees'),
    t('mail_accept_terms'),
    t('mail_blind_dep'),
    t('mail_date_from'),
    t('mail_date_to'),
    t('mail_temp_address'),
    t('mail_temp_city'),
    t('mail_temp_postal_code'),
    t('mail_time_from'),
    t('mail_time_to'),
  ]

  const { width } = useWindowSize()

  const [, setLockedBodyScroll] = useLockedBody(false)

  useEffect(() => {
    setFormOpen(isFormOpen && width !== undefined && width > 767)
  }, [width])

  useEffect(() => {
    setLockedBodyScroll(!isSubmitted && isFormOpen && width !== undefined && width <= 768)
  }, [isFormOpen, setLockedBodyScroll, width, isSubmitted])

  const listener = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      // onSubmit(event);
    }
  }

  return (
    <div className={cx('flex flex-col border border-border-dark p-4', wrapperClass)}>
      {isSubmitted === SubmitStatus.NONE ? (
        <>
          <div className="mb-4 text-h3 md:px-4 md:pt-4" id="form-title">
            {title}
          </div>
          <Button
            onPress={() => setFormOpen(true)}
            variant="primary"
            className={cx({ hidden: isFormOpen })}
            aria-labelledby="form-title"
          >
            {buttonText || t('continue')}
          </Button>
          {isFormOpen && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <form
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={onSubmit}
              onKeyDown={() => listener}
              className="base-focus-ring fixed inset-0 z-40 flex flex-col bg-white md:relative md:z-0"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-border-dark md:hidden">
                <span className="pl-4">{title}</span>
                {/* TODO ARIA: adda aria-label */}
                <Button variant="unstyled" className="p-4" onPress={() => setFormOpen(false)}>
                  <CloseIcon />
                </Button>
              </div>
              {/* BODY */}

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pt-0">
                <div className="pt-4 text-sm text-foreground-body md:pt-0">
                  {t('required_fields')} (<span className="text-error">*</span>
                  ).
                </div>
                {children}
              </div>
            </form>
          )}
        </>
      ) : (
        <FormSubmittedComponent
          submitStatus={isSubmitted}
          successTitle={successTitle}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onBackToFormClick={onReset}
        />
      )}
    </div>
  )
}

export default FormContainer
