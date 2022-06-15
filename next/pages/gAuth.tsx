import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function LoadingPage() {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { code } = router.query

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
        subscribe().then((res) => {
          setMessage(res.success ? 'Subscribed to events successfully.' : 'Some error occured, please try again later.')
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
