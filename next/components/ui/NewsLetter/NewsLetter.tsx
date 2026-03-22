import { useTranslation } from 'next-i18next'
import React, { useId } from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { CheckBox, Input } from '@/components/ui'
import Button from '@/modules/common/Button'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  responseMessage: string
  isSubscribeSuccessful: boolean
  isSubscribePending: boolean
}

const NewsletterTextField = ({
  name,
  label,
  type = 'text',
  required,
  className,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  className?: string
}) => {
  const methods = useFormContext()
  const { errors } = useFormState()

  return (
    <Controller
      control={methods.control}
      name={name}
      defaultValue=""
      render={({ field: { ref, ...field } }) => (
        <Input
          id={`newsletter-${name}`}
          type={type}
          required={required}
          labelContent={label}
          aria-label={label}
          inputClassName="w-full px-3 py-2"
          className={className}
          hasError={!!errors[name]}
          {...field}
        />
      )}
    />
  )
}

const NewsletterCheckBox = ({ name, label }: { name: string; label: string }) => {
  const methods = useFormContext()
  const { errors } = useFormState()

  return (
    <Controller
      control={methods.control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value, name: fieldName } }) => (
        <div className="border border-border-light px-3 py-2 lg:px-4 lg:py-2">
          <CheckBox
            id={`newsletter-${name}`}
            name={fieldName}
            onChange={onChange}
            isSelected={value}
            isInvalid={!!errors[name]}
            validationBehavior="aria"
          >
            <span className="text-base text-foreground-body">{label}</span>
          </CheckBox>
        </div>
      )}
    />
  )
}

const NewsletterFormSection = ({
  id,
  title,
  description,
  children,
}: React.PropsWithChildren<{
  id: string
  title: string
  description: string
}>) => (
  <div
    className="flex flex-col gap-4"
    role="group"
    aria-labelledby={`${id}-title`}
    aria-describedby={`${id}-desc`}
  >
    <div className="flex flex-col gap-2">
      <p id={`${id}-title`} className="text-h5">
        {title}
      </p>
      <p id={`${id}-desc`} className="text-base">
        {description}
      </p>
    </div>
    {children}
  </div>
)

const NewsletterForm = ({
  onSubmit,
  responseMessage,
  isSubscribeSuccessful,
  isSubscribePending,
}: Props) => {
  const { t } = useTranslation()
  const methods = useFormContext()
  const { errors } = useFormState()

  const consentLabelId = useId()

  return (
    <form className="flex flex-col gap-6 border-border-dark lg:border lg:p-8" onSubmit={onSubmit}>
      <div className="flex flex-col gap-8">
        <NewsletterFormSection
          id="newsletter-your-data"
          title={t('newsletterSection.yourData')}
          description={t('newsletterSection.yourDataDescription')}
        >
          <div className="flex flex-col flex-wrap gap-x-4 gap-y-6 lg:flex-row">
            <NewsletterTextField
              name="firstName"
              label={t('newsletterSection.firstName')}
              className="grow"
            />
            <NewsletterTextField
              name="lastName"
              label={t('newsletterSection.lastName')}
              className="grow"
            />

            <NewsletterTextField
              name="email"
              type="email"
              required
              label={t('newsletterSection.emailLabel')}
              className="lg:basis-full"
            />
          </div>
        </NewsletterFormSection>

        <NewsletterFormSection
          id="newsletter-choice"
          title={t('newsletterSection.newsletterChoice')}
          description={t('newsletterSection.newsletterChoiceDescription')}
        >
          <div
            className="flex flex-wrap gap-2 lg:gap-4"
            role="group"
            aria-label={t('newsletterSection.newsletterChoice')}
          >
            <NewsletterCheckBox
              name="newsletterGeneral"
              label={t('newsletterSection.newsletterGeneral')}
            />
            <NewsletterCheckBox
              name="newsletterBooks"
              label={t('newsletterSection.newsletterBooks')}
            />
            <NewsletterCheckBox
              name="newsletterChildren"
              label={t('newsletterSection.newsletterChildren')}
            />
          </div>

          {!!errors.newsletterSelection && (
            <p className="text-base text-error">{t('newsletterSection.newsletterError')}</p>
          )}
        </NewsletterFormSection>
      </div>

      <Controller
        control={methods.control}
        name="acceptTerms"
        defaultValue={false}
        render={({ field: { onChange, value, name } }) => (
          <>
            <div className="flex items-start gap-3.5 text-foreground-body">
              <CheckBox
                id="acceptTerms"
                name={name}
                onChange={onChange}
                isSelected={value}
                isInvalid={!!errors.acceptTerms}
                aria-labelledby={consentLabelId}
                validationBehavior="aria"
                className="-m-3 p-3"
              />
              <span id={consentLabelId} className="text-base">
                {t('newsletterSection.consent')}
                <MLink
                  href={t('newsletterSection.consentLinkHref')}
                  target="_blank"
                  variant="richtext"
                >
                  {t('newsletterSection.consentLinkLabel')}
                </MLink>
              </span>
            </div>
            {!!errors.acceptTerms && (
              <p className="text-base text-error">{t('newsletterSection.consentError')}</p>
            )}
          </>
        )}
      />

      {responseMessage && (
        <p
          className={cn('text-base', {
            'text-success': isSubscribeSuccessful,
            'text-error': !isSubscribeSuccessful,
          })}
        >
          {responseMessage}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubscribePending}>
        {isSubscribePending ? t('newsletterSection.button.pending') : t('newsletterSection.button')}
      </Button>
    </form>
  )
}

/**
 * Figma: https://www.figma.com/design/CY6Mh2f0SXJhBMY74HdS03/Mestsk%C3%A1-kni%C5%BEnica--MKB-?node-id=10907-4250&t=KkuqLqbD8kvacbyQ-4
 */

const NewsLetter = ({
  onSubmit,
  responseMessage,
  isSubscribeSuccessful,
  isSubscribePending,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={cn('mx-auto flex max-w-[48.75rem] flex-col items-center justify-center gap-6')}>
      <h2 className="text-center text-h2">{t('newsletterSection.title')}</h2>
      <NewsletterForm
        onSubmit={onSubmit}
        responseMessage={responseMessage}
        isSubscribeSuccessful={isSubscribeSuccessful}
        isSubscribePending={isSubscribePending}
      />
    </div>
  )
}

export default NewsLetter
