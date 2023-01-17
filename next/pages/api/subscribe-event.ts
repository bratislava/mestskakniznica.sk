import { client } from '@services/graphql/gql'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  )
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({})
    }
    const { code } = JSON.parse(req.body)
    const { tokens } = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)
    const info = await google.oauth2('v2').userinfo.get({ auth: oauth2Client })

    // @ts-ignore
    await client.SubscribeToEvent({
      token: tokens.refresh_token || null,
      email: info.data.email || null,
    })
    res.send({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({})
  }
}

export default handler
