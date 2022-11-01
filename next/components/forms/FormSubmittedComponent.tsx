import CheckMark from '@assets/images/check-mark.svg'
import CloseIcon from '@assets/images/close.svg'
import { Button } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { SubmitStatus } from './FormContainer'

type IProps = {
  className?: string
  onBackToFormClick?: () => void
  successTitle?: string
  successMessage?: string
  errorMessage?: string
  submitStatus: SubmitStatus
}

function FormSubmittedComponent({
  className,
  onBackToFormClick,
  successTitle,
  successMessage,
  errorMessage,
  submitStatus,
}: IProps) {
  const { t } = useTranslation('forms')

  return (
    <div className={cx('py-4', className)}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gray-universal-100 bg-gray-universal-100 text-base text-white">
          {submitStatus == SubmitStatus.SUCCESS && <CheckMark />}
          {submitStatus == SubmitStatus.FAILURE && <CloseIcon />}
        </span>
        <div className="space-y-4">
          <h5 className="text-gray-universal-100">
            {submitStatus == SubmitStatus.SUCCESS && (successTitle || t('generic_success_title'))}
            {submitStatus == SubmitStatus.FAILURE && t('generic_error_title')}
          </h5>
          <p className="text-base text-gray-universal-70">
            {submitStatus == SubmitStatus.SUCCESS &&
              (successMessage || t('generic_success_message'))}
            {submitStatus == SubmitStatus.FAILURE && (errorMessage || t('generic_error_message'))}
          </p>
        </div>
        <Button className="py-[9px] px-5" variant="secondary" onClick={onBackToFormClick}>
          {t('thank_you_button_content')}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmittedComponent
