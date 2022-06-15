import { Button } from '@bratislava/ui-city-library'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getError = (iError: any) => {
  let errorMessage = iError.response?.errors?.[0]?.message
  if (!errorMessage) errorMessage = iError.message
  if (!errorMessage) errorMessage = 'Could not load data from APi'

  let error = iError.response?.errors?.[0]
  if (!error) error = iError.response
  if (!error) error = iError.message
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

function ErrorDisplay({ error }: IProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="text-[40px] h-[73px] leading-[48px]">
        <h1>Na stránke sa vyskytla chyba...</h1>
      </header>
      <p className="text-base">
        Ľutujeme, ale na tejto stránke sa vyskytla chyba. Skúste opäť neskôr alebo použite vyhľadávanie.
      </p>
      <Button className="mt-4 p-4" onClick={() => setOpen((o) => !o)}>
        Zobraziť {open ? 'menej' : 'viac'}
      </Button>
      {open && (
        <pre className="mt-4 text-xs whitespace-pre-wrap">
          {error.message}
          {'\n\n'}
          {error.description}
        </pre>
      )}
    </>
  )
}

export default ErrorDisplay
