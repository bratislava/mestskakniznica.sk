import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import FormContainer, { phoneRegex, SubmitStatus } from '@/components/forms/FormContainer'
import FormFooter, { CommonFormProps } from '@/components/forms/FormFooter'
import { DateTimeSelect, Input, TextArea } from '@/components/ui'
import RadioGroup from '@/components/ui/RadioGroup/RadioGroup'
import { convertDataToBody, getLocalDateForYup, useGetFormOptions } from '@/utils/form-constants'

import { options } from './options'

const SpaceReservationForm = ({ privacyPolicyHref }: CommonFormProps) => {
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
      fName: yup.string().required(),
      lName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegex, t('validation_error_phone')).required(),
      space: yup.string().required(),
      dateFrom: yup.date().min(getLocalDateForYup()).required(),
      dateTo: yup.date().min(getLocalDateForYup()).required(),
      timeFrom: yup.string().required(),
      timeTo: yup.string().required(),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const selectOptions = useGetFormOptions(options)

  const methods = useForm({
    resolver: yupResolver(schema) as any,
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

  const onSpaceUpdate = (item: string, callback: Function) => {
    if (document !== undefined) {
      ;[...document.querySelectorAll('iframe')].forEach((iframe) => {
         
        iframe.className = 'hidden'
      })
      const selectedIframe = document.querySelector(`#${item}_cal`)
      if (selectedIframe) {
        selectedIframe.className = ''
      }
    }
    callback(item)
  }

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
      // TODO fix eslint
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => { setIsSubmitted(SubmitStatus.NONE); }}
        successTitle={t('reservation_success_title')}
        successMessage={t('reservation_success_message')}
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
                label={t('space')}
                options={selectOptions}
                isInvalid={!!errors.space}
                errorMessage={t('validation_error_radiogroup')}
                validationBehavior="aria"
                value={value}
                onChange={(opt) => { onSpaceUpdate(opt, onChange); }}
                isRequired
              />
            )}
          />

          <div className="flex flex-col justify-between gap-6 lg:flex-row">
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
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
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

          <div>
            {/* hudobne studio */}
            <iframe
              title={t('iframe_title_music')}
              id="kapucinska_1_hudobne_studio_cal"
              src={`https://calendar.google.com/calendar/embed?height=500&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FPrague&showNav=1&showTitle=0&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=WEEK&src=Y19mMTI0NmE0Njc1MmQ0OWM3OTljZWJhNDg5YzVhZTU0YTc1NjAzYmJjODY4NzZmODYyMzc5MTQyNGQ2ZDg2ZWY0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F6BF26&hl=${
                i18n.language ?? 'sk'
              }`}
              width="100%"
              height="500"
              className="hidden"
            />

            {/* kreativna miestnost */}
            <iframe
              title={t('iframe_title_creative')}
              id="kapucinska_3_kreativna_miestnost_cal"
              src={`https://calendar.google.com/calendar/embed?height=500&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FPrague&showNav=1&showTitle=0&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=WEEK&src=Y182YTE4ZTk2ZTUxOTliMzRhMzAwMmMwMTczZTFjODc1MmFhZDMxZjlkMDIwYmZhYjQyNDQ2NTdlZjVmMzE2YjhhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F6BF26&hl=${
                i18n.language ?? 'sk'
              }`}
              width="100%"
              height="500"
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
          <FormFooter buttonContent={t('send')} privacyPolicyHref={privacyPolicyHref} />
        </div>
      </FormContainer>
    </FormProvider>
  )
}

export default SpaceReservationForm
