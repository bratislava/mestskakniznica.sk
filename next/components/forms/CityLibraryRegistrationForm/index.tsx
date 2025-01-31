import { yupResolver } from '@hookform/resolvers/yup'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import FormContainer, {
  IDCardRegex,
  phoneRegexOrEmpty,
  postalCodeRegex,
  SubmitStatus,
} from '@/components/forms/FormContainer'
import FormFooter from '@/components/forms/FormFooter'
import StepNumberTitle from '@/components/forms/StepNumberTitle'
import { CheckBox, DateTimeSelect, Input } from '@/components/ui'
import RadioGroup from '@/components/ui/RadioGroup/RadioGroup'
import Button from '@/modules/common/Button'
import { getLocalDateForYup, useGetFormOptions } from '@/utils/form-constants'

import { options } from './options'

const CityLibraryRegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const [errMessage, setErrMessage] = React.useState('')
  const [step, setStep] = React.useState(1)
  const [showTempAddress, setShowTempAddress] = React.useState(false)
  const { t } = useTranslation(['forms', 'common'])

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
      password: yup.string().required().min(7, t('validation_error_password_gt_7')),
      password2: yup
        .string()
        .oneOf([yup.ref('password'), null], t('validation_error_password_mismatch'))
        .required(),
      phone: yup.string().matches(phoneRegexOrEmpty, t('validation_error_phone')),
      address: yup.string().required(),
      city: yup.string().required(),
      postalCode: yup.string().matches(postalCodeRegex, t('validation_error_zipcode')).required(),
      useTempAddress: yup.boolean(),
      tempAddress: yup.string().when('useTempAddress', {
        is: true,
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
      tempCity: yup.string().when('useTempAddress', {
        is: true,
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
      tempPostalCode: yup.string().when('useTempAddress', {
        is: true,
        then: yup.string().matches(postalCodeRegex, t('validation_error_zipcode')).required(),
        otherwise: yup.string(),
      }),
      IDType: yup.string().required(),
      birthDate: yup.date().max(getLocalDateForYup()).required(),
      IDNumber: yup.string().matches(IDCardRegex, t('validation_error_idcard')).required(),
      acceptFormTerms: yup.boolean().isTrue(),
      authorizedToUseBlindDepartment: yup.boolean(),
      acceptNewsletter: yup.boolean(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const selectOptions = useGetFormOptions(options, false)

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      password: '',
      password2: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      useTempAddress: showTempAddress,
      tempAddress: '',
      tempCity: '',
      tempPostalCode: '',
      IDType: selectOptions[0].key,
      birthDate: '',
      IDNumber: '',
      authorizedToUseBlindDepartment: false,
      acceptNewsletter: false,
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const handleSubmit = methods.handleSubmit(async (data) => {
    const newData = data

    newData.birthDate = new Date(data.birthDate)
      .toLocaleDateString('sk', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replaceAll(' ', '')

    // send email
    const res = await fetch(`/api/register`, {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify(newData),
    })

    // catch error
    const { status, message } = await res.json()
    if (!status || status != 200) {
      const errMessage = message || t('library_registration_error_message')
      setErrMessage(errMessage)
      setIsSubmitted(SubmitStatus.FAILURE)
      return
    }

    setIsSubmitted(SubmitStatus.SUCCESS)
  })

  const triggerFirstStep = () => {
    methods
      .trigger([
        'fName',
        'lName',
        'email',
        'password',
        'password2',
        'phone',
        'address',
        'city',
        'postalCode',
        'useTempAddress',
        'tempAddress',
        'tempCity',
        'tempPostalCode',
        'birthDate',
        'IDNumber',
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
      (k) => k !== 'acceptFormTerms' && k !== 'IDType' && k !== 'cfTurnstile'
    )
  )

  const stepTwoErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('library_registration_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('library_registration_success_title')}
        successMessage={t('library_registration_success_message')}
        errorMessage={errMessage}
      >
        {/* Step 1 */}
        <StepNumberTitle
          num={1}
          title={t('personal_details')}
          activeStep={step}
          className={cx('', {
            '-mx-8 border border-error px-8': stepOneErrors && step !== 1,
          })}
          onClick={() => setStep(1)}
        >
          <div className="flex w-full flex-col gap-y-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="fName"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="first_name_label"
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
                    id="last_name_label"
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
                  id="email_label"
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

            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="password"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="password_label"
                    labelContent={t('password')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.password}
                    errorMessage={errors.password?.message}
                    required
                    type="password"
                    {...field}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="password2"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="password2_label"
                    labelContent={t('password_again')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.password2}
                    errorMessage={errors.password2?.message}
                    required
                    type="password"
                    {...field}
                  />
                )}
              />
            </div>

            <Controller
              control={methods.control}
              name="phone"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="phone_label"
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
          <div className="my-6 flex flex-col gap-y-6 border p-6 ">
            <p className="text-left text-lg text-foreground-heading ">
              {t('permanent_address')} <span className="text-error">*</span>
            </p>
            <Controller
              control={methods.control}
              name="address"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="address_label"
                  labelContent={t('address')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  hasError={!!errors.address}
                  errorMessage={errors.address?.message}
                  required
                  {...field}
                />
              )}
            />
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <Controller
                control={methods.control}
                name="city"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="city_label"
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
                    id="postal_code_label"
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
            <Controller
              control={methods.control}
              name="useTempAddress"
              render={({ field: { onChange, value, ref, ...field } }) => (
                <CheckBox
                  id="addTempAddress_input"
                  onChange={(e) => {
                    onChange(e)
                    setShowTempAddress(e)
                  }}
                  name="useTempAddress"
                  checked={value}
                >
                  <div className="text-sm">{t('add_temporary_address')}</div>
                </CheckBox>
              )}
            />
          </div>

          {showTempAddress && (
            <div className="my-6 flex flex-col gap-y-6 border p-6 ">
              <p className="text-left text-lg text-foreground-heading ">
                {t('temporary_address')} <span className="text-error">*</span>
              </p>
              <Controller
                control={methods.control}
                name="tempAddress"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="temp_address_label"
                    labelContent={t('address')}
                    className="w-full"
                    inputClassName="px-3 w-full"
                    hasError={!!errors.tempAddress}
                    errorMessage={errors.tempAddress?.message}
                    required
                    {...field}
                  />
                )}
              />
              <div className="flex flex-col justify-between gap-6 lg:flex-row">
                <Controller
                  control={methods.control}
                  name="tempCity"
                  render={({ field: { ref, ...field } }) => (
                    <Input
                      id="temp_city_label"
                      labelContent={t('city')}
                      className="w-full lg:w-9/12"
                      inputClassName="px-3 w-full"
                      hasError={!!errors.tempCity}
                      errorMessage={errors.tempCity?.message}
                      required
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={methods.control}
                  name="tempPostalCode"
                  render={({ field: { ref, ...field } }) => (
                    <Input
                      id="temp_postal_code_label"
                      labelContent={t('postal_code')}
                      className="w-full lg:w-3/12"
                      inputClassName="px-3 w-full"
                      hasError={!!errors.tempPostalCode}
                      errorMessage={errors.tempPostalCode?.message}
                      required
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          )}

          <div className="mb-6 flex flex-col justify-between gap-6  lg:flex-row">
            <Controller
              control={methods.control}
              name="birthDate"
              render={({ field: { ref, ...field } }) => (
                <DateTimeSelect
                  id="temp_birth_date_label"
                  type="date"
                  labelContent={t('birth_date')}
                  className="w-full"
                  inputClassName="w-full"
                  hasError={!!errors.birthDate}
                  errorMessage={errors.birthDate?.message}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="IDNumber"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="id_number_label"
                  labelContent={t('ID_number')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  hasError={!!errors.IDNumber}
                  errorMessage={errors.IDNumber?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>

          {stepOneErrors && (
            <p className="pb-4 text-base text-error">{t('please_fill_required_fields')}</p>
          )}
          <Button onPress={() => triggerFirstStep()}>{t('common:continue')}</Button>
        </StepNumberTitle>

        {/* Step 2 */}
        <StepNumberTitle
          num={2}
          title={t('select_ID_type')}
          activeStep={step}
          className="border-b-0 pb-0"
          onClick={() => triggerFirstStep()}
        >
          <Controller
            control={methods.control}
            name="IDType"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                id="IDType_input"
                labelContent={t('ID_type')}
                className="flex flex-col gap-4"
                wrapperClassName="w-full mb-6"
                radioClassName="w-full"
                options={selectOptions}
                hasError={!!errors.IDType}
                errorMessage={t('validation_error_radiogroup')}
                value={value}
                onChange={(opt) => onChange(opt)}
                required
              />
            )}
          />
          {stepTwoErrors && (
            <p className="pb-4 text-base text-error">{t('please_fill_required_fields')}</p>
          )}
          <Controller
            control={methods.control}
            name="acceptNewsletter"
            defaultValue={false}
            render={({ field: { onChange, value, name } }) => (
              <CheckBox
                id="acceptNewsletter"
                name={name}
                onChange={onChange} // send value to hook form
                checked={value}
                aria-invalid={errors.acceptNewsletter ? 'true' : 'false'}
              >
                <div className="text-sm">{t('form_city_accept_newsletter')}</div>
              </CheckBox>
            )}
          />
          <Controller
            control={methods.control}
            name="authorizedToUseBlindDepartment"
            defaultValue={false}
            render={({ field: { onChange, value, name } }) => (
              <CheckBox
                id="authorizedToUseBlindDepartment"
                name={name}
                onChange={onChange} // send value to hook form
                checked={value}
                aria-invalid={errors.authorizedToUseBlindDepartment ? 'true' : 'false'}
                className="pt-4"
              >
                <div className="text-sm">{t('form_city_auth_blind_dep')}</div>
              </CheckBox>
            )}
          />

          <FormFooter buttonContent={t('send')} className="pt-4" />
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  )
}

export default CityLibraryRegistrationForm
