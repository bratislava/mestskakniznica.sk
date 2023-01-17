import { client } from '@services/graphql/gql'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { model, entry } = req.body
  if (model === 'page' && entry.layout === 'event') {
    const eventSection = entry.sections.find(
      // eslint-disable-next-line no-underscore-dangle
      (ele: any) => ele.__component === 'sections.event-details'
    )
    if (!eventSection.eventTitle || !eventSection.dateFrom || !eventSection.dateTo) {
      res.send({ message: 'Not a valid event to add.' })
      return
    }

    // @ts-ignore
    const subscriberList = await client.EventSubscribers()
    subscriberList.eventSubscriptions?.map((user: any) => {
      const gAuthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      )
      gAuthClient.setCredentials({ refresh_token: user.refreshToken })
      return google
        .calendar('v3')
        .events.insert({
          calendarId: 'primary',
          auth: gAuthClient,
          requestBody: {
            summary: eventSection.eventTitle,
            start: {
              dateTime: eventSection.dateFrom,
            },
            end: { dateTime: eventSection.dateTo },
          },
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }
  res.send('hey')
}

export default handler
