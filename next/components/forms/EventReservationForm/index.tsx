import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { DateTimeSelect, Input, TextArea } from '@/components/ui'
import NumberSwitcher from '@/components/ui/NumberSwitcher/NumberSwitcher'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import { EventCardEntityFragment } from '@/services/graphql'
import { convertDataToBody, getLocalDateForYup } from '@/utils/form-constants'
import { dayForDifferentDateTo, isEventPast } from '@/utils/utils'

import EventDetailsDateBox from '../../Atoms/EventDetailsDateBox'
import FormContainer, { phoneRegex, SubmitStatus } from '../FormContainer'
import FormFooter from '../FormFooter'

export interface EventReservationFormProps {
  eventDetail?: EventCardEntityFragment
}

const EventReservationForm = ({ eventDetail }: EventReservationFormProps) => {
  const { dateFrom, dateTo, title, branch } = eventDetail?.attributes ?? {}
  const eventBranch = branch?.data?.attributes

  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const [isEventInThePast, setIsEventInThePast] = React.useState(false)
  const [isDateEditDisabled, setIsDateEditDisabled] = React.useState(false)
  const [isTimeEditDisabled, setIsTimeEditDisabled] = React.useState(false)

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

  const schemaBase = {
    fName: yup.string().required(),
    lName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegex, t('validation_error_phone')).required(),
    spaceCount: yup.number().min(1).required(),
    eventDate: yup.lazy(() => {
      if (dateFrom && dateTo) {
        const dateFromTmp = new Date(dateFrom)
        const dateToTmp = new Date(dateTo)

        const { date } = dayForDifferentDateTo(dateFromTmp, dateToTmp, true)
        return yup
          .date()
          .min(date, t('validation_error_min_event_date'))
          .max(dateToTmp, t('validation_error_max_event_date'))
          .required()
      }

      return yup.date().min(getLocalDateForYup()).required()
    }),
    eventTime: yup.string().required(),
    message: yup.string(),
    acceptFormTerms: yup.boolean().isTrue(),
    cfTurnstile: yup.string().required(t('validation_error_captcha')),
  }
  const schema = yup.object(schemaBase).required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      spaceCount: 1,
      eventDate: '',
      eventTime: '',
      message: '',
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const hasErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  React.useMemo(() => {
    // prefill event date and time
    if (dateFrom && dateTo) {
      const dateFromTmp = new Date(dateFrom)
      const dateToTmp = new Date(dateTo)

      const { day, month, year } = dayForDifferentDateTo(dateFromTmp, dateToTmp, true)
      // "yyyy-MM-dd"
      methods.setValue('eventDate', `${year}-${month}-${day}`)

      if (
        dateFromTmp.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) ===
        dateToTmp.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      ) {
        setIsDateEditDisabled(true)
      }

      const timeFrom = dateFromTmp.toLocaleString('sk', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      // HH:ii
      methods.setValue('eventTime', timeFrom)
      setIsTimeEditDisabled(true)
    }

    // disable showing form if is in the past
    setIsEventInThePast(isEventPast(dateTo))
  }, [dateFrom, dateTo, methods])

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
    <div className="flex grid-cols-9 flex-col-reverse gap-x-16 lg:grid">
      {!isEventInThePast && (
        <FormProvider {...methods}>
          <FormContainer
            title={t('event_reservation_title')}
            buttonText={t('common:continue')}
            onSubmit={handleSubmit}
            isSubmitted={isSubmitted}
            onReset={() => setIsSubmitted(SubmitStatus.NONE)}
            successTitle={t('generic_success_title')}
            successMessage={t('generic_success_message')}
            errorMessage={t('generic_error_message')}
            wrapperClass="col-span-6"
          >
            <div className="mt-4 flex w-full flex-col gap-y-6">
              <div className="text-h5 text-foreground-heading">{t('personal_details')}</div>
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
                      className="w-full"
                      inputClassName="w-full"
                      hasError={!!errors.phone}
                      errorMessage={errors.phone?.message}
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              {eventDetail && (
                <div>
                  <div className="border-t pb-4 pt-6 text-h5 text-foreground-heading">
                    {t('event')}
                  </div>

                  <div className="border border-border-light p-4 text-foreground-body">
                    <div className="flex">
                      <div className="flex h-16 w-16 bg-promo-yellow text-center">
                        <EventDetailsDateBox
                          dateFrom={dateFrom ?? '1-1-1970'}
                          dateTo={dateTo ?? '1-1-1970'}
                          textClassname="text-[18px]"
                        />
                      </div>

                      {/* TODO fix eslint */}
                      <div className="pl-5">
                        <div className="text-foreground-heading">
                          {(title?.length || 0) > 50
                            ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              `${title?.slice(0, 50)}...`
                            : title}
                        </div>
                        <div className="pt-[5px] text-sm text-foreground-body">
                          <FormatEventDateRange
                            dateFrom={dateFrom ?? new Date().toISOString()}
                            dateTo={dateTo ?? new Date().toISOString()}
                          />
                        </div>
                        {eventBranch?.title && (
                          <div className="text-sm text-foreground-body">
                            &#9679; {eventBranch.title}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-between gap-6 lg:flex-row">
                <Controller
                  control={methods.control}
                  name="eventDate"
                  render={({ field: { ref, ...field } }) => (
                    <DateTimeSelect
                      id="date_input"
                      type="date"
                      labelContent={t('event_date')}
                      className="w-full"
                      inputClassName="w-full"
                      hasError={!!errors.eventDate}
                      errorMessage={errors.eventDate?.message}
                      disabled={isDateEditDisabled}
                      required
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={methods.control}
                  name="eventTime"
                  render={({ field: { ref, ...field } }) => (
                    <DateTimeSelect
                      id="time_input"
                      type="time"
                      labelContent={t('event_time')}
                      className="w-full"
                      inputClassName="w-full"
                      hasError={!!errors.eventTime}
                      errorMessage={errors.eventTime?.message}
                      required
                      disabled={isTimeEditDisabled}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={methods.control}
                  name="spaceCount"
                  render={({ field: { ref, ...field } }) => (
                    <NumberSwitcher
                      id="space_count_input"
                      className="w-full"
                      hasError={!!errors?.spaceCount}
                      errorMessage={errors.spaceCount?.message}
                      onClickChange={(num) => {
                        methods.setValue('spaceCount', num)
                      }}
                      required
                      // aria-required={errors.spaceCount?.type === 'required'}
                      labelContent={t('space_count')}
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
              {hasErrors && (
                <p className="text-base text-error ">{t('please_fill_required_fields')}</p>
              )}
              <FormFooter buttonContent={t('send')} />
            </div>
          </FormContainer>
        </FormProvider>
      )}
    </div>
  )
}

export default EventReservationForm
