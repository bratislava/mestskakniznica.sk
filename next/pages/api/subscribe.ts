/* eslint-disable no-console */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export const NEWSLETTER_TAG_GENERAL = 'vseobecny'
export const NEWSLETTER_TAG_BOOKS = 'knizne-novinky'
export const NEWSLETTER_TAG_CHILDREN = 'detsky'

export const VALID_NEWSLETTER_TAGS = [
  NEWSLETTER_TAG_GENERAL,
  NEWSLETTER_TAG_BOOKS,
  NEWSLETTER_TAG_CHILDREN,
] as const

// Ecomail docs: https://docs.ecomail.cz/api-reference/lists/subscribe
const ECOMAIL_LIST_ID = 1
const ECOMAIL_ADD_SUBSCRIBER_URL = `https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstName, lastName, newsletterTags } = req.body

  if (!email) {
    res.status(400).json({ error: 'Newsletter subscription failed: Email is required' })

    return
  }

  const validTags = Array.isArray(newsletterTags)
    ? newsletterTags.filter((tag) => VALID_NEWSLETTER_TAGS.includes(tag))
    : []

  if (!validTags.length) {
    res.status(400).json({ error: 'At least one newsletter must be selected' })

    return
  }

  try {
    // TODO better error information, maybe assert all env vars globally
    if (!process.env.ECOMAIL_API_KEY)
      throw new Error('Missing environment variable ECOMAIL_API_KEY')

    await axios.post(
      ECOMAIL_ADD_SUBSCRIBER_URL,
      {
        subscriber_data: {
          email,
          name: firstName,
          surname: lastName,
          tags: validTags,
        },
        update_existing: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          key: process.env.ECOMAIL_API_KEY,
        },
      },
    )

    // If the email is already subscribed, ecomail sends a successful response, so we don't handle this case differently

    res.status(201).json({ error: '' })
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error)
    console.log('Newsletter subscription error: ', message)

    res.status(500).json({ error: message })
  }
}

export default Subscribe
