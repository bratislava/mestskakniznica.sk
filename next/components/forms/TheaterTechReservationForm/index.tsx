import { DateTimeSelect, Input, Select } from '@bratislava/ui-city-library'
import { yupResolver } from '@hookform/resolvers/yup'
import { LocalDate } from '@js-joda/core'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider,useForm } from 'react-hook-form'
import * as yup from 'yup'

import { convertDataToBody } from '../../../utils/form-constants'
import FormContainer, { phoneRegex } from '../FormContainer'
import FormFooter from '../FormFooter'

function TheaterTechReservationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
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
      techType: yup.string().required(),
      term: yup.date().min(LocalDate.now().toString()).required(),
      acceptFormTerms: yup.boolean().isTrue(),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      techType: '',
      term: '',
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
        mg_email_to: 'vypozicky.detska@mestskakniznica.sk',
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
    <FormProvider {...methods}>
      <FormContainer
        title={t('theater_tech_reservation_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(false)}
        successTitle={t('reservation_success_title')}
        successMessage={t('reservation_success_message')}
        errorMessage={t('generic_error_message')}
      >
        <div className="flex flex-col gap-y-6 w-full mt-4">
          <div className="flex flex-col gap-y-6 lg:flex-row justify-between">
            <Controller
              control={methods.control}
              name="fName"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="first_name_input"
                  labelContent={t('first_name')}
                  inputClassName="px-3 w-72 lg:w-[296px]"
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
                  inputClassName="px-3 w-72 lg:w-[296px]"
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
                inputClassName="px-3 w-full"
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message}
                required
                {...field}
              />
            )}
          />
          <div className="flex flex-col gap-y-6 lg:flex-row justify-between">
            <Controller
              control={methods.control}
              name="techType"
              render={({ field: { ref, onChange, ...field } }) => (
                <Select
                  labelContent={t('tech_type')}
                  className="w-72 lg:w-[296px]"
                  options={[
                    { key: 'key1', title: 'Title1' },
                    { key: 'key2', title: 'Title2' },
                  ]}
                  onChange={(opt) => {
                    onChange(opt.key)
                  }}
                  hasError={!!errors.techType}
                  errorMessage={t('validation_error_radiogroup')}
                  aria-required={errors.techType?.type === 'required'}
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="term"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  type="date"
                  labelContent={t('term')}
                  inputClassName="w-72 lg:w-[296px]"
                  hasError={!!errors.term}
                  errorMessage={errors.term?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>
          {hasErrors && <p className="text-base text-error ">{t('please_fill_required_fields')}</p>}
          <FormFooter buttonContent={t('send')} />
        </div>
      </FormContainer>
    </FormProvider>
  )
}

export default TheaterTechReservationForm
