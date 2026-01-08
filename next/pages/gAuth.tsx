import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const LoadingPage = () => {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { code } = router.query

  // TODO fix eslint
  useEffect(() => {
    const subscribe = async () => {
      const response = await fetch('/api/subscribe-event', {
        body: JSON.stringify({ code }),
        method: 'POST',
      })

      return response.json()
    }
    try {
      if (code) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        subscribe().then((res) => {
          setMessage(
            res.success
              ? 'Subscribed to events successfully.'
              : // eslint-disable-next-line sonarjs/no-duplicate-string
                'Some error occured, please try again later.',
          )
        })
      } else {
        setMessage('Some error occured, please try again later.')
      }
    } catch (error) {
      setMessage('Some error occured, please try again later.')
    }
  }, [code])

  return <div>{message || 'Registering you to events'}</div>
}

export default LoadingPage
