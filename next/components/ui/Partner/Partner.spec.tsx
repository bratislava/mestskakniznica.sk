import { render } from '@testing-library/react'

import Partner from './Partner'

describe('Partner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Partner />)
    expect(baseElement).toBeTruthy()
  })
})
