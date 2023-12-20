import { CheckBox, Input } from '@bratislava/ui-city-library'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import { useGeneralContext } from '@utils/generalContext'
import { useNavikronos } from '@utils/navikronos'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'
import Turnstile from 'react-turnstile'

interface IProps {
  className?: string
  buttonContent: string
  hasDivider?: boolean
}

type RenderParameters = {
  sitekey: string
  theme?: 'light' | 'dark'
  callback?(token: string): void
}

declare global {
  interface Window {
    turnstile: {
      render(container: string | HTMLElement, params: RenderParameters): void
    }
  }
}

const FormFooter = ({ className, buttonContent, hasDivider = false }: IProps) => {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation('forms')
  const { general } = useGeneralContext()
  const { getPathForStrapiEntity } = useNavikronos()

  return (
    <div className={cx('w-full space-y-6', className)}>
      {hasDivider && <div className="border-t border-border-light" />}
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
              <div className="text-sm">
                {t('form_footer_agree')}{' '}
                <MLink
                  href={
                    getPathForStrapiEntity(
                      general?.data?.attributes?.privacyTermsAndConditionsPage?.data
                    ) ?? ''
                  }
                  variant="basic"
                  target="_blank"
                >
                  {t('form_footer_personal_details')}
                </MLink>
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

      {/* CAPTCHA */}
      <Controller
        control={methods.control}
        name="cfTurnstile"
        render={({ field: { ref, ...field } }) => (
          <Input
            id="cf-turnstile-response"
            type="hidden"
            labelContent={t('captcha')}
            labelClassName=""
            hasError={!!errors.cfTurnstile}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            errorMessage={errors.cfTurnstile?.message}
            required
            {...field}
          />
        )}
      />
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string}
        onVerify={(token) => methods.setValue('cfTurnstile', token)}
        onError={() => methods.setValue('cfTurnstile', null)}
        onTimeout={() => methods.setValue('cfTurnstile', null)}
        onExpire={() => methods.setValue('cfTurnstile', null)}
        className="!mt-0"
        theme="light"
      />

      <Button type="submit" className="m-auto ml-0" mobileFullWidth>
        {buttonContent}
      </Button>
    </div>
  )
}

export default FormFooter
