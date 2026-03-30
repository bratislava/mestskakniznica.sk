import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ECOMAIL_NEWSLETTER_CONFIG } from '@/pages/api/subscribe'

type NewsletterFormValues = {
  firstName: string
  lastName: string
  email: string
  newsletterGeneral: boolean
  newsletterBooks: boolean
  newsletterChildren: boolean
  newsletterSelection?: boolean
  acceptTerms: boolean
}

type SubscribePayload = Pick<NewsletterFormValues, 'email' | 'firstName' | 'lastName'> & {
  newsletterPreferences: string[]
}

export const useNewsletterSection = () => {
  const { t } = useTranslation()

  // docs: https://www.npmjs.com/package/yup
  const schema = yup
    .object({
      firstName: yup.string(),
      lastName: yup.string(),
      email: yup
        .string()
        .trim()
        .required(t('Newsletter.email.error.required'))
        .email(t('Newsletter.email.error.invalidFormat')),
      newsletterGeneral: yup.boolean(),
      newsletterBooks: yup.boolean(),
      newsletterChildren: yup.boolean(),
      acceptTerms: yup.boolean().isTrue(),
      // show an error when no newsletter is selected
      newsletterSelection: yup.boolean(),
    })
    .test('atLeastOneNewsletter', '', (values, ctx) =>
      values.newsletterGeneral || values.newsletterBooks || values.newsletterChildren
        ? true
        : ctx.createError({
            path: 'newsletterSelection',
            message: t('Newsletter.newsletterPreference.error'),
          }),
    )

  const methods = useForm<NewsletterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      newsletterGeneral: false,
      newsletterBooks: false,
      newsletterChildren: false,
      acceptTerms: false,
      newsletterSelection: false,
    },
  })

  const [isSubscribeSuccessful, setIsSubscribeSuccessfull] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const subscribeMutation = useMutation({
    mutationFn: (payload: SubscribePayload) =>
      axios.post('/api/subscribe', payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      setIsSubscribeSuccessfull(true)
      methods.reset(undefined, { keepDefaultValues: true })
      setResponseMessage(t('Newsletter.subscribe.successMessage'))
    },
    onError: () => {
      setResponseMessage(t('Newsletter.subscribe.errorMessage'))
    },
  })

  const handleSubmit = methods.handleSubmit((data) => {
    const newsletterPreferences = []
    if (data.newsletterGeneral)
      newsletterPreferences.push(ECOMAIL_NEWSLETTER_CONFIG.preferenceOptions.general)
    if (data.newsletterBooks)
      newsletterPreferences.push(ECOMAIL_NEWSLETTER_CONFIG.preferenceOptions.books)
    if (data.newsletterChildren)
      newsletterPreferences.push(ECOMAIL_NEWSLETTER_CONFIG.preferenceOptions.children)

    subscribeMutation.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      newsletterPreferences,
    })
  })

  return {
    methods,
    handleSubmit,
    responseMessage,
    isSubscribeSuccessful,
    isSubscribePending: subscribeMutation.isPending,
  }
}
