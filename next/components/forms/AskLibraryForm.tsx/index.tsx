import React from 'react';
import { Input, TextArea } from '@bratislava/ui-city-library';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import FormFooter from '../FormFooter';
import FormContainer, { phoneRegexOrEmpty } from '../FormContainer';
import isEmpty from 'lodash/isEmpty';
import { convertDataToBody } from '../../../utils/form-constants';
import { useRouter } from 'next/router';

const AskLibraryForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
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
      fName: yup.string(),
      lName: yup.string(),
      email: yup.string().email().required(),
      phone: yup
        .string()
        .matches(phoneRegexOrEmpty, t('validation_error_phone')),
      message: yup.string().required(),
      acceptFormTerms: yup.boolean().isTrue(),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      message: '',
    },
  });
  const { errors } = methods.formState;

  const hasErrors = !isEmpty(
    Object.keys(errors).filter((k) => k !== 'acceptFormTerms')
  );

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t);

    // additional params
    const body = {
      ...temp,
      ...{
        mg_subject: null,
        mg_email_to: 'info@mestskakniznica.sk',
        meta_sent_from: router.asPath,
        meta_locale: router.locale,
      },
    };

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

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('ask_library_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(false)}
        successTitle={t('generic_success_title')}
        successMessage={t('generic_success_message')}
        errorMessage={t('generic_error_message')}
      >
        <div className="flex flex-col gap-y-6 w-full mt-4">
          <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row justify-between">
            <Controller
              control={methods.control}
              name="fName"
              render={({ field: { ref, ...field } }) => (
                <Input
                  id="first_name_input"
                  className="w-full"
                  labelContent={t('first_name')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.fName}
                  errorMessage={errors.fName?.message}
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
                  className="w-full"
                  labelContent={t('last_name')}
                  inputClassName="px-3 w-full"
                  hasError={!!errors.lName}
                  errorMessage={errors.lName?.message}
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
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="message"
            render={({ field: { ref, ...field } }) => (
              <TextArea
                id="message_name"
                labelContent={t('message')}
                textAreaClassname="w-full h-[122px]"
                hasError={!!errors.message}
                errorMessage={errors.message?.message}
                required
                {...field}
              />
            )}
          />
          {hasErrors && (
            <p className="text-base text-error">
              {t('please_fill_required_fields')}
            </p>
          )}
          <FormFooter buttonContent={t('send')} />
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default AskLibraryForm;
