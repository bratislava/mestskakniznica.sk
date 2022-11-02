import { Button, CheckBox, Link } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { usePageWrapperContext } from '../layouts/PageWrapper'

interface IProps {
  className?: string
  buttonContent: string
  hasDivider?: boolean
}

const FormFooter = ({ className, buttonContent, hasDivider = false }: IProps) => {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation('forms')
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('w-full space-y-6', className)}>
      {hasDivider && <div className="border-t border-gray-universal-200" />}
      <Controller
        control={methods.control}
        name="acceptFormTerms"
        defaultValue={false}
        render={({ field: { onChange, value, name } }) => (
          <>
            <CheckBox
              id="acceptFormTerms"
              name={name}
              onChange={onChange} // send value to hook form
              checked={value}
              aria-invalid={errors.acceptFormTerms ? 'true' : 'false'}
            >
              <div className="text-xs">
                {t('form_footer_agree')}{' '}
                <Link
                  href={
                    locale == 'sk'
                      ? '/o-nas/ochrana-osobnych-udajov'
                      : '/about-us/privacy-terms-and-conditions'
                  }
                  variant="plain"
                  uppercase={false}
                  className="underline"
                >
                  {t('form_footer_personal_details')}
                </Link>
                . <span className="pl-1 text-error">*</span>
              </div>
            </CheckBox>
            {!!errors.acceptFormTerms && (
              <p className="-mt-6 text-base text-error">{t('terms_error')}</p>
            )}
          </>
        )}
        rules={{ required: true }}
      />
      <Button className="m-auto ml-0 w-full py-2.5 px-5 lg:w-auto">{buttonContent}</Button>
    </div>
  )
}

export default FormFooter
