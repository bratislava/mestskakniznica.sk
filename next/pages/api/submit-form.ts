import reduce from 'lodash/reduce'
import Mailgun from 'mailgun-js'
import { NextApiRequest, NextApiResponse } from 'next'

// TODO get domain and set based on that
// TODO set to library email, edit to whatever for testing
// NOTE - the sandbox domain goes straight to spam on most email clients

if (
  !process.env.MAILGUN_API_KEY ||
  !process.env.MAILGUN_DOMAIN ||
  !process.env.MAILGUN_EMAIL ||
  !process.env.MAILGUN_HOST
) {
  console.warn('Missing mailgun config properties - sending emails will not work!')
}
const EMAIL_FROM = process.env.MAILGUN_EMAIL || ''

const messenger = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN || '',
  host: process.env.MAILGUN_HOST || '',
})

const available_emails = new Set([
  'info@mestskakniznica.sk',
  'registracia@mestskakniznica.sk',
  'ivo.dobrovodsky@mestskakniznica.sk',
  'vypozicky.detska@mestskakniznica.sk',
  'donaska@mestskakniznica.sk',
  'miroslava.porubska@mestskakniznica.sk',
  'diplomovky@mestskakniznica.sk',
  'vypozicky.hudobna@mestskakniznica.sk',
  'podujatia@mestskakniznica.sk',
])

// To send results of any form on the page to the email of city library,
// simply use this endpoint, serializing the results of the form into a
// json 1 level deep. Optionally you can add a custom subject field (i.e.
// to indicate the identity of the form you are sending)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST' /* || typeof req.body !== 'object' */) {
      return res.status(400).json({})
    }

    const body = JSON.parse(req.body)

    const {
      mg_subject,
      mg_email_to,
      mg_reply_to,
      meta_sent_from,
      meta_locale,
      cfTurnstile,
      ...rest
    } = body

    if (
      !process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API
    ) {
      console.log('Captcha variables not defined')
      return res.status(500).json({ error: 'Captcha variables not defined' })
    }

    if (!cfTurnstile) {
      console.log('Captcha token not provided')
      return res.status(500).json({ error: 'Captcha token not provided' })
    }

    if (!available_emails.has(mg_email_to)) {
      console.log('email is not in whitelist')
      return res.status(500).json({ error: 'generic error' })
    }

    const text = reduce(
      rest,
      // eslint-disable-next-line unicorn/prefer-spread
      (result, value, key) => result.concat(`${key}: ${value}\n`),
      'Formulár bol vyplnený s nasledovnými hodnotami:\n' +
        `Odoslané z adresy: https://mestskakniznica.sk${meta_sent_from} (jazyk: ${meta_locale})\n\n`,
    )

    const dataToSend = {
      from: EMAIL_FROM,
      to: mg_email_to,
      subject: mg_subject || 'Nová odpoveď na formulár stránky mestskakniznica.sk',
      text,
      'h:Reply-To': mg_reply_to || EMAIL_FROM,
    }

    const cfForm = new URLSearchParams()
    cfForm.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)
    cfForm.append('response', cfTurnstile)

    const result = await fetch(process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API, {
      method: 'POST',
      body: cfForm,
    })
    const cfResponse = await result.json()

    if (cfResponse.success !== true) {
      console.log('Captcha validation failed')
      return res.status(500).json({ error: 'Captcha validation failed' })
    }

    await messenger.messages().send(dataToSend)

    return res.status(200).json({})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'generic error' })
  }
}

export default handler
