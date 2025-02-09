import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import BookList from '@/components/forms/BookList/BookList'
import FormContainer, {
  phoneRegex,
  postalCodeRegex,
  SubmitStatus,
} from '@/components/forms/FormContainer'
import FormFooter from '@/components/forms/FormFooter'
import StepNumberTitle from '@/components/forms/StepNumberTitle'
import { Input, TextArea } from '@/components/ui'
import Button from '@/modules/common/Button'
import cn from '@/utils/cn'
import { convertDataToBody } from '@/utils/form-constants'

const CycleDeliveryReservationForm = () => {
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
      readerCardNumber: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      postalCode: yup.string().matches(postalCodeRegex, t('validation_error_zipcode')).required(),
      email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegex, t('validation_error_phone')).required(),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      books: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string(),
            author: yup.string().when(['id'], {
              is: (id: string) => id?.length,
              then: yup.string(),
              otherwise: yup.string().required(),
            }),
            title: yup.string().when(['id'], {
              is: (id: string) => id?.length,
              then: yup.string(),
              otherwise: yup.string().required(),
            }),
          })
        )
        .required(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      readerCardNumber: '',
      address: '',
      city: '',
      postalCode: '',
      email: '',
      phone: '',
      message: '',
      books: [{ bookId: '', author: '', title: '' }],
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
      mg_email_to: 'donaska@mestskakniznica.sk',
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
    methods
      .trigger([
        'fName',
        'lName',
        'readerCardNumber',
        'address',
        'city',
        'postalCode',
        'email',
        'phone',
      ])
      .then((fulfillment) => {
        if (fulfillment) {
          methods.clearErrors()
          setStep(2)
        }
      })
  }

  const stepOneErrors = !isEmpty(
    Object.keys(errors).filter(
      (k) => k !== 'acceptFormTerms' && k !== 'books' && k !== 'cfTurnstile'
    )
  )

  const stepTwoErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('cycle_delivery_reservation_title')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('cycle_delivery_success_title')}
        successMessage={t('cycle_delivery_success_message')}
        errorMessage={t('order_error_message')}
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
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
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
            <div className="lg:w-6/12">
              <Controller
                control={methods.control}
                name="readerCardNumber"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="reader_card_input"
                    labelContent={t('reader_card_number')}
                    className="w-full lg:pr-3"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.readerCardNumber}
                    errorMessage={errors.readerCardNumber?.message}
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
            <div className="lg:w-6/12">
              <Controller
                control={methods.control}
                name="phone"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="phone_input"
                    type="phone"
                    labelContent={t('phone')}
                    className="w-full lg:pr-3"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              control={methods.control}
              name="address"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="address_input"
                  labelContent={t('address')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.address}
                  errorMessage={errors.address?.message}
                  required
                  {...field}
                />
              )}
            />
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="city"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="city_input"
                    labelContent={t('city')}
                    className="w-full lg:w-9/12"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.city}
                    errorMessage={errors.city?.message}
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="postalCode"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="postal_code_input"
                    labelContent={t('postal_code')}
                    className="w-full lg:w-3/12"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.postalCode}
                    errorMessage={errors.postalCode?.message}
                    required
                    {...field}
                  />
                )}
              />
            </div>

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
          <BookList />
          <Controller
            control={methods.control}
            name="message"
            render={({ field: { ref, ...field } }) => (
              <TextArea
                id="message_input"
                labelContent={t('message')}
                className="py-6"
                textAreaClassname="w-full h-[122px]"
                hasError={!!errors.message}
                errorMessage={errors.message?.message}
                {...field}
              />
            )}
          />
          {stepTwoErrors && (
            <p className="pb-4 text-base text-error">{t('please_fill_required_fields')}</p>
          )}
          <FormFooter hasDivider buttonContent={t('send')} />
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  )
}

export default CycleDeliveryReservationForm
