import { render } from '@testing-library/react'

import Localities from './Localities'

describe('Localities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Localities />)
    expect(baseElement).toBeTruthy()
  })
})
