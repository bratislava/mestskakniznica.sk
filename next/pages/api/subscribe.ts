import mailchimp from '@mailchimp/mailchimp_marketing'
import { NextApiRequest, NextApiResponse } from 'next'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
})

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    if (process.env.MAILCHIMP_AUDIENCE_ID) {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: 'subscribed',
      })

      res.status(201).json({ error: '' });
      return;
    }
    throw new Error('Invalid audience.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message || error.toString() }); 
  }
}

export default Subscribe
