import { render } from '@testing-library/react'

import Subpages from './Subpages'

describe('Subpages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Subpages />)
    expect(baseElement).toBeTruthy()
  })
})
