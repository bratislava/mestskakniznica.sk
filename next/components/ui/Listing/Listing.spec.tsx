import { render } from '@testing-library/react'

import Listing from './Listing'

describe('Listing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Listing pages={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
