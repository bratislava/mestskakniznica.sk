import { NextApiRequest, NextApiResponse } from 'next'

// TODO captcha ?
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST' /* || typeof req.body !== 'object' */) {
      return res.status(400).json({})
    }

    const body = JSON.parse(req.body)

    // datum narodenia vo formate dd.mm.yyyy
    const birthday = new Date(body.birthDate)
      .toLocaleDateString('sk', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replaceAll(' ', '')

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
        borndate: birthday,
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
