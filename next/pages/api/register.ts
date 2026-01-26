import { NextApiRequest, NextApiResponse } from 'next'

import { opacBaseUrl } from '@/utils/consts'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST' /* || typeof req.body !== 'object' */) {
      res.status(400).json({})

      return
    }

    if (
      !process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API
    ) {
      console.log('Captcha variables not defined')

      res.status(500).json({})

      return
    }

    const body = JSON.parse(req.body)

    const cfTurnstile = body.cfTurnstile ?? false
    if (!cfTurnstile) {
      console.log('Captcha token not provided')

      res.status(500).json({})
      
      return
    }

    const cfForm = new URLSearchParams()
    cfForm.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)
    cfForm.append('response', cfTurnstile)

    const cfResult = await fetch(process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API, {
      method: 'POST',
      body: cfForm,
    })
    const cfResponse = await cfResult.json()

    if (cfResponse.success !== true) {
      console.log('Captcha validation failed')

      res.status(500).json({})
      
      return
    }

    const reqid = Date.now()
    const remark = ''
    const {
      password,
      fName,
      lName,
      address,
      city,
      postalCode,
      tempAddress,
      tempCity,
      tempPostalCode,
      phone,
      email,
      IDNumber,
      IDType,
      acceptNewsletter,
      birthDate,
    } = body

    const dawinchiBody = {
      user: {
        reqid,
        sign: '',
        firstname: fName,
        lastname: lName,
        password,
        addressstreet1: address,
        addresstown1: city,
        addresspsc1: postalCode,
        addressstreet2: tempAddress,
        addresstown2: tempCity,
        addresspsc2: tempPostalCode,
        borndate: birthDate,
        location: '',
        remark,
        phone,
        email,
        identifycard: IDNumber,
        category: IDType,
        checkConfirm2: acceptNewsletter === true ? '1' : '0',
      },
    }

    console.log('OPAC request:', dawinchiBody)

    const result = await fetch(`${opacBaseUrl}api?fn=*registerNewUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dawinchiBody),
    })

    const resultDataText = await result.text()
    const resultData = JSON.parse(resultDataText).trim() // trim needed because of BOM and parse fails
    console.log('OPAC response', resultData.response)

    res.status(200).json(resultData.response)
  } catch (error) {
    console.log('OPAC error', error)
    console.error(error)

    res.status(500).json({
      reqid: '',
      status: '500',
      message: null,
    })
  }
}

export default handler
