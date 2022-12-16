import { Button, CheckBox, Input, Link } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { usePageWrapperContext } from '../layouts/PageWrapper'
import Script from 'next/script'

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
  const { locale } = usePageWrapperContext()

  const [cfId] = React.useState(Math.floor(Math.random() * 999))

  const renderCfCaptcha = () => {
    const widget = document.getElementById('turnstile-widget-' + cfId)
    if (window.turnstile && widget && widget.childNodes.length === 0) {
      window.turnstile.render('#turnstile-widget-' + cfId, {
        sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? '',
        callback: function (token: string) {
          methods.setValue('cfTurnstile', token)
        },
        theme: 'light',
      })
    }
  }
  renderCfCaptcha()

  return (
    <div className={cx('w-full space-y-6', className)}>
      {hasDivider && <div className="border-t border-border-light"/>}
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
            errorMessage={errors.cfTurnstile?.message}
            required
            {...field}
          />
        )}
      />
      <Script
        src={'https://challenges.cloudflare.com/turnstile/v0/api.js'}
        async={true}
        defer={true}
        onLoad={renderCfCaptcha}
      />
      <div id={'turnstile-widget-' + cfId} className="!mt-0" />

      <Button className="m-auto ml-0 w-full py-2.5 px-5 lg:w-auto">{buttonContent}</Button>
    </div>
  )
}

export default FormFooter
