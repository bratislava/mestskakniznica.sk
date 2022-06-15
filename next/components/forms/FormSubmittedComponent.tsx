import CheckMark from '@assets/images/check-mark.svg'
import CloseMark from '@assets/images/close.svg'
import { Button } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'

type IProps = {
  className?: string
  onBackToFormClick?: () => void
  successTitle?: string
  successMessage?: string
  errorMessage?: string
}

function FormSubmittedComponent({
  className,
  onBackToFormClick,
  successTitle,
  successMessage,
  errorMessage,
}: IProps) {
  const { t } = useTranslation('forms')

  return (
    <div className={cx('py-4', className)}>
      <div className="flex flex-col gap-y-8 items-center justify-center w-full h-full text-center">
        <span className="w-14 h-14 inline-flex items-center justify-center text-base rounded-full border border-gray-universal-100 bg-gray-universal-100 text-white">
          <CheckMark />
        </span>
        <div className="space-y-4">
          <h5 className="text-gray-universal-100">{successTitle || t('generic_success_title')}</h5>
          <p className="text-gray-universal-70 text-base">{successMessage || t('generic_success_message')}</p>
        </div>
        <Button className="py-[9px] px-5" variant="secondary" onClick={onBackToFormClick}>
          {t('thank_you_button_content')}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmittedComponent
