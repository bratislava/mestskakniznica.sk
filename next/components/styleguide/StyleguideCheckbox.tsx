import React from 'react'

import { Stack } from '@/components/styleguide/Stack'
import { Wrapper } from '@/components/styleguide/Wrapper'
import { CheckBox } from '@/components/ui'

const StyleguideCheckbox = () => {
  return (
    <Wrapper title="Checkbox" direction="column">
      <Stack>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <CheckBox>Label</CheckBox>
      </Stack>
    </Wrapper>
  )
}

export default StyleguideCheckbox
