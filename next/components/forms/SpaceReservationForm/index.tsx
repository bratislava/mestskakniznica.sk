import { DateTimeSelect, Input, TextArea } from '@bratislava/ui-city-library'
import RadioGroup from '@bratislava/ui-city-library/RadioGroup/RadioGroup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LocalDate } from '@js-joda/core'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { convertDataToBody, useGetFormOptions } from '@utils/form-constants'
import FormContainer, { phoneRegex, SubmitStatus } from '../FormContainer'
import FormFooter from '../FormFooter'
import { options } from './options'

function SpaceReservationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const { t } = useTranslation(['forms', 'common'])
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
      space: yup.string().required(),
      dateFrom: yup.date().min(LocalDate.now().toString()).required(),
      dateTo: yup.date().min(LocalDate.now().toString()).required(),
      timeFrom: yup.string().required(),
      timeTo: yup.string().required(),
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
      space: selectOptions[0].key,
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: '',
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
      mg_email_to: 'ivo.dobrovodsky@mestskakniznica.sk',
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
        title={t('space_reservation_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('reservation_success_title')}
        successMessage={t('reservation_success_message')}
        errorMessage={t('generic_error_message')}
      >
        <div className="mt-4 flex w-full flex-col gap-y-6">
          <div className="flex flex-col justify-between gap-y-6 gap-x-6 lg:flex-row">
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
          <div className="w-full lg:w-6/12 lg:pr-3">
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
                  required
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            control={methods.control}
            name="space"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                id="venue_type_input"
                labelContent={t('space')}
                className="flex flex-col gap-x-4 gap-y-4"
                wrapperClassName="w-full"
                radioClassName="w-full"
                options={selectOptions}
                hasError={!!errors.space}
                errorMessage={t('validation_error_radiogroup')}
                value={value}
                onChange={(opt) => onChange(opt)}
                required
              />
            )}
          />

          <div className="flex flex-col justify-between gap-y-6 gap-x-6 lg:flex-row">
            <Controller
              control={methods.control}
              name="dateFrom"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="date_from_input"
                  type="date"
                  labelContent={t('rent_date_from')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.dateFrom}
                  errorMessage={errors.dateFrom?.message}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="timeFrom"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="time_from_input"
                  type="time"
                  labelContent={t('reservation_time')}
                  className="w-full"
                  inputClassName="w-full  "
                  hasError={!!errors.timeFrom}
                  errorMessage={errors.timeFrom?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-6 gap-x-6 lg:flex-row">
            <Controller
              control={methods.control}
              name="dateTo"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="date_to_input"
                  type="date"
                  labelContent={t('rent_date_to')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.dateTo}
                  errorMessage={errors.dateTo?.message}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="timeTo"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="time_to_input"
                  type="time"
                  labelContent={t('reservation_time')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.timeTo}
                  errorMessage={errors.timeTo?.message}
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
          {hasErrors && <p className="text-base text-error ">{t('please_fill_required_fields')}</p>}
          <FormFooter buttonContent={t('send')} />
        </div>
      </FormContainer>
    </FormProvider>
  )
}

export default SpaceReservationForm
