/* eslint-disable i18next/no-literal-string */
import React from 'react'

import { Stack } from '@/components/styleguide/Stack'
import { Wrapper } from '@/components/styleguide/Wrapper'
import { CheckBox } from '@/components/ui'

const StyleguideCheckbox = () => {
  return (
    <Wrapper title="Checkbox" direction="column">
      <Stack>
        <CheckBox>Label</CheckBox>
        <CheckBox isSelected>isSelected</CheckBox>
        <CheckBox isDisabled>isDisabled</CheckBox>
        <CheckBox isIndeterminate>isIndeterminate</CheckBox>
        <CheckBox isInvalid>isInvalid</CheckBox>
      </Stack>
    </Wrapper>
  )
}

export default StyleguideCheckbox
