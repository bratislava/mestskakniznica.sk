import { NextApiRequest, NextApiResponse } from 'next'
import mg from 'mailgun-js'
import _ from 'lodash'

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

const messenger = new mg({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN || '',
  host: process.env.MAILGUN_HOST || '',
})

const available_emails = [
  'info@mestskakniznica.sk',
  'registracia@mestskakniznica.sk',
  'ivo.dobrovodsky@mestskakniznica.sk',
  'vypozicky.detska@mestskakniznica.sk',
  'donaska@mestskakniznica.sk',
  'miroslava.porubska@mestskakniznica.sk',
  'diplomovky@mestskakniznica.sk',
  'vypozicky.hudobna@mestskakniznica.sk',
  // todo remove after testing
  'francviktor@gmail.com',
  'martin.pinter@bratislava.sk',
]

// To send results of any form on the page to the email of city library,
// simply use this endpoint, serializing the results of the form into a
// json 1 level deep. Optionally you can add a custom subject field (i.e.
// to indicate the identity of the form you are sending)

// TODO captcha ?
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST' /*|| typeof req.body !== 'object'*/) {
      return res.status(400).json({})
    }

    const body = JSON.parse(req.body)

    const { mg_subject, mg_email_to, meta_sent_from, meta_locale, ...rest } = body

    if (!available_emails.includes(mg_email_to)) {
      console.log('email is not in whitelist')
      return res.status(500).json({})
    }

    const text = _.reduce(
      rest,
      (result, value, key) => result.concat(`${key}: ${value}\n`),
      'Formulár bol vyplnený s nasledovnými hodnotami:\n' +
        `Odoslané z adresy: https://mestskakniznica.sk${meta_sent_from} (jazyk: ${meta_locale})\n\n`
    )

    const dataToSend = {
      from: EMAIL_FROM,
      to: mg_email_to,
      subject: mg_subject || 'Nová odpoveď na formulár stránky mestskakniznica.sk',
      text,
    }

    await messenger.messages().send(dataToSend)

    return res.status(200).json({})
  } catch (e) {
    console.error(e)
    return res.status(500).json({})
  }
}

export default handler
