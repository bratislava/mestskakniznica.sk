import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  NEWSLETTER_TAG_BOOKS,
  NEWSLETTER_TAG_CHILDREN,
  NEWSLETTER_TAG_GENERAL,
} from '@/pages/api/subscribe'

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
  newsletterTags: string[]
}

export const useNewsletterSection = () => {
  const { t } = useTranslation()

  // docs: https://www.npmjs.com/package/yup
  const schema = yup
    .object({
      firstName: yup.string(),
      lastName: yup.string(),
      email: yup.string().email().required(),
      newsletterGeneral: yup.boolean(),
      newsletterBooks: yup.boolean(),
      newsletterChildren: yup.boolean(),
      acceptTerms: yup.boolean().isTrue(),
      // newsletterSelection is used to show an error when no newsletter is selected
      newsletterSelection: yup.boolean(),
    })
    .test('atLeastOneNewsletter', '', (values, ctx) =>
      values.newsletterGeneral || values.newsletterBooks || values.newsletterChildren
        ? true
        : ctx.createError({
            path: 'newsletterSelection',
            message: t('newsletterSection.newsletterError'),
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

  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const subscribeMutation = useMutation({
    mutationFn: (payload: SubscribePayload) =>
      axios.post('/api/subscribe', payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      setResponseStatus(true)
      methods.reset(undefined, { keepDefaultValues: true })
      setResponseMessage(t('newsletterSection.subscribe.successMessage'))
    },
    onError: () => {
      setResponseMessage(t('newsletterSection.subscribe.errorMessage'))
    },
  })

  const handleSubmit = methods.handleSubmit((data) => {
    const newsletterTags: string[] = []
    if (data.newsletterGeneral) newsletterTags.push(NEWSLETTER_TAG_GENERAL)
    if (data.newsletterBooks) newsletterTags.push(NEWSLETTER_TAG_BOOKS)
    if (data.newsletterChildren) newsletterTags.push(NEWSLETTER_TAG_CHILDREN)

    subscribeMutation.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      newsletterTags,
    })
  })

  return { methods, handleSubmit, responseStatus, responseMessage }
}
