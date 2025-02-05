import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import BookListExtended from '@/components/forms/BookList/BookListExtended'
import FormContainer, {
  IBANRegex,
  phoneRegexOrEmpty,
  SubmitStatus,
} from '@/components/forms/FormContainer'
import FormFooter from '@/components/forms/FormFooter'
import StepNumberTitle from '@/components/forms/StepNumberTitle'
import { CheckBox, Input, TextArea } from '@/components/ui'
import Button from '@/modules/common/Button'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'
import { convertDataToBody } from '@/utils/form-constants'

const InterlibraryLoanServiceFormLibrary = () => {
  const [step, setStep] = React.useState(1)
  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const { t, i18n } = useTranslation('forms')
  const router = useRouter()

  yup.setLocale({
    mixed: {
      required: t('validation_error_required'),
      notType: t('validation_error_required'),
    },
    string: {
      email: t('validation_error_email'),
    },
    date: {
      min: t('validation_error_date_gt_today'),
      max: t('validation_error_date_lt_today'),
    },
    number: {
      min: t('validation_error_number_gt_zero'),
    },
  })

  const schema = yup
    .object({
      email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegexOrEmpty, t('validation_error_phone')),
      libraryName: yup.string().required(),
      ICO: yup.string().required(),
      DIC: yup.string().required(),
      IBAN: yup.string().matches(IBANRegex, t('validation_error_iban')).required(),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      acceptFeesTerms: yup.boolean().isTrue(),
      books: yup
        .array()
        .of(
          yup.object().shape({
            author: yup.string().required(),
            title: yup.string().required(),
            placeOfIssue: yup.string().optional(),
            issuer: yup.string().optional(),
            packageNumber: yup.string().optional(),
            issueDate: yup.string().optional(),
            ISBN: yup.string().optional(),
          })
        )
        .required(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      phone: '',
      libraryName: '',
      ICO: '',
      DIC: '',
      IBAN: '',
      message: '',
      acceptFeesTerms: false,
      books: [
        {
          author: '',
          title: '',
          placeOfIssue: '',
          issuer: '',
          packageNumber: '',
          issueDate: '',
          ISBN: '',
        },
      ],
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const formTitle = t('interlibrary_loan_library_title')

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,

      mg_subject: null,
      mg_email_to: 'info@mestskakniznica.sk',
      mg_reply_to: data.email,
      meta_sent_from: router.asPath,
      meta_locale: router.locale,
    }

    // send email
    const res = await fetch(`/api/submit-form`, {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify(body),
    })

    // catch error
    const { error } = await res.json()
    if (error) {
      console.log('error sending form', error)
      setIsSubmitted(SubmitStatus.FAILURE)
      return
    }

    // show thank you message
    setIsSubmitted(SubmitStatus.SUCCESS)
  })

  const triggerFirstStep = () => {
    methods.trigger(['email', 'phone', 'libraryName', 'ICO', 'DIC', 'IBAN']).then((fulfillment) => {
      if (fulfillment) {
        methods.clearErrors()
        setStep(2)
      }
    })
  }

  const stepOneErrors = !isEmpty(
    Object.keys(errors).filter(
      (k) =>
        k !== 'acceptFormTerms' && k !== 'books' && k !== 'acceptFeesTerms' && k !== 'cfTurnstile'
    )
  )

  const stepTwoErrors = !isEmpty(
    Object.keys(errors).filter((k) => k !== 'acceptFormTerms' && k !== 'acceptFeesTerms')
  )

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={formTitle}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('interlibrary_research_success_title')}
        successMessage={t('interlibrary_research_success_message')}
        errorMessage={t('interlibrary_research_error_message')}
      >
        {/* Step 1 */}
        <StepNumberTitle
          num={1}
          title={t('personal_and_library_details')}
          activeStep={step}
          className={cn({ '-mx-8 border border-error px-8': stepOneErrors && step !== 1 })}
          onClick={() => setStep(1)}
        >
          <div className="flex w-full flex-col gap-y-6">
            <Controller
              control={methods.control}
              name="libraryName"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="library_name_input"
                  labelContent={t('library_name')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.libraryName}
                  errorMessage={errors.libraryName?.message}
                  required
                  {...field}
                />
              )}
            />
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="ICO"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="ico_input"
                    type="number"
                    labelContent={t('tax_id')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.ICO}
                    errorMessage={errors.ICO?.message}
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="DIC"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="dic_input"
                    type="number"
                    labelContent={t('vat_number')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.DIC}
                    errorMessage={errors.DIC?.message}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              control={methods.control}
              name="email"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="email_input"
                  type="email"
                  labelContent={t('email')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.email}
                  errorMessage={errors.email?.message}
                  required
                  {...field}
                />
              )}
            />
            <div className="w-full lg:w-6/12 lg:pr-3">
              <Controller
                control={methods.control}
                name="phone"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="phone_input"
                    labelContent={t('phone')}
                    inputClassName="px-3 w-full"
                    hasError={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <Controller
              control={methods.control}
              name="IBAN"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="iban_input"
                  labelContent={t('IBAN')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.IBAN}
                  errorMessage={errors.IBAN?.message}
                  required
                  {...field}
                />
              )}
            />

            <Controller
              control={methods.control}
              name="message"
              render={({ field: { ref, ...field } }) => (
                <TextArea
                  id="message_input"
                  labelContent={t('message')}
                  textAreaClassname="w-full h-[122px]"
                  hasError={!!errors.message}
                  errorMessage={errors.message?.message}
                  {...field}
                />
              )}
            />

            {stepOneErrors && (
              <p className="text-base text-error">{t('please_fill_required_fields')}</p>
            )}

            <Button onPress={() => triggerFirstStep()}>{t('continue')}</Button>
          </div>
        </StepNumberTitle>

        {/* Step 2 */}
        <StepNumberTitle
          num={2}
          title={t('book_list')}
          activeStep={step}
          className="border-b-0 pb-0"
          onClick={() => triggerFirstStep()}
        >
          <BookListExtended />

          {stepTwoErrors && (
            <p className="pt-4 text-base text-error">{t('please_fill_required_fields')}</p>
          )}

          <div className="mt-2 space-y-4 border-t border-border-light pt-6">
            <Controller
              control={methods.control}
              name="acceptFeesTerms"
              render={({ field: { onChange, value, name } }) => (
                <>
                  <CheckBox
                    id="acceptFeesTerms"
                    name={name}
                    onChange={onChange}
                    checked={value}
                    aria-invalid={errors.acceptFeesTerms ? 'true' : 'false'}
                  >
                    <div className="text-sm">
                      {t('interlibrary_accept_fees')}{' '}
                      <MLink
                        href={
                          i18n.language === 'sk'
                            ? '/file/cennik-poplatkov-a-sluzieb'
                            : '/file/cennik-poplatkov-a-sluzieb' // TODO pricing link in EN
                        }
                        variant="basic"
                      >
                        {t('interlibrary_price_list')}
                      </MLink>
                      .
                    </div>
                  </CheckBox>
                  {!!errors.acceptFeesTerms && (
                    <p className="mt-6 text-base text-error">{t('terms_error')}</p>
                  )}
                </>
              )}
            />
            <FormFooter buttonContent={t('send')} />
          </div>
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  )
}

export default InterlibraryLoanServiceFormLibrary
