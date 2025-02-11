import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import FormContainer, { phoneRegex, SubmitStatus } from '@/components/forms/FormContainer'
import FormFooter from '@/components/forms/FormFooter'
import { DateTimeSelect, Input, Select, TextArea } from '@/components/ui'
import { convertDataToBody, getLocalDateForYup, useGetFormOptions } from '@/utils/form-constants'

import { options } from './options'

const ExcursionReservationForm = () => {
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
      email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegex, t('validation_error_phone')).required(),
      excursionType: yup.string().required(),
      excursionDate: yup.date().min(getLocalDateForYup()).required(),
      excursionTime: yup.string().required(),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const selectOptions = useGetFormOptions(options)

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      excursionType: selectOptions[0].key,
      excursionDate: '',
      excursionTime: '',
      message: '',
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const hasErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,

      mg_subject: null,
      mg_email_to: 'podujatia@mestskakniznica.sk',
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

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('excursion_reservation_title')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('generic_success_title')}
        successMessage={t('generic_success_message')}
        errorMessage={t('generic_error_message')}
      >
        <div className="mt-4 flex w-full flex-col gap-y-6">
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
          <Controller
            control={methods.control}
            name="phone"
            render={({ field: { ref, ...field } }) => (
              <Input
                id="phone_input"
                type="phone"
                labelContent={t('phone')}
                className="w-full lg:w-6/12 lg:pr-3"
                inputClassName="px-3 w-full"
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="excursionType"
            render={({ field: { ref, onChange, ...field } }) => (
              <Select
                id="excursion_type_input"
                labelContent={t('excursion_type')}
                className="w-full"
                options={selectOptions}
                onChange={(opt) => {
                  onChange(opt.key)
                }}
                hasError={!!errors.excursionType}
                errorMessage={t('validation_error_radiogroup')}
                aria-required={errors.excursionType?.type === 'required'}
                required
                {...field}
              />
            )}
          />
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <Controller
              control={methods.control}
              name="excursionDate"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="date_input"
                  type="date"
                  labelContent={t('date')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.excursionDate}
                  errorMessage={errors.excursionDate?.message}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="excursionTime"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="time_input"
                  type="time"
                  labelContent={t('excursion_from_time')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.excursionTime}
                  errorMessage={errors.excursionTime?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>
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
          {hasErrors && <p className="text-base text-error">{t('please_fill_required_fields')}</p>}
          <FormFooter buttonContent={t('send')} />
        </div>
      </FormContainer>
    </FormProvider>
  )
}

export default ExcursionReservationForm
