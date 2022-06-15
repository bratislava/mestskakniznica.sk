import { Button, CheckBox, Link } from '@bratislava/ui-city-library'
import React from 'react'
import cx from 'classnames'
import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
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
    <div className={cx('space-y-6 w-full', className)}>
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
                  href={locale == 'sk' ? '/o-nas/ochrana-osobnych-udajov' : '/about-us/privacy-terms-and-conditions'}
                  variant="plain"
                  uppercase={false}
                  className="underline"
                >
                  {t('form_footer_personal_details')}
                </Link>
                .
              </div>
            </CheckBox>
            {!!errors.acceptFormTerms && <p className="text-error text-base -mt-6">{t('terms_error')}</p>}
          </>
        )}
        rules={{ required: true }}
      />
      <Button className="w-full lg:w-auto py-2.5 px-5 ml-0 m-auto">{buttonContent}</Button>
    </div>
  )
}

export default FormFooter
