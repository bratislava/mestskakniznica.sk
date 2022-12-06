import { Input, TextArea, Upload } from '@bratislava/ui-city-library'
import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useController, useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'

import { convertDataToBody } from '@utils/form-constants'
import FormContainer, { phoneRegex, SubmitStatus } from '../FormContainer'
import FormFooter from '../FormFooter'

function FileInput({ control, name }: any) {
  const { errors } = useFormState()
  const { t } = useTranslation('forms')

  const { field } = useController({ control, name })
  const [files, setFiles] = React.useState<Array<File | null>>([])
  return (
    <Upload
      labelContent={t('attachments')}
      hasError={!!errors.attachment}
      required
      onChange={(e) => {
        if (e.target.files) {
          const newArray = []
          for (let i = 0; i < e.target.files.length; i += 1) {
            if (e.target.files.item(i) !== null) {
              newArray.push(e.target.files.item(i))
            }
          }
          setFiles(newArray)
          field.onChange(e.target.files)
        }
      }}
      accept=".pdf, .jpg, .jpeg, .png"
      multiple
    >
      {files.length > 0 ? (
        <>
          <p>
            {`${files.length} ${files.length > 1 ? t('upload_files') : t('upload_file')}`}{' '}
            {t('upload_success')}:
          </p>
          <p>{`[${files.map((file) => file?.name).join(', ')}]`}</p>
        </>
      ) : (
        <>
          <p className="mb-3">{t('upload_file_text')}</p>
          <p>{t('upload_file_info')}</p>
        </>
      )}
    </Upload>
  )
}

function ServiceReservationForm() {
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
      message: yup.string().required(),
      attachment: yup.mixed().required(),
      acceptFormTerms: yup.boolean().isTrue(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      message: '',
      attachment: undefined,
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const hasErrors = !isEmpty(Object.keys(errors).filter((k) => k !== 'acceptFormTerms'))

  const handleSubmit = methods.handleSubmit(async (data) => {
    // todo files
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,

      mg_subject: null,
      mg_email_to: 'diplomovky@mestskakniznica.sk',
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
        title={t('service_reservation_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('service_success_title')}
        successMessage={t('service_success_message')}
        errorMessage={t('generic_error_message')}
      >
        <div className="mt-4 flex w-full flex-col gap-y-6">
          <div className="flex flex-col justify-between gap-y-6 gap-x-6 lg:flex-row">
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
            name="message"
            render={({ field: { ref, ...field } }) => (
              <TextArea
                id="message_input"
                labelContent={t('message')}
                textAreaClassname="w-full h-[122px]"
                hasError={!!errors.message}
                errorMessage={errors.message?.message}
                required
                {...field}
              />
            )}
          />
          <FileInput name="attachment" control={methods.control} />
          {hasErrors && <p className="text-base text-error ">{t('please_fill_required_fields')}</p>}
          <FormFooter buttonContent={t('send')} />
        </div>
      </FormContainer>
    </FormProvider>
  )
}

export default ServiceReservationForm
