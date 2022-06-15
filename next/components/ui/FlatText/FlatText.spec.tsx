import { render } from '@testing-library/react'

import FlatText from './FlatText'

describe('FlatText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlatText />)
    expect(baseElement).toBeTruthy()
  })
})
