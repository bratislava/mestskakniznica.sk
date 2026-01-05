import React from 'react'

import { Wrapper } from '@/components/styleguide/Wrapper'
import RadioGroup, { IRadioOption } from '@/components/ui/RadioGroup/RadioGroup'

const StyleguideRadioGroup = () => {
  const options = [
    {
      key: 'soccer',
      title: 'Soccer',
      price: '1e',
    },
    {
      key: 'baseball',
      title: 'Baseball',
      price: '10e',
    },
    {
      key: 'volleyball',
      title: 'Volleyball',
    },
    {
      key: 'basketball',
      title: 'Basketball',
      isDisabled: true,
    },
  ] satisfies IRadioOption[]

  return (
    <Wrapper title="Radio Group" direction="column">
      <div className="w-full">
        <RadioGroup label="Radio Group" options={options} />
      </div>
      <div className="w-full">
        <RadioGroup label="Radio Group" options={options.slice(0, 2)} orientation="horizontal" />
      </div>
    </Wrapper>
  )
}

export default StyleguideRadioGroup
