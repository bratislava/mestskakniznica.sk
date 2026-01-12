import React from 'react'

import { Wrapper } from '@/components/styleguide/Wrapper'

const StyleguideTypography = () => {
  return (
    <Wrapper title="Typography" direction="column" noBorder>
      <h1 className="text-h1">Headline 1</h1>
      <h2 className="text-h2">Headline 2</h2>
      <h3 className="text-h3">Headline 3</h3>
      <h4 className="text-h4">Headline 4</h4>
      <h5 className="text-h5">Headline 5</h5>
      <h6 className="text-h6">Headline 6</h6>
      <h6 className="text-h4">Headline 6 with custom size h4</h6>
      <div className="text-xs">Text xs</div>
      <div className="text-sm">Text sm</div>
      <div className="text-base">Text base</div>
      <div className="text-lg">Text lg</div>
    </Wrapper>
  )
}

export default StyleguideTypography
