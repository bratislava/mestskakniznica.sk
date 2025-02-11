import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import FormContainer, { phoneRegexOrEmpty, SubmitStatus } from '@/components/forms/FormContainer'
import FormFooter from '@/components/forms/FormFooter'
import StepNumberTitle from '@/components/forms/StepNumberTitle'
import { Input, TextArea } from '@/components/ui'
import Button from '@/modules/common/Button'
import cn from '@/utils/cn'
import { convertDataToBody } from '@/utils/form-constants'

const RechercheReservationForm = () => {
  const [step, setStep] = React.useState(1)
  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const { t } = useTranslation('forms')
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
      fName: yup.string().required(),
      lName: yup.string().required(),
      readerCardNumber: yup.string(),
      email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegexOrEmpty, t('validation_error_phone')),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      rechercheTopic: yup.string(),
      rechercheKeyWords: yup.string(),
      recherchePurpose: yup.string(),
      rechercheLiteratureTime: yup.string(),
      rechercheDocumentsType: yup.string(),
      rechercheDemandedLanguages: yup.string(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      readerCardNumber: '',
      email: '',
      phone: '',
      message: '',
      rechercheTopic: '',
      rechercheKeyWords: '',
      recherchePurpose: '',
      rechercheLiteratureTime: '',
      rechercheDocumentsType: '',
      rechercheDemandedLanguages: '',
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,

      mg_subject: null,
      mg_email_to: 'miroslava.porubska@mestskakniznica.sk',
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises,promise/catch-or-return
    methods
      .trigger(['fName', 'lName', 'readerCardNumber', 'email', 'phone'])
      .then((fulfillment) => {
        // eslint-disable-next-line promise/always-return
        if (fulfillment) {
          methods.clearErrors()
          setStep(2)
        }
      })
  }

  const stepOneErrors = !isEmpty(
    Object.keys(errors).filter(
      (k) => k !== 'acceptFormTerms' && !k.startsWith('recherche') && k !== 'cfTurnstile',
    ),
  )

  const stepTwoErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('recherche_reservation_title')}
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
          title={t('personal_details')}
          activeStep={step}
          className={cn({ '-mx-8 border border-error px-8': stepOneErrors && step !== 1 })}
          onClick={() => setStep(1)}
        >
          <div className="flex w-full flex-col gap-y-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="fName"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="first_name_input"
                    labelContent={t('first_name')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.fName}
                    errorMessage={errors.fName?.message}
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="lName"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="last_name_input"
                    labelContent={t('last_name')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.lName}
                    errorMessage={errors.lName?.message}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className="w-full lg:w-6/12 lg:pr-3">
              <Controller
                control={methods.control}
                name="readerCardNumber"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="reader_card_input"
                    labelContent={t('reader_card_number')}
                    inputClassName="px-3 w-full"
                    hasError={!!errors.readerCardNumber}
                    errorMessage={errors.readerCardNumber?.message}
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
            <div className="lg:pg-3 w-full lg:w-6/12">
              <Controller
                control={methods.control}
                name="phone"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="phone_input"
                    type="phone"
                    labelContent={t('phone')}
                    inputClassName="px-3 w-full"
                    hasError={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    {...field}
                  />
                )}
              />
            </div>

            {stepOneErrors && (
              <p className="text-base text-error">{t('please_fill_required_fields')}</p>
            )}
            <Button onPress={() => triggerFirstStep()}>{t('continue')}</Button>
          </div>
        </StepNumberTitle>

        {/* Step 2 */}
        <StepNumberTitle
          num={2}
          title={t('reservation_info')}
          activeStep={step}
          className="border-b-0 pb-0"
          onClick={() => triggerFirstStep()}
        >
          <div className="flex w-full flex-col gap-y-6">
            <Controller
              control={methods.control}
              name="rechercheTopic"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="recherche_topic_input"
                  type="text"
                  labelContent={t('recherche_topic')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.rechercheTopic}
                  errorMessage={errors.rechercheTopic?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="rechercheKeyWords"
              render={({ field: { ref, ...field } }) => (
                <TextArea
                  id="message_input"
                  labelContent={t('recherche_keywords')}
                  textAreaClassname="w-full h-[122px]"
                  hasError={!!errors.rechercheKeyWords}
                  errorMessage={errors.rechercheKeyWords?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="recherchePurpose"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="recherche_purpose_input"
                  type="text"
                  labelContent={t('recherche_purpose')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.recherchePurpose}
                  errorMessage={errors.recherchePurpose?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="rechercheLiteratureTime"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="recherche_literature_input"
                  type="text"
                  labelContent={t('recherche_literature_time')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.rechercheLiteratureTime}
                  errorMessage={errors.rechercheLiteratureTime?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="rechercheDocumentsType"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="recherche_documents_input"
                  type="text"
                  labelContent={t('recherche_documents_type')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.rechercheDocumentsType}
                  errorMessage={errors.rechercheDocumentsType?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="rechercheDemandedLanguages"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="recherche_langs_input"
                  type="text"
                  labelContent={t('recherche_demanded_languages')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.rechercheDemandedLanguages}
                  errorMessage={errors.rechercheDemandedLanguages?.message}
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
            {stepTwoErrors && (
              <p className="text-base text-error">{t('please_fill_required_fields')}</p>
            )}
            <FormFooter hasDivider buttonContent={t('send')} />
          </div>
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  )
}

export default RechercheReservationForm
