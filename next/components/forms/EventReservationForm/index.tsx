import { DateTimeSelect, Input, TextArea } from '@bratislava/ui-city-library'
import NumberSwitcher from '@bratislava/ui-city-library/NumberSwitcher/NumberSwitcher'
import { yupResolver } from '@hookform/resolvers/yup'
import { LocalDate } from '@js-joda/core'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { convertDataToBody } from '../../../utils/form-constants'
import { IEvent } from '../../../utils/types'
import { dateTimeString, dayForDifferentDateTo, isEventPast } from '../../../utils/utils'
import DateCardDisplay from '../../Atoms/DateCardDispaly'
import { usePageWrapperContext } from '../../layouts/PageWrapper'
import FormContainer, { phoneRegex } from '../FormContainer'
import FormFooter from '../FormFooter'
import { EventCardFragment } from '@bratislava/strapi-sdk-city-library'

interface Props {
  eventDetail?: EventCardFragment
}

function EventReservationForm({ eventDetail }: Props) {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isEventInThePast, setIsEventInThePast] = React.useState(false)
  const [isDateEditDisabled, setIsDateEditDisabled] = React.useState(false)
  const [isTimeEditDisabled, setIsTimeEditDisabled] = React.useState(false)

  const { t } = useTranslation(['forms', 'common'])
  const { locale } = usePageWrapperContext()
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
      if (eventDetail) {
        const dateFrom = new Date(eventDetail.attributes?.dateFrom)
        const dateTo = new Date(eventDetail.attributes?.dateTo)

        const { date } = dayForDifferentDateTo(dateFrom, dateTo, true)
        return yup
          .date()
          .min(date, t('validation_error_min_event_date'))
          .max(dateTo, t('validation_error_max_event_date'))
          .required()
      }

      return yup.date().min(LocalDate.now()).required()
    }),
    eventTime: yup.string().required(),
    message: yup.string(),
    acceptFormTerms: yup.boolean().isTrue(),
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
    },
  })
  const { errors } = methods.formState

  const hasErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  React.useMemo(() => {
    // prefill event date and time
    if (eventDetail) {
      const dateFrom = new Date(eventDetail.attributes?.dateFrom)
      const dateTo = new Date(eventDetail.attributes?.dateTo)

      const { day, month, year } = dayForDifferentDateTo(dateFrom, dateTo, true)
      // "yyyy-MM-dd"
      methods.setValue('eventDate', `${year}-${month}-${day}`)

      if (
        dateFrom.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) ==
        dateTo.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      ) {
        setIsDateEditDisabled(true)
      }

      const timeFrom = dateFrom.toLocaleString('sk', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      // HH:ii
      methods.setValue('eventTime', timeFrom)
      setIsTimeEditDisabled(true)
    }

    // disable showing form if is in the past
    setIsEventInThePast(isEventPast(eventDetail?.attributes?.dateTo))
  }, [eventDetail, methods])

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,
      
        mg_subject: null,
        mg_email_to: 'ivo.dobrovodsky@mestskakniznica.sk',
        meta_sent_from: router.asPath,
        meta_locale: router.locale
      ,
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
      return
    }

    // show thank you message
    setIsSubmitted(true)
  })

  return (
    <div className="flex flex-col-reverse lg:grid grid-cols-9 gap-x-16">
      {!isEventInThePast && (
        <FormProvider {...methods}>
          <FormContainer
            title={t('event_reservation_title')}
            buttonText={t('common:continue')}
            onSubmit={handleSubmit}
            isSubmitted={isSubmitted}
            onReset={() => setIsSubmitted(false)}
            successTitle={t('generic_success_title')}
            successMessage={t('generic_success_message')}
            errorMessage={t('generic_error_message')}
            wrapperClass="col-span-6"
          >
            <div className="flex flex-col gap-y-6 w-full mt-4">
              <div className="text-black-universal text-default">{t('personal_details')}</div>
              <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row justify-between">
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
                  <div className="text-black-universal text-default pb-4 border-t pt-6">{t('event')}</div>

                  <div className="border p-4 border-gray-300 text-gray-universal-70">
                    <div className="flex">
                      <div className="text-center flex w-16 h-16 bg-yellow-promo">
                        <DateCardDisplay
                          dateFrom={eventDetail?.attributes?.dateFrom ?? '1-1-1970'}
                          dateTo={eventDetail?.attributes?.dateTo ?? '1-1-1970'}
                          textSize="text-[18px]"
                        />
                      </div>

                      <div className="pl-5">
                        <div className="leading-[19px] text-black-universal ">
                          {(eventDetail?.attributes?.title?.length || 0) > 50
                            ? `${eventDetail?.attributes?.title?.slice(0, 50)  }...`
                            : eventDetail?.attributes?.title}
                        </div>
                        <div className="leading-[20px] text-xs text-gray-universal-70 pt-[5px]">
                          {dateTimeString(
                            eventDetail?.attributes?.dateFrom ?? new Date(),
                            eventDetail?.attributes?.dateTo ?? new Date(),
                            locale
                          )}
                        </div>
                        {eventDetail?.attributes?.eventLocality?.data?.attributes?.title && (
                          <div className="leading-[20px] text-xs text-gray-universal-70">
                            &#9679; {eventDetail?.attributes?.eventLocality.data.attributes?.title}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row  justify-between">
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
              {hasErrors && <p className="text-base text-error ">{t('please_fill_required_fields')}</p>}
              <FormFooter buttonContent={t('send')} />
            </div>
          </FormContainer>
        </FormProvider>
      )}
    </div>
  )
}

export default EventReservationForm
