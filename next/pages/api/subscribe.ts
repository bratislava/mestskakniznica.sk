/* eslint-disable no-console */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Ecomail API: https://docs.ecomail.cz/api-reference/lists/subscribe
 * More about preference groups: https://support.ecomail.cz/cs/articles/2413441-preference-a-preferencni-skupiny
 */

export const ECOMAIL_NEWSLETTER_CONFIG = {
  listId: 1,
  preferenceGroupId: 'grp_69860b7517343',
  preferenceOptions: {
    general: 'Všeobecný newsletter',
    books: 'Knižné novinky',
    children: 'Detský newsletter',
  },
} as const

const ECOMAIL_ADD_SUBSCRIBER_URL = `https://api2.ecomailapp.cz/lists/${ECOMAIL_NEWSLETTER_CONFIG.listId}/subscribe`

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstName, lastName, newsletterPreferences } = req.body

  if (!email) {
    res.status(400).json({ error: 'Newsletter subscription failed: Email is required' })

    return
  }

  const validNewsletterPreferences = Array.isArray(newsletterPreferences)
    ? newsletterPreferences.filter((preference) =>
        Object.values(ECOMAIL_NEWSLETTER_CONFIG.preferenceOptions).includes(preference),
      )
    : []

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
          groups: {
            [ECOMAIL_NEWSLETTER_CONFIG.preferenceGroupId]: validNewsletterPreferences,
          },
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

    res.status(201).json({ error: '' })
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error)
    console.log('Newsletter subscription error: ', message)

    res.status(500).json({ error: message })
  }
}

export default Subscribe
