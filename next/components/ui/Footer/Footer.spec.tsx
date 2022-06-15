import { render } from '@testing-library/react'

import { Footer } from './Footer'

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer copyrightText="© 2021 Mestská knižnica v Bratislave" />)
    expect(baseElement).toBeTruthy()
  })
})
