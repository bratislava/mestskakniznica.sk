import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST' /* || typeof req.body !== 'object' */) {
      return res.status(400).json({})
    }

    if (
      !process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API
    ) {
      console.log('Captcha variables not defined')
      return res.status(500).json({})
    }

    const body = JSON.parse(req.body)

    const cfTurnstile = body.cfTurnstile ?? false
    if (!cfTurnstile) {
      console.log('Captcha token not provided')
      return res.status(500).json({})
    }

    const cfForm = new URLSearchParams()
    cfForm.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)
    cfForm.append('response', cfTurnstile)

    const cfResult = await fetch(process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEVERIFY_API, {
      method: 'POST',
      body: cfForm,
    })
    const cfResponse = await cfResult.json()

    if (cfResponse.success != true) {
      console.log('Captcha validation failed')
      return res.status(500).json({})
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

    const result = await fetch('https://opac.mestskakniznica.sk/api?fn=*registerNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dawinchiBody),
    })

    const resultData = JSON.parse((await result.text()).trim()) // trim needed because of BOM and parse fails
    console.log('OPAC response', resultData.response)

    return res.status(200).json(resultData.response)
  } catch (error) {
    console.log('OPAC error', error)
    console.error(error)
    return res.status(500).json({
      reqid: '',
      status: '500',
      message: null,
    })
  }
}

export default handler
