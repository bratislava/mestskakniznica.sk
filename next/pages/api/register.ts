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
    const password = body.password

    const dawinchiBody = {
      user: {
        reqid: reqid,
        sign: '',
        firstname: body.fName,
        lastname: body.lName,
        password: password,
        addressstreet1: body.address,
        addresstown1: body.city,
        addresspsc1: body.postalCode,
        addressstreet2: body.tempAddress,
        addresstown2: body.tempCity,
        addresspsc2: body.tempPostalCode,
        borndate: birthday,
        location: '',
        remark: remark,
        phone: body.phone,
        email: body.email,
        identifycard: body.IDNumber,
        category: body.IDType,
        checkConfirm2: body.acceptNewsletter === true ? '1' : '0',
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
