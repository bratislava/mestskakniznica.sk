import { render } from '@testing-library/react'
import React from 'react'

import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RadioGroup options={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
