import { CheckBox, Input, TextArea } from '@bratislava/ui-city-library'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import { convertDataToBody } from '@utils/form-constants'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import BookListExtended from '../BookList/BookListExtended'
import FormContainer, { phoneRegexOrEmpty, SubmitStatus } from '../FormContainer'
import FormFooter from '../FormFooter'
import StepNumberTitle from '../StepNumberTitle'

const InterlibraryLoanServiceFormReader = () => {
  const [step, setStep] = React.useState(1)
  const [isSubmitted, setIsSubmitted] = React.useState(SubmitStatus.NONE)
  const { t, i18n } = useTranslation(['forms', 'common'])
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
      readerCardNumber: yup.string().required(),
      phone: yup.string().matches(phoneRegexOrEmpty, t('validation_error_phone')),
      message: yup.string(),
      acceptFormTerms: yup.boolean().isTrue(),
      acceptFeesTerms: yup.boolean().isTrue(),
      books: yup
        .array()
        .of(
          yup.object().shape({
            author: yup.string().required(),
            title: yup.string().required(),
            placeOfIssue: yup.string().optional(),
            issuer: yup.string().optional(),
            packageNumber: yup.string().optional(),
            issueDate: yup.string().optional(),
            ISBN: yup.string().optional(),
          })
        )
        .required(),
      cfTurnstile: yup.string().required(t('validation_error_captcha')),
    })
    .required()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fName: '',
      lName: '',
      readerCardNumber: '',
      email: '',
      phone: '',
      message: '',
      books: [
        {
          link: '',
          author: '',
          title: '',
          placeOfIssue: '',
          issuer: '',
          packageNumber: '',
          issueDate: '',
          ISBN: '',
        },
      ],
      acceptFeesTerms: false,
      cfTurnstile: '',
    },
  })
  const { errors } = methods.formState

  const handleSubmit = methods.handleSubmit(async (data) => {
    const temp = convertDataToBody(data, t)

    // additional params
    const body = {
      ...temp,

      mg_subject: null,
      mg_email_to: 'info@mestskakniznica.sk',
      mg_reply_to: data.email,
      meta_sent_from: router.asPath,
      meta_locale: router.locale,
    }
    console.log('body:', body)

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

  const triggerFirstStep = () => {
    methods
      .trigger(['fName', 'lName', 'readerCardNumber', 'email', 'phone'])
      .then((fulfillment) => {
        if (fulfillment) {
          methods.clearErrors()
          setStep(2)
        }
      })
  }

  const stepOneErrors = !isEmpty(
    Object.keys(errors).filter(
      (k) =>
        k !== 'acceptFormTerms' && k !== 'books' && k !== 'acceptFeesTerms' && k !== 'cfTurnstile'
    )
  )

  const stepTwoErrors = !isEmpty(
    Object.keys(errors).filter((k) => k !== 'acceptFormTerms' && k !== 'acceptFeesTerms')
  )

  return (
    <FormProvider {...methods}>
      <FormContainer
        title={t('interlibrary_loan_reader_title')}
        buttonText={t('common:continue')}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        onReset={() => setIsSubmitted(SubmitStatus.NONE)}
        successTitle={t('interlibrary_research_success_title')}
        successMessage={t('interlibrary_research_success_message')}
        errorMessage={t('interlibrary_research_error_message')}
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
            <div className="w-full lg:w-6/12 lg:pr-3">
              <Controller
                control={methods.control}
                name="readerCardNumber"
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id="reader_card_input"
                    labelContent={t('reader_card_number')}
                    inputClassName="px-3 w-full"
                    hasError={!!errors.readerCardNumber}
                    errorMessage={errors.readerCardNumber?.message}
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
                    {...field}
                  />
                )}
              />
            </div>

            {stepOneErrors && (
              <p className="text-base text-error">{t('please_fill_required_fields')}</p>
            )}

            <Button onPress={() => triggerFirstStep()}>{t('common:continue')}</Button>
          </div>
        </StepNumberTitle>

        {/* Step 2 */}
        <StepNumberTitle
          num={2}
          title={t('book_list')}
          activeStep={step}
          className="border-b-0 pb-0"
          onClick={() => triggerFirstStep()}
        >
          <BookListExtended showLinkInput />
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
          {stepTwoErrors && (
            <p className="pt-4 text-base text-error">{t('please_fill_required_fields')}</p>
          )}

          <div className="mt-6 border-t border-border-light pt-6 pb-3">
            <Controller
              control={methods.control}
              name="acceptFeesTerms"
              defaultValue={false}
              render={({ field: { onChange, value, name } }) => (
                <>
                  <CheckBox
                    id="acceptFeesTerms"
                    name={name}
                    onChange={onChange} // send value to hook form
                    checked={value}
                    aria-invalid={errors.acceptFeesTerms ? 'true' : 'false'}
                  >
                    <div className="text-sm">
                      {t('interlibrary_accept_fees')}{' '}
                      <MLink
                        href={
                          i18n.language == 'sk'
                            ? '/file/cennik-poplatkov-a-sluzieb'
                            : '/file/cennik-poplatkov-a-sluzieb' // TODO pricing link in EN
                        }
                        variant="basic"
                      >
                        {t('interlibrary_price_list')}
                      </MLink>
                      .
                    </div>
                  </CheckBox>
                  {!!errors.acceptFeesTerms && (
                    <p className="my-6 text-base text-error">{t('terms_error')}</p>
                  )}
                </>
              )}
              rules={{ required: true }}
            />
          </div>
          <FormFooter buttonContent={t('send')} />
        </StepNumberTitle>
      </FormContainer>
    </FormProvider>
  )
}

export default InterlibraryLoanServiceFormReader
