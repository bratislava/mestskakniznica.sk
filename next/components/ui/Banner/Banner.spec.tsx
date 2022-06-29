import { render } from '@testing-library/react'

import { Banner } from './Banner'

describe('Banner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Banner onBannerClick={() => null} />)
    expect(baseElement).toBeTruthy()
  })
})
