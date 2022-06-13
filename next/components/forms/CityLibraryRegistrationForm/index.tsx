import {
  Button,
  CheckBox,
  DateTimeSelect,
  Input,
} from '@bratislava/ui-city-library';
import { LocalDate } from '@js-joda/core';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormFooter from '../FormFooter';
import { useTranslation } from 'next-i18next';
import StepNumberTitle from '../StepNumberTitle';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import FormContainer, { phoneRegex, postalCodeRegex } from '../FormContainer';
import RadioGroup from '@bratislava/ui-city-library/components/RadioGroup/RadioGroup';
import {
  convertDataToBody,
  useGetFormOptions,
} from '../../../utils/form-constants';
import { options } from './options';
import { useRouter } from 'next/router';

const CityLibraryRegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [showTempAddress, setShowTempAddress] = React.useState(false);
  const { t } = useTranslation(['forms', 'common']);
  const router = useRouter();

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
  });

  const schema = yup
    .object({
      fName: yup.string().required(),
      lName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup
        .string()
        .matches(phoneRegex, t('validation_error_phone'))
        .required(),
      address: yup.string().required(),
      city: yup.string().required(),
      postalCode: yup
        .string()
        .matches(postalCodeRegex, t('validation_error_zipcode'))
        .required(),
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
        then: yup
          .string()
          .matches(postalCodeRegex, t('validation_error_zipcode'))
          .required(),
        otherwise: yup.string(),
      }),
      IDType: yup.string().required(),
      birthDate: yup.date().max(LocalDate.now().toString()).required(),
      IDNumber: yup.string().required(),
      acceptFormTerms: yup.boolean().isTrue(),
      authorizedToUseBlindDepartment: yup.boolean(),
    })
    .required();

  const selectOptions = useGetFormOptions(options, false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
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
    },
  });
  const { errors } = methods.formState;

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t);

    // additional params
    const body = {
      ...temp,
      ...{
        mg_subject: null,
        mg_email_to: 'registracia@mestskakniznica.sk',
        meta_sent_from: router.asPath,
        meta_locale: router.locale,
      },
    };

    console.log('body: ', body);

    // send email
    const res = await fetch(`/api/submit-form`, {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify(body),
    });

    // catch error
    const { error } = await res.json();
    if (error) {
      console.log('error sending form', error);
      return;
    }

    // show thank you message
    setIsSubmitted(true);
  });

  const triggerFirstStep = () => {
    methods
      .trigger([
        'fName',
        'lName',
        'email',
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
          methods.clearErrors();
          setStep(2);
        }
      });
  };

  const stepOneErrors = !isEmpty(
    Object.keys(errors).filter((k) => k !== 'acceptFormTerms' && k !== 'IDType')
  );

  const stepTwoErrors = !isEmpty(
    Object.keys(errors).filter((k) => k !== 'acceptFormTerms')
  );

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('library_registration_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(false)}
        successTitle={t('library_registration_success_title')}
        successMessage={t('library_registration_success_message')}
        errorMessage={t('library_registration_error_message')}
      >
        {/* Step 1 */}
        <StepNumberTitle
          num={1}
          title={t('personal_details')}
          activeStep={step}
          className={cx('', {
            '-mx-8 px-8 border border-error': stepOneErrors && step !== 1,
          })}
          onClick={() => setStep(1)}
        >
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row justify-between">
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
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className="border p-6 my-6 flex flex-col gap-y-6 ">
            <p className="text-gray-universal-100 text-default text-left ">
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
            <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row justify-between">
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
                    onChange(e);
                    setShowTempAddress(e);
                  }}
                  name="useTempAddress"
                  checked={value}
                >
                  <div className="text-xs">{t('add_temporary_address')}</div>
                </CheckBox>
              )}
            />
          </div>

          {showTempAddress && (
            <div className="border p-6 my-6 flex flex-col gap-y-6 ">
              <p className="text-gray-universal-100 text-default text-left ">
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
              <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row  justify-between">
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

          <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row  justify-between mb-6">
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
            <p className="text-base text-error pb-4">
              {t('please_fill_required_fields')}
            </p>
          )}
          <Button onClick={() => triggerFirstStep()} className="w-36 h-10">
            {t('common:continue')}
          </Button>
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
                className="flex flex-col gap-x-4 gap-y-4"
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
            <p className="text-base text-error pb-4">
              {t('please_fill_required_fields')}
            </p>
          )}
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
                aria-invalid={
                  errors.authorizedToUseBlindDepartment ? 'true' : 'false'
                }
              >
                <div className="text-xs">{t('form_city_auth_blind_dep')}</div>
              </CheckBox>
            )}
          />

          <FormFooter buttonContent={t('send')} className="pt-4" />
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  );
};

export default CityLibraryRegistrationForm;
