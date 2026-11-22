import { useTranslation } from 'next-i18next/pages'
import * as React from 'react'

import Button from '@/modules/common/Button'

type ErrorLike = {
  response?: { errors?: { message?: string }[] }
  message?: string
}

export const getError = (iError: unknown) => {
  const errorLike: ErrorLike = typeof iError === 'object' && iError !== null ? iError : {}

  let errorMessage = errorLike.response?.errors?.[0]?.message
  if (!errorMessage) errorMessage = errorLike.message
  if (!errorMessage) errorMessage = 'Could not load data from APi'

  let error: unknown = errorLike.response?.errors?.[0]
  if (!error) error = errorLike.response
  if (!error) error = errorLike.message
  if (!error) error = iError

  return {
    message: errorMessage,
    description: JSON.stringify(error, null, 2) ?? 'Could not load data from API',
  }
}

export interface IDisplayError {
  message?: string
  description?: string
}

interface IProps {
  error: IDisplayError
}

const ErrorDisplay = ({ error }: IProps) => {
  const { t } = useTranslation()

  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="h-[73px] text-[40px] leading-[48px]">
        <h1>{t('errorDisplay.title')}</h1>
      </header>
      <p className="text-base">{t('errorDisplay.weAreSorry')}</p>
      <Button className="mt-4" onPress={() => setOpen((o) => !o)}>
        {open ? t('common.showLess') : t('common.showMore')}
      </Button>
      {open && (
        <pre className="mt-4 text-sm whitespace-pre-wrap">
          {error.message}
          {'\n\n'}
          {error.description}
        </pre>
      )}
    </>
  )
}

export default ErrorDisplay
