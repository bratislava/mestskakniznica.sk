import { render } from '@testing-library/react'

import { Upload } from './Upload'

describe('Upload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Upload />)
    expect(baseElement).toBeTruthy()
  })
})
